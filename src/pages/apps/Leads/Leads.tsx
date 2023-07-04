import { Card, Col, Row } from 'react-bootstrap';
import { usePageTitle } from '../../../hooks';
import Table from '../../../components/Table';

import { Link } from 'react-router-dom';

const data = [];

const columns = [
    {
        Header: 'ID',
        accessor: '_id',
        sort: true,
    },
    {
        Header: 'Name',
        accessor: 'fullName',
        sort: true,
    },
    {
        Header: 'Email',
        accessor: 'email',
        sort: true,
    },
    {
        Header: 'Phone Number',
        accessor: 'phoneNumber',
        sort: false,
    },
    {
        Header: 'Company',
        accessor: 'company',
        sort: false,
    },
    {
        Header: 'Status',
        accessor: 'status',
        sort: false,
    },
    {
        Header: 'Comments',
        accessor: 'comments',
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

const Leads = () => {
    usePageTitle({
        title: 'Leads',
        breadCrumbItems: [
            {
                path: '/apps/leads',
                label: 'Apps',
            },
            {
                path: '/apps/leads',
                label: 'Leads',
                active: true,
            },
        ],
    });

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <h4 className="header-title mb-4">Leads</h4>
                                </Col>
                                <Col sm={4} className="d-flex justify-content-end">
                                    <Link
                                        to="profile/new"
                                        className="btn btn-purple rounded-pill w-md waves-effect waves-light mb-3">
                                        <i className="mdi mdi-plus me-1"></i>
                                        Create Lead
                                    </Link>
                                </Col>
                            </Row>
                            <Table
                                columns={columns}
                                data={[]}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSearchable={true}
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

export default Leads;
