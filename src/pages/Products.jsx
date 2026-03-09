import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { Spiner } from "../components/Spiner"

import { getCharacterRick } from "../services/rickAndMortyService"


export const Products = () => {
    const [loading, setLoading] = useState(false)
    const { dispatch, store } = useGlobalReducer()

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")


    async function getCharacter(page = 1, name = "") {
        try {
            setLoading(true)


            const response = await getCharacterRick(page, name) // info
            if (response.ok) {
                const data = await response.json()
                setCurrentPage(page)
                setTotalPage(response.info?.pages || 1)

                dispatch({ type: "SET_CHARACTER", payload: data.results }) // los person
            }
            if (response.status == 404) {
                dispatch({ type: "SET_CHARACTER", payload: [] }) // los person

            }

        } catch (error) {
            dispatch({ type: "SET_CHARACTER", payload: [] })
        } finally {
            setLoading(false)
        }
    }


    function addFav(fav) {
        console.log(fav)
        dispatch({ type: "SET_FAV", payload: fav })
    }

    function goPrevPage() {
        if (currentPage > 1) {
            getCharacter(currentPage - 1)
        }
    }

    function goNextPage() {
        if (currentPage < totalPage) {
            getCharacter(currentPage + 1)
        }
    }

    function handleSearch(event) {
        event.preventDefault()

        getCharacter(1, searchTerm.trim())
    }


    useEffect(() => {
        getCharacter()
    }, [])



    if (loading) {
        return <Spiner />
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center">Productos</h1>
                    <form onSubmit={handleSearch}>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search character..."
                                onChange={(event) => setSearchTerm(event.target.value)}

                            />
                            <button
                                className="btn btn-outline-secondary"
                                type="submit"
                            >
                                Seacrh
                            </button>
                        </div>
                    </form>
                </div>

                {
                    store.people.length === 0 ? (
                        <div>
                            No se encontraron personajes.
                        </div>
                    ) :
                        store.people.map((item) => {
                            return (
                                <div key={item.id} className="col-12 col-sm-6 col-md-4">
                                    <div className="border mt-2">

                                        <img src={item.image} className="card-img-top" alt="..." />
                                        <div className="card-body p-2">
                                            <h5 className="card-title">{item.name}</h5>
                                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                                            <div className="d-flex justify-content-between">
                                                <Link to={`/product/${item.id}`} className="btn btn-primary">Ver detalle</Link>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => addFav(item)}
                                                >ADD</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                }

            </div>

            <div className="d-flex justify-content-center alig-items-center gap-3 mt-4 mb-2">
                <button
                    className="btn btn-outline-primary"
                    disabled={currentPage === 1}
                    onClick={() => goPrevPage()}
                >
                    Anterior
                </button>
                <span
                    className="fw-semibold"

                >
                    Página {currentPage} de {totalPage}
                </span>
                <button
                    className="btn btn-outline-primary"
                    disabled={currentPage === totalPage}
                    onClick={() => goNextPage()}
                >
                    Siguiente
                </button>
            </div>
        </div>
    )
}

/*

    currentPage
    totalPage
*/