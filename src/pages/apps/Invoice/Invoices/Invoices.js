import { Button, Card, Col, Row } from 'react-bootstrap';
import Table from '../../../../components/Table';
import PageTitle from '../../../../components/PageTitle';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteInvoice, GetInvoiceById } from '../../../../redux/Slices/Invoices/Invoices';
import { startLoading, stopLoading } from '../../../../redux/Slices/utiltities/Utiltities';
import UpdateInvoiceModal from '../../../../components/UpdateInvoiceModal';
import ViewInvoiceModal from '../../../../components/ViewInvoiceModal';
import Spinner from '../../../../components/Spinner';

const Invoices = () => {
    const { token, invoice, loading, } = useSelector(
        (state) => ({
            token: state.Auth.token,
            invoice: state.Invoices.Invoices,
            loading: state.utiltities.loading,
        })
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [previewModal, setPreviewModal] = useState(false);
    const [show, setShow] = useState(false);
    const [id, setId] = useState();

    const deleteInvoice = async (projectId) => {
        dispatch(startLoading());
        await dispatch(DeleteInvoice(projectId, token));
        dispatch(stopLoading());
    };

    /* status column render */
    const StatusColumn = ({ status }) => {
        return (
            <React.Fragment>
                <span
                    className={classNames("badge", {
                        "badge-soft-success": status !== null,
                        "badge-soft-danger": status === null,
                    })}
                >
                    {status === null ? 'Unpaid' : 'Paid'}
                </span>
            </React.Fragment>
        );
    };

    /* action column render */
    const ActionColumn = ({ projectId }) => {
        return (
            <React.Fragment>
                <Link to="#" className="action-icon" onClick={() => viewInvoice(projectId)}>
                    {" "}
                    <i className="mdi mdi-eye"></i>
                </Link>
                <Link to="#" className="action-icon" onClick={() => toggle(projectId)}>
                    {" "}
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>
                <Link to="#" className="action-icon" onClick={() => deleteInvoice(projectId)}>
                    {" "}
                    <i className="mdi mdi-delete"></i>
                </Link>
            </React.Fragment>
        );
    };

    const columns = [
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
            Cell: ({ row }) => <StatusColumn status={row.original.paid_at} />,
        },
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
        {
            text: 'All',
            value: invoice?.length,
        },
    ];

    const viewInvoice = async (projectId) => {
        dispatch(startLoading());
        await dispatch(GetInvoiceById(projectId, token));
        dispatch(stopLoading());
        setShow(!show);
    }

    const toggle = async (projectId) => {
        setId(projectId);
        dispatch(startLoading())
        await dispatch(GetInvoiceById(projectId, token));
        dispatch(stopLoading())
        setPreviewModal(!previewModal);
    };

    const toggleClose = async () => {
        setPreviewModal(!previewModal);
    };

    return loading ? (
        <div className='d-flex justify-content-center align-items-center'>
            <Spinner className="m-2" color={'primary'} />
        </div>
    ) : (
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
            <UpdateInvoiceModal id={id} previewModal={previewModal} setPreviewModal={setPreviewModal} toggleClose={toggleClose} />
            <ViewInvoiceModal show={show} setShow={setShow} />
        </>
    );
};

export default Invoices;
