import { useState } from "react";

import "./RentabilidadeCard.css";

import { api } from "../../../services/api";

import { Button } from "../../ui/button/Button";
import { VerticalSelector } from "../../ui/verticalSelector/VerticalSelector";
import { MonthPicker } from "../../ui/monthPicker/MonthPicker";
import { Header } from "../../ui/header/Header";
import { Footer } from "../../ui/footer/Footer";
import { Metric } from "../../ui/metric/Metric";
import { Skeleton } from "../../ui/skeleton/Skeleton";

interface DreData {
  success: boolean;
  data: {
    mes: string;
    vertical: string;
    metricas: DreMetrics;
    quantidade_registros: number;
  };
  message: string;
}

interface DreMetrics {
  receita_liquida: number;
  custos_totais: number;
  lucro_bruto: number;
  margem_percentual: number;
}

interface DisplayMetric {
  receita_liquida: MetricData;
  custos_totais: MetricData;
  lucro_bruto: MetricData;
  margem_percentual: MetricData;
}

interface MetricData {
  title: string;
  value: number;
  type: "R$" | "%";
}

export function RentabilidadeCard() {
  const [loading, setLoading] = useState(false);
  const [selectedVertical, setSelectedVertical] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [metrics, setMetrics] = useState<DisplayMetric>({
    receita_liquida: {
      title: "Receita líquida",
      value: 0,
      type: "R$",
    },
    custos_totais: {
      title: "Custos totais",
      value: 0,
      type: "R$",
    },
    lucro_bruto: {
      title: "Lucro bruto",
      value: 0,
      type: "R$",
    },
    margem_percentual: {
      title: "Margem",
      value: 0,
      type: "%",
    },
  });

  const verticals = [
    { key: "E-commerce", value: "E-commerce" },
    { key: "Atacado", value: "Atacado" },
    { key: "Varejo", value: "Varejo" },
    { key: "Marketplace", value: "Marketplace" },
  ];

  const formatToBackend = (date: Date | null) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${year}-${month}`;
  };

  const handleCalculate = async () => {
    if (!selectedDate || !selectedVertical) {
      alert("Por favor, selecione o mês de referência e uma vertical");
      return;
    }

    setLoading(true);

    try {
      const month = formatToBackend(selectedDate);

      const response = await api.get("/dre/dre-rentabilidade", {
        params: {
          month: month,
          vertical: selectedVertical,
        },
      });

      const metricsData = response.data as DreData;
      const displayData: DisplayMetric = {
        receita_liquida: {
          title: "Receita líquida",
          value: metricsData.data.metricas.receita_liquida,
          type: "R$",
        },
        custos_totais: {
          title: "Custos totais",
          value: metricsData.data.metricas.custos_totais,
          type: "R$",
        },
        lucro_bruto: {
          title: "Lucro bruto",
          value: metricsData.data.metricas.lucro_bruto,
          type: "R$",
        },
        margem_percentual: {
          title: "Margem",
          value: metricsData.data.metricas.margem_percentual,
          type: "%",
        },
      };
      setMetrics(displayData);
    } catch (error: any) {
      console.error("Error while fetching data:", error);
      alert(error.response?.data?.message || "Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dre-container">
      <Header />

      <section className="dre-filters">
        <MonthPicker
          selectedDate={selectedDate}
          onChange={(date) => setSelectedDate(date)}
        />

        <VerticalSelector
          options={verticals}
          value={selectedVertical}
          onChange={(val: string) => setSelectedVertical(val)}
        />

        <Button
          text={loading ? "Calculando..." : "CALCULAR"}
          disabled={loading}
          onClick={handleCalculate}
        />
      </section>

      <section className="dre-metrics-grid">
        {Object.values(metrics).map((metric, index) =>
          loading ? (
            <Skeleton key={index} />
          ) : (
            <Metric
              key={index}
              title={metric.title}
              value={metric.value}
              type={metric.type}
            />
          ),
        )}
      </section>

      <Footer />
    </div>
  );
}
