import { Button, Col, Modal, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';

const ViewInvoiceModal = ({ show, setShow, componentRef }) => {
    const { loading, singleInvoice } = useSelector(
        (state) => ({
            loading: state.utiltities.loading,
            singleInvoice: state.Invoices.singleInvoice,
        })
    );

    return loading ? (
        <h4>Loading...</h4>
    ) : (
        <Modal show={show} onHide={() => setShow(!show)} dialogClassName="" size="lg" scrollable={false}>
            <Modal.Header onHide={() => setShow(!show)} closeButton>
                <h4 className="modal-title">Receipt Preview</h4>
            </Modal.Header>

            <Modal.Body
                ref={componentRef}
                className="text-black px-3"
                style={{ width: '794px', height: '1123px', position: 'relative' }}>
                <Row>
                    <Col>
                        <div className="d-flex flex-column">
                            <span style={{ fontWeight: 'bold' }}>Bill To:</span>
                            <span>{singleInvoice?.customer?.name}</span>
                        </div>
                        <div className="d-flex flex-column">
                            <span style={{ fontWeight: 'bold' }}>Email:</span>
                            <span>{singleInvoice?.customer?.email}</span>
                        </div>
                        <div className="d-flex flex-column">
                            <span style={{ fontWeight: 'bold' }}>Phone Number:</span>
                            <span>{singleInvoice?.customer?.phone}</span>
                        </div>
                    </Col>

                    <Col>
                        <div className="d-flex justify-content-end">
                            <strong>Invoice #:</strong>
                            <span style={{ marginLeft: 5 }}>
                                {singleInvoice?.invoice_key}
                            </span>
                        </div>
                        <div className="d-flex justify-content-end">
                            <strong>Invoice Date:</strong>
                            <span style={{ marginLeft: 5 }}>{singleInvoice?.invoice_date}</span>
                        </div>
                        <div className="d-flex justify-content-end">
                            <strong>Payment Due:</strong>
                            <span style={{ marginLeft: 5 }}>{singleInvoice?.due_date}</span>
                        </div>
                        <div className="d-flex justify-content-end">
                            <strong>Amount Due ({singleInvoice?.currency_code}):</strong>
                            <span style={{ marginLeft: 5 }}>${singleInvoice?.price}</span>
                        </div>
                    </Col>
                </Row>

                <Row className="border-bottom border-gray my-3" />

                <div className="mt-3">
                    <Row className="my-2" style={{ height: '530px' }}>
                        <div>
                            <div className="d-flex flex-column">
                                <strong>Item:</strong>
                                <span>{singleInvoice?.title}</span>
                            </div>
                            <div className="d-flex flex-column">
                                <strong>Description:</strong>
                                <p style={{ width: '50%', whiteSpace: 'pre-wrap' }}>{singleInvoice?.description}</p>
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
                                    <span style={{ marginLeft: 5 }}>${singleInvoice?.price}</span>
                                </div>

                                {/* <div>
                                    <strong>Amount Due:</strong>
                                    <strong style={{ marginLeft: 5 }}>${singleInvoice?.price}</strong>
                                </div> */}
                            </div>
                        </Row>
                        <Row className="mt-3 text-secondary p-1">
                            <div>
                                <span style={{ fontStyle: 'italic' }}>Notes:</span>
                                <p style={{ whiteSpace: 'pre-wrap' }}>{singleInvoice?.notes}</p>
                            </div>
                        </Row>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={() => setShow(!show)}>
                    Close
                </Button>{' '}
                {/* <Button onClick={handlePrint}>Print</Button> */}
            </Modal.Footer>
        </Modal>
    )
}

export default ViewInvoiceModal