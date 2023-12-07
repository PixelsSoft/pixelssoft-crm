import { Button, Card, Col, Row } from 'react-bootstrap';
import Table from '../../../../components/Table';
import { records as data } from './data';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import PageTitle from '../../../../components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../../components/Spinner';
import { DeleteCustomer } from '../../../../redux/Slices/Customer/customer';
import { startLoading, stopLoading } from '../../../../redux/Slices/utiltities/Utiltities';
import CustomerEditModal from '../../../../components/CustomerEditModal';

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

const Customers = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [id, setId] = useState();
    const [editUserModal, setEditUserModal] = useState(false);

    const { customer, loading, token } = useSelector(
        (state) => ({
            customer: state.Customer.customer,
            loading: state.utiltities.loading,
            token: state.Auth.token,
        })
    );

    const del = async (id) => {
        dispatch(startLoading());
        await dispatch(DeleteCustomer(id, token));
        dispatch(stopLoading());
    };

    const toggleEditModal = (id) => {
        setId(id);
        setEditUserModal(!editUserModal);
    }

    const toggleClose = async () => {
        setEditUserModal(!editUserModal);
    };

    const ActionColumn = ({ projectId }) => {
        return (
            <React.Fragment>
                <Link to={`/apps/customer/customerProfile/${projectId}`} className="action-icon">
                    {" "}
                    <i className="mdi mdi-eye"></i>
                </Link>
                <Link className="action-icon" onClick={() => toggleEditModal(projectId)}>
                    {" "}
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>
                <Link className="action-icon" onClick={() => del(projectId)}>
                    {" "}
                    <i className="mdi mdi-delete"></i>
                </Link>
            </React.Fragment>
        );
    };
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
            Header: 'Platform',
            accessor: 'platform',
            sort: false,
        },
        {
            Header: 'Project Title',
            accessor: 'project_title',
            sort: false,
        },
        {
            Header: 'Total Amount',
            accessor: 'total_amount',
            sort: false,
        },
        {
            Header: 'Paid Amount',
            accessor: 'paid_amount',
            sort: false,
        },
        {
            Header: "Action",
            accessor: "action",
            sort: false,
            Cell: ({ row }) => <ActionColumn projectId={row.original.id} />,
        },
    ];

    return loading ? (
        <div className='d-flex justify-content-center align-items-center'>
            <Spinner className="m-2" color={'primary'} />
        </div>
    ) : (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Customers", path: "/apps/customers" },
                ]}
                title={"Customers"}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col sm={4}>
                                    <Button
                                        onClick={() => {
                                            navigate("/apps/customer/addCustomer")
                                        }}
                                        className="btn btn-danger mb-2">
                                        <i className="mdi mdi-plus-circle me-2"></i> Add Customer
                                    </Button>
                                </Col>

                                <Col sm={8}>
                                    <div className="text-sm-end">
                                        <Button className="btn btn-success mb-2 me-1">
                                            <i className="mdi mdi-cog-outline"></i>
                                        </Button>

                                        <Button className="btn btn-light mb-2 me-1">Import</Button>

                                        <Button className="btn btn-light mb-2">Export</Button>
                                    </div>
                                </Col>
                            </Row>

                            <Table
                                columns={columns}
                                data={customer}
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
                </Col>
            </Row>
            {editUserModal ? (
                <CustomerEditModal profileId={id} editUserModal={editUserModal} toggleClose={toggleClose} />
            ) : null}
        </>
    );
};

export default Customers;
