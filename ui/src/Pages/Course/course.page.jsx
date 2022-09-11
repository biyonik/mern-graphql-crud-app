import {useParams, Link} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {GET_COURSE} from "../../Queries/Course/course.query";
import SpinnerComponent from "../../Components/Spinner/spinner.component";
import InstructorComponent from "../../Components/Instructor/instructor.component";

const CoursePage = () => {
    const {id} = useParams();
    const {loading, error, data} = useQuery(GET_COURSE, {
        variables: {id}
    });

    if (loading) {
        return <SpinnerComponent />
    }

    if (error) {
        return <p className="alert alert-danger">Bir hata oluştu</p>
    }

    const {course} = data;

    return (
        <>
            {!loading && !error && (
                <div className="mx-auto w-75 card p-5">
                    <Link to="/" className="btn btn-secondary btn-sm w-25 d-inline ms-auto">Anasayfa</Link>
                    <h1>{course.name}</h1>
                    <p>{course.description}</p>
                    <h5 className="mt-3"><strong>{course.status}</strong></h5>
                    <InstructorComponent isCard={true} isEditable={false} instructor={course.instructor} />
                </div>
            )}
        </>
    )
}

export default CoursePage;
