import { useState } from "react";

export default function App() {
  const [set, setSet] = useState("");
  const [cep, setCep] = useState("");
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState("");

  async function buscar() {
    setError("");
    setResults(null);

    try {
      const res = await fetch(`/api/search?set=${set}&cep=${cep}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError("Erro ao buscar dados.");
    }
  }

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>Garimpo LEGO Brasil</h1>

      <p>Top 5 novos + Top 5 usados • LEGO original • links diretos</p>

      <div style={{ marginTop: 20 }}>
        <input
          placeholder="Set LEGO"
          value={set}
          onChange={(e) => setSet(e.target.value)}
          style={{ marginRight: 10 }}
        />

        <input
          placeholder="CEP âncora"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          style={{ marginRight: 10 }}
        />

        <button onClick={buscar}>
          Buscar agora
        </button>
      </div>

      {error && (
        <p style={{ color: "red", marginTop: 20 }}>
          {error}
        </p>
      )}

      {results && results.resultados && (
        <div style={{ marginTop: 30 }}>
          <h3>Resultados</h3>

          {results.resultados.map((r: any, i: number) => (
            <div key={i} style={{ marginBottom: 10 }}>
              {r.loja} — R${r.preco} ({r.desconto}){" "}
              <a href={r.link} target="_blank">
                Abrir
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
