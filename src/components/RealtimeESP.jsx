import React, { useEffect, useState } from "react";

// ===============================
// 🔍 Auto-détection d'IP locale
// ===============================

async function testIP(ip) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 800);

    const res = await fetch(`http://${ip}/status`, { signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) return null;

    const json = await res.json();
    return { ip, json };
  } catch (e) {
    return null;
  }
}

async function autoDetectIP() {
  // 1) Vérifier si on connaît déjà l'IP
  const saved = window.espIP || null;
  if (saved) {
    const ok = await testIP(saved);
    if (ok) return ok.ip;
  }

  // 2) Test parallèle des adresses probables
  const guess = [
    "192.168.1.34",
    "192.168.1.10",
    "192.168.1.20",
    "192.168.1.30",
    "192.168.1.40",
    "192.168.1.50",
    "192.168.1.100",
    "192.168.1.200",
  ];

  const results = await Promise.all(guess.map(ip => testIP(ip)));
  const found = results.find(r => r !== null);
  
  if (found) {
    window.espIP = found.ip;
    return found.ip;
  }

  // 3) Scan élargi par lots de 10
  for (let start = 2; start < 255; start += 10) {
    const batch = [];
    for (let i = start; i < Math.min(start + 10, 255); i++) {
      batch.push(testIP(`192.168.1.${i}`));
    }
    
    const batchResults = await Promise.all(batch);
    const batchFound = batchResults.find(r => r !== null);
    
    if (batchFound) {
      window.espIP = batchFound.ip;
      return batchFound.ip;
    }
  }

  return null;
}

// ===============================
// 📡 Composant Principal
// ===============================

