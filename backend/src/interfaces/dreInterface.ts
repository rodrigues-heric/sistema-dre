export interface DreData {
  success: boolean;
  data: {
    mes: string;
    vertical: string;
    metricas: {
      receita_liquida: number;
      custos_totais: number;
      lucro_bruto: number;
      margem_percentual: number;
    };
    quantidade_registros: number;
  };
  message: string;
}
