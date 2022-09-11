import {useParams} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import {GET_COURSE} from "../../Queries/Course/course.query";
import SpinnerComponent from "../Spinner/spinner.component";
import {useEffect, useState} from "react";
import {UPDATE_COURSE} from "../../Mutations/Course/course.mutation";
import { useNavigate } from "react-router-dom";

const EditCourseComponent = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const {id} = useParams();

    const courseQuery = useQuery(GET_COURSE, {
        variables: {id}
    });

    useEffect(() => {
        setLoading(courseQuery.loading);
        setError(courseQuery.error);
        if (courseQuery.data?.course) {
            const c = courseQuery.data.course;
            setName(c.name);
            setDescription(c.description);
            setStatus(() => {
                switch (c.status) {
                    case "Planlanıyor":
                        return 'plan';
                    case "Oluşturuluyor":
                        return 'olus';
                    case 'Yayında':
                        return "yayin";
                    case 'Pasif':
                        return 'pasif';
                }
            });
        }

    }, []);

    const [updateCourse] = useMutation(UPDATE_COURSE, {
        variables: {
            id: id,
            name: name,
            description: description,
            status: status
        }
    });

    const navigate = useNavigate();


    if (loading) {
        return <SpinnerComponent />
    }

    if (error) {
        return <p className="alert alert-danger">Bir hata oluştu</p>
    }

    const handleSubmit = async e => {
        e.preventDefault();
        await updateCourse();
        navigate(`/course/${id}`, { replace: true });
    }

    return (
        <>
            {!loading && !error && (
                <div className='col-md-8 mx-auto'>
                    <h3>Kurs Düzenle</h3>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label className='form-label'>Kurs Adı</label>
                            <input
                                type='text'
                                className='form-control'
                                id='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}

                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Açıklama</label>
                            <input
                                type='text'
                                className='form-control'
                                id='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'>Durum</label>
                            <select
                                className='form-select'
                                name="status"
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}>
                                <option value="plan">Planlanıyor</option>
                                <option value="olus">Oluşturuluyor</option>
                                <option value="yayin">Yayında</option>
                                <option value="pasif">Pasif</option>
                            </select>
                        </div>

                        <button
                            type='submit'
                            data-bs-dismiss='modal'
                            className='btn btn-warning'
                        >
                            Kaydet
                        </button>
                    </form>
                </div>
            )}

        </>
    )
}

export default EditCourseComponent;
