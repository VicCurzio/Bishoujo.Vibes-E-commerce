import React from 'react'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom'

const CartWidget = () => {

    const { cantidadTotal } = useContext(CartContext)

    return (
        <div>
            <Link to="/cart">
                <img className="carrito" src="../../public/carrito.png" alt="Carrito de compras" />
                {
                    cantidadTotal > 0 && <strong>{cantidadTotal}</strong>
                }
            </Link>
        </div>
    )
}

export default CartWidget