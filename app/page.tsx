"use client";
import { useEffect, useState } from "react";

// SUBSTITUI PELO TEU LINK DO RENDER:
const API_URL = "https://onrender.com"; 

export default function Home() {
  const [vaults, setVaults] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/vaults`)
      .then(res => res.json())
      .then(data => setVaults(data));
  }, []);

  function updateVault(id: number, action: string) {
    fetch(`${API_URL}/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action })
    })
      .then(res => res.json())
      .then(data => setVaults(data));
  }

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#0070f3' }}>Helios Vault</h1>
      <p>Monitorização de Capital - Economia Lunar</p>

      {vaults.map((v: any) => (
        <div key={v.id} style={{ 
          marginBottom: 20, 
          padding: 20, 
          border: '1px solid #ddd', 
          borderRadius: 10,
          background: '#f9f9f9' 
        }}>
          <h3>{v.name}</h3>
          <p><strong>Released:</strong> {v.released}€</p>
          <p><strong>Remaining:</strong> {v.total - v.released}€</p>

          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => updateVault(v.id, "launch")} style={{ background: '#22c55e', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 5, cursor: 'pointer' }}>Launch</button>
            <button onClick={() => updateVault(v.id, "signal")} style={{ background: '#eab308', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 5, cursor: 'pointer' }}>Signal</button>
            <button onClick={() => updateVault(v.id, "stable")} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 5, cursor: 'pointer' }}>Stable</button>
          </div>
        </div>
      ))}
    </div>
  );
}
