import type { DreData, DreMetrics } from "../interfaces/dreInterface";
import { mockDatabase, DRERecord } from "../mocks/database";

const dreCache: Record<string, DreData> = {};

export const getData = (month: string, vertical: string): DreData => {
  const cacheKey: string = `${month}:${vertical}`;

  if (dreCache[cacheKey]) {
    return dreCache[cacheKey];
  }

  const records: DRERecord[] = _filterRecords(month, vertical);

  if (records.length > 0) {
    const updatedEntry = _updateCache(records, month, vertical, cacheKey);
    return updatedEntry;
  }

  return {
    success: true,
    data: {
      mes: month,
      vertical: vertical,
      metricas: {
        receita_liquida: 0,
        custos_totais: 0,
        lucro_bruto: 0,
        margem_percentual: 0,
      },
      quantidade_registros: 0,
    },
    message: "Sem dados para a combinação mês e vertical",
  };
};

const _filterRecords = (month: string, vertical: string): DRERecord[] => {
  return mockDatabase.filter(
    (item) => item.mes === month && item.vertical === vertical,
  );
};

const _updateCache = (
  records: DRERecord[],
  month: string,
  vertical: string,
  cacheKey: string,
): DreData => {
  const metrics: DreMetrics = _calculateMetrics(records);
  const numberOfRecords: number = records.length;

  const dreData: DreData = {
    success: true,
    data: {
      mes: month,
      vertical: vertical,
      metricas: metrics,
      quantidade_registros: numberOfRecords,
    },
    message: "Rentabilidade calculada com sucesso",
  };

  dreCache[cacheKey] = dreData;
  return dreData;
};

const _calculateMetrics = (records: DRERecord[]): DreMetrics => {
  let netIncome: number = 0;
  let totalCosts: number = 0;

  records.forEach((record) => {
    netIncome += _calculateNetIncome(record);
    totalCosts += _calculateTotalCosts(record);
  });

  const grossProfit: number = _calculateGrossProfit(netIncome, totalCosts);
  const marginPercent: number =
    netIncome != 0 ? _calculateMarginPercent(netIncome, grossProfit) : 0;

  return {
    receita_liquida: netIncome,
    custos_totais: totalCosts,
    lucro_bruto: grossProfit,
    margem_percentual: marginPercent,
  };
};

const _calculateNetIncome = (record: DRERecord): number => {
  return record.valor_bruto - record.devolucao - record.impostos_totais;
};

const _calculateTotalCosts = (record: DRERecord): number => {
  return record.cmv + record.vpc + record.comissao;
};

const _calculateGrossProfit = (netIncome: number, costs: number): number => {
  return netIncome - costs;
};

const _calculateMarginPercent = (
  netIncome: number,
  grossProfit: number,
): number => {
  return (grossProfit / netIncome) * 100;
};
