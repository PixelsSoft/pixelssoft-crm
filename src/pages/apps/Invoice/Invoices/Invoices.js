import { Button, Card, Col, Row } from 'react-bootstrap';
import Table from '../../../../components/Table';
import { records as data } from './data';
import PageTitle from '../../../../components/PageTitle';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading } from '../../../../redux/Slices/utiltities/Utiltities';
import { CONSTANTS } from '../../../../constants/constant';

const Invoices = () => {
    const { token } = useSelector(state => state.Auth);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [invoice, setInvoice] = useState([]);

    /* name column render */
    const NameColumn = ({ row }) => {
        return (
            <div className="table-user">
                <img src={row.original.avatar} alt="" className="me-2 rounded-circle" />
                <Link to="#" className="text-body fw-semibold">
                    {row.original.name}
                </Link>
            </div>
        );
    };

    /* last order column render */
    const LastOrderColumn = ({ row }) => {
        return (
            <>
                {row.original.last_order.date}{" "}
                <small className="text-muted">{row.original.last_order.time}</small>
            </>
        );
    };

    /* status column render */
    const StatusColumn = ({ row }) => {
        return (
            <React.Fragment>
                <span
                    className={classNames("badge", {
                        "badge-soft-success": row.original.status === "Active",
                        "badge-soft-danger": row.original.status === "Blocked",
                    })}
                >
                    {row.original.status}
                </span>
            </React.Fragment>
        );
    };

    /* action column render */
    const ActionColumn = () => {
        return (
            <React.Fragment>
                <Link to="#" className="action-icon">
                    {" "}
                    <i className="mdi mdi-eye"></i>
                </Link>
                <Link to="#" className="action-icon">
                    {" "}
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>
                <Link to="#" className="action-icon">
                    {" "}
                    <i className="mdi mdi-delete"></i>
                </Link>
            </React.Fragment>
        );
    };

    const columns = [
        // {
        //     Header: 'ID',
        //     accessor: 'id',
        //     sort: true,
        // },
        {
            Header: 'Invoice #',
            accessor: 'invoice_key',
            sort: false,
        },
        {
            Header: 'Due Date',
            accessor: 'due_date',
            sort: false,
        },
        {
            Header: 'Amount',
            accessor: 'price',
            sort: false,
        },
        {
            Header: 'Quantity',
            accessor: 'quantity',
            sort: false,
        },
        {
            Header: 'Title',
            accessor: 'title',
            sort: false,
        },
        {
            Header: "Status",
            accessor: "status",
            sort: true,
            Cell: StatusColumn,
        },
        {
            Header: "Action",
            accessor: "action",
            sort: false,
            Cell: ActionColumn,
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

    const getCustomers = async () => {
        dispatch(startLoading());
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        };

        await fetch(CONSTANTS.API_URLS.BASE + `invoice`, options)
            .then(response => response.json())
            .then(e => {
                setInvoice(e.data);
            })
            .catch(err => {
                dispatch(stopLoading());
                console.log('getCustomers err', err);
            });
    };

    useEffect(() => {
        getCustomers();
    }, []);

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Invoices", path: "/apps/invoices" },
                ]}
                title={"Invoices"}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col sm={4}>
                                    <Button
                                        onClick={() => {
                                            navigate("/apps/invoice/createInvoice")
                                        }}
                                        className="btn btn-danger mb-2">
                                        <i className="mdi mdi-plus-circle me-2"></i> Create Invoice
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
                                data={invoice}
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
        </>
    );
};

export default Invoices;
