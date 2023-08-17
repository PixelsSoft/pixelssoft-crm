import { Card, Col, Row } from 'react-bootstrap';
import MaskedInput from 'react-text-mask';
import { FormInput } from '../../../components/form';



const PaymentLink = () => {


    return (
        <>
            <Row>
                <Col>

                    <Card>
                        <Card.Body>


                            <form>
                                <Row>
                                    <Col lg={4} />
                                    <Col lg={4}>
                                        <FormInput
                                            label="Card information"
                                            type="text"
                                            name="Name"
                                            placeholder="Name on Card"
                                            // containerClass={'mb-3'}
                                            key="text"
                                        />


                                        <MaskedInput
                                            mask={[
                                                /\d/,
                                                /\d/,
                                                /\d/,
                                                /\d/,
                                                ' ',
                                                /\d/,
                                                /\d/,
                                                /\d/,
                                                /\d/,
                                                ' ',
                                                /\d/,
                                                /\d/,
                                                /\d/,
                                                /\d/,
                                                ' ',
                                                /\d/,
                                                /\d/,
                                                /\d/,
                                                /\d/,

                                            ]}
                                            placeholder="4242 4242 4242 4242"
                                            className="form-control"
                                        />
                                        <Row>
                                            <Col lg={6}>


                                                <MaskedInput
                                                    mask={[
                                                        /\d/,
                                                        /\d/,
                                                        '/',
                                                        /\d/,
                                                        /\d/,
                                                    ]}
                                                    placeholder="MM/YY"
                                                    className="form-control"
                                                />
                                            </Col>
                                            <Col lg={6}>
                                                <MaskedInput
                                                    mask={[
                                                        /\d/,
                                                        /\d/,
                                                        /\d/,

                                                    ]}
                                                    placeholder="123"
                                                    className="form-control"
                                                />
                                            </Col>
                                        </Row>

                                    </Col>
                                    <Col lg={4} />

                                </Row>
                            </form>


                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </>
    );
};

export default PaymentLink;
