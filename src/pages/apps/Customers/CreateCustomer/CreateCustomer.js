import { Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
// import { createCustomer, resetCustomers } from '../../../../redux/customers/actions';
import { FormEventHandler, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageTitle from '../../../../components/PageTitle';
import { startLoading, stopLoading } from '../../../../redux/Slices/utiltities/Utiltities';
import { CONSTANTS } from '../../../../constants/constant';
import { toast } from 'react-toastify';

const CreateCustomer = () => {
    const { token, user } = useSelector(state => state.Auth);
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [title, setTitle] = useState('');
    const [paidAm, setPaidAm] = useState(0);
    const [total, setTotal] = useState(0);
    const [platform, setPlatform] = useState('');
    const [salePerson, setSalePerson] = useState('');
    const [plat, setPlat] = useState([]);
    const [cat, setCat] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();
        // dispatch(createCustomer({ email, fullName, phoneNumber, company, address, platform, salePerson }));
        dispatch(startLoading());

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

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        };

        await fetch(CONSTANTS.API_URLS.BASE + `customer`, options)
            .then(response => response.json())
            .then(e => {
                if (e.message == "Customer Created Successfully") {
                    toast.success(e.message, { position: toast.POSITION.TOP_RIGHT });
                    dispatch(stopLoading());
                    return;
                } else if (e.message[0] == 'The email has already been taken.') {
                    toast.error(e.message[0], { position: toast.POSITION.TOP_RIGHT });
                    dispatch(stopLoading());
                    return;
                } else {
                    dispatch(stopLoading());
                    toast.error('Something Went Wrong', { position: toast.POSITION.TOP_RIGHT });
                    return;
                };
            })
            .catch(err => {
                toast.error('Something Went Wrong', { position: toast.POSITION.TOP_RIGHT });
                dispatch(stopLoading());
                console.log('user err', err.response.data);
            });
    };

    const selectPlat = (e) => {
        e.preventDefault();
        setPlatform(e.target.value);
    };

    const changeCat = (e) => {
        e.preventDefault();
        setSalePerson(e.target.value);
    };

    const getPlatform = async () => {
        dispatch(startLoading());
        await fetch(CONSTANTS.API_URLS.BASE + 'platform', {
            headers: {
                'Accept': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then(e => {
                setPlat(e.data);
                dispatch(stopLoading());
            })
            .catch(err => {
                dispatch(stopLoading());
                console.log('getPlatform err', err);
            });
    };

    const getCategory = async () => {
        dispatch(startLoading());
        await fetch(CONSTANTS.API_URLS.BASE + 'category', {
            headers: {
                'Accept': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then(e => {
                setCat(e.data);
                dispatch(stopLoading());
            })
            .catch(err => {
                dispatch(stopLoading());
                console.log('getPlatform err', err);
            });
    };

    useEffect(() => {
        getPlatform();
        getCategory();
    }, []);

    return (
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
                                            {cat.map(val => {
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
