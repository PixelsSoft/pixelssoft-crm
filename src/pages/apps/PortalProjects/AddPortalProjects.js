import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageTitle from '../../../components/PageTitle';
import { FormInput } from '../../../components';
import { CreateProject } from '../../../redux/Slices/Project/Project';
import Spinner from '../../../components/Spinner';
import { startLoading, stopLoading } from '../../../redux/Slices/utiltities/Utiltities';

const AddPortalProjects = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [bidBy, setBidBy] = useState();
    const [perName, setPerName] = useState();
    const [platId, setPlatId] = useState();
    const [selectCat, setSelectCat] = useState();
    const [title, setTitle] = useState();
    const [desc, setDesc] = useState();
    const [total, setTotal] = useState();
    const [paidAm, setPaidAm] = useState();

    const { token, category, platforms, employee, loading } = useSelector(
        (state) => ({
            token: state.Auth.token,
            category: state.Category.category,
            platforms: state.Platform.platform,
            employee: state.Employees.employees,
            loading: state.utiltities.loading,
        })
    );

    const onSubmit = async (e) => {
        dispatch(startLoading());
        e.preventDefault();
        const data = {
            title: title,
            description: desc,
            bid_by: bidBy,
            closed_by: perName,
            platform_id: platId,
            category_id: selectCat,
            paid_amount: paidAm,
            total_amount: total,
            type: "portal"
        };
        await dispatch(CreateProject(data, token));
        dispatch(stopLoading());
    };

    const filterSales = () => {
        if (employee.length > 0) {
            const filteredArray = employee.filter((item) => item.roles.some((role) => role.name === "Sales"));
            setData(filteredArray);
        };
    };

    useEffect(() => {
        filterSales();
    }, [employee]);

    return loading ? (
        <div className='d-flex justify-content-center align-items-center'>
            <Spinner className="m-2" color={'primary'} />
        </div>
    ) : (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Portal Projects", path: "/apps/portalProjects" },
                    { label: "Add Portal Projects", path: "/apps/portalProjects/addportalProject", active: true },
                ]}
                title={"Add Projects"}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={onSubmit}>
                                {/* {error && (
                                    <Alert variant="danger" className="my-2">
                                        {error}
                                    </Alert>
                                )}
                                {data && (
                                    <Alert variant="success" className="my-2">
                                        {data.message}
                                    </Alert>
                                )} */}
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Bidder Name</Form.Label>
                                        <Form.Select onChange={(e) => setBidBy(e.target.value)}>
                                            <option>Choose...</option>
                                            {data.map(val => {
                                                return (
                                                    <option key={val.id} value={val.id}>{val.name}</option>
                                                );
                                            })}
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Sale Person Name</Form.Label>
                                        <Form.Select onChange={(e) => setPerName(e.target.value)}>
                                            <option>Choose...</option>
                                            {data.map(val => {
                                                return (
                                                    <option key={val.id} value={val.id}>{val.name}</option>
                                                );
                                            })}
                                        </Form.Select>
                                    </Form.Group>


                                </Row>


                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Project Title</Form.Label>
                                        <Form.Control
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Paid Amount</Form.Label>
                                        <Form.Control
                                            value={paidAm}
                                            onChange={(e) => setPaidAm(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Total Amount</Form.Label>
                                        <Form.Control
                                            value={total}
                                            onChange={(e) => setTotal(e.target.value)}
                                        />
                                    </Form.Group>

                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Platform</Form.Label>
                                        <Form.Select onChange={(e) => setPlatId(e.target.value)}>
                                            <option>Choose...</option>
                                            {platforms.map(val => {
                                                return (
                                                    <option key={val.id} value={val.id}>{val.title}</option>
                                                );
                                            })}
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Project Category</Form.Label>
                                        <Form.Select onChange={(e) => setSelectCat(e.target.value)}>
                                            <option>Choose...</option>
                                            {category.map(val => {
                                                return (
                                                    <option key={val.id} value={val.id}>{val.title}</option>
                                                );
                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <FormInput
                                        label="Description"
                                        type="textarea"
                                        name="textarea"
                                        containerClass={'mb-3'}
                                        key="textarea"
                                        value={desc}
                                        onChange={(e) => setDesc(e.target.value)}
                                    />
                                </Row>

                                <Row>
                                    <Col>
                                        <Button
                                            type="button"
                                            className="waves-effect waves-light"
                                            variant="outline-primary">
                                            Cancel
                                        </Button>

                                        <Button type="submit" className="waves-effect waves-light mx-2">
                                            Save
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row >
        </>
    );
};

export default AddPortalProjects;
