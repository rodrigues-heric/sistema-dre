import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./MonthPicker.css";

import { ptBR } from "date-fns/locale/pt-BR";

interface MonthPickerProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
}

export function MonthPicker({ selectedDate, onChange }: MonthPickerProps) {
  return (
    <div className="filter-group">
      <label>Mês de Referência</label>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        locale={ptBR}
        className="dre-input"
        wrapperClassName="datepicker-full-width"
        placeholderText="Selecione o mês"
      />
    </div>
  );
}
