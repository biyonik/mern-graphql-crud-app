import {useMutation} from "@apollo/client";
import {REMOVE_COURSE} from "../../Mutations/Course/course.mutation";
import {GET_COURSES} from "../../Queries/Course/course.query";

const RemoveCourseComponent = ({courseId}) => {
    const [removeCourse] = useMutation(REMOVE_COURSE, {
        variables: {
            id: courseId
        },
        refetchQueries: [{
            query: GET_COURSES
        }]
    });

    const handleDelete = async e => {
        e.preventDefault();
        const isAccept = window.confirm("Bu kursu silmek istiyor musunuz?");
        if (isAccept) {
            await removeCourse();
        }
    }

    return (
        <button className="btn btn-sm btn-danger" onClick={handleDelete}>
            Sil
        </button>
    )
}

export default RemoveCourseComponent;
