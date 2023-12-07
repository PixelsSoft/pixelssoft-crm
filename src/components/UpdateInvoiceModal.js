import { useRef, useState } from 'react'
import { Col, Modal, Row, Table, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading } from '../redux/Slices/utiltities/Utiltities';
import { UpdateInvoice } from '../redux/Slices/Invoices/Invoices';
import FormInput from './FormInput';
import Spinner from './Spinner';

const UpdateInvoiceModal = ({ id, previewModal, setPreviewModal, toggleClose, }) => {
    const { token, loading, singleInvoice } = useSelector(
        (state) => ({
            token: state.Auth.token,
            loading: state.utiltities.loading,
            singleInvoice: state.Invoices.singleInvoice,
        })
    );

    const dispatch = useDispatch();
    const [currency, setCurrency] = useState(singleInvoice?.currency_code);
    const [projectName, setProjectName] = useState(singleInvoice?.title);
    const [invoiceDate, setInvoiceDate] = useState(singleInvoice?.invoice_date);
    const [dueDate, setDueDate] = useState(singleInvoice?.due_date);
    const [price, setPrice] = useState(singleInvoice?.price);
    const [quantity, setQuantity] = useState(singleInvoice?.quantity);
    const [description, setDescription] = useState(singleInvoice?.description);
    const [memo, setMemo] = useState(singleInvoice?.notes);
    const componentRef = useRef();

    const update = async () => {

        const data = {
            invoice_date: invoiceDate,
            due_date: dueDate,
            title: projectName,
            quantity: quantity,
            price: price,
            currency_code: currency,
            description: description,
            notes: memo,
        };

        dispatch(startLoading())
        await dispatch(UpdateInvoice(id, data, token));
        dispatch(stopLoading())
        setPreviewModal(!previewModal);
    }

    return loading ? (
        <div className='d-flex justify-content-center'>
            <Spinner className="m-2" color={'primary'} />
        </div>
    ) : (
        <Modal show={previewModal} onHide={toggleClose} dialogClassName="" size="lg" scrollable={false}>
            <Modal.Header onHide={toggleClose} closeButton>
                <h4 className="modal-title">Edit Invoice</h4>
            </Modal.Header>

            <Modal.Body
                ref={componentRef}
                className="text-black px-3"
                style={{ width: '794px', height: '700px', position: 'relative' }}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Currency</Form.Label>
                        <Form.Select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <option value={undefined}>Choose...</option>
                            <option value="PKR">Pakistani Rupee (PKR)</option>
                            <option value="GBP">UK Pound (GBP)</option>
                            <option value="USD">US Dollars (USD)</option>
                            <option value="EUR">Europe EURO (EUR)</option>
                            <option value="CAD">Canadian Dollars (CAD)</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Invoice Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={invoiceDate}
                            onChange={(e) => setInvoiceDate(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </Form.Group>
                </Row>

                <div className="table-responsive">
                    <Table className="mb-3">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Form.Control
                                        value={projectName}
                                        onChange={(e) => setProjectName(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <Form.Control
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                                    />
                                </td>
                                <td>
                                    <Form.Control
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(parseInt(e.target.value))}
                                    />
                                </td>
                                <td>${quantity * price}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Row>
                        <Col>
                            <FormInput
                                label="Description"
                                type="textarea"
                                name="textarea"
                                containerClass={'mb-3'}
                                key="textarea"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <FormInput
                                label="Memo / Notes"
                                type="textarea"
                                name="textarea"
                                containerClass={'mb-3'}
                                key="textarea"
                                value={memo}
                                onChange={(e) => setMemo(e.target.value)}
                            />
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={toggleClose}>Close</Button>{' '}
                <Button onClick={update}>Update</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateInvoiceModal;