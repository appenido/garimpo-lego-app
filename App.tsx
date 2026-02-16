import { useMemo, useState } from "react";

type Listing = {
  site: string;
  url: string;
  price_brl: number;
  msrp_brl?: number;
  discount_pct?: number;
  discount_brl?: number;
  condition: "new" | "used";
};

type Results = {
  top5_new: Listing[];
  top5_used: Listing[];
  msrp_brl?: number;
  coverage?: Record<string, unknown>;
};

const API_BASE = (import.meta.env.VITE_API_BASE as string) || "https://api.garimpolego.com.br";
const API_KEY = (import.meta.env.VITE_API_KEY as string | undefined) ?? "";

function money(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function App() {
  const [setNumber, setSetNumber] = useState("77250");
  const [cep, setCep] = useState("30360-530");
  const [loading, setLoading] = useState(false);
  const [scanId, setScanId] = useState<string | null>(null);
  const [results, setResults] = useState<Results | null>(null);
  const [error, setError] = useState<string | null>(null);

  const headers = useMemo(() => {
    const h: Record<string, string> = { "Content-Type": "application/json" };
    if (API_KEY) h["X-API-Key"] = API_KEY;
    return h;
  }, []);

  async function runScan() {
    setLoading(true);
    setError(null);
    setResults(null);
    setScanId(null);

    try {
      const r = await fetch(`${API_BASE}/scan`, {
        method: "POST",
        headers,
        body: JSON.stringify({ set_number: setNumber.trim(), cep_anchor: cep.trim() })
      });

      if (!r.ok) throw new Error(`scan falhou: ${r.status}`);
      const data = await r.json();
      const id = data.scan_id ?? data.id ?? data.scanId;
      if (!id) throw new Error("scan_id não retornou");
      setScanId(id);

      const r2 = await fetch(`${API_BASE}/results/${id}`, { headers });
      if (!r2.ok) throw new Error(`results falhou: ${r2.status}`);
      const data2 = await r2.json();
      setResults(data2);
    } catch (e: any) {
      setError(e?.message ?? "erro");
    } finally {
      setLoading(false);
    }
  }

  function renderRow(item: Listing) {
    const pct = item.discount_pct ?? 0;
    const brl = item.discount_brl ?? 0;
    const badge = pct >= 39 ? " ✅>=39%" : "";
    return (
      <li key={`${item.site}-${item.url}`} style={{ padding: 10, border: "1px solid #e5e7eb", borderRadius: 12, marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
          <a href={item.url} target="_blank" rel="noreferrer" style={{ fontWeight: 800, textDecoration: "none", color: "#111827" }}>
            {item.site}
          </a>
          <div style={{ fontWeight: 800 }}>{money(item.price_brl)}</div>
        </div>
        <div style={{ marginTop: 6, color: "#374151" }}>
          {pct.toFixed(2)}% OFF ({money(brl)}){badge}
        </div>
      </li>
    );
  }

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 16, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto" }}>
      <h1 style={{ margin: "8px 0 4px" }}>Garimpo LEGO Brasil</h1>
      <div style={{ color: "#6b7280", marginBottom: 12 }}>
        Top 5 novos + Top 5 usados • LEGO original • links diretos
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div>
          <label style={{ fontSize: 12, color: "#6b7280" }}>Set</label>
          <input value={setNumber} onChange={(e) => setSetNumber(e.target.value)} inputMode="numeric"
                 style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: "#6b7280" }}>CEP âncora</label>
          <input value={cep} onChange={(e) => setCep(e.target.value)} inputMode="numeric"
                 style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }} />
        </div>
      </div>

      <button
        onClick={runScan}
        disabled={loading}
        style={{
          width: "100%",
          marginTop: 10,
          padding: 12,
          borderRadius: 12,
          border: "none",
          background: "#111827",
          color: "white",
          fontWeight: 900
        }}
      >
        {loading ? "Buscando…" : "Buscar agora"}
      </button>

      {scanId && <div style={{ marginTop: 10, color: "#6b7280" }}>scan_id: {scanId}</div>}
      {error && <div style={{ marginTop: 10, color: "#b91c1c", fontWeight: 800 }}>{error}</div>}

      {results && (
        <div style={{ marginTop: 16 }}>
          <h2 style={{ margin: "12px 0 8px" }}>Top 5 Novos</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {(results.top5_new ?? []).map(renderRow)}
          </ul>

          <h2 style={{ margin: "16px 0 8px" }}>Top 5 Usados</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {(results.top5_used ?? []).map(renderRow)}
          </ul>
        </div>
      )}

      <div style={{ marginTop: 18, fontSize: 12, color: "#6b7280" }}>
        API: {API_BASE}
      </div>
    </div>
  );
}
