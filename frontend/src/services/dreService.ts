import { api } from "./api";

export interface DreDataResponse {
  success: boolean;
  data: {
    mes: string;
    vertical: string;
    metricas: DreMetrics;
    quantidade_registros: number;
  };
  message: string;
}

export interface DreMetrics {
  receita_liquida: number;
  custos_totais: number;
  lucro_bruto: number;
  margem_percentual: number;
}

export const dreService = {
  getRentabilidade: async (
    month: string,
    vertical: string,
  ): Promise<DreDataResponse> => {
    const response = await api.get<DreDataResponse>("/dre/dre-rentabilidade", {
      params: { month, vertical },
    });
    return response.data;
  },
};
