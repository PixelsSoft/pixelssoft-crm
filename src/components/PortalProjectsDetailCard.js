import { Card, Dropdown } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading } from '../redux/Slices/utiltities/Utiltities';
import EditPortalProject from './EditPortalProject';
import { DeleteProject } from '../redux/Slices/Project/Project';

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
        await dispatch(DeleteProject(contact.projectId, token));
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
            <EditPortalProject projectId={contact.projectId} editUserModal={editUserModal} toggleEditModal={toggleEditModal} />
        </>
    );
};

export default PortalProjectsDetailCard;
