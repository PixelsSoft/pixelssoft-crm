import { Alert, Card, Row } from 'react-bootstrap';

export default function SuccessPage() {
    return (
        <>
            <Card>
                <Card.Body>
                    <Row>
                        <Alert variant="success">
                            <h3>Your payment was successfully processed.</h3>
                        </Alert>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
}
