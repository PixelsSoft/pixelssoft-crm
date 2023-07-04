import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
import { usePageTitle } from '../../../hooks';
import Table from '../../../components/Table';

import { records as data } from './data';
import FormInput from '../../../components/form/FormInput';
import { useState } from 'react';

const columns = [
    {
        Header: 'ID',
        accessor: 'id',
        sort: true,
    },
    {
        Header: 'Name',
        accessor: 'name',
        sort: true,
    },
    {
        Header: 'Email',
        accessor: 'email',
        sort: true,
    },
    {
        Header: 'Phone Number',
        accessor: 'phone',
        sort: false,
    },
    {
        Header: 'Company',
        accessor: 'company',
        sort: false,
    },
];

const sizePerPageList = [
    {
        text: '5',
        value: 5,
    },
    {
        text: '10',
        value: 10,
    },
    {
        text: '25',
        value: 25,
    },
    {
        text: 'All',
        value: data.length,
    },
];

const Leads = () => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    usePageTitle({
        title: 'Leads',
        breadCrumbItems: [
            {
                path: '/apps/leads',
                label: 'Apps',
            },
            {
                path: '/apps/leads',
                label: 'Leads',
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
                            <Row>
                                {/* <Col>
                                    <h4 className="header-title mb-4">Leads</h4>
                                </Col> */}
                                <Col className="d-flex justify-content-end">
                                    <Button
                                        onClick={toggle}
                                        className="btn btn-purple rounded-pill w-md waves-effect waves-light mb-3">
                                        <i className="mdi mdi-plus me-1"></i>
                                        Create Lead
                                    </Button>
                                </Col>
                            </Row>
                            <Table
                                columns={columns}
                                data={data}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSearchable={true}
                                disabledUserSelect={true}
                                hasComments
                                hasStatus
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal show={modal} onHide={toggle} centered>
                <Modal.Header closeButton>
                    <Modal.Title as="h4">New Lead</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FormInput
                            label={'Name'}
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            containerClass={'mb-3'}
                        />

                        <FormInput
                            label={'Email address'}
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            containerClass={'mb-3'}
                        />

                        <FormInput
                            label={'Phone #'}
                            type="text"
                            name="phone"
                            placeholder="Enter Phone #"
                            containerClass={'mb-3'}
                        />

                        <Button variant="light" className="waves-effect waves-light me-1" type="submit">
                            Save
                        </Button>

                        <Button variant="danger" className="waves-effect waves-light" onClick={toggle}>
                            Cancel
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Leads;
