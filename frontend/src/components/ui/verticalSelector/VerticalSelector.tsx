import "./VerticalSelector.css";

interface VerticalOption {
  key: string;
  value: string;
}

interface VerticalSelectorProps {
  options: VerticalOption[];
  value: string;
  onChange: (value: string) => void;
}

export function VerticalSelector({
  options,
  value,
  onChange,
}: VerticalSelectorProps) {
  const optionsSorted: VerticalOption[] = [...options].sort((a, b) => {
    return a.value.localeCompare(b.value);
  });

  return (
    <div className="filter-group">
      <label>Vertical</label>
      <select
        className="dre-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">- Selecione -</option>

        {optionsSorted.map((opt: VerticalOption) => (
          <option key={opt.key} value={opt.key}>
            {opt.value}
          </option>
        ))}
      </select>
    </div>
  );
}
