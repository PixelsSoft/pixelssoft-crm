import React, { useState } from 'react'
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { FormInput } from '../../../components';
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import Spinner from '../../../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading } from '../../../redux/Slices/utiltities/Utiltities';
import { AddLead, DeleteLead, GetLeadById } from '../../../redux/Slices/Leads/leads';
import { toast } from 'react-toastify';
import ViewLeadModal from '../../../components/ViewLeadModal';

export default function Leads() {
    const dispatch = useDispatch();
    const [visibleModal, setVisibleModal] = useState(false);
    const [plat, setPlat] = useState('');
    const [category, setCategory] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState('');
    const [note, setNote] = useState();
    const [viewEdit, setViewEdit] = useState(false);
    const [view, setView] = useState(false);
    const [id, setId] = useState();
    const [detail, setDetail] = useState();

    const { token, platforms, loading, leads } = useSelector(
        (state) => ({
            token: state.Auth.token,
            loading: state.utiltities.loading,
            platforms: state.Platform.platform,
            leads: state.Leads.leads
        })
    );

    const toggleModal = () => {
        setVisibleModal(!visibleModal);
    };

    const toggleView = () => {
        setView(!view);
    };

    /* action column render */
    const ActionColumn = ({ row }) => {
        return (
            <React.Fragment>
                <Link className="action-icon" onClick={() => openView(row)} >
                    {" "}
                    <i className="mdi mdi-eye"></i>
                </Link>
                <Link className="action-icon" onClick={() => openEdit(row.id)}>
                    {" "}
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>
                <Link className="action-icon" onClick={() => deleteFunc(row.id)}>
                    {" "}
                    <i className="mdi mdi-delete"></i>
                </Link>
            </React.Fragment>
        );
    };

    const openView = async (info) => {
        setDetail(info);
        setView(!view);
    };

    const openEdit = async (leadId) => {
        setId(leadId);
        dispatch(startLoading());
        await dispatch(GetLeadById(leadId, token));
        dispatch(stopLoading());
        setViewEdit(!viewEdit);
    }

    const closeEdit = () => {
        setViewEdit(!viewEdit);
    }

    const deleteFunc = async (id) => {
        dispatch(startLoading());
        await dispatch(DeleteLead(id, token));
        dispatch(stopLoading());
    }

    // /* status column render */
    // const StatusColumn = ({ row }) => {
    //     return (
    //         <React.Fragment>
    //             <span
    //                 className={classNames("badge", {
    //                     "bg-soft-success text-success": row.original.status === "Active",
    //                     "bg-soft-danger text-danger": row.original.status === "Blocked",
    //                 })}
    //             >
    //                 {row.original.status}
    //             </span>
    //         </React.Fragment>
    //     );
    // };

    const columns = [
        {
            Header: 'Id',
            accessor: 'id',
            sort: true,
        },
        {
            Header: 'Name',
            accessor: 'name',
            sort: false,
        },
        {
            Header: 'Email',
            accessor: 'email',
            sort: false,
        },
        {
            Header: 'Phone',
            accessor: 'phone',
            sort: false,
        },
        {
            Header: 'Note',
            accessor: 'note',
            sort: false,
        },
        {
            Header: 'Status',
            accessor: 'status',
            sort: false,
        },
        // {
        //     Header: 'Respond',
        //     accessor: 'Respond',
        //     sort: false,
        //     Cell: StatusColumn,
        // },
        {
            Header: "Action",
            accessor: "action",
            sort: false,
            Cell: ({ row }) => <ActionColumn row={row.original} />,
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

    const reset = () => {
        setName('');
        setEmail('');
        setPhone('');
        setNote('');
        setPlat();
        setVisibleModal(!visibleModal);
    };

    const addnew = async () => {
        if (name === undefined || plat === '' || plat === 'no Selected' || email === undefined || phone === undefined || note === undefined) {
            toast.error("Enter all fields", { position: toast.POSITION.TOP_RIGHT });
            return;
        };
        const data = {
            name: name,
            platform: plat,
            email: email,
            phone: phone,
            note: note,
        };
        dispatch(startLoading());
        await dispatch(AddLead(data, token, reset));
        dispatch(stopLoading());
    };

    const phoneFunc = (e) => {
        if (e.target.value >= 0) {
            setPhone(e.target.value);
        }
    }

    return loading ? (
        <div className='d-flex justify-content-center align-items-center'>
            <Spinner className="m-2" color={'primary'} />
        </div>
    ) : (
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
                                    onChange={(e) => setCategory(e.target.value)}
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
                                    onChange={(e) => setCategory(e.target.value)}
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
                            // data={[{ status: "Active" }, { status: "Blocked" }]}
                            data={leads}
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
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col >
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type='email'
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col >
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Phone No</Form.Label>
                                <Form.Control
                                    type='number'
                                    value={phone}
                                    onChange={(e) => phoneFunc(e)}
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
                                value={plat}
                                onChange={(e) => setPlat(e.target.value)}
                            >
                                <option>no Selected</option>
                                {platforms?.map(val => {
                                    return (
                                        <option key={val.id} value={val.id}>{val.title}</option>
                                    );
                                })}
                            </FormInput>
                        </Col>
                    </Row>
                    <FormInput
                        label="Note"
                        type="textarea"
                        name="textarea"
                        containerClass={'mb-3'}
                        key="textarea"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
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
                        onClick={addnew}
                    >
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal size="lg" show={view} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <h4 className="modal-title">View Lead</h4>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Row className='mb-3'>
                        <Col>
                            <Row>
                                <Form.Label>Name</Form.Label>
                            </Row>
                            <Row>
                                <Form.Label>{detail?.name}</Form.Label>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Form.Label>Email</Form.Label>
                            </Row>
                            <Row>
                                <Form.Label>{detail?.email}</Form.Label>
                            </Row>
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col>
                            <Row>
                                <Form.Label>Phone No</Form.Label>
                            </Row>
                            <Row>
                                <Form.Label>{detail?.phone}</Form.Label>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Form.Label>Platform</Form.Label>
                            </Row>
                            <Row>
                                <Form.Label>{detail?.platform}</Form.Label>
                            </Row>
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col>
                            <Row>
                                <Form.Label>Note</Form.Label>
                            </Row>
                            <Row>
                                <Form.Label>{detail?.note}</Form.Label>
                            </Row>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="button"
                        className="btn btn-secondary waves-effect"
                        onClick={toggleView}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <ViewLeadModal leadId={id} visibleModal={viewEdit} toggleModal={closeEdit} />
        </>
    );
};