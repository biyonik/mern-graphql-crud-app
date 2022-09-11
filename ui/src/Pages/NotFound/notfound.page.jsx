import {FaExclamationTriangle} from "react-icons/fa";
import {Link} from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
            <FaExclamationTriangle className="text-danger" size="5em" />
            <h1>404</h1>
            <p className="lead">Maalesef aradığınız sayfayı bulamadık!</p>
            <Link className="btn btn-primary" to="/">Anasayfaya Dön</Link>
        </div>
    )
};

export default NotFoundPage;
