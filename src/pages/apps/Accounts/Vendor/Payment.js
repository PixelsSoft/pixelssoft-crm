import React, { useState } from 'react'
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap'
import { FormInput } from '../../../../components';
import PageTitle from '../../../../components/PageTitle'
import Table from '../../../../components/Table'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Spinner from '../../../../components/Spinner';
import { startLoading, stopLoading } from '../../../../redux/Slices/utiltities/Utiltities';
import { Link } from 'react-router-dom';
import { AddVendorPayment, DeleVendorPayment, GetVendorById } from '../../../../redux/Slices/VendorPayment/VendorPayment';
import EditVendorPaymentModal from '../../../../components/EditVendorPaymentModal';

export default function Payments() {
    const { vendorPay, token, loading, vendors, vendorCategory } = useSelector((state) => ({
        token: state.Auth.token,
        loading: state.utiltities.loading,
        vendors: state.Vendor.vendors,
        vendorCategory: state.VendorCategory.venCat,
        vendorPay: state.VendorPayment.vendorPayments,
    }));

    const dispatch = useDispatch();
    const [visibleModal, setVisibleModal] = useState(false);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [file, setFile] = useState('');
    const [vendorId, setVendorId] = useState('')
    const [vendorCatId, setVendorCatId] = useState('')
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState();

    const reset = () => {
        setTitle('');
        setDesc('');
        setAmount('');
        setDate('');
        setCategory('');
        setFile('');
        setVendorId('');
        setVendorCatId('');
        setVisibleModal(false);
        setId()
    }

    const toggleModal = () => {
        setVisibleModal(!visibleModal);
    };

    const toggleClose = () => {
        setEdit(false);
        setId();
    }

    const columns = [
        {
            Header: 'Date',
            accessor: 'date',
            sort: false,
        },
        {
            Header: 'title',
            accessor: 'title',
            sort: false,
        },
        {
            Header: 'amount',
            accessor: 'amount',
            sort: false,
        },
        {
            Header: 'vendor',
            accessor: 'vendor.name',
            sort: false,
        },
        {
            Header: 'category',
            accessor: 'category.name',
            sort: false,
        },
        // {
        //     Header: 'file',
        //     accessor: 'file',
        //     sort: false,
        // },
        {
            Header: "Action",
            accessor: "action",
            sort: false,
            Cell: ({ row }) => <ActionColumn data={row.original} />,
        },
    ];

    const ActionColumn = ({ data }) => {
        const { id } = data;
        return (
            <React.Fragment>
                <Link className="action-icon" onClick={() => editFunc(id)}>
                    {" "}
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>
                <Link className="action-icon" onClick={() => deleteFunc(id)}>
                    {" "}
                    <i className="mdi mdi-delete"></i>
                </Link>
            </React.Fragment>
        );
    };

    const editFunc = async (id) => {
        dispatch(startLoading());
        await dispatch(GetVendorById(id, token));
        setEdit(true);
        setId(id);
        dispatch(stopLoading());
    }

    const deleteFunc = async (id) => {
        dispatch(startLoading());
        await dispatch(DeleVendorPayment(id, token));
        dispatch(stopLoading());
    }

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

    const HandleFileUpload = (event) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setFile(file);
        }
    };

    const createPayment = async () => {
        if (
            date === '' ||
            title === '' ||
            desc === '' ||
            amount === '' ||
            file === '' ||
            vendorCatId === '' ||
            vendorCatId === 'no Selected' ||
            vendorId === '' ||
            vendorId === 'no Selected'
        ) {
            return toast.error('Enter all fields', { position: toast.POSITION.TOP_RIGHT });
        }
        const data = {
            date: date,
            vendor_id: vendorId,
            vendor_category_id: vendorCatId,
            title: title,
            description: desc,
            amount: amount,
            file: file,
        }
        dispatch(startLoading());
        await dispatch(AddVendorPayment(data, token, reset));
        dispatch(stopLoading());
    }

    const numFunc = (e) => {
        if (e.target.value > 0) {
            setAmount(e.target.value);
        }
    }

    return loading ? (
        <div className='d-flex justify-content-center align-items-center'>
            <Spinner className="m-2" color={'primary'} />
        </div>
    ) : (
        <>
            <PageTitle
                title={"Vendor Payments"}
            />
            <Row>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col lg={4} >
                                <FormInput
                                    label="Vendor"
                                    name="select"
                                    type="select"
                                    className="form-select"
                                    key="select"
                                    value={category}
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                    }}
                                >
                                    <option>no Selected</option>
                                </FormInput>
                            </Col>
                            <Col lg={2} >
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>To</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={2} >
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>From</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={3} >
                                <FormInput
                                    label="Vendor Category"
                                    name="select"
                                    type="select"
                                    className="form-select"
                                    key="select"
                                    value={category}
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                    }}
                                >
                                    <option>no Selected</option>
                                </FormInput>
                            </Col>
                            <Col style={{ alignSelf: "end" }}>
                                <Button
                                    onClick={toggleModal}
                                    variant={"info"}
                                    className="waves-effect waves-light "
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



                        {vendorPay !== undefined && vendorPay !== null ? (
                            <Table
                                columns={columns}
                                data={vendorPay}
                                pageSize={10}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSelectable={true}
                                isSearchable={true}
                                tableClass="table-striped dt-responsive nowrap w-100"
                                searchBoxClass="my-2"
                            />
                        ) : null}
                    </Card.Body>
                </Card>
            </Row>
            <Modal size="lg" show={visibleModal} onHide={toggleModal} >
                <Modal.Header closeButton>
                    <h4 className="modal-title">Add Vendor Payments</h4>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Row className='mb-3'>
                        <Col >
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <FormInput
                                label="Vendor"
                                name="select"
                                type="select"
                                className="form-select"
                                key="select"
                                value={vendorId}
                                onChange={(e) => {
                                    setVendorId(e.target.value);
                                }}
                            >
                                <option>no Selected</option>
                                {vendors?.map(val => {
                                    return (
                                        <option value={val?.id} key={val?.id}>{val?.name}</option>
                                    )
                                })}
                            </FormInput>
                        </Col>

                    </Row>
                    <Row className='mb-3'>
                        <Col >
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Amount</Form.Label>
                                <Form.Control
                                    value={amount}
                                    type='number'
                                    onChange={(e) => numFunc(e)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <FormInput
                                label="Vendor Category"
                                name="select"
                                type="select"
                                className="form-select"
                                key="select"
                                value={vendorCatId}
                                onChange={(e) => {
                                    setVendorCatId(e.target.value);
                                }}
                            >
                                <option>no Selected</option>
                                {vendorCategory?.map(val => {
                                    return (
                                        <option value={val?.id} key={val?.id}>{val?.name}</option>
                                    )
                                })}
                            </FormInput>
                        </Col>
                    </Row>
                    <FormInput
                        label="Description"
                        type="textarea"
                        name="textarea"
                        containerClass={'mb-3'}
                        key="textarea"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                    <Col>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Upload File</Form.Label>
                            <FormInput
                                type="file"
                                name="file"
                                key="file"
                                onChange={HandleFileUpload}

                            />
                        </Form.Group>

                    </Col>
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
                        className="waves-effect waves-light"
                        onClick={createPayment}
                    >
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
            <EditVendorPaymentModal id={id} edit={edit} toggleClose={toggleClose} />
        </>

    )
}
