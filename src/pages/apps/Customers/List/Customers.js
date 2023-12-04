import { Button, Card, Col, Row } from 'react-bootstrap';
import Table from '../../../../components/Table';
import { records as data } from './data';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import PageTitle from '../../../../components/PageTitle';
import { useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
// import { deleteCustomer, getCustomers } from '../../../../redux/customers/actions';
/* action column render */


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
    const navigate = useNavigate();

    const { customer } = useSelector(
        (state) => ({
            customer: state.Customer.customer
        })
    );

    const ActionColumn = () => {
        return (
            <React.Fragment>
                <Link to="/apps/customer/customerProfile" className="action-icon">
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
            Cell: ActionColumn,
        },
    ];


    // const [modal, setModal] = useState(false);

    // const { customers, loading, deleteCustomerSuccess } = appSelector((state) => ({
    //     customers: state.Customer.customers,
    //     loading: state.Customer.loading,
    //     deleteCustomerSuccess: state.Customer.deleteCustomerSuccess,
    // }));

    // const handleDelete = (id) => {
    //     // dispatch(deleteCustomer(id));
    // };

    // const toggle = () => setModal(!modal);

    const loading = false

    return loading ? (
        <h4>Loading...</h4>
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
        </>
    );
};

export default Customers;
