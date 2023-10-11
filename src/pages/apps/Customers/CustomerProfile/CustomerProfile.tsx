// import ContactDetails from '../../../../components/ContactDetails';
import { Row, Col, Card } from 'react-bootstrap';
// import avatar2 from '../../../../assets/images/users/user-9.jpg';
import StatisticsWidget1 from '../../../../components/StatisticsWidget1';

import { records as data } from './data';
import Table from '../../../../components/Table';
import CustomerDetailCard from '../../../../components/CustomerDetailCard';

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


    return (
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
                                            Detail: 'Hi I am Johnathn Deo, has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type.',
                                            fullName: 'Johnathan Deo',
                                            phoneNumber: '(123) 123 1234',
                                            email: 'coderthemes@gmail.com',
                                            Address: 'USA',
                                            company: "abc",
                                            _createdAt: "12334"
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
                                    data={data}
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
