import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../../components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { FormInput } from '../../../../components';
import { startLoading, stopLoading } from '../../../../redux/Slices/utiltities/Utiltities';
import { useEffect, useState } from 'react';
import { CONSTANTS } from '../../../../constants/constant';
import ContactDetails from '../../../../components/ContactDetails';

const List = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.Auth);
    const [user, setUser] = useState([]);

    const getUser = async () => {
        dispatch(startLoading());
        await fetch(CONSTANTS.API_URLS.BASE + 'user', {
            headers: {
                'Accept': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then(e => {
                setUser(e.data);
                dispatch(stopLoading());
            })
            .catch(err => {
                dispatch(stopLoading());
                console.log('user err', err);
            });
    };

    useEffect(() => {
        getUser();
    }, []);

    const loading = false
    return loading ? (
        <div>
            <h2>Loading...</h2>
        </div>
    ) : (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Employee", path: "/apps/employee/" },

                ]}
                title={"Employee"}
            />
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row className="justify-content-center">
                                <Col md={4}>
                                    <div className="mt-3 mt-md-0">
                                        <Button variant="success" className="waves-effect waves-light" onClick={() => {
                                            navigate("/apps/hr/AddEmployee")
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
                {user.map(user => {
                    return (
                        <Col xl={6} md={6} key={user.id}>
                            <ContactDetails contact={user} getUser={getUser} />
                        </Col>
                    );
                })}
            </Row>
        </>
    );
};

export default List;