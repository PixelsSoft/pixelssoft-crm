import { Card, Col, Modal, Row } from 'react-bootstrap';
import { usePageTitle } from '../../../../hooks';
import { useState } from 'react';

const Expenses = () => {
    const [editExpenseModal, setEditExpenseModal] = useState<boolean>(false);

    const toggle = () => setEditExpenseModal(!editExpenseModal);
    usePageTitle({
        title: 'Expense Details',
        breadCrumbItems: [
            {
                path: '/apps/expenses/:id',
                label: 'Apps',
            },
            {
                path: '/apps/expenses/:id',
                label: 'Expenses',
                active: true,
            },
        ],
    });

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row className="justify-content-center"></Row>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body></Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal show={editExpenseModal} onHide={toggle} centered>
                <Modal.Header closeButton>
                    <Modal.Title as="h4">Add Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body></Modal.Body>
            </Modal>
        </>
    );
};

export default Expenses;
