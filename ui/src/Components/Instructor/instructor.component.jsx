import React from 'react'
import {FaTrash, FaEnvelope, FaIdBadge} from 'react-icons/fa';
import {useMutation} from '@apollo/client';
import {REMOVE_INSTRUCTOR} from '../../Mutations/Instructor/instructor.mutations';
import {GET_INSTRUCTORS} from '../../Queries/Instructor/instructor.queries';

function InstructorComponent(props) {
    const {id, name, email} = props.instructor ?? {id: null, name: null, email: null};
    const isEditable = props.isEditable;
    const isCard = props.isCard;

    const [removeInstructor] = useMutation(REMOVE_INSTRUCTOR, {
        variables: {
            id: id
        },
        refetchQueries: [{
            query: GET_INSTRUCTORS
        }]
    });

    if (isCard) {
        return (
            <div>
                <h5 className="mt-5">Eğitmen Bilgileri</h5>
                <ul className="list-group">
                    <li className="list-group-item">
                        <FaIdBadge /> {name}
                    </li>
                    <li className="list-group-item">
                        <FaEnvelope /> {email}
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <tr>
            <td>{name}</td>
            <td>{email}</td>
            {
                isEditable && (<td>
                    <button className='btn btn-danger btn-sm' title="Sil" onClick={removeInstructor}>
                        <FaTrash/>
                    </button>
                </td>)
            }
        </tr>
    )
}

export default InstructorComponent
