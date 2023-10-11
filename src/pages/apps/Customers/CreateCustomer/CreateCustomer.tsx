import { Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
// import { createCustomer, resetCustomers } from '../../../../redux/customers/actions';
import { FormEventHandler, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PageTitle from '../../../../components/PageTitle';

const CreateCustomer = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [platform, setPlatform] = useState('');
    const [salePerson, setSalePerson] = useState('');
    const [company, setCompany] = useState('');



    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        // dispatch(createCustomer({ email, fullName, phoneNumber, company, address, platform, salePerson }));
    };



    useEffect(() => {
        return () => {
            // dispatch(resetCustomers());
        };
    }, [dispatch]);
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
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Paid Amount</Form.Label>
                                        <Form.Control
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Total Amount</Form.Label>
                                        <Form.Control
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </Form.Group>

                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Platform</Form.Label>
                                        <Form.Select
                                        //  onChange={(e) => setPlatform(e.target.value)}
                                        >
                                            <option>Choose...</option>
                                            <option>Upwork</option>
                                            <option>Fiverr</option>
                                            <option>Freelancer</option>
                                            <option>Social Media</option>
                                            <option>Bark</option>
                                            <option>Linkedin</option>
                                            <option>Scrapped</option>
                                            <option>None of above</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Bidder/Scraper</Form.Label>
                                        <Form.Select
                                        //  onChange={(e) => setSalePerson(e.target.value)}
                                        >
                                            <option>Choose...</option>
                                            <option>Daniyal</option>
                                            <option>Saad</option>
                                            <option>Taimoor</option>
                                            <option>Usama</option>
                                            <option>Huzaifa</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Sale Person</Form.Label>
                                        <Form.Select
                                        //  onChange={(e) => setSalePerson(e.target.value)}
                                        >
                                            <option>Choose...</option>
                                            <option>Daniyal</option>
                                            <option>Saad</option>
                                            <option>Taimoor</option>
                                            <option>Usama</option>
                                            <option>Huzaifa</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Project Category</Form.Label>
                                        <Form.Select
                                        // onChange={(e) => setSalePerson(e.target.value)}
                                        >
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
