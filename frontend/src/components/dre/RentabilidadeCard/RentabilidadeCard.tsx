import { useState, type SetStateAction } from "react";
import DatePicker from "react-datepicker";
import { ptBR } from "date-fns/locale/pt-BR";

import "./RentabilidadeCard.css";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../../ui/button/Button";
import { VerticalSelector } from "../../ui/verticalSelector/VerticalSelector";

export function RentabilidadeCard() {
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const verticals = [
    { key: "E-commerce", value: "E-commerce" },
    { key: "Atacado", value: "Atacado" },
    { key: "Varejo", value: "Varejo" },
    { key: "Marketplace", value: "Marketplace" },
  ];

  const metrics: any[] = [
    { label: "Receita Líquida", value: "R$ 0,00", type: "currency" },
    { label: "Custos Totais", value: "R$ 0,00", type: "currency" },
    { label: "Lucro Bruto", value: "R$ 0,00", type: "currency" },
    { label: "Margem", value: "0.00%", type: "percent" },
  ];

  const formatToBackend = (date: Date | null) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${year}-${month}`;
  };

  const handleCalculate = () => {
    setLoading(true);
    const monthForApi = formatToBackend(selectedDate);
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
          <label>Mês de Referência</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            locale={ptBR}
            className="dre-input"
            wrapperClassName="datepicker-full-width"
            placeholderText="Selecione o mês"
          />
        </div>

        <VerticalSelector options={verticals} />

        <Button
          text={loading ? "Calculando..." : "CALCULAR"}
          disabled={loading}
          onClick={handleCalculate}
        />
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
