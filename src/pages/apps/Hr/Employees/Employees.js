import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../../components/PageTitle';
import { useSelector } from 'react-redux';
import { FormInput } from '../../../../components';
import ContactDetails from '../../../../components/ContactDetails';

const List = () => {
    const navigate = useNavigate()

    const { loading, employee } = useSelector(
        (state) => ({
            loading: state.utiltities.loading,
            employee: state.Employees.employees,
        })
    );

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
                {employee.map(user => {
                    return (
                        <Col xl={6} md={6} key={user.id}>
                            <ContactDetails contact={user} />
                        </Col>
                    );
                })}
            </Row>
        </>
    );
};

export default List;