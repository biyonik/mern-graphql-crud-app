import {v4 as uuidv4} from 'uuid';
import HomePage from "../Pages/Home/home.page";
import CoursePage from "../Pages/Course/course.page";
import EditCourseComponent from "../Components/EditCourse/edit-course.component";
const routes = [
    {
        id: uuidv4(),
        path: '/',
        component: <HomePage />
    },
    {
        id: uuidv4(),
        path: '/course/:id',
        component: <CoursePage />
    },
    {
        id: uuidv4(),
        path: '/course/:id/edit',
        component: <EditCourseComponent />
    }
]

export default routes;
