import "./Metric.css";

interface MetricProps {
  title: string;
  value: number;
  type: "R$" | "%";
  color: "GREEN" | "YELLOW" | "RED";
}

export function Metric({ title, value, type, color }: MetricProps) {
  const displayValue =
    type === "R$" ? CurrencyLabel({ value }) : PercentageLabel({ value });

  return (
    <div key={title} className={`metric-card ${getCardColor(color)}`}>
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

function getCardColor(color: "GREEN" | "YELLOW" | "RED"): string {
  const classes = {
    GREEN: "success",
    YELLOW: "warning",
    RED: "danger",
  };
  return classes[color] ?? "success";
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
