import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';

export default function SinglePersonTarget() {
    const columns = [
        {
            Header: 'Sno',
            accessor: 'sno',
            sort: true,
        },
        {
            Header: 'Name',
            accessor: 'invoiceNumberq',
            sort: false,
        },
        {
            Header: 'Month',
            accessor: 'Month',
            sort: false,
        },
        {
            Header: 'acheive',
            accessor: 'acheive',
            sort: false,
        },
        {
            Header: 'pending',
            accessor: 'dueDate',
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
                title={"Sameer : Target $3000 "}
            />
            <Row >
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
    )
}
