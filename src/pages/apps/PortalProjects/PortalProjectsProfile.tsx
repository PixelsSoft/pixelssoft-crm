// import ContactDetails from '../../../../components/ContactDetails';
import { Row, Col, Card } from 'react-bootstrap';
// import avatar2 from '../../../../assets/images/users/user-9.jpg';

import PortalProjectsDetailCard from '../../../components/PortalProjectsDetailCard';
import StatisticsWidget1 from '../../../components/StatisticsWidget1';
import Table from '../../../components/Table';


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
        Header: 'Date',
        accessor: 'invoiceNumber',
        sort: false,
    },
    {
        Header: 'Description',
        accessor: 'dueDate',
        sort: false,
    },
    {
        Header: 'Amount',
        accessor: 'amount',
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
                                    <PortalProjectsDetailCard
                                        contact={{

                                            // avatar: avatar,
                                            description: 'Hi I am Johnathn Deo, has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type.',
                                            title: 'Johnathan Deo',
                                            SalesName: '(123) 123 1234',
                                            BidderName: 'coderthemes@gmail.com',
                                            Amount: 'USA',
                                            platform: "abc",
                                            _createdAt: "12334"
                                        }}
                                    />
                                </Col>
                                <Col sm={6}>
                                    <StatisticsWidget1
                                        title="Total Paid Milestones"
                                        color={'#10c469'}
                                        data={100}
                                        stats={10}
                                        subTitle="Paid today"
                                    />
                                    <StatisticsWidget1
                                        title="Total Upaid Milestones"
                                        color={'#f05050'}
                                        data={0}
                                        stats={0}
                                        subTitle="Unpaid today"
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <h1 className="my-3">Milestones History</h1>
                                <Table
                                    columns={columns}
                                    data={[1, 2]}
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
