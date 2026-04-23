import type { DreData } from "../interfaces/dreInterface";

export const getData = (month: string, vertical: string): DreData => {
  return {
    success: true,
    data: {
      mes: month,
      vertical: vertical,
      metricas: {
        receita_liquida: 1,
        custos_totais: 2,
        lucro_bruto: 3,
        margem_percentual: 4,
      },
      quantidade_registros: 5,
    },
    message: "Foi",
  };
};
