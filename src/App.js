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
import PaginaError from "./components/error404/PaginaError";

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
      const consulta = await fetch("https://crudcafeteria.herokuapp.com/api/cafeteria");
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
          <ListarProductos
            listaProductos={listaProductos}
            setRecargarProductos={setRecargarProductos}
          ></ListarProductos>
        </Route>
        <Route exact path="/productos/nuevo">
          <AgregarProducto
            setRecargarProductos={setRecargarProductos}
          ></AgregarProducto>
        </Route>
        <Route
          exact
          path="/productos/editar/:id"
          render={(props) => {
            //obtener el id de la ruta
            const idProducto = props.match.params.id;
            console.log(idProducto);
            //filtrar el arreglo de productos y obtener el q coincide con el id
            const productoSeleccionado = listaProductos.find(
              (producto) => producto._id === idProducto
            );
            console.log(productoSeleccionado);
            //renderizar el componente EditarProducto
            return (
              <EditarProducto producto={productoSeleccionado} setRecargarProductos={setRecargarProductos}></EditarProducto>
            );
          }}
        ></Route>
        <Route exact path='*'>
          <PaginaError></PaginaError>
        </Route>
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
