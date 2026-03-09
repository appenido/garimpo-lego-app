import { useState } from "react";

export default function App() {

  const [results, setResults] = useState<any[]>([]);

  function buscar() {

    const data = [
      { loja: "Mercado Livre", preco: 420, desconto: "46%", link: "https://mercadolivre.com.br" },
      { loja: "Shopee", preco: 399, desconto: "49%", link: "https://shopee.com.br" },
      { loja: "Amazon", preco: 510, desconto: "34%", link: "https://amazon.com.br" }
    ];

    setResults(data);
  }

  return (
    <div style={{padding:30,fontFamily:"Arial"}}>

      <h1>Garimpo LEGO Brasil</h1>

      <input placeholder="Set LEGO" style={{padding:10,marginRight:10}} />

      <input placeholder="CEP âncora" style={{padding:10,marginRight:10}} />

      <button onClick={buscar} style={{padding:10}}>
        Buscar agora
      </button>

      <div style={{marginTop:30}}>

        {results.map((r,i)=>(
          <div key={i} style={{marginBottom:10}}>
            {r.loja} — R${r.preco} ({r.desconto})  
            <a href={r.link} target="_blank"> Abrir</a>
          </div>
        ))}

      </div>

    </div>
  );
}
