import { useState } from "react";

type Resultado = {
  loja: string;
  preco: number;
  preco_medio: number;
  desconto: string;
  link: string;
};

export default function App() {
  const [set, setSet] = useState("");
  const [cep, setCep] = useState("");
  const [results, setResults] = useState<Resultado[] | null>(null);

  function buscar() {
    const mockResults: Resultado[] = [
      {
        loja: "Mercado Livre",
        preco: 420,
        preco_medio: 780,
        desconto: "46%",
        link: "https://mercadolivre.com.br",
      },
      {
        loja: "Shopee",
        preco: 399,
        preco_medio: 780,
        desconto: "49%",
        link: "https://shopee.com.br",
      },
      {
        loja: "Amazon",
        preco: 510,
        preco_medio: 780,
        desconto: "34%",
        link: "https://amazon.com.br",
      },
    ];

    setResults(mockResults);
  }

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>Garimpo LEGO Brasil</h1>
      <p>Top 5 novos + Top 5 usados • LEGO original • links diretos</p>

      <div style={{ marginTop: 20, display: "grid", gap: 12 }}>
        <input
          placeholder="Set LEGO"
          value={set}
          onChange={(e) => setSet(e.target.value)}
          style={{ padding: 12, fontSize: 16 }}
        />

        <input
          placeholder="CEP âncora"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          style={{ padding: 12, fontSize: 16 }}
        />

        <button
          onClick={buscar}
          style={{
            padding: 14,
            fontSize: 18,
            fontWeight: 700,
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
          }}
        >
          Buscar agora
        </button>
      </div>

      {results && (
        <div style={{ marginTop: 24 }}>
          <h3>Resultados</h3>
          {results.map((r, i) => (
            <div
              key={i}
              style={{
                padding: 12,
                marginBottom: 10,
                border: "1px solid #ddd",
                borderRadius: 10,
              }}
            >
              <strong>{r.loja}</strong>
              <div>Preço: R$ {r.preco}</div>
              <div>Preço médio: R$ {r.preco_medio}</div>
              <div>Desconto: {r.desconto}</div>
              <a href={r.link} target="_blank" rel="noreferrer">
                Abrir anúncio
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}        />

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
