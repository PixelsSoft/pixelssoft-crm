import { Button, Card, Dropdown, Modal } from 'react-bootstrap';

// types
// import { Contact } from '../pages/apps/Contacts/List/types';
import { useState } from 'react';
import { FormInput } from './form';

type User = {
    fullName: string;
    company: string;
    email: string;
    phoneNumber: string;
    Detail: string;
    _createdAt: string;
    Address: string;

};

type CustomerDetailCardProps = {
    contact: User;
};

const CustomerDetailCard = ({ contact }: CustomerDetailCardProps) => {
    const [editUserModal, setEditUserModal] = useState(false);

    const toggleEditModal = () => setEditUserModal(!editUserModal);


    return (
        <>
            <Card>
                <Card.Body className="text-center">
                    <Dropdown className="float-end" align="end">
                        <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
                            <i className="mdi mdi-dots-vertical"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={toggleEditModal}>Edit</Dropdown.Item>
                            <Dropdown.Item>Delete</Dropdown.Item>
                            <Dropdown.Item>View Profile</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <div>
                        <img
                            src={

                                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
                            }
                            alt="profileImage"
                            className="rounded-circle avatar-xl img-thumbnail mb-2"
                        />
                        {/* <p className="text-muted font-13 mb-3">{contact.shortDesc}</p> */}
                        <div className="text-start">
                            <p className="text-muted font-13">
                                <strong>Full Name :</strong> <span className="ms-2">{contact.fullName}</span>
                            </p>

                            <p className="text-muted font-13">
                                <strong>Mobile :</strong>
                                <span className="ms-2">{contact.phoneNumber}</span>
                            </p>

                            <p className="text-muted font-13">
                                <strong>Email :</strong> <span className="ms-2">{contact.email}</span>
                            </p>
                            <p className="text-muted font-13">
                                <strong>Address :</strong> <span className="ms-2">{contact.Address}</span>
                            </p>

                            <p className="text-muted font-13">
                                <strong>Details :</strong> <span className="ms-2">{contact.Detail}</span>
                            </p>
                        </div>

                    </div>
                </Card.Body>
            </Card>


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
        </>
    );
};

export default CustomerDetailCard;