export default function RealtimeESP() {
  const [ip, setIP] = useState(null);
  const [data, setData] = useState(null);
  const [loadingIP, setLoadingIP] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const detect = async () => {
      const found = await autoDetectIP();
      setIP(found);
      setLoadingIP(false);
    };
    detect();
  }, []);

  useEffect(() => {
    if (!ip) return;
    
    const load = async () => {
      try {
        const res = await fetch(`http://${ip}/status`);
        if (!res.ok) throw new Error();
        const json = await res.json();
        setData(json);
        setError(false);
      } catch (e) {
        setError(true);
      }
    };

    load();
    const interval = setInterval(load, 3000);
    return () => clearInterval(interval);
  }, [ip]);

  if (loadingIP) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            display: 'inline-block', 
            width: '48px', 
            height: '48px', 
            border: '2px solid #22d3ee',
            borderTop: '2px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '16px'
          }}></div>
          <p style={{ color: '#9ca3af', fontSize: '18px' }}>Recherche du module ESP32...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  if (!ip) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
        <div style={{ textAlign: 'center', padding: '32px', background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
          <div style={{ color: '#f87171', fontSize: '60px', marginBottom: '16px' }}>⚠️</div>
          <p style={{ color: '#f87171', fontSize: '20px', fontWeight: '600' }}>ESP32 introuvable sur le réseau</p>
          <p style={{ color: '#6b7280', marginTop: '8px' }}>Vérifiez que votre module est connecté</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
        <div style={{ textAlign: 'center', padding: '32px', background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
          <div style={{ color: '#f87171', fontSize: '60px', marginBottom: '16px' }}>❌</div>
          <p style={{ color: '#f87171', fontSize: '20px', fontWeight: '600' }}>Erreur de connexion</p>
          <p style={{ color: '#6b7280', marginTop: '8px' }}>Impossible de récupérer les données</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '60px', marginBottom: '16px', opacity: 0.8 }}>⏳</div>
          <p style={{ color: '#9ca3af', fontSize: '18px' }}>Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
          Données du module ESP32
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9ca3af' }}>
          <div style={{ 
            width: '8px', 
            height: '8px', 
            background: '#4ade80', 
            borderRadius: '50%',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}></div>
          <span style={{ fontSize: '14px' }}>IP détectée automatiquement : {ip}</span>
        </div>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>

      {/* Stats Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '24px',
        marginBottom: '24px'
      }}>
        <StatCard
          icon="🎯"
          title="Dernier bloc"
          value={data.lastBlock?.toLocaleString() || "0"}
          bgGradient="linear-gradient(135deg, rgba(34, 211, 238, 0.2) 0%, rgba(34, 211, 238, 0.05) 100%)"
          borderColor="rgba(34, 211, 238, 0.3)"
        />
        
        <StatCard
          icon="🎫"
          title="Tickets actifs"
          value={data.ticketsActive || "0"}
          bgGradient="linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.05) 100%)"
          borderColor="rgba(59, 130, 246, 0.3)"
        />
        
        <StatCard
          icon="⚡"
          title="Mining"
          value={data.isMining ? "Actif" : "Inactif"}
          bgGradient={data.isMining 
            ? "linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.05) 100%)"
            : "linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.05) 100%)"
          }
          borderColor={data.isMining ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)"}
          status={data.isMining}
        />
        
        <StatCard
          icon="⏰"
          title="Prochain tirage"
          value={data.nextDrawIn || "N/A"}
          bgGradient="linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(168, 85, 247, 0.05) 100%)"
          borderColor="rgba(168, 85, 247, 0.3)"
        />
        
        <StatCard
          icon="🌐"
          title="Pool"
          value={data.pool || "N/A"}
          bgGradient="linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0.05) 100%)"
          borderColor="rgba(99, 102, 241, 0.3)"
        />
        
        <StatCard
          icon="📈"
          title="Hashrate"
          value={`${(data.hashrate / 1000).toFixed(1)} KH/s`}
          bgGradient="linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(249, 115, 22, 0.05) 100%)"
          borderColor="rgba(249, 115, 22, 0.3)"
        />
      </div>

      {/* Secondary Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '24px'
      }}>
        <SecondaryCard
          title="Difficulté"
          value={data.difficulty?.toLocaleString() || "0"}
        />
        
        <SecondaryCard
          title="Uptime"
          value={`${Math.floor((data.lastJobAgeSec || 0) / 60)} min`}
        />
        
        <SecondaryCard
          title="Connexion Stratum"
          value={data.stratumConnected ? "OK" : "OFF"}
          status={data.stratumConnected}
        />
      </div>
    </div>
  );
}

// ===============================
// 🎨 Composants de carte
// ===============================

function StatCard({ icon, title, value, bgGradient, borderColor, status }) {
  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '16px',
      background: bgGradient,
      border: `1px solid ${borderColor}`,
      backdropFilter: 'blur(8px)',
      padding: '24px',
      transition: 'all 0.3s ease',
      cursor: 'default'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ fontSize: '32px' }}>
          {icon}
        </div>
        {typeof status === 'boolean' && (
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: status ? '#4ade80' : '#f87171',
            animation: status ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none'
          }}></div>
        )}
      </div>
      <h3 style={{ 
        color: '#9ca3af', 
        fontSize: '12px', 
        fontWeight: '500', 
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        {title}
      </h3>
      <p style={{ color: 'white', fontSize: '28px', fontWeight: 'bold' }}>
        {value}
      </p>
    </div>
  );
}

function SecondaryCard({ title, value, status }) {
  return (
    <div style={{
      borderRadius: '12px',
      background: 'rgba(30, 41, 59, 0.3)',
      border: '1px solid rgba(51, 65, 85, 0.5)',
      backdropFilter: 'blur(8px)',
      padding: '24px',
      transition: 'all 0.3s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = 'rgba(71, 85, 105, 0.5)';
      e.currentTarget.style.background = 'rgba(30, 41, 59, 0.4)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = 'rgba(51, 65, 85, 0.5)';
      e.currentTarget.style.background = 'rgba(30, 41, 59, 0.3)';
    }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            color: '#9ca3af', 
            fontSize: '12px', 
            fontWeight: '500', 
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {title}
          </h3>
          <p style={{ color: 'white', fontSize: '24px', fontWeight: '600' }}>
            {value}
          </p>
        </div>
        {typeof status === 'boolean' && (
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            marginLeft: '16px',
            background: status ? '#4ade80' : '#f87171',
            animation: status ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none'
          }}></div>
        )}
      </div>
    </div>
  );
}