import Spinner from './Spinner'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';

const ViewExpense = ({ show, setShow }) => {
    const { loading, singleExpense } = useSelector(
        (state) => ({
            loading: state.utiltities.loading,
            singleExpense: state.Expense.singleExpense,
        })
    );

    return loading ? (
        <div className='d-flex justify-content-center'>
            <Spinner className="m-2" color={'primary'} />
        </div>
    ) : (
        <Modal show={show} onHide={() => setShow(!show)} dialogClassName="" size="lg" scrollable={false}>
            <Modal.Header onHide={() => setShow(!show)} closeButton>
                <h4 className="modal-title">Receipt Preview</h4>
            </Modal.Header>
            <Modal.Body className="text-black px-3" style={{ width: '794px', height: '500px', position: 'relative' }}>
                <Row className='mb-3'>
                    <Col>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Col>
                                <Form.Label>Title</Form.Label>
                            </Col>
                            <Col>
                                <Form.Label>{singleExpense?.title}</Form.Label>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group as={Col} controlId="formGridState">
                            <Col>
                                <Form.Label>Invoice Date</Form.Label>
                            </Col>
                            <Col>
                                <Form.Label>{singleExpense?.invoice_date}</Form.Label>
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Col>
                                <Form.Label>Amount</Form.Label>
                            </Col>
                            <Col>
                                <Form.Label>{singleExpense?.amount}</Form.Label>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group as={Col} controlId="formGridState">
                            <Col>
                                <Form.Label>Pay By</Form.Label>
                            </Col>
                            <Col>
                                <Form.Label>{singleExpense?.pay_by}</Form.Label>
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={() => setShow(!show)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ViewExpense;