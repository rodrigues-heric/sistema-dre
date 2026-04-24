import "./Metric.css";

interface MetricProps {
  title: string;
  value: number;
  type: "R$" | "%";
}

export function Metric({ title, value, type }: MetricProps) {
  const displayValue =
    type === "R$" ? CurrencyLabel({ value }) : PercentageLabel({ value });

  return (
    <div key={title} className="metric-card">
      <span className="metric-label">{title}</span>
      <span className="metric-value">{displayValue}</span>
    </div>
  );
}

function CurrencyLabel({ value }: { value: number }) {
  return <span className="metric-value">{formatCurrency(value)}</span>;
}

function PercentageLabel({ value }: { value: number }) {
  return <span className="metric-value">{formatPercent(value)}</span>;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
}

function formatPercent(value: number): string {
  return `${Number(value.toFixed(2))}%`;
}
