import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { FormInput } from '../../../../components';
import PageTitle from '../../../../components/PageTitle'
import Table from '../../../../components/Table'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../../components/Spinner';
import { toast } from 'react-toastify';
import { startLoading, stopLoading } from '../../../../redux/Slices/utiltities/Utiltities';
import { AddVenCat, DeleVenCat, UpdateVenCat } from '../../../../redux/Slices/VendorCategory/VendorCategory';
import { Link } from 'react-router-dom';


export default function VendorCategory() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [Des, setDes] = useState('');
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState();

    const { token, loading, vendorCategory } = useSelector((state) => ({
        token: state.Auth.token,
        loading: state.utiltities.loading,
        vendorCategory: state.VendorCategory.venCat,
    }));

    const reset = () => {
        setTitle('');
        setDes('');
        setId();
        setEdit(false);
    };

    const addVendorCategory = async () => {
        const data = {
            name: title,
            description: Des
        };
        if (title === '' || Des === '') {
            return toast.error('Enter all fields', { position: toast.POSITION.TOP_RIGHT });
        };
        dispatch(startLoading());
        await dispatch(AddVenCat(data, token, reset));
        dispatch(stopLoading());
    };

    const ActionColumn = ({ data }) => {
        const { name, description, id } = data;
        return (
            <React.Fragment>
                <Link className="action-icon" onClick={() => editFunc(name, description, id)}>
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

    const deleteFunc = async (id) => {
        dispatch(startLoading())
        await dispatch(DeleVenCat(id, token));
        dispatch(stopLoading());
    }

    const editFunc = (name, description, id) => {
        setTitle(name);
        setDes(description);
        setId(id)
        setEdit(!edit);
    }

    const columns = [
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
            Cell: ({ row }) => <ActionColumn data={row.original} />,
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

    const update = async () => {
        const data = {
            name: title,
            description: Des
        };
        if (title === '' || Des === '') {
            return toast.error('Enter all fields', { position: toast.POSITION.TOP_RIGHT });
        };
        dispatch(startLoading())
        await dispatch(UpdateVenCat(id, data, token, reset))
        dispatch(stopLoading());
    }

    const cancelEdit = async () => {
        setEdit(false);
        reset()
    }

    return loading ? (
        <div className='d-flex justify-content-center align-items-center'>
            <Spinner className="m-2" color={'primary'} />
        </div>
    ) : (
        <>
            <PageTitle

                title={"Vendor Category"}
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


                            <Col style={{ alignSelf: "end" }}>
                                {edit ? (
                                    <>
                                        <Button
                                            variant={"success"}
                                            className="waves-effect waves-light px-5  mr-3"
                                            onClick={update}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            variant={"danger"}
                                            className="waves-effect waves-light px-5"
                                            onClick={cancelEdit}
                                        >
                                            Cancel
                                        </Button>
                                    </>
                                ) : (

                                    <Button
                                        variant={"success"}
                                        className="waves-effect waves-light px-5 "
                                        onClick={addVendorCategory}
                                    >
                                        Add
                                    </Button>
                                )}
                            </Col>


                        </Row>
                        {vendorCategory !== undefined && vendorCategory !== null ? (

                            <Table
                                columns={columns}
                                data={vendorCategory}
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
        </>

    )
}
