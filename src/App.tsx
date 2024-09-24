import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Views
import { CharacterList } from "./screens/CharacterList";
import { DescriptionCharacter } from "./screens/DescriptionCharacter";

function App() {
  return (
    <BrowserRouter>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 relative h-screen">
        <CharacterList />
        <div className="col-span-2 lg:col-span-3">
          <Routes>
            <Route path="/" element={<div>Selecciona un personaje</div>} />
            <Route path="/:id" element={<DescriptionCharacter />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
