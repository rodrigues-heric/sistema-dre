import { useState, useCallback } from "react";
import { dreService } from "../services/dreService";

export type ColorScale = "RED" | "YELLOW" | "GREEN";

export interface MetricData {
  title: string;
  value: number;
  type: "R$" | "%";
  color: ColorScale;
}

export function useDreRentabilidade() {
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState<MetricData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getColor = (value: number): ColorScale => {
    if (value >= 20) return "GREEN";
    if (value >= 10) return "YELLOW";
    return "RED";
  };

  const calculate = useCallback(async (date: Date | null, vertical: string) => {
    if (!date || !vertical) {
      setError("Selecione a data e a vertical antes de calcular.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const monthStr = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
      const response = await dreService.getRentabilidade(monthStr, vertical);

      const { metricas } = response.data;
      const statusColor = getColor(metricas.margem_percentual);

      const formattedMetrics: MetricData[] = [
        {
          title: "Receita líquida",
          value: metricas.receita_liquida,
          type: "R$",
          color: statusColor,
        },
        {
          title: "Custos totais",
          value: metricas.custos_totais,
          type: "R$",
          color: statusColor,
        },
        {
          title: "Lucro bruto",
          value: metricas.lucro_bruto,
          type: "R$",
          color: statusColor,
        },
        {
          title: "Margem",
          value: metricas.margem_percentual,
          type: "%",
          color: statusColor,
        },
      ];

      setMetrics(formattedMetrics);
    } catch (err: any) {
      const msg = err.response?.data?.message || "Erro ao buscar dados do DRE";
      setError(msg);
      setMetrics(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { metrics, loading, error, calculate };
}
