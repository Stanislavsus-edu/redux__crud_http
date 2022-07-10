import List from './Components/List';
import Form from './Components/Form';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<List />}/>
          <Route path="/services/:id" element={<Form />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
