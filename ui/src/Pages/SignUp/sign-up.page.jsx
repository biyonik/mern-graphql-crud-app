import {useState} from "react";
import {useMutation} from "@apollo/client";
import {ADD_USER} from "../../Mutations/User/user.mutation";
import {useNavigate} from 'react-router-dom';
import SpinnerComponent from "../../Components/Spinner/spinner.component";

const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [addUser, {loading}] = useMutation(ADD_USER, {
        variables: {
            username: username,
            email: email,
            password: password
        },
        update: (proxy, result) => {
            navigate('/login')
        }
    });

    const clearAllFormFields = () => {
        setEmail('');
        setUsername('');
        setPassword('');
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const user = await addUser();
        const {token} = user.data.addUser;
        localStorage.setItem('token', token);
        clearAllFormFields();
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
                            <label htmlFor="username" className="form-label">Kullanıcı Adı</label>
                            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" id="username"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">E-Posta Adresi</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Parola</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="password"/>
                        </div>

                        <div className="mb-3">
                            <button className="btn btn-sm btn-success" type="submit">Kayıt Ol</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default SignUpPage;
