import {v4 as uuidv4} from 'uuid';
import HomePage from "../Pages/Home/home.page";
import CoursePage from "../Pages/Course/course.page";
import EditCourseComponent from "../Components/EditCourse/edit-course.component";
import SignUpPage from "../Pages/SignUp/sign-up.page";
import LoginPage from "../Pages/Login/login.page";

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
    },
    {
        id: uuidv4(),
        path: '/sign-up',
        component: <SignUpPage />
    },
    {
        id: uuidv4(),
        path: '/login',
        component: <LoginPage />
    }
]

export default routes;
