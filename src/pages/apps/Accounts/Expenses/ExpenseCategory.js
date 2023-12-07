import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { FormInput } from '../../../../components';
import PageTitle from '../../../../components/PageTitle'
import Table from '../../../../components/Table'


export default function ExpenseCategory() {

    const [title, setTitle] = useState( '' );
    const [Des, setDes] = useState( '' );



    const columns = [
        {
            Header: 'Sno',
            accessor: 'sno',
            sort: true,
        },
        {
            Header: 'Title',
            accessor: 'Title',
            sort: false,
        },
        {
            Header: 'Description',
            accessor: 'Description',
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
                breadCrumbItems={[
                    { label: "Expense Category", path: "/apps/account/expense" },
                ]}
                title={"Expense Category"}
            />
            <Row>
                <Card>
                    <Card.Body>
                        <Row style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                            <Col  >
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        value={title}
                                        onChange={( e ) => setTitle( e.target.value )}
                                    />
                                </Form.Group>
                            </Col>
                            <Col >
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        value={Des}
                                        onChange={( e ) => setDes( e.target.value )}
                                    />
                                </Form.Group>
                            </Col>


                            <Col style={{ alignSelf: "end" }}>
                                <Button
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
        </>

    )
}
