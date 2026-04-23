import * as DREService from "./dreService";
import { mockDatabase } from "../mocks/database";

describe("DREService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should calculate successfully the metrics", () => {
    const month = "2024-01";
    const vertical = "E-commerce";

    const result = DREService.getData(month, vertical);

    expect(result).not.toBeNull();
    expect(result?.data.metricas.receita_liquida).toBe(321700);
    expect(result?.data.metricas.custos_totais).toBe(202950);
    expect(result?.data.metricas.lucro_bruto).toBe(118750);
    expect(result?.data.mes).toBe(month);
    expect(result?.data.vertical).toBe(vertical);
  });

  it("Should return null when there is no data for the month and vertical", () => {
    const result = DREService.getData("2099-12", "Inexistente");

    expect(result?.data.quantidade_registros).toBe(0);
    expect(result?.data.metricas.receita_liquida).toBe(0);
  });

  it("Should fetch the cache data on future calls", () => {
    const month = "2024-02";
    const vertical = "Varejo";

    const firstCall = DREService.getData(month, vertical);
    const secondCall = DREService.getData(month, vertical);

    expect(firstCall).toBe(secondCall);
  });

  it("Should set margin percent as 0 when there is no gross profit", () => {
    const mockZeroProfit = [
      {
        mes: "2099-01",
        vertical: "E-commerce" as any,
        valor_bruto: 100,
        devolucao: 0,
        impostos_totais: 0,
        cmv: 100,
        vpc: 0,
        frete: 0,
        comissao: 0,
      },
    ];

    (mockDatabase as any).splice(0, mockDatabase.length, ...mockZeroProfit);

    const result = DREService.getData("2099-01", "E-commerce");

    expect(result?.data.metricas.lucro_bruto).toBe(0);
    expect(result?.data.metricas.margem_percentual).toBe(0);
  });
});
