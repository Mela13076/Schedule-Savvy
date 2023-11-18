import { Link } from 'react-router-dom'

const NotFound = () => {
    return(
        <div className="main-page">
            <h3>Page not found!</h3>
            <Link className="card" to="/"> Click here to be redirected to home </Link>
        </div>
        
    )
}

export default NotFound