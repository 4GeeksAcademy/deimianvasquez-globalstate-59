import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"

const urlBaseRick = "https://rickandmortyapi.com/api/character"

export const Products = () => {
    const [character, setCharacter] = useState([])

    const {dispatch} = useGlobalReducer()

    async function getCharacter() {
        try {
            const response = await fetch(urlBaseRick)
            const data = await response.json()

            if (response.ok) {
                setCharacter(data.results)
            }

        } catch (error) {

        }
    }


    function addFav(fav){
        console.log(fav)   
        dispatch({type: "SET_FAV", payload:fav})
    }

    useEffect(() => {
        getCharacter()
    }, [])


    return (
        <div className="container">
            <div className="row">

                {
                    character.map((item) => {
                        return (
                            <div key={item.id} className="col-12 col-sm-6 col-md-4">
                                <div className="border mt-2">

                                    <img src={item.image} className="card-img-top" alt="..." />
                                    <div className="card-body p-2">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                                        <div className="d-flex justify-content-between">
                                            <Link to={`/product/${item.id}`} className="btn btn-primary">Ver detalle</Link>
                                            <button 
                                                className="btn btn-danger"
                                                onClick={()=>addFav(item)}
                                                >ADD</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}