import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Contact from "./views/Contact";
import AddContact from "./views/AddContact";
import injectContext from './store/context';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex justify-content-center align-items-start" style={{ minHeight: "100vh", paddingTop: "40px" }}>
        <div style={{ width: "100%", maxWidth: "900px", padding: "0 15px" }}>
          <Routes>
            <Route path="/" element={<Contact />} />
            <Route path="/add-contact" element={<AddContact />} />
            <Route path="/add-contact/:id" element={<AddContact />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default injectContext(App);