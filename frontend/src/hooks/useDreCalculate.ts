import { useState, useCallback } from "react";
import { dreService } from "../services/dreService";
import { dreMapper } from "../mappers/dreMapper";

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

  const calculate = useCallback(async (date: Date | null, vertical: string) => {
    if (!date || !vertical) {
      setError("Selecione os filtros corretamente.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const monthStr = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
      const response = await dreService.getRentabilidade(monthStr, vertical);
      const formatted = dreMapper.toDisplay(response.data.metricas);
      setMetrics(formatted);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro de conexão");
    } finally {
      setLoading(false);
    }
  }, []);

  return { metrics, loading, error, calculate };
}
