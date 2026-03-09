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
      const res = await fetch("/api/search?set=" + set + "&cep=" + cep);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError("Erro ao buscar dados.");
    }
  }

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>Garimpo LEGO Brasil</h1>

      <div style={{ marginTop: 20 }}>
        <input
          placeholder="Set LEGO"
          value={set}
          onChange={(e) => setSet(e.target.value)}
        />

        <input
          placeholder="CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />

        <button onClick={buscar}>Buscar agora</button>
      </div>

      {error && <p>{error}</p>}

      {results && results.resultados && (
        <div style={{ marginTop: 20 }}>
          <h3>Resultados</h3>

          {results.resultados.map((r: any, i: number) => (
            <div key={i}>
              {r.loja} — R${r.preco} ({r.desconto}){" "}
              <a href={r.link} target="_blank">Abrir</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
