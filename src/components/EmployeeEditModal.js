import { Button, Modal } from 'react-bootstrap'
import FormInput from './FormInput'
import { useSelector } from 'react-redux';

const EmployeeEditModal = ({ editUserModal, toggleEditModal }) => {
    // const { loading, employee } = useSelector(
    //     (state) => ({
    //         loading: state.utiltities.loading,
    //         employee: state.Employees.singleEmployee
    //     })
    // );

    // console.log('EmployeeEditModal', employee);

    return (
        <Modal show={editUserModal} onHide={toggleEditModal} centered>
            <Modal.Header closeButton>
                <Modal.Title as="h4">Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormInput
                    label={'Name'}
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    containerClass={'mb-3'}
                />

                <FormInput
                    label={'Position'}
                    type="text"
                    name="position"
                    placeholder="Enter position"
                    containerClass={'mb-3'}
                />

                <FormInput
                    label={'Company'}
                    type="text"
                    name="company"
                    placeholder="Enter company"
                    containerClass={'mb-3'}
                />

                <FormInput
                    label={'Email address'}
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    containerClass={'mb-3'}
                />

                <FormInput
                    label={'Role'}
                    type="text"
                    name="role"
                    placeholder="Enter role"
                    containerClass={'mb-3'}
                />

                <FormInput
                    label={'Designation'}
                    type="text"
                    name="designation"
                    placeholder="Enter Designation"
                    containerClass={'mb-3'}
                />

                <FormInput
                    label={'Salary'}
                    type="text"
                    name="salary"
                    placeholder="Enter Salary"
                    containerClass={'mb-3'}
                />

                <FormInput
                    label={'Phone #'}
                    type="text"
                    name="phone"
                    placeholder="Enter Phone #"
                    containerClass={'mb-3'}
                />

                <FormInput
                    label="Profile Picture"
                    type="file"
                    name="file"
                    containerClass={'mb-3'}
                    // register={register}
                    key="file"
                // errors={errors}
                // control={control}
                />

                <Button variant="dark" className="waves-effect waves-light me-1" type="submit">
                    Save
                </Button>
                <Button variant="danger" className="waves-effect waves-light" onClick={toggleEditModal}>
                    Cancel
                </Button>
            </Modal.Body>
        </Modal>
    )
}

export default EmployeeEditModal