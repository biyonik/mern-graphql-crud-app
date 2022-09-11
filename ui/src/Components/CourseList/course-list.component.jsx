import {memo} from "react";
import {useQuery} from '@apollo/client';
import {GET_COURSES} from "../../Queries/Course/course.query";
import SpinnerComponent from "../Spinner/spinner.component";
import CourseComponent from "../Course/course.component";
import AddCourseComponent from "../AddCourse/add-course.component";

const CourseListComponent = () => {
    const {loading, error, data} = useQuery(GET_COURSES);

    if (loading) {
        return <SpinnerComponent/>
    }

    if (error) {
        return <p className="alert alert-danger">Bir hata oluştu</p>
    }


    const {courses} = data;

    return (
        <div className="row mt-4">
            <div className="mb-3">
                <AddCourseComponent />
            </div>
            {
                !error && !loading && courses.length > 0 && courses.map(course => (
                    <CourseComponent key={course.id} course={course}/>
                ))
            }
        </div>
    )
};

export default memo(CourseListComponent);
