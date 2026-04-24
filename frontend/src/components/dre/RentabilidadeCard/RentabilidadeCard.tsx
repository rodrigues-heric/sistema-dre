import { useState } from "react";

import "./RentabilidadeCard.css";

import { useDreRentabilidade } from "../../../hooks/useDreCalculate";

import { Button } from "../../ui/button/Button";
import { VerticalSelector } from "../../ui/verticalSelector/VerticalSelector";
import { MonthPicker } from "../../ui/monthPicker/MonthPicker";
import { Header } from "../../ui/header/Header";
import { Footer } from "../../ui/footer/Footer";
import { Metric } from "../../ui/metric/Metric";
import { Skeleton } from "../../ui/skeleton/Skeleton";

export function RentabilidadeCard() {
  const [selectedVertical, setSelectedVertical] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const { metrics, loading, error, calculate } = useDreRentabilidade();

  const verticals = [
    { key: "E-commerce", value: "E-commerce" },
    { key: "Atacado", value: "Atacado" },
    { key: "Varejo", value: "Varejo" },
    { key: "Marketplace", value: "Marketplace" },
  ];

  const handleFetchData = () => {
    calculate(selectedDate, selectedVertical);
  };

  return (
    <div className="dre-container">
      <Header />

      <section className="dre-filters">
        <MonthPicker selectedDate={selectedDate} onChange={setSelectedDate} />
        <VerticalSelector
          options={verticals}
          value={selectedVertical}
          onChange={setSelectedVertical}
        />
        <Button
          text={loading ? "Calculando..." : "CALCULAR"}
          disabled={loading}
          onClick={handleFetchData}
        />
      </section>

      {error && <p className="error-message">{error}</p>}

      <section className="dre-metrics-grid">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} />)
          : metrics?.map((metric) => (
              <Metric
                key={metric.title}
                title={metric.title}
                value={metric.value}
                type={metric.type}
                color={metric.color}
              />
            ))}
      </section>

      <Footer />
    </div>
  );
}
