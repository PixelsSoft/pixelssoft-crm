import { useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
// hooks
import { usePageTitle, useRedux } from '../../../hooks';

// component
import { FormInput } from '../../../components/form';

import ContactDetails from '../../../components/ContactDetails';

// data
// import { contacts } from './data';
import { getAllUsers } from '../../../redux/actions';
import { getAllRoles } from '../../../redux/roles/actions';
import { useNavigate } from 'react-router-dom';

// dummy data



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
    const navigate = useNavigate()


    const { dispatch, appSelector } = useRedux();

    const { loading, users } = appSelector((state) => ({
        loading: state.Auth.loading,
        users: state.Auth.users,
    }));

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



    // form validation schema


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
                                        <Button variant="success" className="waves-effect waves-light" onClick={() => {
                                            navigate("/apps/employees/AddEmployee")
                                        }}>
                                            <i className="mdi mdi-plus-circle me-1"></i>
                                            Add Employee
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
                        <Col xl={6} md={6} key={index.toString()}>
                            <ContactDetails contact={user} />
                        </Col>
                    );
                })}

            </Row>

        </>
    );
};

export default List;
