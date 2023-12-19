import React, { useState } from 'react'
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap'
import { FormInput } from '../../../../components';
import PageTitle from '../../../../components/PageTitle'
import Table from '../../../../components/Table'
import Spinner from '../../../../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { startLoading, stopLoading } from '../../../../redux/Slices/utiltities/Utiltities';
import { DeleteExpense, GetExpense, GetExpenseById } from '../../../../redux/Slices/Expense/expense';
import { Link } from 'react-router-dom';
import EditExpenseModal from '../../../../components/EditExpenseModal';
import { CONSTANTS } from '../../../../constants/constant';
import ViewExpense from '../../../../components/ViewExpense';

export default function Expenses() {
    const { expenseCategory, token, expenses, loading } = useSelector(
        (state) => ({
            token: state.Auth.token,
            loading: state.utiltities.loading,
            expenseCategory: state.ExpenseCategory.expenseCategory,
            expenses: state.Expense.expense,
        })
    );

    const dispatch = useDispatch();
    const [visibleModal, setVisibleModal] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [exModal, setExModal] = useState(false);
    const [title, setTitle] = useState();
    const [amount, setAmount] = useState();
    const [date, setDate] = useState();
    const [category, setCategory] = useState();
    const [file, setFile] = useState();
    const [inDate, setInDate] = useState();
    const [catId, setCatId] = useState();
    const [pay, setPay] = useState();

    const toggleModal = () => {
        setVisibleModal(!visibleModal);
    };

    /* action column render */
    const ActionColumn = ({ projectId }) => {
        return (
            <React.Fragment>
                <Link className="action-icon" onClick={() => ViewExpenseFunc(projectId)}>
                    {" "}
                    <i className="mdi mdi-eye"></i>
                </Link>
                <Link className="action-icon" onClick={() => editEx(projectId)}>
                    {" "}
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>
                <Link className="action-icon" onClick={() => deleteExpense(projectId)}>
                    {" "}
                    <i className="mdi mdi-delete"></i>
                </Link>
            </React.Fragment>
        );
    };

    const ViewExpenseFunc = async (id) => {
        dispatch(startLoading())
        await dispatch(GetExpenseById(id, token));
        dispatch(stopLoading());
        setOpenView(!openView);
    };
    dispatch(stopLoading());

    const deleteExpense = async (id) => {
        dispatch(startLoading())
        await dispatch(DeleteExpense(id, token));
        dispatch(stopLoading());
    };

    const editEx = async (id) => {
        dispatch(startLoading());
        await dispatch(GetExpenseById(id, token));
        dispatch(stopLoading());
        setExModal(!exModal);
    };

    const toggleEdit = () => {
        setExModal(!exModal);
    };

    const columns = [
        {
            Header: 'Date',
            accessor: 'invoice_date',
            sort: false,
        },
        {
            Header: 'Title',
            accessor: 'title',
            sort: false,
        },
        {
            Header: 'Amount',
            accessor: 'amount',
            sort: false,
        },
        {
            Header: 'category',
            accessor: 'expense_category_id',
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
            Cell: ({ row }) => <ActionColumn projectId={row.original.id} />,
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

    const HandleFileUpload = (event) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setFile(file);
        }
    };

    const addExpense = async () => {
        if (inDate === undefined || title === undefined || amount === undefined || catId === undefined || pay === undefined || file === undefined) {
            toast.error('Enter all fields', { position: toast.POSITION.TOP_RIGHT });
            return;
        };
        const formData = new FormData();
        formData.append('invoice_date', inDate);
        formData.append('title', title);
        formData.append('amount', amount);
        formData.append('expense_category_id', catId);
        formData.append('pay_by', pay);
        formData.append('file', file);
        dispatch(startLoading());

        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const options = {
            method: 'POST',
            headers: myHeaders,
            body: formData,
        };

        await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.expense, options)
            .then(response => response.json())
            .then((e) => {
                dispatch(stopLoading());
                if (e?.status === 200) {
                    toast.success(e?.message, { position: toast.POSITION.TOP_RIGHT });
                    dispatch(GetExpense(token));
                    reset();
                    return
                } else {
                    toast.error(e?.message[0], { position: toast.POSITION.TOP_RIGHT });
                    return;
                };
            })
            .catch(err => {
                dispatch(stopLoading());
                console.log('addExpense err', err);
                toast.error(err, { position: toast.POSITION.TOP_RIGHT });
            });

        // await dispatch(AddExpense(formData, token, reset));
    };

    const reset = () => {
        setInDate();
        setTitle();
        setAmount();
        setCatId();
        setPay();
        setFile();
    };

    return loading ? (
        <div className='d-flex justify-content-center align-items-center'>
            <Spinner className="m-2" color={'primary'} />
        </div>
    ) : (
        <>
            <PageTitle
                title={"Expense"}
            />
            <Row>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col >
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>To</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col >
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>From</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <FormInput
                                    label="Expense Category"
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
                        {expenses !== undefined && expenses !== null ? (
                            <Table
                                columns={columns}
                                data={expenses}
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
            <Modal size="lg" show={visibleModal} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <h4 className="modal-title">Add Expense</h4>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Row className='mb-3'>
                        <Col >
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Invoice Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={inDate}
                                    onChange={(e) => setInDate(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col >
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Amount</Form.Label>
                                <Form.Control
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    type='number'
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <FormInput
                                label="Expense Category"
                                name="select"
                                type="select"
                                className="form-select"
                                key="select"
                                value={catId}
                                onChange={(e) => setCatId(e.target.value)}
                            >
                                <option>no Selected</option>
                                {expenseCategory?.map(val => {
                                    return (
                                        <option key={val.id} value={val.id}>{val.name}</option>
                                    );
                                })}
                            </FormInput>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormInput
                                label="Pay by"
                                name="select"
                                type="select"
                                className="form-select"
                                key="select"
                                value={pay}
                                onChange={(e) => setPay(e.target.value)}
                            >
                                <option>Cash</option>
                                <option>Online</option>
                                <option>Card</option>
                            </FormInput>
                        </Col>

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
                    </Row>
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
                        onClick={addExpense}
                    >
                        Add Expense
                    </Button>
                </Modal.Footer>
            </Modal>
            <EditExpenseModal visibleModal={exModal} toggleModal={toggleEdit} />
            <ViewExpense show={openView} setShow={setOpenView} />
        </>
    )
}
