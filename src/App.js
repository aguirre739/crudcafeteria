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
import Paginacion from './components/productos/Paginacion';

function App() {
  const [listaProductos, setListaProductos] = useState([]);
  const [recargarProductos, setRecargarProductos] = useState(true);

  //state para paginar
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [paginaActual, setPaginaActual] = useState(0);
  const [cantidadRegistros, setCantidadRegistros] = useState(3); //cantidad de registros que se mostraran en la lista de productos o cuantos productos habra en cada pagina

  useEffect(() => {
    if (recargarProductos) {
      consultarAPI();
      setRecargarProductos(false);
    }
  }, [recargarProductos]);

  const consultarAPI = async (paginaAct = paginaActual) => {
    try {
      //operacion GET
      const consulta = await fetch(`https://crudcafeteria.herokuapp.com/api/cafeteria/?cantidad=${cantidadRegistros}&paginaActual=${paginaAct}`);
      console.log(consulta);
      const resultado = await consulta.json();
      console.log(resultado);
      //guardar datos en el stage
      setListaProductos(resultado.mensaje);
      setTotalPaginas(resultado.totalPaginas);
      setPaginaActual(resultado.paginaActual);
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
        <Route exact path="/productos" render={()=>(
          <div>
            <ListarProductos
            listaProductos={listaProductos}
            setRecargarProductos={setRecargarProductos}
          ></ListarProductos>
          <Paginacion totalPaginas={totalPaginas} paginaActual={paginaActual} consultarAPI={consultarAPI}></Paginacion>
          </div>
        )}>
          
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
