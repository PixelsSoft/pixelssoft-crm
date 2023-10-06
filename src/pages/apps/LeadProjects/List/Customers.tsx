import { Card, Col, Row } from 'react-bootstrap';
import { usePageTitle, useRedux } from '../../../../hooks';
import Table from '../../../../components/Table';

import { records as data } from './data';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { records } from './data';
// import { deleteCustomer, getCustomers } from '../../../../redux/customers/actions';

const columns = [
    {
        Header: 'ID',
        accessor: '_id',
        sort: true,
    },
    {
        Header: 'Name',
        accessor: 'link',
        sort: true,
    },
    {
        Header: 'Email',
        accessor: 'title',
        sort: true,
    },
    {
        Header: 'Project',
        accessor: 'Project',
        sort: false,
    },
    {
        Header: 'Amount',
        accessor: 'Amount',
        sort: false,
    },
    {
        Header: 'Paid Amount',
        accessor: 'PaidAmount',
        sort: false,
    },
    {
        Header: 'Status',
        accessor: 'Status',
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
    {
        text: 'All',
        value: data.length,
    },
];

const Customers = () => {
    const { appSelector, dispatch } = useRedux();

    // const [modal, setModal] = useState(false);

    // const { customers, loading, deleteCustomerSuccess } = appSelector((state) => ({
    //     customers: state.Customer.customers,
    //     loading: state.Customer.loading,
    //     deleteCustomerSuccess: state.Customer.deleteCustomerSuccess,
    // }));

    const handleDelete = (id: string) => {
        // dispatch(deleteCustomer(id));
    };

    // const toggle = () => setModal(!modal);

    usePageTitle({
        title: 'Lead Projects',
        breadCrumbItems: [
            {
                path: '/apps/leadProject',
                label: 'Apps',
            },
            {
                path: '/apps/leadProject',
                label: 'leadProject',
                active: true,
            },
        ],
    });

    // useEffect(() => {
    //     // dispatch(getCustomers());
    // }, [dispatch, deleteCustomerSuccess]);
    const loading = false

    return loading ? (
        <h4>Loading...</h4>
    ) : (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <h4 className="header-title mb-4">Project List</h4>
                                </Col>
                                <Col sm={4} className="d-flex justify-content-end">
                                    <Link
                                        to="profile/new"
                                        className="btn btn-purple rounded-pill w-md waves-effect waves-light mb-3">
                                        <i className="mdi mdi-plus me-1"></i>
                                        Add Projects
                                    </Link>
                                </Col>
                            </Row>
                            <Table
                                columns={columns}
                                data={records}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSearchable={true}
                                hasActions={true}
                                hasLink={true}
                                onDelete={handleDelete}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* <Modal show={modal} onHide={toggle}>
                <Modal.Header onHide={toggle} closeButton>
                    <h4 className="modal-title">Modal Heading</h4>
                </Modal.Header>
                <Modal.Body>
                    <h5>Are you sure?</h5>
                    <p>Do you want to delete this customer?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={toggle}>Confirm</Button>
                </Modal.Footer>
            </Modal> */}
        </>
    );
};

export default Customers;
