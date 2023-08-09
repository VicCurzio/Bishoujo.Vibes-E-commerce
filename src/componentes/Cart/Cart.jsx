import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom'
import CartItem from '../CartItem/CartItem'

const Cart = () => {
    const { carrito, vaciarCarrito, total, cantidadTotal } = useContext(CartContext)

    if (cantidadTotal === 0) {
        return (
            <>
                <h2>No hay nada en el carrito</h2>
                <Link to="/">Ver productos</Link>
            </>
        )
    }

    return (
        <div>
            {carrito.map(prod => <CartItem key={prod.item.id} {...prod} />)}
            <h3>Total: $ {total}</h3>
            <h3>Cantidad total: {cantidadTotal}</h3>
            <button onClick={() => vaciarCarrito()}>Vaciar carrito</button>
            <Link to="/checkout">Finalizar compra</Link>
        </div>
    )
}

export default Cart