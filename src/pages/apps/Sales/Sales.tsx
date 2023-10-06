import { Button, Card, Col, Row } from 'react-bootstrap';
import { usePageTitle } from '../../../hooks';
import StatisticsWidget1 from '../../../components/StatisticsWidget1';
import StatisticsWidget2 from '../../../components/StatisticsWidget2';
import { FormInput } from '../../../components/form';
import { Link } from 'react-router-dom';
import { recordsUpwork } from './data';
import Table from '../../../components/Table';
import TabsBordered from '../../uikit/TabsAccordions/TabsBordered';
import { tabContents } from '../../uikit/TabsAccordions/data';

const columns = [
    {
        Header: 'ID',
        accessor: 'id',
        sort: true,
    },
    {
        Header: 'Name',
        accessor: 'name',
        sort: false,
    },
    {
        Header: 'amount',
        accessor: 'amount',
        sort: false,
    },
    {
        Header: 'Pending Amount',
        accessor: 'pending',
        sort: false,
    },
    {
        Header: 'Date',
        accessor: 'date',
        sort: false,
    },
    {
        Header: 'Platform',
        accessor: 'platform',
        sort: false,
    },
    {
        Header: 'Sale Person',
        accessor: 'salePerson',
        sort: false,
    },
    {
        Header: 'Status',
        accessor: 'status',
        sort: false,
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
        value: recordsUpwork.length,
    },
];

const Sales = () => {
    usePageTitle({
        title: 'Sales',
        breadCrumbItems: [
            {
                path: '/apps/sales',
                label: 'Apps',
            },
            {
                path: '/apps/sales',
                label: 'Sales',
                active: true,
            },
        ],
    });
    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row className="justify-content-center">
                                <Col md={4}>
                                    <div className="mt-3 mt-md-0">
                                        <Link to="/apps/customers/profile/new">
                                            <Button variant="success" className="waves-effect waves-light">
                                                <i className="mdi mdi-plus-circle me-1"></i>
                                                Add Customer
                                            </Button>
                                        </Link>
                                    </div>
                                </Col>
                                <Col md={8}>
                                    <form className="d-flex flex-wrap align-items-center justify-content-sm-end">
                                        <label className="me-2">Sort By</label>
                                        <FormInput type="select" name="sort">
                                            <option>All</option>
                                            <option>Name</option>
                                            <option>Post</option>
                                            <option>Followers</option>
                                            <option>Followings</option>
                                        </FormInput>
                                        <FormInput
                                            type="search"
                                            name="search"
                                            placeholder="Search..."
                                            className="ms-sm-2"
                                        />
                                    </form>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <TabsBordered tabContents={tabContents} />
            <Row>


                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <div className="mb-3">
                                <h3>Upwork Sales:</h3>
                            </div>
                            <Table
                                columns={columns}
                                data={recordsUpwork}
                                pageSize={10}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSearchable={true}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <div className="mb-3">
                                <h3>Upwork Sales:</h3>
                            </div>
                            <Table
                                columns={columns}
                                data={recordsUpwork}
                                pageSize={10}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSearchable={true}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <div className="mb-3">
                                <h3>Upwork Sales:</h3>
                            </div>
                            <Table
                                columns={columns}
                                data={recordsUpwork}
                                pageSize={10}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSearchable={true}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Sales;
