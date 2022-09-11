import React, {useState} from 'react'
import { FaUser } from 'react-icons/fa';
import {useMutation} from "@apollo/client";
import {ADD_INSTRUCTOR} from "../../Mutations/Instructor/instructor.mutations";
import {GET_INSTRUCTORS} from "../../Queries/Instructor/instructor.queries";


function AddInstructorComponent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [addInstructor] = useMutation(ADD_INSTRUCTOR, {
        variables: {
            name: name,
            email: email
        },
        refetchQueries: [{
            query: GET_INSTRUCTORS
        }]
    });

    const handleSubmit = async e => {
        e.preventDefault();
        if (name.length === 0 || email.length === 0) {
            return alert("Lütfen isim ve e-posta bilgisini boş bırakmayınız!");
        }
        await addInstructor();
        setName('');
        setEmail('');
    }

    return (
        <div className="text-center">
            <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#instructorAddModal">
                <div className="d-flex align-items-center">
                    <FaUser className="icon" />
                    <div>Eğitmen Ekle</div>
                </div>
            </button>

            <div className="modal fade" id="instructorAddModal" aria-labelledby="instructorAddModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Yeni Eğitmen Ekle</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Kapat"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label
                                        htmlFor="name"
                                        className="form-label">Adı, Soyadı</label>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        type="name"
                                        name="name"
                                        className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="email"
                                        className="form-label">E-Posta Adresi</label>
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        name="email"
                                        className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">Kaydet</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddInstructorComponent
