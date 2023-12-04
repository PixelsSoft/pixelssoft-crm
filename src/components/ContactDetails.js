import { Button, Card, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import { useState } from 'react';
import FormInput from './FormInput';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteEmployee } from '../redux/Slices/employee/Employee';

const ContactDetails = ({ contact }) => {
    const { token } = useSelector(state => state.Auth);
    const dispatch = useDispatch();
    const [accessControlModal, setAccessControlModal] = useState(false);
    const [editUserModal, setEditUserModal] = useState(false);

    const toggleEditModal = () => setEditUserModal(!editUserModal);
    const toggle = () => setAccessControlModal(!accessControlModal);

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
                            <Dropdown.Item>View Profile</Dropdown.Item>
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
                        <Button className="rounded-pill waves-effect waves-light" onClick={toggle}>
                            Access Control
                        </Button>
                    </div>
                </Card.Body>
            </Card>
            <Modal show={accessControlModal} onHide={toggle} centered>
                <Modal.Header closeButton>
                    <Modal.Title as="h4">Accesss Control</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <h4 className="header-title">Dashboard</h4>
                        <div className="mt-1">
                            <Form.Check type="checkbox" id="default-checkbox1" label="Allow Dashboard" />
                        </div>
                    </Row>
                    <Row className="my-2">
                        <h4 className="header-title">Invoice</h4>
                        <div className="mt-1">
                            <Form.Check type="checkbox" id="default-checkbox1" label="View Invoices" />
                            <Form.Check type="checkbox" id="default-checkbox1" label="Create Invoice" />
                        </div>
                    </Row>

                    <Row className="my-2">
                        <h4 className="header-title">Customers</h4>
                        <div className="mt-1">
                            <Form.Check type="checkbox" id="default-checkbox1" label="View Customers" />
                            <Form.Check type="checkbox" id="default-checkbox1" label="Create Customers" />
                        </div>
                    </Row>

                    <Row className="my-2">
                        <h4 className="header-title">Projects</h4>
                        <div className="mt-1">
                            <Form.Check type="checkbox" id="default-checkbox1" label="View Projects" />
                            <Form.Check type="checkbox" id="default-checkbox1" label="Create Projects" />
                        </div>
                    </Row>

                    <Row className="my-2">
                        <h4 className="header-title">Sales</h4>
                        <div className="mt-1">
                            <Form.Check type="checkbox" id="default-checkbox1" label="Allow Sales" />
                        </div>
                    </Row>

                    <Row className="my-2">
                        <h4 className="header-title">Users</h4>
                        <div className="mt-1">
                            <Form.Check type="checkbox" id="default-checkbox1" label="View Users" />
                            <Form.Check type="checkbox" id="default-checkbox1" label="Create Users" />
                        </div>
                    </Row>

                    <Row className="my-2">
                        <h4 className="header-title">Reports</h4>
                        <div className="mt-1">
                            <Form.Check type="checkbox" id="default-checkbox1" label="Allow Reports" />
                        </div>
                    </Row>
                    <Row className="my-2">
                        <h4 className="header-title">Expenses</h4>
                        <div className="mt-1">
                            <Form.Check type="checkbox" id="default-checkbox1" label="View Expenses" />
                            <Form.Check type="checkbox" id="default-checkbox1" label="Create Expense" />
                        </div>
                    </Row>

                    <div className="d-flex justify-content-end border-top border-gray pt-2">
                        <Button variant="light" className="waves-effect waves-light me-1" type="submit">
                            Save
                        </Button>
                        <Button variant="danger" className="waves-effect waves-light" onClick={toggle}>
                            Cancel
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

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

export default ContactDetails;