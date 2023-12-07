import classNames from 'classnames';
import React, { useState } from 'react'
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { FormInput } from '../../../components';
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';



export default function Leads() {

    const [visibleModal, setVisibleModal] = useState( false );
    const [desc, setDesc] = useState( '' );
    const [title, setTitle] = useState( '' );
    const [category, setCategory] = useState( '' );



    const toggleModal = () => {
        setVisibleModal( !visibleModal );
    };
    /* action column render */
    const ActionColumn = () => {
        return (
            <React.Fragment>
                <Link to="#" className="action-icon">
                    {" "}
                    <i className="mdi mdi-eye"></i>
                </Link>
                <Link to="#" className="action-icon">
                    {" "}
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>
                <Link to="#" className="action-icon">
                    {" "}
                    <i className="mdi mdi-delete"></i>
                </Link>
            </React.Fragment>
        );
    };
    /* status column render */
    const StatusColumn = ( { row } ) => {
        return (
            <React.Fragment>
                <span
                    className={classNames( "badge", {
                        "bg-soft-success text-success": row.original.status === "Active",
                        "bg-soft-danger text-danger": row.original.status === "Blocked",
                    } )}
                >
                    {row.original.status}
                </span>
            </React.Fragment>
        );
    };

    const columns = [
        {
            Header: 'Sno',
            accessor: 'sno',
            sort: true,
        },
        {
            Header: 'Name',
            accessor: 'date',
            sort: false,
        },
        {
            Header: 'Email',
            accessor: 'title',
            sort: false,
        },
        {
            Header: 'Phone',
            accessor: 'amount',
            sort: false,
        },
        {
            Header: 'Note',
            accessor: 'note',
            sort: false,
        },
        {
            Header: 'Last Contact',
            accessor: 'LastContact',
            sort: false,
        },
        {
            Header: 'Respond',
            accessor: 'Respond',
            sort: false,
            Cell: StatusColumn,
        },
        {
            Header: "Action",
            accessor: "action",
            sort: false,
            Cell: ActionColumn,
        },
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
                title={"Leads"}
            />
            <Row>
                <Card>
                    <Card.Body>
                        <Row>

                            <Col>
                                <FormInput
                                    label="Status"
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
                            <Col>
                                <FormInput
                                    label="Platform"
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
                                    className="waves-effect waves-light px-5 "
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
                            data={[{ status: "Active" }, { status: "Blocked" }]}
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
            <Modal size="lg" show={visibleModal} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <h4 className="modal-title">Add Lead</h4>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Row className='mb-3'>
                        <Col >
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    value={title}
                                    onChange={( e ) => setTitle( e.target.value )}
                                />
                            </Form.Group>
                        </Col>
                        <Col >
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    value={title}
                                    onChange={( e ) => setTitle( e.target.value )}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col >
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Phone No</Form.Label>
                                <Form.Control
                                    value={title}
                                    onChange={( e ) => setTitle( e.target.value )}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <FormInput
                                label="Platform"
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
                        label="Note"
                        type="textarea"
                        name="textarea"
                        containerClass={'mb-3'}
                        key="textarea"
                        value={desc}
                        onChange={( e ) => setDesc( e.target.value )}
                    />

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
