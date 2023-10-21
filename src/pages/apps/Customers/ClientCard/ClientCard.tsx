import { Button, Card, Col, Modal, Row } from 'react-bootstrap';
import Table from '../../../../components/Table';
import PageTitle from '../../../../components/PageTitle';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { FormInput } from '../../../../components';
export default function ClientCard() {

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
            accessor: 'invoiceNumberq',
            sort: false,
        },
        {
            Header: 'Card Number',
            accessor: 'invoiceNumber2',
            sort: false,
        },
        {
            Header: 'Expire',
            accessor: 'invoiceNumber',
            sort: false,
        },
        {
            Header: 'CVC',
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

    ];


    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Client Card", path: "/apps/clientCard" },
                ]}
                title={"Client Card"}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            {/* <Row>


                                <Col sm={8}>
                                    <div className="text-sm-end">
                                        <Button className="btn btn-success mb-2 me-1">
                                            <i className="mdi mdi-cog-outline"></i>
                                        </Button>

                                        <Button className="btn btn-light mb-2 me-1">Import</Button>

                                        <Button className="btn btn-light mb-2">Export</Button>
                                    </div>
                                </Col>
                            </Row> */}

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
                </Col>
            </Row>

        </>
    );
}
