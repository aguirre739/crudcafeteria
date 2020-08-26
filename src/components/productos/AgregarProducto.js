import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const AgregarProducto = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
      <h1 className="display-4 text-center my-4">Agregar Nuevo Producto</h1>
      <Form className="w-75 shadow p-3 mb-5 bg-white rounded">
        <Form.Group>
          <Form.Label>Nombre del producto *</Form.Label>
          <Form.Control type="text" placeholder="Ej. Cafe con leche" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Precio *</Form.Label>
          <Form.Control type="text" placeholder="Ej. $50" />
        </Form.Group>

        <h3 className="text-center my-2">Categorias</h3>
        <Form.Group className="my-3 text-center">
          <div className="mb-3">
            <Form.Check  type="radio" inline label="Bebida Caliente"/>
            <Form.Check  type="radio" inline label="Bebida Fria"/>
            <Form.Check  type="radio" inline label="Sandwich"/>
            <Form.Check  type="radio" inline label="Dulce"/>
            <Form.Check  type="radio" inline label="Salado"/>
          </div>
        </Form.Group>
        <Button variant="primary" size="sm" block type="submit">
          Agregar Producto
        </Button>
      </Form>
    </Container>
  );
};

export default AgregarProducto;
