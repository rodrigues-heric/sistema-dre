import "./VerticalSelector.css";

interface VerticalOption {
  key: string;
  value: string;
}

interface VerticalOptionsArray {
  options: VerticalOption[];
}

export function VerticalSelector({ options }: VerticalOptionsArray) {
  const optionsSorted: VerticalOption[] = [...options].sort((a, b) => {
    return a.value.localeCompare(b.value);
  });

  return (
    <div className="filter-group">
      <label>Vertical</label>
      <select className="dre-input">
        <option value="">- Selecione -</option>

        {optionsSorted.map((opt: VerticalOption) => (
          <option value={opt.key}>{opt.value}</option>
        ))}
      </select>
    </div>
  );
}
