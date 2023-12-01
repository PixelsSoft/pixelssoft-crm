import { Button, Col, Modal, Row } from 'react-bootstrap';
// import PSLogo from '../assets/images/pixelssoft-logo-transparent.png';
import { useReactToPrint } from 'react-to-print';

export default function InvoicePreview({ previewModal, toggle, componentRef, details }) {
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
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
                        {/* <img src={PSLogo} width={250} height={50} alt="" /> */}
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
                            <span>{details?.name}</span>
                        </div>
                        <div className="d-flex flex-column">
                            <span style={{ fontWeight: 'bold' }}>Email:</span>
                            <span>{details?.email}</span>
                        </div>
                        <div className="d-flex flex-column">
                            <span style={{ fontWeight: 'bold' }}>Phone Number:</span>
                            <span>{details?.phone}</span>
                        </div>
                    </Col>

                    <Col>
                        <div className="d-flex justify-content-end">
                            <strong>Invoice #:</strong>
                            <span style={{ marginLeft: 5 }}>
                                {/* {details.invoiceNumber ? details?.invoiceNumber.data : '0000'} */}
                            </span>
                        </div>
                        <div className="d-flex justify-content-end">
                            <strong>Invoice Date:</strong>
                            <span style={{ marginLeft: 5 }}>{details?.invoice_date}</span>
                        </div>
                        <div className="d-flex justify-content-end">
                            <strong>Payment Due:</strong>
                            <span style={{ marginLeft: 5 }}>{details?.due_date}</span>
                        </div>
                        <div className="d-flex justify-content-end">
                            <strong>Amount Due ({details?.currency_code}):</strong>
                            <span style={{ marginLeft: 5 }}>${details?.price}</span>
                        </div>
                    </Col>
                </Row>

                <Row className="border-bottom border-gray my-3" />

                <div className="mt-3">
                    <Row className="my-2" style={{ height: '530px' }}>
                        <div>
                            <div className="d-flex flex-column">
                                <strong>Item:</strong>
                                <span>{details?.title}</span>
                            </div>
                            <div className="d-flex flex-column">
                                <strong>Description:</strong>
                                <p style={{ width: '50%', whiteSpace: 'pre-wrap' }}>{details?.description}</p>
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
                                    <span style={{ marginLeft: 5 }}>${details?.price}</span>
                                </div>

                                <div>
                                    <strong>Amount Due:</strong>
                                    <strong style={{ marginLeft: 5 }}>${details?.price}</strong>
                                </div>
                            </div>
                        </Row>
                        <Row className="mt-3 text-secondary p-1">
                            <div>
                                <span style={{ fontStyle: 'italic' }}>Notes:</span>
                                <p style={{ whiteSpace: 'pre-wrap' }}>{details?.notes}</p>
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
    );
}
