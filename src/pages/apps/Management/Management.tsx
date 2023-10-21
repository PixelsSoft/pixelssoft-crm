import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import PageTitle from '../../../components/PageTitle'

export default function Management() {
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Manage", path: "/apps/administartor/Management" },
                ]}
                title={"Manage"}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col lg={6}>
                                    <Row>
                                        <Col>
                                            <h3>Project Category</h3>
                                        </Col>
                                        <Col>
                                            <Button className="btn btn-danger mb-2">Add</Button>
                                        </Col>
                                    </Row>
                                    <li>Freelancer</li>
                                </Col>
                                <Col lg={6}>
                                    <Row>
                                        <Col>
                                            <h3>Project Category</h3>
                                        </Col>
                                        <Col>
                                            <Button className="btn btn-danger mb-2">Add</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
