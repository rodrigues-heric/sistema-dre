import { type DreMetrics } from "../services/dreService";
import { type MetricData, type ColorScale } from "../hooks/useDreCalculate";

export const dreMapper = {
  toDisplay(metrics: DreMetrics): MetricData[] {
    const color = this.calculateColor(metrics.margem_percentual);

    return [
      {
        title: "Receita líquida",
        value: metrics.receita_liquida,
        type: "R$",
        color,
      },
      {
        title: "Custos totais",
        value: metrics.custos_totais,
        type: "R$",
        color,
      },
      {
        title: "Lucro bruto",
        value: metrics.lucro_bruto,
        type: "R$",
        color,
      },
      {
        title: "Margem",
        value: metrics.margem_percentual,
        type: "%",
        color,
      },
    ];
  },

  calculateColor(value: number): ColorScale {
    if (value >= 20) return "GREEN";
    if (value >= 10) return "YELLOW";
    return "RED";
  },
};
