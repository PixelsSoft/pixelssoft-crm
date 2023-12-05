import { useState } from 'react';
import PageTitle from '../../../components/PageTitle';
import { Row, Col, Button, Card } from "react-bootstrap";
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
        </>
    )
}

export default Report