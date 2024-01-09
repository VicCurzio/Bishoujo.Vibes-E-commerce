import React from 'react'
import { useState, useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { db } from '../../services/config'
import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore'

const Checkout = () => {

    const { carrito, vaciarCarrito, cantidadTotal } = useContext(CartContext)
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [telefono, setTelefono] = useState("")
    const [email, setEmail] = useState("")
    const [emailConfirmacion, setEmailConfirmacion] = useState("")
    const [error, setError] = useState("")
    const [ordenId, setOrdenId] = useState("")

    const handlerForm = (e) => {
        e.preventDefault()

        if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
            setError("Por favor complete los campos")
            return
        }

        if (email !== emailConfirmacion) {
            setError("Los emails no coinciden")
            return
        }

        const orden = {
            items: carrito.map(prod => ({
                id: prod.item.id,
                nombre: prod.item.nombre,
                cantidad: prod.cantidad
            })),
            total: cantidadTotal,
            nombre,
            apellido,
            telefono,
            email,
            fecha: new Date()
        }

        Promise.all(
            orden.items.map(async (productoOrden) => {
                const productoRef = doc(db, "inventario", productoOrden.id)
                const productoDoc = await getDoc(productoRef)
                const stockActual = productoDoc.data().stock

                await updateDoc(productoRef, {
                    stock: stockActual - productoOrden.cantidad
                })
            })
        )
            .then(() => {
                addDoc(collection(db, "ordenes"), orden)
                    .then((docRef) => {
                        setOrdenId(docRef.id)
                        vaciarCarrito()
                    })
                    .catch((error) => {
                        console.log("Error al crear la orden", error)
                        setError("Error, intenté más tarde")
                    })
            })
            .catch((error) => {
                console.log("Error al actualizar el stock", error)
                setError("Error al actualizar el stock. Intente mas tarde")
            })

    }

    return (
        <div>
            <h2>Checkout</h2>
            <form onSubmit={handlerForm}>
                {carrito.map(producto => (
                    <div key={producto.item.id}>
                        <p>
                            {producto.item.nombre} x {producto.cantidad}
                        </p>
                        <p>Precio $ {producto.item.precio}</p>
                        <hr />
                    </div>
                ))}
                <hr />

                <div>
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="">Apellido</label>
                    <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="">Telefono</label>
                    <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="">Email confirmación</label>
                    <input type="email" value={emailConfirmacion} onChange={(e) => setEmailConfirmacion(e.target.value)} />
                </div>

                {
                    error && <p style={{ color: "red" }}>{error}</p>
                }

                <button type='submit'>Finalizar compra</button>
            </form>

            {
                ordenId && (
                    <strong>¡Gracias por tu compra! Tu número de orden es {ordenId}</strong>
                )
            }
        </div>
    )
}

export default Checkout