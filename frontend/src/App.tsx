import { Toaster } from "sonner";
import "./App.css";
import { RentabilidadeCard } from "./components/dre/RentabilidadeCard/RentabilidadeCard";

function App() {
  return (
    <div className="main-wrapper">
      <Toaster position="bottom-center" richColors />
      <RentabilidadeCard />
    </div>
  );
}

export default App;
