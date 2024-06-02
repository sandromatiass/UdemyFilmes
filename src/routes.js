import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./shared/pages/Home";
import Filmes from "./shared/pages/Filmes";
import Header from "./shared/components/Header";
import Erro from "./shared/pages/Erro";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={ <Home/> }/>
        <Route path="/filme/:id" element={ <Filmes/> } />

        <Route path="*" element={ <Erro/> } />
      </Routes>
    </BrowserRouter>
  )
};

export default RoutesApp;