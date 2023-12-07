import React, { useState } from 'react'
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap'
import { FormInput } from '../../../../components';
import PageTitle from '../../../../components/PageTitle'
import Table from '../../../../components/Table'


export default function Vendor() {

    const [visibleModal, setVisibleModal] = useState( false );
    const [name, setName] = useState( '' );
    const [email, setEmail] = useState( '' );
    const [phone, setPhone] = useState( '' );


    const toggleModal = () => {
        setVisibleModal( !visibleModal );
    };
    const columns = [
        {
            Header: 'Sno',
            accessor: 'sno',
            sort: true,
        },
        {
            Header: 'Name',
            accessor: 'name',
            sort: false,
        },
        {
            Header: 'Email',
            accessor: 'email',
            sort: false,
        },
        {
            Header: 'Phone',
            accessor: 'phone',
            sort: false,
        },

        // {
        //     Header: "Action",
        //     accessor: "action",
        //     sort: false,
        //     Cell: ActionColumn,
        // },
    ];

    const sizePerPageList = [
        {
            text: '10',
            value: 10,
        },
        {
            text: '20',
            value: 20,
        },
        {
            text: '35',
            value: 35,
        },

    ];


    return (
        <>
            <PageTitle
                title={"Vendor"}
            />

            <Row>
                <Card>
                    <Card.Body>
                        <Row style={{ display: "flex", float: "right" }}>
                            <Col lg={3}>
                                <Button
                                    onClick={toggleModal}
                                    variant={"success"}
                                    className="waves-effect waves-light px-5 "
                                >
                                    Add
                                </Button>
                            </Col>
                        </Row>
                        <Table
                            columns={columns}
                            data={[]}
                            pageSize={10}
                            sizePerPageList={sizePerPageList}
                            isSortable={true}
                            pagination={true}
                            isSelectable={true}
                            isSearchable={true}
                            tableClass="table-striped dt-responsive nowrap w-100"
                            searchBoxClass="my-2"
                        />

                    </Card.Body>
                </Card>
            </Row>
            <Modal show={visibleModal} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <h4 className="modal-title">Add Vendor</h4>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Row className='mb-3'>
                        <Col >
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    value={name}
                                    onChange={( e ) => setName( e.target.value )}
                                />
                            </Form.Group>
                        </Col>
                        <Col >
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    value={email}
                                    onChange={( e ) => setEmail( e.target.value )}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    value={phone}
                                    onChange={( e ) => setPhone( e.target.value )}
                                />
                            </Form.Group>
                        </Col>

                    </Row>


                </Modal.Body>

                <Modal.Footer>
                    <Button
                        type="button"
                        className="btn btn-secondary waves-effect"
                        onClick={toggleModal}
                    >
                        Close
                    </Button>
                    <Button
                        type="submit"
                        variant={"success"}
                        className="waves-effect waves-light  "
                    >
                        Add Expense
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}
