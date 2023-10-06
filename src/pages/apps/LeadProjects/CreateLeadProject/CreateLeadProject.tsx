import { usePageTitle, useRedux } from '../../../../hooks';
import { Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
// import { createCustomer, resetCustomers } from '../../../../redux/customers/actions';
import { FormEventHandler, useEffect, useState } from 'react';
import { FormInput } from '../../../../components/form';

const CreateLeadProject
    = () => {
        const { dispatch, appSelector } = useRedux();

        const [link, setlink] = useState('');
        const [createdMilestone, setCreatedMilestone] = useState('');
        const [phoneNumber, setPhoneNumber] = useState('');
        const [address, setAddress] = useState('');
        const [platform, setPlatform] = useState('');
        const [salePerson, setSalePerson] = useState('');
        const [company, setCompany] = useState('');



        const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
            e.preventDefault();
            // dispatch(createCustomer({ email, fullName, phoneNumber, company, address, platform, salePerson }));
        };

        usePageTitle({
            title: 'Create Portal Project',
            breadCrumbItems: [
                {
                    path: '/apps/portalProject/profile/new',
                    label: 'Apps',
                },
                {
                    path: '/apps/portalProject/profile/new',
                    label: 'Create Customer',
                    active: true,
                },
            ],
        });


        useEffect(() => {
            return () => {
                // dispatch(resetCustomers());
            };
        }, [dispatch]);
        return (
            <>
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
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                type="Name"
                                                placeholder="Name"
                                                value={link}
                                                onChange={(e) => setlink(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGridState">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGridState">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control
                                                value={createdMilestone}
                                                onChange={(e) => setCreatedMilestone(e.target.value)}
                                            />
                                        </Form.Group>


                                    </Row>


                                    <Row className="mb-3">

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

                                        <Form.Group as={Col} controlId="formGridState">
                                            <Form.Label>Platform</Form.Label>
                                            <Form.Select onChange={(e) => setPlatform(e.target.value)}>
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
                                    </Row>

                                    <Row className="mb-3">


                                        <Form.Group as={Col} controlId="formGridState">
                                            <Form.Label>Scraper</Form.Label>
                                            <Form.Select onChange={(e) => setSalePerson(e.target.value)}>
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
                                            <Form.Select onChange={(e) => setSalePerson(e.target.value)}>
                                                <option>Choose...</option>
                                                <option>Daniyal</option>
                                                <option>Saad</option>
                                                <option>Taimoor</option>
                                                <option>Usama</option>
                                                <option>Huzaifa</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGridState">
                                            <Form.Label>Project Category</Form.Label>
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
                                    <Row className="mb-3">
                                        <FormInput
                                            label="Complete Project Details"
                                            type="textarea"
                                            name="Complete Project Details"
                                            rows={5}
                                            containerClass={'mb-3'}

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
                </Row>
            </>
        );
    };

export default CreateLeadProject;
