import React from 'react'
import {useQuery } from '@apollo/client';
import { GET_INSTRUCTORS } from '../../Queries/Instructor/instructor.queries';
import InstructorComponent from '../Instructor/instructor.component';
import SpinnerComponent from '../Spinner/spinner.component';
import AddInstructorComponent from '../AddInstructor/add-instructor.component';


function InstructorListComponent() {
    const { loading, error, data } = useQuery(GET_INSTRUCTORS);
    if (loading) {
        return <SpinnerComponent />
    }
    if (error) {
        return <p className="alert alert-danger">Bir hata oluştu</p>
    }

    const instructors = data.instructors;

    return <>
        <div className="mb-3">
            <AddInstructorComponent />
        </div>
        {!error && !loading && (
            <table className="table table-hover table-striped table-bordered mt-3">
                <thead>
                    <tr>
                        <th>İsim</th>
                        <th>E-Posta</th>
                        <th>İşlem</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        instructors && instructors.map((instructor) => (
                            <InstructorComponent key={instructor.id} instructor={instructor} isEditable={true} isCard={false} />
                        ))
                    }
                </tbody>
            </table>
        )}
    </>
}

export default InstructorListComponent
