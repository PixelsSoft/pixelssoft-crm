import { Button, Card, Dropdown, Modal } from 'react-bootstrap';

// types
// import { Contact } from '../pages/apps/Contacts/List/types';
import { useState } from 'react';
import FormInput from './FormInput';
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading } from '../redux/Slices/utiltities/Utiltities';
import { DeleteCustomer } from '../redux/Slices/Customer/customer';

const PortalProjectsDetailCard = ({ contact }) => {
    const { token, } = useSelector(
        (state) => ({
            token: state.Auth.token,
        })
    );

    const dispatch = useDispatch();
    const [editUserModal, setEditUserModal] = useState(false);

    const toggleEditModal = () => setEditUserModal(!editUserModal);

    const del = async () => {
        dispatch(startLoading());
        await dispatch(DeleteCustomer(contact.projectId, token));
        dispatch(stopLoading());
    };

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
                            <Dropdown.Item onClick={del}>Delete</Dropdown.Item>
                            {/* <Dropdown.Item>View Profile</Dropdown.Item> */}
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
                                <strong>Platform :</strong> <span className="ms-2">{contact.platform}</span>
                            </p>

                            <p className="text-muted font-13">
                                <strong>Title :</strong>
                                <span className="ms-2">{contact.title}</span>
                            </p>

                            <p className="text-muted font-13">
                                <strong>Bidder Name :</strong> <span className="ms-2">{contact.BidderName}</span>
                            </p>
                            <p className="text-muted font-13">
                                <strong>Sales Name :</strong> <span className="ms-2">{contact.SalesName}</span>
                            </p>

                            <p className="text-muted font-13">
                                <strong>Description :</strong> <span className="ms-2">{contact.description}</span>
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

export default PortalProjectsDetailCard;
