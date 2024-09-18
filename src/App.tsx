import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Components
import { Sidebar } from "./components/Sidebar";
import { DescriptionCharacter } from "./screens/DescriptionCharacter";

function App() {
  return (
    <BrowserRouter>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/:id" element={<DescriptionCharacter />} />
            <Route path="/" element={<DescriptionCharacter />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
