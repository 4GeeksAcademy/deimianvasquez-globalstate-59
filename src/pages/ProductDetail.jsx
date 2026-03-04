import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Spiner } from "../components/Spiner"

import useGlobalReducer from "../hooks/useGlobalReducer"

export const ProductDetail = () => {
    const [person, setPerson] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const { theId } = useParams()

    const { store } = useGlobalReducer()


    function getCharacter() {

        try {
            setLoading(true)
            const personStore = store.people.find((item)=> item.id == parseInt(theId, 10) )
            if(personStore){
                setPerson(personStore)
                return
            }

        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCharacter()
    }, [theId, store.people])

    if (loading) {
        return <Spiner />
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <img src={person.image} alt={person.name} className="w-100" />
                    <h1>{person.name}</h1>
                    <p>{person.gender}</p>
                    {/* <Link to="/products" className="btn btn-primary">Ir a products</Link> */}
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate(-1)}
                    >Volver</button>
                    <h1>Detail product {theId}</h1>
                </div>
            </div>
        </div>
    )
}