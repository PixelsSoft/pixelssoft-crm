import { usePageTitle } from '../../../../hooks';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';

const CreateCustomer = () => {
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

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Form>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Email" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control />
                                    </Form.Group>
                                </Row>

                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control placeholder="1234 Main St" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGridAddress2">
                                    <Form.Label>Address 2</Form.Label>
                                    <Form.Control placeholder="Apartment, studio, or floor" />
                                </Form.Group>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Platform</Form.Label>
                                        <Form.Select>
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
                                        <Form.Select>
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

                                        <Button type="button" className="waves-effect waves-light mx-2">
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
