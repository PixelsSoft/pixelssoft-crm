import { usePageTitle } from '../../../../hooks';
import { Row, Col, Card, Button, Form, Table } from 'react-bootstrap';
import { records } from './data';

const CreateInvoice = () => {
    usePageTitle({
        title: 'Create Invoice',
        breadCrumbItems: [
            {
                path: '/apps/invoice/create-invoice',
                label: 'Apps',
            },
            {
                path: '/apps/invoice/create-invoice',
                label: 'Create Invoice',
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
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Language</Form.Label>
                                        <Form.Select defaultValue="Choose...">
                                            <option>Choose...</option>
                                            <option>Option 1</option>
                                            <option>Option 2</option>
                                            <option>Option 3</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Currency</Form.Label>
                                        <Form.Select defaultValue="Choose...">
                                            <option>Choose...</option>
                                            <option>PKR</option>
                                            <option>USD</option>
                                            <option>CAD</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <h3 className="mb-3 mt-4">Customer Details</h3>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Email" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Invoice #</Form.Label>
                                        <Form.Control value={1224} disabled />
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
                                        <Form.Label>Invoice Date</Form.Label>
                                        <Form.Control type="date" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Due Date</Form.Label>
                                        <Form.Control type="date" />
                                    </Form.Group>
                                </Row>

                                <div className="table-responsive">
                                    <Table className="mb-3">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Item</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(records || []).map((record, index) => {
                                                return (
                                                    <tr key={index.toString()}>
                                                        <th scope="row">{record.id}</th>
                                                        <td>Website Development</td>
                                                        <td>1</td>
                                                        <td>$2000</td>
                                                        <td>$2000</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </div>

                                <Button type="submit" className="waves-effect waves-light">
                                    Send Email
                                </Button>
                                <Button type="submit" className="waves-effect waves-light mx-2">
                                    Generate Link
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default CreateInvoice;
