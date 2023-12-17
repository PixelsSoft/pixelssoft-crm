import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageTitle from '../../../components/PageTitle';
import { FormInput } from '../../../components';
import { CreateProject } from '../../../redux/Slices/Project/Project';
import Spinner from '../../../components/Spinner';
import { startLoading, stopLoading } from '../../../redux/Slices/utiltities/Utiltities';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import utils from '../../../utils/utils';

const AddLeadProjets = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [bidBy, setBidBy] = useState();
    const [perName, setPerName] = useState();
    const [platId, setPlatId] = useState();
    const [selectCat, setSelectCat] = useState();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [total, setTotal] = useState(0);
    const [paidAm, setPaidAm] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [num, setNum] = useState('')

    const { token, category, platforms, employee, loading } = useSelector(
        (state) => ({
            token: state.Auth.token,
            category: state.Category.category,
            platforms: state.Platform.platform,
            employee: state.Employees.employees,
            loading: state.utiltities.loading,
        })
    );

    const reset = () => {
        setBidBy()
        setPerName()
        setPlatId()
        setSelectCat()
        setTitle()
        setDesc()
        setTotal()
        setPaidAm()
        setName()
        setEmail()
        setNum()
    }

    const onSubmit = async (e) => {
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
            type: "lead"
        };
        if (!utils.validateEmail(email)) {
            return toast.error('Enter correct client email', { position: toast.POSITION.TOP_RIGHT });
        }
        if (bidBy === undefined || perName === undefined || platId === undefined || platId === 'Choose...' || selectCat === 'Choose...' || selectCat === undefined || title === '' || desc === '' || total === '' || paidAm === '') {
            toast.error('Please enter all fields', { position: toast.POSITION.TOP_RIGHT });
            return
        }
        dispatch(startLoading());
        await dispatch(CreateProject(data, token, reset));
        dispatch(stopLoading());
    };

    const filterSales = () => {
        if (employee.length > 0) {
            const filteredArray = employee.filter((item) => item.roles.some((role) => role.name === "Sales"));
            setData(filteredArray);
        };
    };

    const totalAmount = (e) => {
        if (e.target.value >= 0) {
            setTotal(e.target.value)
        }
    }

    const paidAmount = (e) => {
        if (e.target.value >= 0) {
            setPaidAm(e.target.value)
        }
    }

    const number = (e) => {
        if (e.target.value >= 0) {
            setNum(e.target.value)
        }
    }

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
                title={"Add Lead Projects"}
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
                                        <Form.Label>Scrapper Name</Form.Label>
                                        <Form.Select onChange={(e) => setBidBy(e.target.value)}>
                                            <option>Choose...</option>
                                            {data?.map(val => {
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
                                            {data?.map(val => {
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
                                            onChange={(e) => paidAmount(e)}
                                            type='number'
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Total Amount</Form.Label>
                                        <Form.Control
                                            value={total}
                                            onChange={(e) => totalAmount(e)}
                                            type='number'
                                        />
                                    </Form.Group>

                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Client Name</Form.Label>
                                        <Form.Control
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Client Email</Form.Label>
                                        <Form.Control
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Client Number</Form.Label>
                                        <Form.Control
                                            type='number'
                                            value={num}
                                            onChange={(e) => number(e)}
                                        />
                                    </Form.Group>

                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Platform</Form.Label>
                                        <Form.Select onChange={(e) => setPlatId(e.target.value)}>
                                            <option>Choose...</option>
                                            {platforms?.map(val => {
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
                                            {category?.map(val => {
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
                                            variant="outline-primary"
                                            onClick={() => navigate('/apps/leadProjects')}
                                        >
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
}

export default AddLeadProjets