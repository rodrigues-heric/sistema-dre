import { useState } from "react";
import "./RentabilidadeCard.css";

export function RentabilidadeCard() {
  const [loading, setLoading] = useState(false);

  const metrics: any[] = [
    { label: "Receita Líquida", value: "R$ 0,00", type: "currency" },
    { label: "Custos Totais", value: "R$ 0,00", type: "currency" },
    { label: "Lucro Bruto", value: "R$ 0,00", type: "currency" },
    { label: "Margem", value: "0.00%", type: "percent" },
  ];

  const handleCalculate = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <div className="dre-container">
      <header className="dre-header">
        <h2>Demonstrativo de Resultados</h2>
        <p>Analise a rentabilidade por período e vertical</p>
      </header>

      <section className="dre-filters">
        <div className="filter-group">
          <label>Mês de referência</label>
          <input type="month" className="dre-input" />
        </div>

        <div className="filter-group">
          <label>Vertical</label>
          <select className="dre-input">
            <option value="">- Selecione -</option>
          </select>
        </div>

        <button
          className={`dre-button ${loading ? "is-loading" : ""}`}
          onClick={handleCalculate}
        >
          {loading ? "Calculando..." : "CALCULAR"}
        </button>
      </section>

      <section className="dre-metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <span className="metric-label">{metric.label}</span>
            <span className="metric-value">{metric.value}</span>
          </div>
        ))}
      </section>

      <footer className="dre-footer">
        <span className="status-badge">Aguardando consulta</span>
      </footer>
    </div>
  );
}
