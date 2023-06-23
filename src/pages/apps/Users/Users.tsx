import { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
// hooks
import { usePageTitle, useRedux } from '../../../hooks';

// component
import { FormInput } from '../../../components/form';

import ContactDetails from '../../../components/ContactDetails';

// data
// import { contacts } from './data';
import { createUser, getAllUsers } from '../../../redux/actions';
import { getAllRoles } from '../../../redux/roles/actions';

// dummy data

type Role = {
    _id: string;
    title: string;
    access: {
        all: boolean;
        allowDashboard: boolean;
        allowViewInvoices: boolean;
        allowCreateInvoices: boolean;
        allowViewCustomers: boolean;
        allowCreateCustomers: boolean;
        allowViewProjects: boolean;
        allowCreateProjects: boolean;
        allowSales: boolean;
        allowViewUsers: boolean;
        allowCreateUsers: boolean;
        allowReports: boolean;
        allowViewExpenses: boolean;
        allowCreateExpenses: boolean;
        allowPayouts: boolean;
        allowAttendance: boolean;
        allowLeads: boolean;
    };
};

type User = {
    _id: string;
    fullName: string;
    company: string;
    email: string;
    phoneNumber: string;
    position: string;
    profilePic: {
        url: string;
        path: string;
    };
    role: string;
    designation: string;
    salary: string;
    _createdAt: string;
    password: string;
};

const List = () => {
    const [fullName, setFullName] = useState('');
    const [position, setPosition] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [designation, setDesignation] = useState('');
    const [salary, setSalary] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [modal, setModal] = useState<boolean>(false);
    const [profilePic, setProfilePic] = useState<File | null>(null);

    const { dispatch, appSelector } = useRedux();

    const { loading, createUserSuccess, error, data, users, roles } = appSelector((state) => ({
        loading: state.Auth.loading,
        createUserSuccess: state.Auth.createUserSuccess,
        error: state.Auth.error,
        data: state.Auth.data,
        users: state.Auth.users,
        roles: state.Roles.roles,
    }));

    const getRole = (id: string): Role => roles.data.find((item: Role) => item._id === id);

    const submit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        console.log(role);
        dispatch(
            createUser({
                fullName,
                position,
                email,
                password,
                role: getRole(role)._id,
                designation,
                salary,
                phoneNumber,
                profilePic,
            })
        );
    };

    const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setProfilePic(file);
        }
    };

    // set pagetitle
    usePageTitle({
        title: 'Users List',
        breadCrumbItems: [
            {
                path: '/apps/users',
                label: 'Contacts',
            },
            {
                path: '/apps/users',
                label: 'Users List',
                active: true,
            },
        ],
    });

    // Show/hide the modal
    const toggle = () => {
        setModal(!modal);
    };

    // form validation schema

    useEffect(() => {
        if (createUserSuccess) {
            setFullName('');
            setEmail('');
            setPassword('');
            setRole('');
            setDesignation('');
            setPhoneNumber('');
            setPosition('');
            setSalary(0);
            setProfilePic(null);

            setModal(false);
            dispatch(getAllUsers());
        }
    }, [createUserSuccess, dispatch]);

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAllRoles());
    }, [dispatch]);

    return loading ? (
        <div>
            <h2>Loading...</h2>
        </div>
    ) : (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row className="justify-content-center">
                                <Col md={4}>
                                    <div className="mt-3 mt-md-0">
                                        <Button variant="success" className="waves-effect waves-light" onClick={toggle}>
                                            <i className="mdi mdi-plus-circle me-1"></i>
                                            Add User
                                        </Button>
                                    </div>
                                </Col>
                                <Col md={8}>
                                    <form className="d-flex flex-wrap align-items-center justify-content-sm-end">
                                        <label className="me-2">Sort By</label>
                                        <FormInput type="select" name="sort">
                                            <option>All</option>
                                            <option>Name</option>
                                            <option>Post</option>
                                            <option>Followers</option>
                                            <option>Followings</option>
                                        </FormInput>
                                        <FormInput
                                            type="search"
                                            name="search"
                                            placeholder="Search..."
                                            className="ms-sm-2"
                                        />
                                    </form>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                {(users || []).map((user: User, index: any) => {
                    return (
                        <Col xl={4} md={6} key={index.toString()}>
                            <ContactDetails contact={user} />
                        </Col>
                    );
                })}
            </Row>
            <Modal show={modal} onHide={toggle} centered>
                <Modal.Header closeButton>
                    <Modal.Title as="h4">Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submit}>
                        {error && (
                            <Alert variant="danger" className="my-2">
                                {error}
                            </Alert>
                        )}
                        {data && (
                            <Alert variant="success" className="my-2">
                                {data.message}
                            </Alert>
                        )}

                        <FormInput
                            label={'Name'}
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            containerClass={'mb-3'}
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />

                        <FormInput
                            label={'Position'}
                            type="text"
                            name="position"
                            placeholder="Enter position"
                            containerClass={'mb-3'}
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                        />

                        <FormInput
                            label={'Email address'}
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            containerClass={'mb-3'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <FormInput
                            label={'Password'}
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            containerClass={'mb-3'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Form.Group className="mb-3" as={Col} controlId="formGridState">
                            <Form.Label>Select Role</Form.Label>
                            <Form.Select defaultValue="Choose..." onChange={(e) => setRole(e.target.value)}>
                                <option value={undefined}>Choose...</option>
                                {roles.data?.map((item: Role) => (
                                    <option value={item._id}>{item.title}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <FormInput
                            label={'Designation'}
                            type="text"
                            name="designation"
                            placeholder="Enter Designation"
                            containerClass={'mb-3'}
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                        />

                        <FormInput
                            label={'Salary'}
                            type="number"
                            name="salary"
                            placeholder="Enter Salary"
                            containerClass={'mb-3'}
                            value={salary}
                            onChange={(e) => setSalary(parseInt(e.target.value))}
                        />

                        <FormInput
                            label={'Phone #'}
                            type="text"
                            name="phone"
                            placeholder="Enter Phone #"
                            containerClass={'mb-3'}
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />

                        <FormInput
                            label="Profile Picture"
                            type="file"
                            name="profilePic"
                            containerClass={'mb-3'}
                            // register={register}
                            key="file"
                            onChange={handleFileChange}
                            // errors={errors}
                            // control={control}
                        />

                        <Button
                            variant="light"
                            disabled={loading}
                            className="waves-effect waves-light me-1"
                            type="submit">
                            Save
                        </Button>

                        <Button variant="danger" className="waves-effect waves-light" onClick={toggle}>
                            Cancel
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default List;
