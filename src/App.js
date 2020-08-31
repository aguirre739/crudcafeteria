import React, { useState, useEffect } from "react";
import "./App.css";
import "./bootstrap.min.css";
import Inicio from "./components/principal/Inicio";
import ListarProductos from "./components/productos/ListarProductos";
import AgregarProducto from "./components/productos/AgregarProducto";
import EditarProducto from "./components/productos/EditarProducto";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [listaProductos, setListaProductos] = useState([]);
  const [recargarProductos, setRecargarProductos] = useState(true);

  useEffect(() => {
    if (recargarProductos) {
      consultarAPI();
      setRecargarProductos(false);
    }
  }, [recargarProductos]);

  const consultarAPI = async () => {
    try {
      //operacion GET
      const consulta = await fetch("http://localhost:4000/cafeteria");
      console.log(consulta);
      const resultado = await consulta.json();
      console.log(resultado);
      //guardar datos en el stage
      setListaProductos(resultado);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/">
          <Inicio></Inicio>
        </Route>
        <Route exact path="/productos">
          <ListarProductos listaProductos={listaProductos} setRecargarProductos={setRecargarProductos}></ListarProductos>
        </Route>
        <Route exact path="/productos/nuevo">
          <AgregarProducto setRecargarProductos={setRecargarProductos}></AgregarProducto>
        </Route>
        <Route exact path="/productos/editar/:idProducto" render={()=>{
          //obtener el id de la ruta

          //filtrar el arreglo de productod y obtener

          //renderzar el componente editarproducto
          return  <EditarProducto></EditarProducto>
        }}>
         
        </Route>
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
