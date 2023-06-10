import ContactDetails from '../../../../components/ContactDetails';
import { usePageTitle } from '../../../../hooks';
import { Row, Col, Card } from 'react-bootstrap';
import avatar2 from '../../../../assets/images/users/user-9.jpg';
import StatisticsWidget1 from '../../../../components/StatisticsWidget1';

import { records as data } from './data';
import Table from '../../../../components/Table';

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
    usePageTitle({
        title: 'Customer Profile',
        breadCrumbItems: [
            {
                path: '/apps/customers/:id',
                label: 'Apps',
            },
            {
                path: '/apps/customers/:id',
                label: 'Customer Profile',
                active: true,
            },
        ],
    });

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body className="p-3">
                            <Row className="d-flex justify-content-center">
                                <Col sm={6}>
                                    <ContactDetails
                                        contact={{
                                            id: 2,
                                            avatar: avatar2,
                                            shortDesc:
                                                'Hi I am Johnathn Deo, has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type.',
                                            name: 'Johnathan Deo',
                                            mobile: '(123) 123 1234',
                                            email: 'coderthemes@gmail.com',
                                            location: 'USA',
                                        }}
                                    />
                                </Col>
                                <Col sm={6}>
                                    <StatisticsWidget1
                                        title="Total Revenue"
                                        color={'#f05050'}
                                        data={50}
                                        stats={256}
                                        subTitle="Revenue today"
                                    />
                                    <StatisticsWidget1
                                        title="Total Revenue"
                                        color={'#f05050'}
                                        data={50}
                                        stats={256}
                                        subTitle="Revenue today"
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
