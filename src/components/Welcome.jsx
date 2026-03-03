import useGlobalReducer from "../hooks/useGlobalReducer"


export const Welcome = () => {
    const {store} = useGlobalReducer()
    const {user} = store
    
    console.log(useGlobalReducer())
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <p>Hola ¿qué tal {user.lastname}?</p>
                </div>
            </div>
        </div>
    )
} 