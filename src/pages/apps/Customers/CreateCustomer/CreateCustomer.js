import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageTitle from '../../../../components/PageTitle';
import { toast } from 'react-toastify';
import { CreateCustomerAPI } from '../../../../redux/Slices/Customer/customer';
import Spinner from '../../../../components/Spinner';

const CreateCustomer = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [title, setTitle] = useState('');
    const [paidAm, setPaidAm] = useState(0);
    const [total, setTotal] = useState(0);
    const [platform, setPlatform] = useState('');
    const [salePerson, setSalePerson] = useState('');

    const reset = () => {
        setEmail('');
        setFullName('');
        setPhoneNumber('');
        setTitle('');
        setPlatform('');
        setSalePerson('');
        setPaidAm(0);
        setTotal(0);
    }

    const { token, user, category, plat, loading } = useSelector(
        (state) => ({
            token: state.Auth.token,
            user: state.Auth,
            category: state.Category.category,
            plat: state.Platform.platform,
            loading: state.utiltities.loading,
        })
    );

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            return toast.error('Enter Email', { position: toast.POSITION.TOP_RIGHT });
        };
        if (!platform) {
            return toast.error('Select Platform', { position: toast.POSITION.TOP_RIGHT });
        };
        if (!salePerson) {
            return toast.error('Select Project Category', { position: toast.POSITION.TOP_RIGHT });
        };

        const data = {
            created_by: user.id,
            email: email,
            name: fullName,
            phone: phoneNumber,
            project_title: title,
            paid_amount: JSON.parse(paidAm),
            total_amount: JSON.parse(total),
            platform: platform,
            category_id: salePerson
        };

        dispatch(CreateCustomerAPI(data, token, reset))
    };

    const selectPlat = (e) => {
        e.preventDefault();
        setPlatform(e.target.value);
    };

    const changeCat = (e) => {
        e.preventDefault();
        setSalePerson(e.target.value);
    };

    return loading ? (
        <div className='d-flex justify-content-center align-items-center'>
            <Spinner className="m-2" color={'primary'} />
        </div>
    ) : (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Customer", path: "/apps/customer/" },
                    { label: "Add Customer", path: "/apps/customer/addCustomer", active: true },
                ]}
                title={"Add Customer"}
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
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
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
                                        <Form.Select onChange={(e) => selectPlat(e)}>
                                            <option>Choose...</option>
                                            {plat.map(val => {
                                                return (
                                                    <option key={val.id}>{val.title}</option>
                                                );
                                            })}
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Project Category</Form.Label>
                                        <Form.Select
                                            onChange={(e) => changeCat(e)}
                                        >
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
            </Row>
        </>
    );
};

export default CreateCustomer;
