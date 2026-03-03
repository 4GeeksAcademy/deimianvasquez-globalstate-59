import { NavLink, Link } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"


export const Navbar = () => {
    const { store } = useGlobalReducer()

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) => `nav-link ${isActive && "my-active"}`} to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => `nav-link ${isActive && "my-active"}`} to="/products">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => `nav-link ${isActive && "my-active"}`} to="/contact">Contact</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => `nav-link ${isActive && "my-active"}`} to="/about">About</NavLink>
                        </li>
                    </ul>
                    <div className="dropdown ms-3">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Car ({store.favorites.length})
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            {
                                store.favorites.map((item) => (
                                    <li key={`fav-${item.id}`}><a className="dropdown-item" href="#">{` (${item.id}) - ${item.name} `}</a></li>
                                ))
                            }
                            {/* <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li> */}
                        </ul>
                    </div>
                </div>
            </div>

        </nav >

    )
} 