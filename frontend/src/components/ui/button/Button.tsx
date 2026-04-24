import "./Button.css";

interface ButtonProps {
  text: string;
  disabled: boolean;
  onClick: () => void;
}

export function Button({ text, disabled, onClick }: ButtonProps) {
  return (
    <button
      className={`dre-button ${disabled ? "is-loading" : ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
