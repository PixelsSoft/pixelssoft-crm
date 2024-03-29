import { Alert, Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
import { usePageTitle, useRedux } from '../../../hooks';
import Table from '../../../components/Table';

import FormInput from '../../../components/form/FormInput';
import { FormEventHandler, useEffect, useState } from 'react';
import { createNewLead, deleteLead, getAllLeads, updateComment, updateStatus } from '../../../redux/leads/actions';

type Lead = {
    _id: string;
    name: string;
    email: string;
    phone: number;
    status: 'Responded' | 'Not Responded';
    comments: string;
    createdBy: string;
};

const columns = [
    {
        Header: 'ID',
        accessor: '_id',
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
        Header: 'Comments',
        accessor: 'comments',
        sort: false,
    },
    {
        Header: 'Status',
        accessor: 'status',
        sort: false,
    },
    {
        Header: 'Created By',
        accessor: 'createdBy.fullName',
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
];

const Leads = () => {
    const [modal, setModal] = useState(false);
    const [statusModal, setStatusModal] = useState(false);
    const [statusId, setStatusId] = useState('');
    const [status, setStatus] = useState<'Responded' | 'Not Responded' | ''>('');

    const [editModal, setEditModal] = useState(false);
    const [editId, setEditId] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [comment, setComment] = useState('');

    const { dispatch, appSelector } = useRedux();

    const { leads, createLeadSuccess, data, error, commentUpdated, leadDeleteSuccess, statusUpdated } = appSelector(
        (state) => ({
            leads: state.Leads.leads,
            createLeadSuccess: state.Leads.createLeadSuccess,
            data: state.Leads.data,
            error: state.Leads.error,
            commentUpdated: state.Leads.commentUpdated,
            leadDeleteSuccess: state.Leads.leadDeleteSuccess,
            statusUpdated: state.Leads.statusUpdated,
        })
    );

    const toggle = () => setModal(!modal);
    const editModalToggle = (id: string) => {
        setEditId(id);
        setEditModal(!editModal);
    };
    const toggleStatusModal = (id: string) => {
        setStatusId(id);
        setStatusModal(!statusModal);
    };

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

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        dispatch(createNewLead({ name, email, phone, status: 'Not Responded', comments: '' }));
    };

    const handleEdit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        dispatch(updateComment(editId, comment));
    };

    const handleStatusChange: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        dispatch(updateStatus(statusId, status));
    };

    const handleDelete = (id: string) => {
        dispatch(deleteLead(id));
    };

    useEffect(() => {
        if (createLeadSuccess) {
            setName('');
            setEmail('');
            setPhone('');
            dispatch(getAllLeads());
        }
    }, [createLeadSuccess, dispatch]);

    useEffect(() => {
        dispatch(getAllLeads());
    }, [dispatch]);

    useEffect(() => {
        if (editModal) {
            setComment(leads.find((lead: Lead) => lead._id === editId).comments);
        } else {
            setComment('');
        }
    }, [editId, editModal, leads]);

    useEffect(() => {
        if (statusModal) {
            setStatus(leads.find((lead: Lead) => lead._id === statusId).status);
        } else {
            setStatus('');
        }
    }, [leads, statusId, statusModal]);

    useEffect(() => {
        if (commentUpdated) {
            setComment('');
            setEditModal(false);
            dispatch(getAllLeads());
        }
    }, [commentUpdated, dispatch]);

    useEffect(() => {
        if (leadDeleteSuccess) {
            dispatch(getAllLeads());
        }
    }, [leadDeleteSuccess, dispatch]);

    useEffect(() => {
        if (statusUpdated) {
            setStatus('');
            setStatusModal(false);
            setStatusId('');
            dispatch(getAllLeads());
        }
    }, [statusUpdated, dispatch]);

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
                                data={leads || []}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSearchable={true}
                                disabledUserSelect={true}
                                hasComments
                                hasActions
                                onEdit={editModalToggle}
                                onDelete={handleDelete}
                                onStatusChange={toggleStatusModal}
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
                    <Form onSubmit={handleSubmit}>
                        <FormInput
                            label={'Name'}
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            containerClass={'mb-3'}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <FormInput
                            label={'Email address'}
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            containerClass={'mb-3'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <FormInput
                            label={'Phone #'}
                            type="text"
                            name="phone"
                            placeholder="Enter Phone #"
                            containerClass={'mb-3'}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />

                        {error && (
                            <Alert variant="danger" className="my-2">
                                {error}
                            </Alert>
                        )}
                        {data && (
                            <Alert variant="success" className="my-2">
                                {data?.message}
                            </Alert>
                        )}

                        <Button variant="light" className="waves-effect waves-light me-1" type="submit">
                            Save
                        </Button>

                        <Button variant="danger" className="waves-effect waves-light" onClick={toggle}>
                            Cancel
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={editModal} onHide={() => setEditModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title as="h4">Edit Lead</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEdit}>
                        <FormInput
                            label="Comment"
                            type="textarea"
                            name="textarea"
                            rows={5}
                            containerClass={'mb-3'}
                            // register={register}
                            key="textarea"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        // errors={errors}
                        // control={control}
                        />

                        <Button variant="light" className="waves-effect waves-light me-1" type="submit">
                            Save
                        </Button>

                        <Button
                            variant="danger"
                            className="waves-effect waves-light"
                            onClick={() => setEditModal(false)}>
                            Cancel
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={statusModal} onHide={() => setStatusModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title as="h4">Change Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleStatusChange}>
                        <Form.Select
                            value={status}
                            className="mb-3"
                            onChange={(e) => setStatus(e.target.value as 'Responded' | 'Not Responded')}>
                            <option value="Responded">Responded</option>
                            <option value="Not Responded">Not Responsed</option>
                        </Form.Select>

                        <Button variant="light" className="waves-effect waves-light me-1" type="submit">
                            Save
                        </Button>

                        <Button
                            variant="danger"
                            className="waves-effect waves-light"
                            onClick={() => setStatusModal(false)}>
                            Cancel
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Leads;
