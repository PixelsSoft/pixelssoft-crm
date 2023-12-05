import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { FormInput } from '../../../../components';
import PageTitle from '../../../../components/PageTitle'
import Table from '../../../../components/Table'


export default function Expenses() {
    const [loading, setLoading] = useState( false );


    const [title, setTitle] = useState( '' );
    const [amount, setAmount] = useState( '' );
    const [date, setDate] = useState( '' );
    const [file, setFile] = useState( '' );


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
    const HandleFileUpload = ( event ) => {
        if ( event.target.files ) {
            const file = event.target.files[0];
            setFile( file );
        }
    };

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Expense", path: "/apps/account/expense" },

                ]}
                title={"Expense"}
            />
            <Row>
                <Card>
                    <Card.Body>
                        <Row style={{ justifyContent: "center", alignItems: "center" }}>
                            <Col >
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Invoice Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={date}
                                        onChange={( e ) => setDate( e.target.value )}
                                    />
                                </Form.Group>
                            </Col>
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
                                    label="File Upload"
                                    type="file"
                                    name="file"
                                    containerClass={'mb-3'}
                                    key="file"
                                    onChange={HandleFileUpload}

                                />
                            </Col>
                            <Col>
                                <Button
                                    variant={"success"}
                                    className="waves-effect waves-light "
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
