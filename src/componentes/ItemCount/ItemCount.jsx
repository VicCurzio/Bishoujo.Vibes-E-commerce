import React from 'react'
import { useState } from 'react'

const ItemCount = ({ inicial, stock, funcionAgregar }) => {

    const [contador, setContador] = useState(inicial)

    const incrementarContador = () => {
        if (contador < stock) {
            setContador(contador + 1)
        }
    }

    const decrementarContador = () => {
        if (contador > inicial) {
            setContador(contador - 1)
        }
    }

    return (
        <>
            <div>
                <button onClick={decrementarContador}> - </button>
                <strong> {contador} </strong>
                <button onClick={incrementarContador}> + </button>
            </div>
            <button onClick={() => funcionAgregar(contador)}> Agregar al carrito</button>
        </>
    )
}

export default ItemCount