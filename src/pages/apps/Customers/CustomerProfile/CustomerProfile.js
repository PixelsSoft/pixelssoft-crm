import { Row, Col, Card, Table } from 'react-bootstrap';
import StatisticsWidget1 from '../../../../components/StatisticsWidget1';
import { records as data } from './data';
// import Table from '../../../../components/Table';
import CustomerDetailCard from '../../../../components/CustomerDetailCard';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetSingleCustomer } from '../../../../redux/Slices/Customer/customer';
import Spinner from '../../../../components/Spinner';
import { startLoading, stopLoading } from '../../../../redux/Slices/utiltities/Utiltities';

const columns = [
    {
        Header: 'ID',
        accessor: 'id',
        sort: true,
    },
    {
        Header: 'Status',
        accessor: 'status',
        sort: false,
    },
    {
        Header: 'Invoice #',
        accessor: 'invoiceNumber',
        sort: false,
    },
    {
        Header: 'Due Date',
        accessor: 'dueDate',
        sort: false,
    },
    {
        Header: 'Amount',
        accessor: 'amount',
        sort: false,
    },
    {
        Header: 'Pending Amount',
        accessor: 'pending',
        sort: false,
    },
    {
        Header: 'Category',
        accessor: 'category',
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

const CustomerProfile = () => {
    const { profileId } = useParams();
    const dispatch = useDispatch();

    const { loading, token, SingleCustomer } = useSelector(
        (state) => ({
            loading: state.utiltities.loading,
            token: state.Auth.token,
            SingleCustomer: state.Customer.singleCustomer
        })
    );

    const getSingleProfile = async () => {
        dispatch(startLoading());
        dispatch(GetSingleCustomer(profileId, token));
        dispatch(stopLoading());
    };

    useEffect(() => {
        getSingleProfile();
    }, [profileId]);

    return loading ? (
        <div className='d-flex justify-content-center align-items-center'>
            <Spinner className="m-2" color={'primary'} />
        </div>
    ) : (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body className="p-3">
                            <Row className="d-flex justify-content-center">
                                <Col sm={6}>
                                    <CustomerDetailCard
                                        contact={{
                                            // avatar: avatar,
                                            Detail: SingleCustomer?.platform,
                                            fullName: SingleCustomer?.name,
                                            phoneNumber: SingleCustomer?.phone,
                                            email: SingleCustomer?.email,
                                            Address: SingleCustomer?.address,
                                            profileId: profileId
                                            // company: "abc",
                                            // _createdAt: "12334"
                                        }}
                                    />
                                </Col>
                                <Col sm={6}>
                                    <StatisticsWidget1
                                        title="Total Paid Invoice"
                                        color={'#10c469'}
                                        data={100}
                                        stats={10}
                                        subTitle="Paid today"
                                    />
                                    <StatisticsWidget1
                                        title="Total Upaid Invoice"
                                        color={'#f05050'}
                                        data={0}
                                        stats={0}
                                        subTitle="Unpaid today"
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <h1 className="my-3">Purchase History</h1>
                                <Table
                                    columns={columns}
                                    data={SingleCustomer?.invoices}
                                    pageSize={5}
                                    sizePerPageList={sizePerPageList}
                                    isSortable={true}
                                    pagination={true}
                                    isSearchable={true}
                                />
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default CustomerProfile;
