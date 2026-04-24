import "./EmptyState.css";

export function EmptyState() {
  return (
    <div className="dre-empty-state">
      <h3>Nenhum dado consultado</h3>
      <p>
        Selecione o <strong>mês de referência</strong> e a{" "}
        <strong>vertical</strong> acima para visualizar os indicadores de
        rentabilidade.
      </p>
    </div>
  );
}
