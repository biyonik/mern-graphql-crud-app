import {FaList} from 'react-icons/fa';
import {useState} from "react";
import {useQuery, useMutation} from '@apollo/client';
import {GET_INSTRUCTORS} from "../../Queries/Instructor/instructor.queries";
import SpinnerComponent from "../Spinner/spinner.component";
import {ADD_COURSE} from "../../Mutations/Course/course.mutation";
import {GET_COURSES} from "../../Queries/Course/course.query";


const AddCourseComponent = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('plan');
    const [instructorId, setInstructorId] = useState('');
    const {loading, error, data} = useQuery(GET_INSTRUCTORS);
    const [addCourse] = useMutation(ADD_COURSE, {
        variables: {
            name: name,
            description: description,
            status: status,
            instructorId: instructorId
        },
        refetchQueries: [{
            query: GET_COURSES
        }]
    })

    const handleSubmit = async e => {
        e.preventDefault();
        if (name.length === 0 || description.length === 0) {
            return alert('Lütfen ilgili alanları doldurunuz!');
        }
        await addCourse();
        cleatAllFormFields();
    }

    const cleatAllFormFields = () => {
        setName('');
        setDescription('');
        setInstructorId('');
        setStatus('plan');
    }

    if (loading) {
        return <SpinnerComponent/>
    }

    if (error) {
        return <p className="alert alert-danger">Eğitmen listesi yüklenirken bir hata oluştu!</p>
    }

    const {instructors} = data;

    return (
        <>
            {!loading && !error && (
                <div className='text-center'>
                    <button
                        type='button'
                        className='btn btn-warning'
                        data-bs-toggle='modal'
                        data-bs-target='#kursEkleModal'
                    >
                        <div className='d-flex align-items-center'>
                            <FaList className='icon'/>
                            <div>Kurs Ekle</div>
                        </div>
                    </button>

                    <div
                        className='modal fade'
                        id='kursEkleModal'
                        aria-labelledby='kursEkleModalLabel'
                        aria-hidden='true'
                    >
                        <div className='modal-dialog'>
                            <div className='modal-content'>
                                <div className='modal-header'>
                                    <h5 className='modal-title' id='kursEkleModalLabel'>
                                        Kurs
                                    </h5>
                                    <button
                                        type='button'
                                        className='btn-close'
                                        data-bs-dismiss='modal'
                                        aria-label='Close'
                                    ></button>
                                </div>
                                <div className='modal-body'>
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

                                        <div className="mb-3">
                                            <label htmlFor="instructors" className="form-label">Eğitmenler</label>
                                            <select
                                                onChange={(e) => setInstructorId(e.target.value)}
                                                name="instructors"
                                                id="instructors"
                                                value={instructorId}
                                                className="form-select">
                                                <option value="" disabled>-Bir Eğitmen Seçiniz-</option>
                                                {
                                                    instructors.length > 0 && instructors.map((instructor) => (
                                                        <option value={instructor.id}
                                                                key={instructor.id}>{instructor.name}</option>
                                                    ))
                                                }
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
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>

    )
}

export default AddCourseComponent;
