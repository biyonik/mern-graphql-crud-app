import InstructorListComponent from "../../Components/InstructorList/instructor-list.component";
import CourseListComponent from "../../Components/CourseList/course-list.component";
import {useQuery} from "@apollo/client";
import {GET_USER} from "../../Queries/User/user.query";
import {decodeToken} from "react-jwt";
import {useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import SpinnerComponent from "../../Components/Spinner/spinner.component";

const HomePage = () => {
    const navigate = useNavigate();
    const encodedToken = localStorage.getItem('token');
    const decodedToken = decodeToken(encodedToken);
    let id;
    if (decodedToken !== null) {
        id = decodedToken.id;
    }

    const {loading, error, data} = useQuery(GET_USER, {
        variables: {
            id: id
        },
        onCompleted: async data => {
            if (data.user === null) {
                navigate('/sign-up');
            }
        }
    });

    useEffect(() => {
        if (!encodedToken || id === undefined) {
            navigate('/sign-up')
        }
    }, []);


    if (loading) {
        return <SpinnerComponent type="grow" />
    }

    if (error) {
        return <p class="alert alert-danger">Bir hata oluştu</p>
    }

    return (
        <div className="container">
            <InstructorListComponent />
            <CourseListComponent />
        </div>
    )
};

export default HomePage;
