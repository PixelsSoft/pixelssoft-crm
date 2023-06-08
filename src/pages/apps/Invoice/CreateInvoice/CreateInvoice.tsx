import { usePageTitle } from '../../../../hooks';
import { Row, Col, Card, Button, Form, Table, Modal } from 'react-bootstrap';
import { useRef, useState } from 'react';
import PSLogo from '../../../../assets/images/pixelssoft-logo-transparent.png';
import { FormInput } from '../../../../components/form';
import { useReactToPrint } from 'react-to-print';

const CreateInvoice = () => {
    const [previewModal, setPreviewModal] = useState(false);

    const toggle = () => setPreviewModal(!previewModal);

    const componentRef = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

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
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Select Customer (Auto Fill)</Form.Label>
                                        <Form.Select defaultValue="Choose...">
                                            <option>Choose...</option>
                                            <option>Option 1</option>
                                            <option>Option 2</option>
                                            <option>Option 3</option>
                                        </Form.Select>
                                    </Form.Group>
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

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Project Category</Form.Label>
                                        <Form.Select defaultValue="Choose...">
                                            <option>Choose...</option>
                                            <option>Website Development</option>
                                            <option>Logo Design</option>
                                            <option>App Development</option>
                                        </Form.Select>
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
                                                <th>Item</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <Form.Select defaultValue="Choose...">
                                                        <option>Choose...</option>
                                                        <option>Website Development</option>
                                                        <option>Logo Design</option>
                                                        <option>App Development</option>
                                                    </Form.Select>
                                                </td>
                                                <td>
                                                    <Form.Control value={1} />
                                                </td>
                                                <td>
                                                    <Form.Control value={'$' + 2000} />
                                                </td>
                                                <td>$2000</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <Row>
                                        <FormInput
                                            label="Memo / Notes"
                                            type="textarea"
                                            name="textarea"
                                            rows={5}
                                            containerClass={'mb-3'}
                                            // register={register}
                                            key="textarea"
                                            // errors={errors}
                                            // control={control}
                                        />
                                    </Row>
                                </div>
                                <Row>
                                    <Col>
                                        <Button type="submit" className="waves-effect waves-light">
                                            Send Email
                                        </Button>
                                        <Button type="button" className="waves-effect waves-light mx-2">
                                            Generate Link
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={toggle}
                                            className="waves-effect waves-light"
                                            variant="outline-primary">
                                            Preview
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>

                            <Modal show={previewModal} onHide={toggle} dialogClassName="" size="lg" scrollable={false}>
                                <Modal.Header onHide={toggle} closeButton>
                                    <h4 className="modal-title">Receipt Preview</h4>
                                </Modal.Header>

                                <Modal.Body
                                    ref={componentRef}
                                    className="text-black px-3"
                                    style={{ width: '794px', height: '1123px', position: 'relative' }}>
                                    <Row className="align-items-center">
                                        <Col>
                                            <img src={PSLogo} width={250} height={50} alt="" />
                                        </Col>
                                        <Col className="d-flex justify-content-end">
                                            <div className="d-flex align-items-end flex-column">
                                                <h2>Invoice</h2>
                                                <span style={{ fontWeight: 'bold' }}>Pixels Soft</span>
                                                <span className="text-end">pixelssoft22@gmail.com</span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="border-bottom border-secondary my-3" />

                                    <Row>
                                        <Col>
                                            <div className="d-flex flex-column">
                                                <span style={{ fontWeight: 'bold' }}>Bill To:</span>
                                                <span>Diamond Hardy</span>
                                            </div>
                                            <div className="d-flex flex-column">
                                                <span style={{ fontWeight: 'bold' }}>Email:</span>
                                                <span>d.hardy1@yahoo.com</span>
                                            </div>
                                            <div className="d-flex flex-column">
                                                <span style={{ fontWeight: 'bold' }}>Phone Number:</span>
                                                <span>+1 484-640-8904</span>
                                            </div>
                                        </Col>

                                        <Col>
                                            <div className="d-flex justify-content-end">
                                                <strong>Invoice #:</strong>
                                                <span style={{ marginLeft: 5 }}>0001</span>
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <strong>Invoice Date:</strong>
                                                <span style={{ marginLeft: 5 }}>2023-06-08</span>
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <strong>Payment Due:</strong>
                                                <span style={{ marginLeft: 5 }}>2023-06-08</span>
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <strong>Amount Due (USD):</strong>
                                                <span style={{ marginLeft: 5 }}>$35</span>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className="border-bottom border-gray my-3" />

                                    <div className="mt-3">
                                        <Row className="my-2" style={{ height: '530px' }}>
                                            <div>
                                                <div className="d-flex flex-column">
                                                    <strong>Item:</strong>
                                                    <span>Logo Design</span>
                                                </div>
                                                <div className="d-flex flex-column">
                                                    <strong>Description:</strong>
                                                    <p style={{ width: '50%' }}>Logo will be delivered in 2 days.</p>
                                                </div>
                                            </div>
                                            {/* <div className="d-flex mt-2 flex-column">
                                            </div> */}
                                        </Row>
                                        <Row className="border-bottom border-gray my-3" />
                                        <div>
                                            <Row>
                                                <div className="d-flex flex-column align-items-end">
                                                    <div>
                                                        <strong>Total:</strong>
                                                        <span style={{ marginLeft: 5 }}>$35</span>
                                                    </div>

                                                    <div>
                                                        <strong>Amount Due:</strong>
                                                        <strong style={{ marginLeft: 5 }}>$35</strong>
                                                    </div>
                                                </div>
                                            </Row>
                                            <Row className="mt-3 text-secondary p-1">
                                                <div>
                                                    <span style={{ fontStyle: 'italic' }}>Notes:</span>
                                                    {/* <p>asidjsoajdosaijdoisajdiosajdiosa</p> */}
                                                </div>
                                            </Row>
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="light" onClick={toggle}>
                                        Close
                                    </Button>{' '}
                                    <Button onClick={handlePrint}>Print</Button>
                                </Modal.Footer>
                            </Modal>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default CreateInvoice;
