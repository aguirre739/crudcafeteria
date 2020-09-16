import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';

const AgregarProducto = (props) => {
  const [nombreProducto, setNombreProducto] = useState("");
  const [precioProducto, setPrecioProducto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [error, setError] = useState(false);

  const seleccionarCategoria = (e) => {
    setCategoria(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validar los datos
    if (
      nombreProducto.trim() === "" ||
      precioProducto.trim() === "" ||
      categoria === ""
    ) {
      //mostrar el cartel de error
      setError(true);
      return;
    }
    setError(false);
    //agregar el producto en nuestra API
    //crear el objeto a enviar
    const datos = { //nombre de la propiedad y nombre del state y si se usa el mismo nombre, se puede escribir una sola vez
      // nombreProducto: nombreProducto,
      nombreProducto,
      precioProducto,
      categoria
    }

    try{
      const cabecera ={
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(datos)
      }
      const resultado = await fetch("http://localhost:4000/api/cafeteria",cabecera) 
      console.log(resultado)

      if(resultado.status === 201){
        //aqui se agrego el producto exitosamente
        props.setRecargarProductos(true);
        Swal.fire(
          'Producto Creado',
          'El producto se agregó correctamente',
          'success'
        )

        //redireccionar a la pagina de productos
        props.history.push("/productos");
      } else{
        Swal.fire(
          'Oopss...',
          'Ocurrió un error, intentelo nuevamente',
          'error'
        )
      }
    } catch(excepcion){
      console.log(excepcion);
      Swal.fire(
        'Oopss...',
        'Ocurrió un error, intentelo nuevamente',
        'error'
      )
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center marginTop">
      <h1 className="display-4 text-center my-4">Agregar Nuevo Producto</h1>
      <Form
        className="w-75 shadow p-3 mb-5 bg-white rounded"
        onSubmit={handleSubmit}
      >
        {error === true ? (
          <Alert variant="danger">Todos los campos son obligatorios</Alert>
        ) : null}
        <Form.Group>
          <Form.Label>Nombre del producto *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej. Cafe con leche"
            onChange={(e) => setNombreProducto(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Precio *</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej. $50"
            onChange={(e) => setPrecioProducto(e.target.value)}
          />
        </Form.Group>

        <h3 className="text-center my-2">Categorias</h3>
        <Form.Group className="my-3 text-center">
          <div className="mb-3">
            <Form.Check
              type="radio"
              inline
              label="Bebida Caliente"
              value="bebida-caliente"
              name="categoria"
              onChange={seleccionarCategoria}
            />
            <Form.Check
              type="radio"
              inline
              label="Bebida Fria"
              value="bebida-fria"
              name="categoria"
              onChange={seleccionarCategoria}
            />
            <Form.Check
              type="radio"
              inline
              label="Sandwich"
              value="sandwich"
              name="categoria"
              onChange={seleccionarCategoria}
            />
            <Form.Check
              type="radio"
              inline
              label="Dulce"
              value="dulce"
              name="categoria"
              onChange={seleccionarCategoria}
            />
            <Form.Check
              type="radio"
              inline
              label="Salado"
              value="salado"
              name="categoria"
              onChange={seleccionarCategoria}
            />
          </div>
        </Form.Group>
        <Button variant="primary" size="sm" block type="submit">
          Agregar Producto
        </Button>
      </Form>
    </Container>
  );
};

export default withRouter(AgregarProducto);
