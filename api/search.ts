export default async function handler(req, res) {
  const { set } = req.query;

  const results = [
    {
      loja: "Mercado Livre",
      preco: 420,
      preco_medio: 780,
      desconto: "46%",
      link: "https://mercadolivre.com"
    },
    {
      loja: "Shopee",
      preco: 399,
      preco_medio: 780,
      desconto: "49%",
      link: "https://shopee.com.br"
    },
    {
      loja: "Amazon",
      preco: 510,
      preco_medio: 780,
      desconto: "34%",
      link: "https://amazon.com.br"
    }
  ];

  res.status(200).json({
    set,
    resultados: results
  });
}
