import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ItemCount from '../ItemCount/ItemCount'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'

const ItemDetail = ({ id, nombre, precio, img, stock }) => {

    const [agregarCantidad, setAgregarCantidad] = useState(0)

    const { agregarProducto } = useContext(CartContext)

    const manejadorCantidad = (cantidad) => {
        setAgregarCantidad(cantidad)

        const item = { id, nombre, precio }
        agregarProducto(item, cantidad)
    }

    return (
        <div>
            <h2>Nombre: {nombre}</h2>
            <h3>Precio: {precio}</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis sapiente obcaecati tempore, officiis reiciendis omnis ipsum quos, odio et impedit suscipit provident cum, commodi distinctio. Quod delectus aperiam optio laborum!</p>
            <img src={img} alt={nombre} />
            {
                agregarCantidad > 0 ? (<Link to={"/cart"}> Terminar compra</Link>) : (<ItemCount inicial={1} stock={stock} funcionAgregar={manejadorCantidad} />)
            }
        </div>
    )
}

export default ItemDetail