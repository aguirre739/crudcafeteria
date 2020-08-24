import React from 'react';
import './App.css';
import './bootstrap.min.css';
import Inicio from './components/principal/Inicio';
import ListarProductos from './components/productos/ListarProductos';
import AgregarProducto from './components/productos/AgregarProducto';
import EditarProducto from './components/productos/EditarProducto';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/">
          <Inicio></Inicio>
        </Route>
        <Route exact path="/productos">
        <ListarProductos></ListarProductos>
        </Route>
        <Route exact path="/productos/nuevo">
          <AgregarProducto></AgregarProducto>
        </Route>
        <Route exact path="/productos/editar">
          <EditarProducto></EditarProducto>
        </Route>
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
