import { Card, Col, Dropdown, Row } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteEmployee, GetEmployeeById } from '../redux/Slices/employee/Employee';
import EmployeeEditModal from './EmployeeEditModal';
import { useNavigate } from 'react-router-dom';

const ContactDetails = ({ contact }) => {
    const { token } = useSelector(state => state.Auth);
    const naviage = useNavigate();
    const dispatch = useDispatch();
    const [editUserModal, setEditUserModal] = useState(false);

    const toggleEditModal = () => {
        setEditUserModal(!editUserModal);
        dispatch(GetEmployeeById(contact.id, token));
    };

    const deleteEmp = async () => {
        dispatch(DeleteEmployee(contact.id, token));
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
                            <Dropdown.Item onClick={deleteEmp}>Delete</Dropdown.Item>
                            <Dropdown.Item onClick={() => naviage(`/apps/hr/viewEmployee/${contact.id}`)}>View Profile</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <div>
                        <img
                            src={contact?.detail?.profile_img}
                            alt="profileImage"
                            className="rounded-circle avatar-xl img-thumbnail mb-2"
                        />
                        {/* <p className="text-muted font-13 mb-3">{contact.shortDesc}</p> */}

                        <div className="text-start">
                            <Row>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Full Name :</strong> <span className="ms-2">{contact?.name}</span>
                                    </p>
                                </Col>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Email :</strong> <span className="ms-2">{contact.email}</span>
                                    </p>
                                </Col>


                            </Row>
                            <Row>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Company Provided email :</strong> <span className="ms-2">{contact?.detail?.company_provided_email}</span>
                                    </p>
                                </Col>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Department :</strong> <span className="ms-2">{"hr"}</span>
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>CNIC :</strong> <span className="ms-2">{contact?.detail?.cnic_no}</span>
                                    </p>
                                </Col>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Role :</strong>
                                        {contact.roles.map(e => {
                                            return (
                                                <span key={e.id} className="ms-2">{e?.name}</span>
                                            )
                                        })}
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Mobile no :</strong> <span className="ms-2">{contact?.detail?.phone_no}</span>
                                    </p>
                                </Col>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Joining Date :</strong> <span className="ms-2">{contact?.detail?.joining_date}</span>
                                    </p>
                                </Col>
                            </Row>
                        </div>

                    </div>
                </Card.Body>
            </Card>
            <EmployeeEditModal editUserModal={editUserModal} toggleEditModal={toggleEditModal} />
        </>
    );
};

export default ContactDetails;
