import { usePageTitle, useRedux } from '../../../../hooks';
import { Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { createCustomer, resetCustomers } from '../../../../redux/customers/actions';
import { FormEventHandler, useEffect, useState } from 'react';

const CreateCustomer = () => {
    const { dispatch, appSelector } = useRedux();

    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [address2, setAddress2] = useState('');
    const [platform, setPlatform] = useState('');
    const [salePerson, setSalePerson] = useState('');
    const [company, setCompany] = useState('');

    const { error, createCustomerSuccess, data } = appSelector((state) => ({
        error: state.Customer.error,
        createCustomerSuccess: state.Customer.createCustomerSuccess,
        data: state.Customer.data,
    }));

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        dispatch(createCustomer({ email, fullName, phoneNumber, company, address, address2, platform, salePerson }));
    };

    usePageTitle({
        title: 'Create Customer',
        breadCrumbItems: [
            {
                path: '/apps/customers/new',
                label: 'Apps',
            },
            {
                path: '/apps/customers/new',
                label: 'Create Customer',
                active: true,
            },
        ],
    });

    useEffect(() => {
        const reset = () => {
            if (createCustomerSuccess) {
                setEmail('');
                setFullName('');
                setPhoneNumber('');
                setAddress('');
                setAddress2('');
                setCompany('');
            }
        };

        reset();
    }, [createCustomerSuccess]);

    useEffect(() => {
        return () => {
            dispatch(resetCustomers());
        };
    }, [dispatch]);
    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={onSubmit}>
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

                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        placeholder="1234 Main St"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGridAddress2">
                                    <Form.Label>Address 2</Form.Label>
                                    <Form.Control
                                        placeholder="Apartment, studio, or floor"
                                        value={address2}
                                        onChange={(e) => setAddress2(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGridAddress2">
                                    <Form.Label>Company</Form.Label>
                                    <Form.Control
                                        placeholder=""
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                    />
                                </Form.Group>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Platform</Form.Label>
                                        <Form.Select onChange={(e) => setPlatform(e.target.value)}>
                                            <option>Choose...</option>
                                            <option>Upwork</option>
                                            <option>Fiverr</option>
                                            <option>Freelancer</option>
                                            <option>Social Media</option>
                                            <option>None of above</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Sale Person</Form.Label>
                                        <Form.Select onChange={(e) => setSalePerson(e.target.value)}>
                                            <option>Choose...</option>
                                            <option>Daniyal</option>
                                            <option>Saad</option>
                                            <option>Taimoor</option>
                                            <option>Usama</option>
                                            <option>Huzaifa</option>
                                        </Form.Select>
                                    </Form.Group>
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
