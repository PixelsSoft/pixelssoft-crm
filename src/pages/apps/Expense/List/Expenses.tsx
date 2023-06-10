import { Button, Card, Col, Modal, Row } from 'react-bootstrap';
import { usePageTitle } from '../../../../hooks';
import Table from '../../../../components/Table';

import { records as data } from './data';
import { Record } from './types';
import { FormInput, VerticalForm } from '../../../../components/form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const columns = [
    {
        Header: 'ID',
        accessor: 'id',
        sort: false,
    },
    {
        Header: 'Status',
        accessor: 'status',
        sort: false,
    },
    {
        Header: 'Title',
        accessor: 'title',
        sort: false,
    },
    {
        Header: 'Type',
        accessor: 'type',
        sort: false,
    },
    {
        Header: 'Amount',
        accessor: 'amount',
        sort: false,
    },
    {
        Header: 'Pending Amount',
        accessor: 'pending',
        sort: false,
    },
    {
        Header: 'Date',
        accessor: 'date',
        sort: false,
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

const Expenses = () => {
    const [addExpenseModal, setAddExpenseModal] = useState<boolean>(false);

    const [recordPaymentModal, setRecordPaymentModal] = useState(false);

    const toggleRecordPaymentModal = () => setRecordPaymentModal(!recordPaymentModal);

    const toggle = () => setAddExpenseModal(!addExpenseModal);
    usePageTitle({
        title: 'Expenses',
        breadCrumbItems: [
            {
                path: '/apps/expenses',
                label: 'Apps',
            },
            {
                path: '/apps/expenses',
                label: 'Expenses',
                active: true,
            },
        ],
    });

    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required('Please enter name'),
            position: yup.string().required('Please enter your position'),
            company: yup.string().required('Please enter your company name'),
            email: yup.string().required('Please enter Email address').email('Enter valid email'),
        })
    );
    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row className="justify-content-center">
                                <Col md={4}>
                                    <div className="mt-3 mt-md-0">
                                        <Button variant="success" className="waves-effect waves-light" onClick={toggle}>
                                            <i className="mdi mdi-plus-circle me-1"></i>
                                            Add expense
                                        </Button>
                                    </div>
                                </Col>
                                <Col md={8}>
                                    <form className="d-flex flex-wrap align-items-center justify-content-sm-end">
                                        <label className="me-2">Sort By</label>
                                        <FormInput type="select" name="sort">
                                            <option>All</option>
                                            <option>Name</option>
                                            <option>Post</option>
                                            <option>Followers</option>
                                            <option>Followings</option>
                                        </FormInput>
                                        <FormInput
                                            type="search"
                                            name="search"
                                            placeholder="Search..."
                                            className="ms-sm-2"
                                        />
                                    </form>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Table
                                columns={columns}
                                data={data}
                                pageSize={10}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSearchable={true}
                                hasActions={true}
                                hasRecordPayment={true}
                                toggler={toggleRecordPaymentModal}
                                hasLink={true}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal show={addExpenseModal} onHide={toggle} centered>
                <Modal.Header closeButton>
                    <Modal.Title as="h4">Add Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <VerticalForm<Record> onSubmit={() => {}} resolver={schemaResolver} defaultValues={{}}>
                        <FormInput
                            label={'Title'}
                            type="text"
                            name="title"
                            placeholder="Enter Title"
                            containerClass={'mb-3'}
                        />

                        <FormInput
                            label={'Type'}
                            type="text"
                            name="type"
                            placeholder="Enter Type"
                            containerClass={'mb-3'}
                        />

                        <FormInput
                            label={'Amount'}
                            type="text"
                            name="Amount"
                            placeholder="Enter amount"
                            containerClass={'mb-3'}
                        />

                        <FormInput
                            label={'Description'}
                            type="textarea"
                            name="Amount"
                            rows={3}
                            placeholder="Enter description"
                            containerClass={'mb-3'}
                        />

                        <FormInput
                            label="Proof"
                            type="file"
                            name="file"
                            containerClass={'mb-3'}
                            // register={register}
                            key="file"
                            // errors={errors}
                            // control={control}
                        />

                        <Button variant="light" className="waves-effect waves-light me-1" type="submit">
                            Save
                        </Button>
                        <Button variant="danger" className="waves-effect waves-light" onClick={toggle}>
                            Cancel
                        </Button>
                    </VerticalForm>
                </Modal.Body>
            </Modal>

            <Modal show={recordPaymentModal} onHide={toggleRecordPaymentModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title as="h4">Record Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormInput
                        label={'Date'}
                        type="date"
                        name="date"
                        placeholder="Enter Date"
                        containerClass={'mb-3'}
                    />

                    <FormInput
                        label={'Amount'}
                        type="number"
                        name="amount"
                        placeholder="Enter amount"
                        containerClass={'mb-3'}
                    />

                    <FormInput
                        label={'Payment Method'}
                        type="text"
                        name="payment method"
                        placeholder="Enter Payment Method"
                        containerClass={'mb-3'}
                    />

                    <FormInput
                        label={'Payment Account'}
                        type="text"
                        name="payment account"
                        placeholder="Enter Payment Account"
                        containerClass={'mb-3'}
                    />

                    <FormInput
                        label={'Memo/notes'}
                        type="textarea"
                        name="memo"
                        placeholder="Enter notes..."
                        containerClass={'mb-3'}
                    />

                    <Button variant="dark" className="waves-effect waves-light me-1" type="submit">
                        Save
                    </Button>
                    <Button variant="danger" className="waves-effect waves-light" onClick={toggleRecordPaymentModal}>
                        Cancel
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Expenses;
