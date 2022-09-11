import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {decodeToken} from "react-jwt";
import {useMutation} from "@apollo/client";
import {LOGIN_USER} from "../../Mutations/User/user.mutation";
import SpinnerComponent from "../../Components/Spinner/spinner.component";




const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const encodedToken = localStorage.getItem('token');
    const decodedToken = decodeToken(encodedToken);
    let id;
    if (decodedToken !== null) {
        id = decodedToken.id;
    }
    useEffect(() => {
        if (encodedToken || id) {
            navigate('/')
        }
    }, []);

    const [loginUser, {loading, error}] = useMutation(LOGIN_USER, {
        variables: {
            email: email,
            password: password
        }
    })

    const clearAllFormFields = () => {
        setEmail('');
        setPassword('');
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const user = await loginUser();
        const {token} = user.data.loginUser;
        if (token) {
            localStorage.setItem('token', token);
            navigate('/');
            clearAllFormFields();
        }
    }

    if (loading) {
        return <SpinnerComponent type="grow" />
    }

    return (
        <div className="col-md-9 mx-auto">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Üye Olun</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">E-Posta Adresi</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Parola</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="password"/>
                        </div>

                        <div className="mb-3">
                            <button className="btn btn-sm btn-success" type="submit">Giriş Yap</button>
                        </div>
                    </form>
                    {
                        error && (
                            <div className="mt-2 mb-2">
                                <p className="alert alert-danger">{error.message}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
