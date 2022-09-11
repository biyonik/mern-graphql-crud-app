import React, {memo, useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_USER} from "../../Queries/User/user.query";
import {decodeToken} from "react-jwt";
import {useNavigate} from 'react-router-dom';

function HeaderComponent() {
    const [isLogin, setIsLogin] = useState(false);
    const encodedToken = localStorage.getItem('token');
    const navigate = useNavigate();
    const decodedToken = decodeToken(encodedToken);
    let id;
    if (decodedToken !== null) {
        id = decodedToken.id;
    }
    useQuery(GET_USER, {
        variables: {
            id: id
        },
        onCompleted: async data => {
            if (data.user === null) {
                setIsLogin(false);
            }
            setIsLogin(true);
        }
    });

    useEffect(() => {
        if (!encodedToken || id === undefined) {
            setIsLogin(false);
        }
    }, []);

    const handleLogOut = async () => {
        setIsLogin(false);
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <nav className='navbar bg-light mb-4 p-4'>
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <div className="d-flex">
                        MERNG Crud App
                    </div>
                </Link>
                <div className="d-flex">
                    {!isLogin && (
                        <>
                            <Link to="sign-up" className="navbar-brand">
                                Üye Ol
                            </Link>
                            <Link to="login" className="navbar-brand">
                                Giriş Yap
                            </Link>
                        </>
                    )}
                    {
                        isLogin && (
                            <>
                                <button className="navbar-brand btn btn-sm btn-info" onClick={handleLogOut}>
                                    Çıkış Yap
                                </button>
                            </>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}

export default memo(HeaderComponent);
