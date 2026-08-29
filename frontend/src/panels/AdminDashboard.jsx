import React, { useState, useEffect } from 'react';

export default function AdminDashboard({ onLogout }) {
  // 🎛️ Navigation State
  const [activeTab, setActiveTab] = useState('vault'); 
  
  // 🗄️ Database States
  const [clients, setClients] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [crewStatuses, setCrewStatuses] = useState({});

  // 📝 Vault Form State
  const [newClient, setNewClient] = useState({
    name: '', eventType: 'Wedding', driveLink: '', pin: '', deadlineDate: '' 
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editClientId, setEditClientId] = useState(null);

  // 🔎 CRM Search & Filter State
  const [crmSearch, setCrmSearch] = useState('');
  const [crmFilter, setCrmFilter] = useState('All');

  // 🤵 Offline CRM Form State
  const [showCrmModal, setShowCrmModal] = useState(false);
  const [offlineClient, setOfflineClient] = useState({
    name: '', eventType: 'Wedding', totalAmount: '', paidAmount: ''
  });

  // ---------------------------------------------------------------------------------
  // 🚀 DATA FETCHING & PERSISTENCE LOGIC
  // ---------------------------------------------------------------------------------
  const loadData = async () => {
    setIsLoading(true);
    let backendClients = [];
    
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://aman-web-nuwa.onrender.com/';

      const res = await fetch(`${backendUrl}/api/admin/clients`);
      const data = await res.json();
      if (data.success) backendClients = data.data;
    } catch (error) {
      backendClients = [
        { _id: '101', name: 'Rahul & Sneha (Siwan)', eventType: 'Wedding', driveLink: 'https://drive.google.com', pin: '4921', selectedPhotosCount: 45, deadlineDate: '2026-07-30' },
        { _id: '102', name: 'Vikas Kumar (Ukhai)', eventType: 'Pre-Wedding', driveLink: 'https://drive.google.com', pin: '8392', selectedPhotosCount: 150, deadlineDate: '2026-07-25' }
      ];
    }

    // Load Local Vaults, Offline Clients and Financials
    const localVaults = JSON.parse(localStorage.getItem('saved_vault_clients') || '[]');
    const offlineClients = JSON.parse(localStorage.getItem('crm_offline_clients') || '[]');
    const savedFinancials = JSON.parse(localStorage.getItem('crm_financials') || '{}');

    // Combine all without duplicates
    const allClientsMap = new Map();
    [...backendClients, ...localVaults, ...offlineClients].forEach(c => {
      allClientsMap.set(c._id, c);
    });

    const combinedClients = Array.from(allClientsMap.values()).map(client => {
      const finance = savedFinancials[client._id] || { totalAmount: 0, paidAmount: 0, financialStatus: 'Lead' };
      return { ...client, ...finance };
    });

    setClients(combinedClients);
    setIsLoading(false);
  };

  const fetchBookings = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://aman-web-nuwa.onrender.com/';

      const res = await fetch(`${backendUrl}/api/admin/bookings`); 
      const data = await res.json();
      if (data.success) setBookings(data.data);
    } catch (error) {
      setBookings([{ _id: '1', name: 'Vikram Singh (Gaurai)', phone: '+91 8434656386', eventDate: '2026-11-14', serviceType: 'The Royal Vivah Grand Master', status: 'New Lead' }]);
    }
  };

  const syncCrewStatus = () => {
    const saved = localStorage.getItem('crew_project_statuses');
    if (saved) setCrewStatuses(JSON.parse(saved));
  };

  useEffect(() => {
    loadData();
    fetchBookings();
    syncCrewStatus();
    const interval = setInterval(syncCrewStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  // ---------------------------------------------------------------------------------
  // 💰 SMART PAYMENT UPDATER 
  // ---------------------------------------------------------------------------------
  const updatePayment = (id, field, value) => {
    const val = Number(value);
    setClients(prevClients => {
      const updatedClients = prevClients.map(c => {
        if (c._id === id) {
          const updated = { ...c, [field]: val };
          
          if (updated.paidAmount >= updated.totalAmount && updated.totalAmount > 0) {
            updated.financialStatus = 'Full Payment';
          } else if (updated.paidAmount > 0) {
            updated.financialStatus = 'Advance Received';
          } else {
            updated.financialStatus = 'Lead';
          }

          const storedFinancials = JSON.parse(localStorage.getItem('crm_financials') || '{}');
          storedFinancials[id] = { totalAmount: updated.totalAmount, paidAmount: updated.paidAmount, financialStatus: updated.financialStatus };
          localStorage.setItem('crm_financials', JSON.stringify(storedFinancials));

          if (id.toString().startsWith('offline_')) {
            const offlineClients = JSON.parse(localStorage.getItem('crm_offline_clients') || '[]');
            const newOffline = offlineClients.map(off => off._id === id ? updated : off);
            localStorage.setItem('crm_offline_clients', JSON.stringify(newOffline));
          }

          return updated;
        }
        return c;
      });
      return updatedClients;
    });
  };

  // ---------------------------------------------------------------------------------
  // 🤵 UNIVERSAL DELETE & OFFLINE CRM LOGIC
  // ---------------------------------------------------------------------------------
  const handleSaveOfflineClient = (e) => {
    e.preventDefault();
    const newId = `offline_${Date.now()}`;
    const newClientData = { _id: newId, name: offlineClient.name, eventType: offlineClient.eventType, isOffline: true };
    const offlineClients = JSON.parse(localStorage.getItem('crm_offline_clients') || '[]');
    localStorage.setItem('crm_offline_clients', JSON.stringify([...offlineClients, newClientData]));

    const storedFinancials = JSON.parse(localStorage.getItem('crm_financials') || '{}');
    storedFinancials[newId] = { totalAmount: Number(offlineClient.totalAmount) || 0, paidAmount: Number(offlineClient.paidAmount) || 0, financialStatus: Number(offlineClient.paidAmount) > 0 ? 'Advance Received' : 'Lead' };
    localStorage.setItem('crm_financials', JSON.stringify(storedFinancials));

    loadData();
    setShowCrmModal(false);
    setOfflineClient({ name: '', eventType: 'Wedding', totalAmount: '', paidAmount: '' });
  };

  const handleDeleteClient = async (id, name, isOffline) => {
    if (window.confirm(`⚠️ Permanently delete ${name}'s records? This action cannot be undone.`)) {
      if (isOffline) {
        const offlineClients = JSON.parse(localStorage.getItem('crm_offline_clients') || '[]');
        localStorage.setItem('crm_offline_clients', JSON.stringify(offlineClients.filter(c => c._id !== id)));
        setClients(clients.filter(c => c._id !== id));
      } else {
       try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://aman-web-nuwa.onrender.com/';

      const response = await fetch(`${backendUrl}/api/admin/clients/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      
      if (data.success) {
        const localVaults = JSON.parse(localStorage.getItem('saved_vault_clients') || '[]');
        localStorage.setItem('saved_vault_clients', JSON.stringify(localVaults.filter(c => c._id !== id)));
        setClients(clients.filter(c => c._id !== id));
      } else {
        alert("Delete failed: " + data.message);
      }
        } catch (error) {
          console.error("Delete Error:", error);
          alert("⚠️ Backend server offline hai, delete nahi ho paaya.");
        }
      }
      
      const storedFinancials = JSON.parse(localStorage.getItem('crm_financials') || '{}');
      delete storedFinancials[id];
      localStorage.setItem('crm_financials', JSON.stringify(storedFinancials));
    }
  };

  // ---------------------------------------------------------------------------------
  // 📂 VAULT / PORTAL CREATION & PERSISTENCE
  // ---------------------------------------------------------------------------------
  const handleSaveVault = async (e) => {
    e.preventDefault();
    if (!newClient.name || !newClient.driveLink || !newClient.pin || !newClient.deadlineDate) {
      return alert("Bhai, saari details aur deadline date fill karna zaroori hai!");
    }

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://aman-web-nuwa.onrender.com/';

      const url = isEditing 
        ? `${backendUrl}/api/admin/clients/${editClientId}` 
        : `${backendUrl}/api/admin/clients`;
        
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newClient)
      });

      const data = await response.json();

      if (data.success) {
        alert(isEditing ? "Vault Updated Successfully in Database!" : "New Portal Created & Secured in Database!");
        setNewClient({ name: '', eventType: 'Wedding', driveLink: '', pin: '', deadlineDate: '' }); 
        setIsEditing(false);
        setEditClientId(null);
        loadData(); 
      } else {
        alert("Database Error: " + data.message);
      }
    } catch (error) {
      console.error("Backend Save Error:", error);
      alert("⚠️ Backend Server se connect nahi ho paaya! Node.js server chal raha hai?");
    }
  };

  const handleEditClick = (client) => {
    setNewClient({
      name: client.name, eventType: client.eventType, driveLink: client.driveLink, pin: client.pin, deadlineDate: client.deadlineDate || ''
    });
    setIsEditing(true);
    setEditClientId(client._id);
  };

  const handleUpdateLeadStatus = (id, newStatus) => {
    setBookings(bookings.map(b => b._id === id ? { ...b, status: newStatus } : b));
  };

  const filteredCrmClients = clients.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(crmSearch.toLowerCase());
    const matchesFilter = crmFilter === 'All' ? true : crmFilter === 'CrewDone' ? crewStatuses[c._id] === 'Editing Done' : c.financialStatus === crmFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-[#FAF8F5] text-stone-900 font-sans w-full min-h-screen p-4 md:p-8 selection:bg-amber-100 selection:text-amber-900 relative overflow-hidden">
      
      {/* 🔮 STYLES & LUXURY LIGHT THEME DEFINITIONS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        .font-brand-cinzel { font-family: 'Cinzel', Georgia, serif; }
        .font-brand-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-brand-mono { font-family: 'Space Grotesk', monospace; }

        .glass-admin-shell {
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(24px) saturate(180%);
          border: 1px solid rgba(217, 119, 6, 0.2);
          box-shadow: 0 30px 70px -15px rgba(120, 53, 15, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.9);
        }

        .glass-admin-card {
          background: #ffffff;
          border: 1px solid rgba(231, 229, 228, 0.9);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.04);
        }

        .custom-admin-input {
          background: #ffffff;
          border: 1px solid rgba(214, 211, 209, 0.9);
          color: #1c1917;
          transition: all 0.25s ease;
        }
        .custom-admin-input:focus {
          border-color: #b45309;
          box-shadow: 0 0 0 3px rgba(180, 83, 9, 0.12);
        }
      `}</style>

      {/* Background Ambience */}
      <div className="absolute -top-32 -left-32 w-[700px] h-[700px] bg-gradient-to-br from-amber-200/30 via-rose-100/30 to-transparent rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 -right-36 w-[700px] h-[700px] bg-gradient-to-bl from-rose-100/30 via-amber-100/30 to-transparent rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto glass-admin-shell rounded-3xl min-h-[88vh] overflow-hidden relative z-10 flex flex-col">

        {/* 👑 EXECUTIVE CONSOLE HEADER */}
        <div className="bg-white/80 p-6 md:p-8 border-b border-stone-200/80 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
          <div className="text-left space-y-1">
            <span className="text-amber-800 font-brand-mono text-[10px] tracking-[0.35em] uppercase block font-bold">
              DIRECTORIAL EXECUTIVE SUITE • GURU VIDEOGRAPHY
            </span>
            <h2 className="font-brand-cinzel text-3xl md:text-4xl text-stone-950 tracking-tight font-medium">
              Command <span className="italic text-amber-800 font-light">Center.</span>
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full xl:w-auto">
            <div className="flex bg-stone-100 p-1.5 rounded-2xl border border-stone-200/80 w-full sm:w-auto overflow-x-auto">
              <button 
                onClick={() => setActiveTab('crm')} 
                className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-xs font-brand-sans font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'crm' 
                    ? 'bg-stone-950 text-white shadow-sm' 
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                📊 CRM & Accounts
              </button>
              <button 
                onClick={() => setActiveTab('inquiries')} 
                className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-xs font-brand-sans font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'inquiries' 
                    ? 'bg-stone-950 text-white shadow-sm' 
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                ⚡ Live Inquiries
              </button>
              <button 
                onClick={() => setActiveTab('vault')} 
                className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-xs font-brand-sans font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'vault' 
                    ? 'bg-stone-950 text-white shadow-sm' 
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                📂 Client Vaults
              </button>
            </div>

            <button 
              onClick={onLogout} 
              className="w-full sm:w-auto text-xs uppercase font-brand-sans font-bold tracking-widest bg-rose-50 border border-rose-200 text-rose-800 px-6 py-3 rounded-2xl hover:bg-rose-100 transition-all cursor-pointer whitespace-nowrap shadow-2xs"
            >
              Exit Console
            </button>
          </div>
        </div>

        {/* =========================================================
            TAB 1: CRM & ACCOUNTS
        ========================================================= */}
        {activeTab === 'crm' && (
          <div className="p-6 md:p-8 flex-1 flex flex-col space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="text-left">
                <span className="font-brand-mono text-[10px] font-bold text-amber-800 tracking-wider uppercase block">Ledger Records</span>
                <h3 className="font-brand-cinzel text-2xl font-bold text-stone-950">Client Financial Master</h3>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
                <div className="relative w-full sm:w-auto">
                  <input 
                    type="text" 
                    placeholder="Search client records..." 
                    value={crmSearch} 
                    onChange={(e) => setCrmSearch(e.target.value)} 
                    className="w-full sm:w-64 custom-admin-input rounded-xl py-2 pl-9 pr-3 text-xs outline-none" 
                  />
                  <svg className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>

                <select 
                  value={crmFilter} 
                  onChange={(e) => setCrmFilter(e.target.value)} 
                  className="w-full sm:w-auto custom-admin-input rounded-xl p-2 text-xs font-brand-sans font-semibold uppercase tracking-wider outline-none cursor-pointer"
                >
                  <option value="All">All Clients</option>
                  <option value="Hot Lead">🔥 Hot Leads</option>
                  <option value="Advance Received">💸 Advance Received</option>
                  <option value="Full Payment">✅ Full Payment</option>
                  <option value="CrewDone">🎬 Crew Editing Done</option>
                </select>

                <button 
                  onClick={() => setShowCrmModal(true)} 
                  className="w-full sm:w-auto bg-stone-950 hover:bg-amber-800 text-white px-5 py-2.5 rounded-xl text-xs font-brand-sans font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer whitespace-nowrap"
                >
                  + Offline Client
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto pr-1">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCrmClients.map(client => {
                  const total = client.totalAmount || 0;
                  const paid = client.paidAmount || 0;
                  const percent = total > 0 ? Math.min(Math.round((paid / total) * 100), 100) : 0;
                  const cStatus = crewStatuses[client._id] || 'Pending';
                  const cColor = cStatus === 'Editing Done' 
                    ? 'text-emerald-800 border-emerald-300 bg-emerald-50' 
                    : cStatus === 'Downloaded' 
                    ? 'text-blue-800 border-blue-300 bg-blue-50' 
                    : 'text-stone-600 border-stone-200 bg-stone-100';

                  return (
                    <div key={client._id} className="glass-admin-card rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between hover:shadow-md hover:border-amber-500/40 relative group text-left">
                      
                      <button 
                        onClick={() => handleDeleteClient(client._id, client.name, client.isOffline)} 
                        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-rose-700 hover:bg-rose-50 p-1.5 rounded-lg cursor-pointer" 
                        title="Delete Client"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>

                      <div className="mb-4">
                        <h4 className="font-brand-cinzel text-xl font-bold text-stone-950 pr-8 truncate">{client.name}</h4>
                        <div className="flex gap-2 mt-1">
                          <span className="text-[10px] font-brand-mono text-stone-600 uppercase tracking-wider bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">{client.eventType}</span>
                          {client.isOffline && <span className="text-[10px] font-brand-mono text-purple-800 uppercase tracking-wider bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">Offline Walkin</span>}
                        </div>
                      </div>

                      <div className="space-y-3.5 bg-stone-50/80 p-4 rounded-xl border border-stone-200/80">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">Total Deal (₹)</span>
                          <input 
                            type="number" 
                            value={total || ''} 
                            onChange={(e) => updatePayment(client._id, 'totalAmount', e.target.value)} 
                            placeholder="0" 
                            className="bg-transparent border-b border-stone-300 focus:border-amber-800 text-right text-stone-900 font-brand-mono text-base font-bold w-28 outline-none" 
                          />
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">Received (₹)</span>
                          <input 
                            type="number" 
                            value={paid || ''} 
                            onChange={(e) => updatePayment(client._id, 'paidAmount', e.target.value)} 
                            placeholder="0" 
                            className="bg-transparent border-b border-stone-300 focus:border-emerald-700 text-right text-emerald-800 font-brand-mono text-base font-bold w-28 outline-none" 
                          />
                        </div>
                        
                        <div>
                          <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden">
                            <div className={`h-2 rounded-full transition-all duration-700 ${percent === 100 ? 'bg-emerald-600' : 'bg-amber-700'}`} style={{ width: `${percent}%` }}></div>
                          </div>
                          <div className="flex justify-between text-[10px] font-brand-mono mt-1.5">
                            <span className="text-stone-500">Pending: ₹{Math.max(total - paid, 0).toLocaleString()}</span>
                            <span className={percent === 100 ? 'text-emerald-700 font-bold' : 'text-stone-600 font-semibold'}>{percent}% Settled</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between items-center border-t border-stone-100 pt-3.5">
                        <span className={`text-[10px] font-brand-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          client.financialStatus === 'Full Payment' ? 'bg-emerald-100 text-emerald-900 border border-emerald-200' :
                          client.financialStatus === 'Advance Received' ? 'bg-amber-100 text-amber-900 border border-amber-200' : 'bg-stone-100 text-stone-600 border border-stone-200'
                        }`}>
                          {client.financialStatus || 'Lead'}
                        </span>
                        
                        {!client.isOffline ? (
                          <div className={`text-[9px] font-brand-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${cColor}`}>
                            Crew: {cStatus}
                          </div>
                        ) : (
                          <span className="text-[10px] font-brand-mono text-stone-400 uppercase">Offline Client</span>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 🤵 MODAL: ADD OFFLINE CLIENT */}
        {showCrmModal && (
          <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#FAF8F5] border border-amber-200 rounded-3xl p-8 max-w-md w-full shadow-2xl relative text-left">
              <span className="text-[10px] font-brand-mono uppercase tracking-widest text-amber-800 font-bold block mb-1">Direct Studio Walkin</span>
              <h3 className="font-brand-cinzel text-2xl text-stone-950 font-bold mb-5">Create Offline Client</h3>
              
              <form onSubmit={handleSaveOfflineClient} className="space-y-4 font-brand-sans text-xs">
                <div>
                  <label className="block text-[10px] text-stone-600 font-bold uppercase tracking-wider mb-1">Client / Couple Name</label>
                  <input 
                    type="text" 
                    required 
                    value={offlineClient.name} 
                    onChange={e => setOfflineClient({...offlineClient, name: e.target.value})} 
                    className="w-full custom-admin-input rounded-xl px-4 py-2.5 text-stone-900 outline-none" 
                    placeholder="e.g. Vikas & Family (Siwan)" 
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-stone-600 font-bold uppercase tracking-wider mb-1">Event Scope</label>
                  <select 
                    value={offlineClient.eventType} 
                    onChange={e => setOfflineClient({...offlineClient, eventType: e.target.value})} 
                    className="w-full custom-admin-input rounded-xl px-4 py-2.5 text-stone-900 outline-none cursor-pointer"
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Pre-Wedding">Pre-Wedding</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Birthday">Birthday / Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-stone-600 font-bold uppercase tracking-wider mb-1">Total Deal (₹)</label>
                    <input 
                      type="number" 
                      required 
                      value={offlineClient.totalAmount} 
                      onChange={e => setOfflineClient({...offlineClient, totalAmount: e.target.value})} 
                      className="w-full custom-admin-input rounded-xl px-4 py-2.5 text-stone-900 font-brand-mono outline-none" 
                      placeholder="0" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-600 font-bold uppercase tracking-wider mb-1">Advance (₹)</label>
                    <input 
                      type="number" 
                      required 
                      value={offlineClient.paidAmount} 
                      onChange={e => setOfflineClient({...offlineClient, paidAmount: e.target.value})} 
                      className="w-full custom-admin-input rounded-xl px-4 py-2.5 text-emerald-800 font-brand-mono outline-none font-bold" 
                      placeholder="0" 
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-3">
                  <button 
                    type="button" 
                    onClick={() => setShowCrmModal(false)} 
                    className="flex-1 bg-stone-200 text-stone-700 font-bold uppercase tracking-widest text-[10px] py-3.5 rounded-xl hover:bg-stone-300 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 bg-stone-950 hover:bg-amber-800 text-white font-bold uppercase tracking-widest text-[10px] py-3.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Save Record
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 2: LIVE INQUIRIES
        ========================================================= */}
        {activeTab === 'inquiries' && (
          <div className="p-6 md:p-8 flex-1 flex flex-col space-y-6">
            <div className="text-left">
              <span className="font-brand-mono text-[10px] font-bold text-amber-800 tracking-wider uppercase block">Pipeline Monitor</span>
              <h3 className="font-brand-cinzel text-2xl font-bold text-stone-950">Live Booking Requests</h3>
            </div>
            
            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200 text-[10px] uppercase tracking-wider text-stone-600 font-brand-mono">
                      <th className="p-4.5 font-bold">Client Lead</th>
                      <th className="p-4.5 font-bold">Event Date</th>
                      <th className="p-4.5 font-bold">Service Requested</th>
                      <th className="p-4.5 font-bold">Contact Details</th>
                      <th className="p-4.5 font-bold text-center">Operation Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs font-brand-sans">
                    {bookings.map((lead) => (
                      <tr key={lead._id} className="border-b border-stone-100 hover:bg-stone-50/70 transition-colors">
                        <td className="p-4.5 font-brand-cinzel text-stone-950 font-bold text-sm">{lead.name}</td>
                        <td className="p-4.5 font-brand-mono text-amber-900 font-semibold">{new Date(lead.eventDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                        <td className="p-4.5 text-stone-600">{lead.serviceType}</td>
                        <td className="p-4.5 text-stone-800 font-brand-mono">{lead.phone}</td>
                        <td className="p-4.5 text-center">
                          <select
                            value={lead.status} 
                            onChange={(e) => handleUpdateLeadStatus(lead._id, e.target.value)}
                            className={`px-3 py-1.5 rounded-full text-[10px] font-brand-mono font-bold uppercase outline-none border cursor-pointer ${
                              lead.status === 'New Lead' ? 'bg-rose-50 text-rose-800 border-rose-200' : 
                              lead.status === 'Deal Closed' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-stone-100 text-stone-800 border-stone-200'
                            }`}
                          >
                            <option value="New Lead">🔴 NEW LEAD</option>
                            <option value="Contacted">🔵 CONTACTED</option>
                            <option value="Deal Closed">🟢 DEAL CLOSED</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 3: CLIENT VAULTS
        ========================================================= */}
        {activeTab === 'vault' && (
          <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
            
            {/* Left: Deployment Form */}
            <div className="lg:col-span-4 glass-admin-card p-6 md:p-8 rounded-3xl h-fit text-left space-y-5">
              <div>
                <span className="text-[10px] font-brand-mono text-amber-800 uppercase tracking-widest font-bold block mb-0.5">Secure Vault Manager</span>
                <h3 className="text-stone-950 text-xl font-brand-cinzel font-bold">
                  {isEditing ? 'Update Vault Settings' : 'Deploy Client Vault'}
                </h3>
              </div>
              
              <form onSubmit={handleSaveVault} className="space-y-4 font-brand-sans text-xs">
                <div>
                  <label className="block text-[10px] text-stone-600 font-bold uppercase tracking-wider mb-1">Client / Couple Name</label>
                  <input 
                    type="text" 
                    required 
                    className="w-full custom-admin-input rounded-xl px-4 py-2.5 text-stone-900 outline-none" 
                    placeholder="e.g. Rahul & Sneha (Siwan)" 
                    value={newClient.name} 
                    onChange={(e) => setNewClient({...newClient, name: e.target.value})} 
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-stone-600 font-bold uppercase tracking-wider mb-1">Event Scope</label>
                  <select 
                    className="w-full custom-admin-input rounded-xl px-4 py-2.5 text-stone-900 outline-none cursor-pointer" 
                    value={newClient.eventType} 
                    onChange={(e) => setNewClient({...newClient, eventType: e.target.value})}
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Pre-Wedding">Pre-Wedding</option>
                    <option value="Engagement">Engagement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-stone-600 font-bold uppercase tracking-wider mb-1">Master Drive Folder Link</label>
                  <input 
                    type="url" 
                    required 
                    className="w-full custom-admin-input rounded-xl px-4 py-2.5 text-stone-900 outline-none" 
                    placeholder="Paste Google Drive folder URL..." 
                    value={newClient.driveLink} 
                    onChange={(e) => setNewClient({...newClient, driveLink: e.target.value})} 
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-amber-800 font-bold uppercase tracking-wider mb-1">Photo Selection Deadline</label>
                  <input 
                    type="date" 
                    required 
                    className="w-full custom-admin-input rounded-xl px-4 py-2.5 text-stone-900 outline-none cursor-pointer font-medium" 
                    value={newClient.deadlineDate} 
                    onChange={(e) => setNewClient({...newClient, deadlineDate: e.target.value})} 
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-stone-600 font-bold uppercase tracking-wider mb-1">Security PIN (4 Digits)</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      readOnly 
                      required 
                      className="w-full bg-stone-100 border border-stone-300 rounded-xl px-4 py-2.5 text-amber-900 font-brand-mono text-xl font-bold text-center tracking-[0.4em] outline-none" 
                      placeholder="----" 
                      value={newClient.pin} 
                    />
                    <button 
                      type="button" 
                      onClick={() => setNewClient({ ...newClient, pin: Math.floor(1000 + Math.random() * 9000).toString() })} 
                      className="bg-stone-900 hover:bg-amber-800 text-white px-4 rounded-xl text-[10px] font-brand-sans font-semibold uppercase tracking-wider cursor-pointer"
                    >
                      Generate
                    </button>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <button 
                    type="submit" 
                    className={`flex-1 font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-sm text-xs text-white cursor-pointer ${
                      isEditing ? 'bg-blue-700 hover:bg-blue-800' : 'bg-stone-950 hover:bg-amber-800'
                    }`}
                  >
                    {isEditing ? 'Update Details' : 'Deploy Portal ✦'}
                  </button>
                  {isEditing && (
                    <button 
                      type="button" 
                      onClick={() => { setIsEditing(false); setNewClient({ name: '', eventType: 'Wedding', driveLink: '', pin: '', deadlineDate: '' }); setEditClientId(null); }} 
                      className="px-4 bg-stone-200 rounded-xl text-stone-700 text-xs uppercase font-bold hover:bg-stone-300 cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
            
            {/* Right: Active Portals Grid */}
            <div className="lg:col-span-8 glass-admin-card rounded-3xl p-6 md:p-8 flex flex-col text-left space-y-6">
              <div className="border-b border-stone-200 pb-3 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-brand-mono text-amber-800 uppercase tracking-widest font-bold block">Live Assets</span>
                  <h3 className="text-stone-950 text-xl font-brand-cinzel font-bold">Active Cloud Portals</h3>
                </div>
                <span className="text-xs font-brand-mono font-bold text-stone-500">{clients.filter(c => !c.isOffline).length} Portals Deployed</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 overflow-auto pr-1">
                {clients.filter(c => !c.isOffline).map(client => (
                  <div key={client._id} className="bg-stone-50/90 border border-stone-200 hover:border-amber-600/50 rounded-2xl p-5 transition-all group relative flex flex-col justify-between shadow-2xs">
                    
                    <div className="absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEditClick(client)} 
                        className="bg-white border border-stone-200 text-blue-700 hover:bg-blue-50 p-1.5 rounded-lg shadow-2xs cursor-pointer" 
                        title="Edit Vault Settings"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                      </button>
                      <button 
                        onClick={() => handleDeleteClient(client._id, client.name, false)} 
                        className="bg-white border border-stone-200 text-rose-700 hover:bg-rose-50 p-1.5 rounded-lg shadow-2xs cursor-pointer" 
                        title="Delete Vault"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>

                    <div className="mb-3">
                      <h4 className="text-stone-950 font-brand-cinzel text-lg font-bold pr-14 truncate">{client.name}</h4>
                      <div className="flex gap-2 items-center flex-wrap mt-1">
                        <span className="text-[9.5px] font-brand-mono text-stone-600 uppercase tracking-wider bg-white px-2 py-0.5 rounded-full border border-stone-200">{client.eventType}</span>
                        {crewStatuses[client._id] && <span className="text-[9.5px] font-brand-mono text-blue-800 border border-blue-200 bg-blue-50 px-2 py-0.5 rounded-full uppercase font-bold">{crewStatuses[client._id]}</span>}
                      </div>
                    </div>

                    <div className="bg-white border border-stone-200 rounded-xl p-3 mb-3 flex items-center justify-between shadow-2xs">
                      <div>
                        <span className="block text-[8.5px] text-amber-800 uppercase font-bold tracking-widest mb-0.5">Selection Target</span>
                        <span className="text-stone-900 font-brand-mono text-xs font-semibold">{client.deadlineDate ? new Date(client.deadlineDate).toLocaleDateString('en-GB') : 'Not Set'}</span>
                      </div>
                      <div className="text-base">⏳</div>
                    </div>

                    <div className="flex justify-between items-end border-t border-stone-200 pt-3 mt-auto">
                      <div>
                        <p className="text-[8.5px] text-stone-500 uppercase tracking-wider mb-0.5 font-bold">Access PIN</p>
                        <p className="text-amber-800 font-brand-mono font-bold tracking-[0.25em] text-lg leading-none">{client.pin}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[8.5px] text-stone-500 uppercase tracking-wider mb-0.5 font-bold">Photos Selected</p>
                        <p className="text-stone-900 font-brand-mono font-bold text-lg leading-none">{client.selectedPhotosCount || 0}</p>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}