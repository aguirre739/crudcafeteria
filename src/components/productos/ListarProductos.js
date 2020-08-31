import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import ItemProducto from "./ItemProducto";

const ListarProductos = (props) => {
  return (
    <div className="container marginTop">
      <h1 className="display-4 text-center my-4">Lista de productos</h1>
      <ListGroup className="my-2">
        {props.listaProductos.map((item) => <ItemProducto key={item.id} producto={item} setRecargarProductos={props.setRecargarProductos}></ItemProducto>)}
      </ListGroup>
    </div>
  );
};

export default ListarProductos;
