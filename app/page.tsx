// @ts-nocheck
"use client";
import { useState } from "react";

export default function Home() {
 const [vaults, setVaults] = useState([
  {
    id: 1,
    name: "Orbital-X",
    total: 1000,
    released: 0,
    stage: 0
  },
  {
    id: 2,
    name: "Lunar-01",
    total: 500,
    released: 0,
    stage: 0
  }
]);

function updateVault(id: number, action: string) {
  setVaults(prev =>
    prev.map(v => {
      if (v.id !== id) return v;

      if (action === "launch" && v.stage === 0) {
        return { ...v, stage: 1, released: v.total * 0.3 };
      }

      if (action === "signal" && v.stage === 1) {
        return { ...v, stage: 2, released: v.total * 0.7 };
      }

      if (action === "stable" && v.stage === 2) {
        return { ...v, stage: 3, released: v.total };
      }

      return v;
    })
  );
}

function getColor(stage: number, step: number) {
  if (stage > step) return "#00C853";
  if (stage === step) return "#FF6A00";
  return "#2A2A2A";
}

return (
  <div style={{
    background: "#0B0B0B",
    color: "white",
    minHeight: "100vh",
    padding: 40,
    fontFamily: "sans-serif"
  }}>

    <h1 style={{ color: "#FF6A00" }}>Helios Vault</h1>

    <div style={{ marginTop: 40 }}>
      {vaults.map(v => (
        <div key={v.id} style={{
          background: "#1A1A1A",
          padding: 20,
          borderRadius: 10,
          marginBottom: 20
        }}>

          <h3>{v.name}</h3>

          <p>Released: {v.released}€</p>
          <p>Remaining: {v.total - v.released}€</p>

          <p style={{ color: getColor(v.stage, 0) }}>● Launch</p>
          <p style={{ color: getColor(v.stage, 1) }}>● Signal</p>
          <p style={{ color: getColor(v.stage, 2) }}>● Stable</p>

          <div style={{ marginTop: 10 }}>
            <button onClick={() => updateVault(v.id, "launch")}>Launch</button>
            <button onClick={() => updateVault(v.id, "signal")} style={{ marginLeft: 10 }}>Signal</button>
            <button onClick={() => updateVault(v.id, "stable")} style={{ marginLeft: 10 }}>Stable</button>
          </div>

        </div>
      ))}
    </div>

  </div>
) };