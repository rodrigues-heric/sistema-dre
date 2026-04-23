import { useState } from "react";

import "./RentabilidadeCard.css";

import { Button } from "../../ui/button/Button";
import { VerticalSelector } from "../../ui/verticalSelector/VerticalSelector";
import { MonthPicker } from "../../ui/monthPicker/MonthPicker";
import { Header } from "../../ui/header/Header";
import { Footer } from "../../ui/footer/Footer";
import { Metric } from "../../ui/metric/Metric";
import { Skeleton } from "../../ui/skeleton/Skeleton";

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
    { label: "Receita Líquida", value: 0, type: "currency" },
    { label: "Custos Totais", value: 0, type: "currency" },
    { label: "Lucro Bruto", value: 0, type: "currency" },
    { label: "Margem", value: 0, type: "percent" },
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
      <Header />

      <section className="dre-filters">
        <MonthPicker
          selectedDate={selectedDate}
          onChange={(date) => setSelectedDate(date)}
        />

        <VerticalSelector options={verticals} />

        <Button
          text={loading ? "Calculando..." : "CALCULAR"}
          disabled={loading}
          onClick={handleCalculate}
        />
      </section>

      <section className="dre-metrics-grid">
        {metrics.map((metric, index) =>
          loading ? (
            <Skeleton key={index} />
          ) : (
            <Metric
              key={index}
              title={metric.label}
              value={metric.value}
              type="%"
            />
          ),
        )}
      </section>

      <Footer />
    </div>
  );
}
