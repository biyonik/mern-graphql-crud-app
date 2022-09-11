import InstructorListComponent from "../../Components/InstructorList/instructor-list.component";
import CourseListComponent from "../../Components/CourseList/course-list.component";

const HomePage = () => {
    return (
        <div className="container">
            <InstructorListComponent />
            <CourseListComponent />
        </div>
    )
};

export default HomePage;
