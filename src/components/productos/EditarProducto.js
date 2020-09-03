import React, { useState, useRef } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';

const EditarProducto = (props) => {

    const [categoria, setCategoria] = useState("");
    const [error, setError] = useState(false);

    //aqui creo los useRef
    const nombreProductoRef = useRef("");
    const precioProductoRef = useRef("");

    const seleccionarCategoria = (e) => {
        setCategoria(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //validar los datos
        let _categoria = (categoria === "") ? props.producto.categoria : categoria;
        console.log(_categoria);
        console.log(nombreProductoRef)
        console.log(nombreProductoRef.current.value);
        console.log(precioProductoRef.current.value);

        if (nombreProductoRef.current.value.trim() === "" || precioProductoRef.current.value.trim() === "" || _categoria === "") {
            //mostrar cartel de error
            setError(true);
            return;
        }
        setError(false);
        //preparar el objeto con los datos
        const productoModificado = {
            nombreProducto: nombreProductoRef.current.value,
            precioProducto: precioProductoRef.current.value,
            categoria: _categoria
        }
        //enviar el objeto
        try {
            const consulta = await fetch(`http://localhost:4000/cafeteria/${props.producto.id}`,
            {
                method: "PUT", //se usa para editar
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productoModificado)
            });
            console.log(consulta);
            if(consulta.status === 200){
                //se modificaron correctamente los datos
                props.setRecargarProductos(true);
                Swal.fire(
                    'Producto Modificado',
                    'El producto se Modificó correctamente',
                    'success'
                  )
                  props.history.push("/productos");
            }
        } catch (msjerror) {
            console.log(msjerror);
            //mensaje para el usuario
        }
    }

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center marginTop">
            <h1 className="display-4 text-center my-4">Editar Producto</h1>
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
                        ref={nombreProductoRef}
                        defaultValue={props.producto.nombreProducto}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Precio *</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Ej. $50"
                        ref={precioProductoRef}
                        defaultValue={props.producto.precioProducto}
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
                            defaultChecked={props.producto.categoria === "bebida-caliente"}
                        />
                        <Form.Check
                            type="radio"
                            inline
                            label="Bebida Fria"
                            value="bebida-fria"
                            name="categoria"
                            onChange={seleccionarCategoria}
                            defaultChecked={props.producto.categoria === "bebida-fria"}
                        />
                        <Form.Check
                            type="radio"
                            inline
                            label="Sandwich"
                            value="sandwich"
                            name="categoria"
                            onChange={seleccionarCategoria}
                            defaultChecked={props.producto.categoria === "sandwich"}
                        />
                        <Form.Check
                            type="radio"
                            inline
                            label="Dulce"
                            value="dulce"
                            name="categoria"
                            onChange={seleccionarCategoria}
                            defaultChecked={props.producto.categoria === "dulce"}
                        />
                        <Form.Check
                            type="radio"
                            inline
                            label="Salado"
                            value="salado"
                            name="categoria"
                            onChange={seleccionarCategoria}
                            defaultChecked={props.producto.categoria === "salado"}
                        />
                    </div>
                </Form.Group>
                <Button variant="primary" size="sm" block type="submit">
                    Modificar Producto
                </Button>
            </Form>
        </Container>
    );
};

export default withRouter(EditarProducto);