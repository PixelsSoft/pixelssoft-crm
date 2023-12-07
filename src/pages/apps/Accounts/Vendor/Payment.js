import React, { useState } from 'react'
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap'
import { FormInput } from '../../../../components';
import PageTitle from '../../../../components/PageTitle'
import Table from '../../../../components/Table'


export default function Payments() {
    const [loading, setLoading] = useState( false );
    const [visibleModal, setVisibleModal] = useState( false );


    const [title, setTitle] = useState( '' );
    const [desc, setDesc] = useState( '' );
    const [amount, setAmount] = useState( '' );
    const [date, setDate] = useState( '' );
    const [category, setCategory] = useState( '' );

    const [file, setFile] = useState( '' );

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
            Header: 'Date',
            accessor: 'date',
            sort: false,
        },
        {
            Header: 'title',
            accessor: 'title',
            sort: false,
        },
        {
            Header: 'amount',
            accessor: 'amount',
            sort: false,
        },
        {
            Header: 'category',
            accessor: 'category',
            sort: false,
        },
        {
            Header: 'file',
            accessor: 'file',
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
    const HandleFileUpload = ( event ) => {
        if ( event.target.files ) {
            const file = event.target.files[0];
            setFile( file );
        }
    };

    return (
        <>
            <PageTitle
                title={"Vendor Payments"}
            />
            <Row>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col lg={4} >
                                <FormInput
                                    label="Vendor"
                                    name="select"
                                    type="select"
                                    className="form-select"
                                    key="select"
                                    value={category}
                                    onChange={( e ) => {
                                        setCategory( e.target.value );
                                    }}
                                >
                                    <option>no Selected</option>
                                </FormInput>
                            </Col>
                            <Col lg={2} >
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>To</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={date}
                                        onChange={( e ) => setDate( e.target.value )}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={2} >
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>From</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={date}
                                        onChange={( e ) => setDate( e.target.value )}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={3} >
                                <FormInput
                                    label="Vendor Category"
                                    name="select"
                                    type="select"
                                    className="form-select"
                                    key="select"
                                    value={category}
                                    onChange={( e ) => {
                                        setCategory( e.target.value );
                                    }}
                                >
                                    <option>no Selected</option>
                                </FormInput>
                            </Col>
                            <Col style={{ alignSelf: "end" }}>
                                <Button
                                    onClick={toggleModal}
                                    variant={"info"}
                                    className="waves-effect waves-light "
                                >
                                    Filter
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Row>
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
            <Modal size="lg" show={visibleModal} onHide={toggleModal} >
                <Modal.Header closeButton>
                    <h4 className="modal-title">Add Vendor Payments</h4>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Row className='mb-3'>
                        <Col >
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={date}
                                    onChange={( e ) => setDate( e.target.value )}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <FormInput
                                label="Vendor"
                                name="select"
                                type="select"
                                className="form-select"
                                key="select"
                                value={category}
                                onChange={( e ) => {
                                    setCategory( e.target.value );
                                }}
                            >
                                <option>no Selected</option>
                            </FormInput>
                        </Col>

                    </Row>
                    <Row className='mb-3'>
                        <Col >
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    value={title}
                                    onChange={( e ) => setTitle( e.target.value )}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Amount</Form.Label>
                                <Form.Control
                                    value={amount}
                                    onChange={( e ) => setAmount( e.target.value )}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <FormInput
                                label="Vendor Category"
                                name="select"
                                type="select"
                                className="form-select"
                                key="select"
                                value={category}
                                onChange={( e ) => {
                                    setCategory( e.target.value );
                                }}
                            >
                                <option>no Selected</option>
                            </FormInput>
                        </Col>
                    </Row>
                    <FormInput
                        label="Description"
                        type="textarea"
                        name="textarea"
                        containerClass={'mb-3'}
                        key="textarea"
                        value={desc}
                        onChange={( e ) => setDesc( e.target.value )}
                    />
                    <Col>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Upload File</Form.Label>
                            <FormInput
                                type="file"
                                name="file"
                                key="file"
                                onChange={HandleFileUpload}

                            />
                        </Form.Group>

                    </Col>
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
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}
