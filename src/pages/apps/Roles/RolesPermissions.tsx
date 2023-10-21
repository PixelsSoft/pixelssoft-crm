import { Button, Card, Col, Modal, Row } from 'react-bootstrap';
import Table from '../../../components/Table';
import PageTitle from '../../../components/PageTitle';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { records as data } from '../Invoice/Invoices/data';
import { FormInput } from '../../../components';
export default function RolesPermissions() {
    const [responsiveModal, setResponsiveModal] = useState(false);

    /**
     * Show/hide the modal
     */
    const toggleResponsiveModal = () => {
        setResponsiveModal(!responsiveModal);
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
    const columns = [
        {
            Header: 'ID',
            accessor: 'id',
            sort: true,
        },
        {
            Header: 'Name',
            accessor: 'invoiceNumber',
            sort: false,
        },
        {
            Header: 'Role',
            accessor: 'dueDate',
            sort: false,
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
        {
            text: 'All',
            value: data.length,
        },
    ];


    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Administartor", path: "/apps/administartor/rolePermission" },
                ]}
                title={"Role Permission"}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col sm={4}>
                                    <Button
                                        onClick={toggleResponsiveModal}
                                        className="btn btn-danger mb-2">
                                        <i className="mdi mdi-plus-circle me-2"></i> Create Role
                                    </Button>
                                </Col>

                                <Col sm={8}>
                                    <div className="text-sm-end">
                                        <Button className="btn btn-success mb-2 me-1">
                                            <i className="mdi mdi-cog-outline"></i>
                                        </Button>

                                        <Button className="btn btn-light mb-2 me-1">Import</Button>

                                        <Button className="btn btn-light mb-2">Export</Button>
                                    </div>
                                </Col>
                            </Row>

                            <Table
                                columns={columns}
                                data={data}
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
                </Col>
            </Row>
            <Modal show={responsiveModal} onHide={toggleResponsiveModal}>
                <Modal.Header closeButton>
                    <h4 className="modal-title">Add Role</h4>
                </Modal.Header>
                <Modal.Body className="p-4">

                    <FormInput
                        label="Name"
                        type="text"
                        name="Name"
                        placeholder="Name"
                        containerClass={'mb-3'}
                        key="text"
                    />
                    <FormInput
                        label="Permission"
                        type="text"
                        name="Name"
                        placeholder="Permission"
                        containerClass={'mb-3'}
                        key="text"
                    />
                </Modal.Body>

                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-secondary waves-effect"
                        onClick={toggleResponsiveModal}
                    >
                        Close
                    </button>
                    <button
                        type="submit"
                        className="btn btn-info waves-effect waves-light"
                    >
                        Add
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
