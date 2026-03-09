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
    } catch (e) {
      setError("Erro ao buscar");
    }
  }

  return (
