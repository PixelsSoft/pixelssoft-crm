import { Card, Col, Row } from 'react-bootstrap'
import PageTitle from '../../../components/PageTitle'
import CountUp from "react-countup";
import StatisticsWidget2 from '../../../components/StatisticsWidget2'
import { Link } from 'react-router-dom';

export default function Target() {
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Target", path: "/apps/target/" },

                ]}
                title={"Target"}
            />
            <Row>
                <Col>
                    <Card className="widget-inline">
                        <Card.Body>
                            <Row>
                                <Col sm={6} xl={3}>
                                    <div className="p-2 text-center">
                                        <i className="mdi mdi-currency-usd text-success mdi-24px"></i>
                                        <h3>
                                            $
                                            <span>
                                                <CountUp duration={1} end={7841} />
                                            </span>
                                        </h3>
                                        <p className="text-muted font-15 mb-0">Company target</p>
                                    </div>
                                </Col>
                                <Col sm={6} xl={3}>
                                    <div className="p-2 text-center">
                                        <i className="mdi mdi-cash-lock text-primary mdi-24px"></i>
                                        <h3>
                                            $
                                            <span>
                                                <CountUp duration={1} end={7841} />
                                            </span>
                                        </h3>
                                        <p className="text-muted font-15 mb-0">Achieve target</p>
                                    </div>
                                </Col>
                                <Col sm={6} xl={3}>
                                    <div className="p-2 text-center">
                                        <i className="mdi mdi-cash-plus text-danger mdi-24px"></i>
                                        <h3>
                                            $
                                            <span>
                                                <CountUp duration={1} end={7841} />
                                            </span>
                                        </h3>
                                        <p className="text-muted font-15 mb-0">Release Amount</p>
                                    </div>
                                </Col>
                                <Col sm={6} xl={3}>
                                    <div className="p-2 text-center">
                                        <i className="mdi mdi-cash-remove text-blue mdi-24px"></i>
                                        <h3>
                                            $
                                            <span>
                                                <CountUp duration={1} end={7841} />
                                            </span>
                                        </h3>
                                        <p className="text-muted font-15 mb-0">Pending</p>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col lg={3}>
                    <Link to="/apps/target/1">


                        <StatisticsWidget2
                            variant="blue"
                            description=""
                            stats="12145"
                            icon="fe-aperture"
                            progress={60}
                            counterOptions={{
                                prefix: "$",
                            }}
                        />
                    </Link>
                    <StatisticsWidget2
                        variant="blue"
                        description="Daniyal"
                        stats="12145"
                        icon="fe-aperture"
                        progress={60}
                        counterOptions={{
                            prefix: "$",
                        }}
                    />
                    <StatisticsWidget2
                        variant="blue"
                        description=""
                        stats="12145"
                        icon="fe-aperture"
                        progress={60}
                        counterOptions={{
                            prefix: "$",
                        }}
                    />
                </Col>

            </Row>
        </>

    )
}
