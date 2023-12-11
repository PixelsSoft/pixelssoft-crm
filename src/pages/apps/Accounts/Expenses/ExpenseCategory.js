import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import PageTitle from '../../../../components/PageTitle'
import Table from '../../../../components/Table'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../../components/Spinner';
import { startLoading, stopLoading } from '../../../../redux/Slices/utiltities/Utiltities';
import { AddExpenseCategory, DeleteExpenseCategory, EditExpenseCategory } from '../../../../redux/Slices/ExpenseCategory/expenseCategory';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function ExpenseCategory() {

    const { category, token, loading } = useSelector(
        (state) => ({
            token: state.Auth.token,
            loading: state.utiltities.loading,
            category: state.ExpenseCategory.expenseCategory,
        })
    );

    const dispatch = useDispatch();
    const [title, setTitle] = useState();
    const [Des, setDes] = useState();
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState();

    const ActionColumn = ({ row }) => {
        return (
            <React.Fragment>
                {/* <Link className="action-icon">
                    {" "}
                    <i className="mdi mdi-eye"></i>
                </Link> */}
                <Link className="action-icon" onClick={() => editCat(row)}>
                    {" "}
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>
                <Link className="action-icon" onClick={() => deleteCat(row)}>
                    {" "}
                    <i className="mdi mdi-delete"></i>
                </Link>
            </React.Fragment>
        );
    };

    const deleteCat = async ({ id }) => {
        dispatch(startLoading());
        await dispatch(DeleteExpenseCategory(id, token));
        dispatch(stopLoading());
    }

    const editCat = async (row) => {
        setId(row.id);
        setTitle(row.name);
        setDes(row.description);
        setEdit(!edit);
    };

    const close = () => {
        reset();
        setEdit(!edit);
    };

    const columns = [
        {
            Header: 'Id',
            accessor: 'id',
            sort: true,
        },
        {
            Header: 'Title',
            accessor: 'name',
            sort: false,
        },
        {
            Header: 'Description',
            accessor: 'description',
            sort: false,
        },
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
        setTitle();
        setDes();
        setId();
    };

    const update = async () => {
        const data = {
            name: title,
            description: Des,
        };
        dispatch(startLoading());
        await dispatch(EditExpenseCategory(id, data, token, reset));
        dispatch(stopLoading());
    };

    const addCat = async () => {
        if (title === undefined || Des === undefined) {
            toast.error("Enter all fields", { position: toast.POSITION.TOP_RIGHT });
            return
        };
        const data = {
            name: title,
            description: Des,
        };
        dispatch(startLoading());
        await dispatch(AddExpenseCategory(data, token, reset));
        dispatch(stopLoading());
    };

    return loading ? (
        <div className='d-flex justify-content-center align-items-center'>
            <Spinner className="m-2" color={'primary'} />
        </div>
    ) : (
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
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col >
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        value={Des}
                                        onChange={(e) => setDes(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            {edit ? (
                                <Col style={{ alignSelf: "end" }}>
                                    <Row>
                                        <Col>
                                            <Button
                                                variant={"success"}
                                                className="waves-effect waves-light px-5 mr-5"
                                                onClick={update}
                                            >
                                                Update
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button
                                                variant={"danger"}
                                                className="waves-effect waves-light px-5 "
                                                onClick={close}
                                            >
                                                Cancel
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            ) : (
                                <Col style={{ alignSelf: "end" }}>
                                    <Button
                                        variant={"success"}
                                        className="waves-effect waves-light px-5 "
                                        onClick={addCat}
                                    >
                                        Add
                                    </Button>
                                </Col>
                            )}
                        </Row>
                        <Table
                            columns={columns}
                            data={category}
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
