import { Button, Card, Dropdown, Modal } from 'react-bootstrap';

// types
// import { Contact } from '../pages/apps/Contacts/List/types';
import { useState } from 'react';
import FormInput from './FormInput';
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading } from '../redux/Slices/utiltities/Utiltities';
import { DeleteCustomer } from '../redux/Slices/Customer/customer';
import { useNavigate } from 'react-router-dom';
import CustomerEditModal from './CustomerEditModal';

const CustomerDetailCard = ({ contact }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [editUserModal, setEditUserModal] = useState(false);

    const toggleEditModal = () => setEditUserModal(!editUserModal);

    const { token, } = useSelector(
        (state) => ({
            token: state.Auth.token,
        })
    );

    const del = async () => {
        dispatch(startLoading());
        await dispatch(DeleteCustomer(contact.profileId, token, navigate));
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
            <CustomerEditModal profileId={contact.profileId} editUserModal={editUserModal} toggleEditModal={toggleEditModal} />
        </>
    );
};

export default CustomerDetailCard;
