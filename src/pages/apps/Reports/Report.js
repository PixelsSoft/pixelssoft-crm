import { useState } from 'react';
import PageTitle from '../../../components/PageTitle';
import { Row, Col, Button, Card, Form } from "react-bootstrap";
import { FormInput } from '../../../components';

const Report = () => {
    const [startDate, setStartData] = useState('')
    const [endDate, setEndDate] = useState('');

    return (
        <>
            <PageTitle title={"Reports"} />
            <Card>
                <Card.Body>
                    <Row>
                        <Col md={6} xl={3}>
                            <FormInput
                                label="Start Date"
                                type="date"
                                name="date"
                                containerClass={'mb-3'}
                                key="date"
                                value={startDate}
                                onChange={(e) => setStartData(e.target.value)}
                            />
                        </Col>
                        <Col md={6} xl={3}>
                            <FormInput
                                label="End Date"
                                type="date"
                                name="date"
                                containerClass={'mb-3'}
                                key="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </Col>
                        <Col md={6} xl={3}>
                            <Button className='rounded-pill mt-3' type="button">
                                Filter
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    {/* <Row>
                        <Col md={6} xl={3}>
                            <Form.Label>Start Date: </Form.Label>
                            <Form.Label> 17-10-2023</Form.Label>
                        </Col>
                        <Col md={6} xl={3}>
                            <Form.Label>End Date: </Form.Label>
                            <Form.Label> 17-10-2023</Form.Label>
                        </Col>
                    </Row> */}
                    <Row>
                        <Col md={6} xl={4}>
                            <Form.Label>Revenue</Form.Label>
                        </Col>
                        <Col md={6} xl={4}>
                            <Form.Label>Expenditure</Form.Label>
                        </Col>
                        <Col md={6} xl={4}>
                            <Form.Label>Net Profit</Form.Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} xl={4}>
                            <h1 className="display-6 d-flex justify-content-end">100,000</h1>
                        </Col>
                        <Col md={6} xl={4}>
                            <h1 className="display-6 d-flex justify-content-end">25,000</h1>
                        </Col>
                        <Col md={6} xl={4}>
                            <h1 className="display-6 d-flex justify-content-end">75,000</h1>
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <br />
                    <Row className='d-flex justify-content-center'>
                        <Col md={4} xl={4}>
                            <hr />
                        </Col>
                        <Col md={4} xl={2}>
                            <p className="header-title mt-2 d-flex justify-content-center">Summary</p>
                        </Col>
                        <Col md={4} xl={4}>
                            <hr />
                        </Col>
                    </Row>
                    <Row className='d-flex justify-content-center'>
                        <Col xl={8}>
                            <div className='d-flex justify-content-between'>
                                <Form.Label>Lead Projects</Form.Label>
                                <Form.Label>100,000</Form.Label>
                            </div>
                            <hr />
                            <div className='d-flex justify-content-between'>
                                <Form.Label>Projects</Form.Label>
                                <Form.Label>25,000</Form.Label>
                            </div>
                            <hr />
                        </Col>
                    </Row>
                    <Row className='d-flex justify-content-center'>
                        <Col xl={8}>
                            <h4>Expences</h4>
                            <div className='d-flex justify-content-between'>
                                <Form.Label>Computer</Form.Label>
                                <Form.Label>1,000</Form.Label>
                            </div>
                            <hr />
                            {/* <div className='d-flex justify-content-between'>
                                <Form.Label>Utility Bills</Form.Label>
                                <Form.Label>25,000</Form.Label>
                            </div>
                            <hr /> */}
                        </Col>
                    </Row>
                    <Row className='d-flex justify-content-center'>
                        <Col xl={8}>
                            <h4>Revenue</h4>
                            <div className='d-flex justify-content-between'>
                                <Form.Label>Computer</Form.Label>
                                <Form.Label>1,000</Form.Label>
                            </div>
                            <hr />
                            {/* <div className='d-flex justify-content-between'>
                                <Form.Label>Utility Bills</Form.Label>
                                <Form.Label>25,000</Form.Label>
                            </div>
                            <hr /> */}
                        </Col>
                    </Row>
                </Card.Body>
            </Card >
        </>
    )
}

export default Report