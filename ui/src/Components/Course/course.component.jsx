import {memo} from "react";
import {Link} from "react-router-dom";
import InstructorComponent from "../Instructor/instructor.component";
import RemoveCourseComponent from "../RemoveCourse/remove-course.component";

const CourseComponent = ({course}) => {
    const {id, name, description, status} = course;
    const instructor = course.instructor ?? null;
    return (
        <div className="col-md-6">
            <div className="card mb-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title">{name}</h5>
                        <Link className="btn btn-primary" to={`/course/${id}`}>İncele</Link>
                    </div>
                    <p className="small">
                        Durum: <strong>{status}</strong>
                    </p>
                </div>
                <div className="card-footer">
                    <Link to={`course/${id}/edit`} className="btn btn-sm btn-success me-2">Düzenle</Link>
                    <RemoveCourseComponent courseId={id} />
                </div>
            </div>
        </div>
    )
};

export default memo(CourseComponent);
