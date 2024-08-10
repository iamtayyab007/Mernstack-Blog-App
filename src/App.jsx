import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./app.css";
import Header from "./components/Header";
import Home from "./pages/home";
import AddNewBlog from "./pages/add-blog";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/add-blog" element={<AddNewBlog />} />
      </Routes>
    </>
  );
}

export default App;
