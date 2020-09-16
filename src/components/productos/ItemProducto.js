import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'


const ItemProducto = (props) => {

  const eliminarProducto = (idProducto) =>{
    console.log(idProducto);
    Swal.fire({
      title: '¿Está seguro de eliminar el producto?',
      text: "No puede recuperar el producto eliminado.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: "Cancelar"
    }).then(async(result) => {
      if (result.value) {
        //aqui tengo que eliminar el producto
        try{
          const consulta = await fetch(`http://localhost:4000/api/cafeteria/${idProducto}`,{
            method: "DELETE",
            headers:{
              "Content-Type": "application/json"
            }
          })

          console.log(consulta);
          if(consulta.status === 200){
            //aqui si se borró el producto
            props.setRecargarProductos(true);
            Swal.fire(
              'El producto fue eliminado.',
              'Su producto fue eliminado correctamente.',
              'success'
            )
          }
          
        }catch(error){
          console.log(error)
        }
      }
    })
  }

  return (
    <ListGroup.Item className="d-flex justify-content-between">
      <p>
        {props.producto.nombreProducto}{" "}
        <span className="font-weight-bold">
          ${props.producto.precioProducto}
        </span>
      </p>
      <div>
        <Link className="mr-2 btn btn-info" to={`/productos/editar/${props.producto._id}`}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></Link>
        {/* <Button variant="info" className="mr-2">Editar</Button> */}
        <Button variant="danger" onClick={()=> eliminarProducto(props.producto._id)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
      </div>
    </ListGroup.Item>
  );
};

export default ItemProducto;
