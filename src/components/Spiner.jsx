export const Spiner = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 w-100 border border-danger position-absolute top-0 start-0">

            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}