import { Card, Col, Row } from 'react-bootstrap';
import { format } from 'date-fns';

import { usePageTitle } from '../../../hooks';
import Table from '../../../components/Table';

import { records as data } from './data';

const currentDate = new Date();
const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

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
    ...Array.from({ length: daysInMonth }, (_, index) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), index + 1);
        const formattedDate = format(date, 'yyyy-MM-dd');

        return {
            Header: formattedDate,
            accessor: formattedDate,
            sort: false,
        };
    }),
];

const Attendance = () => {
    usePageTitle({
        title: 'Attendance',
        breadCrumbItems: [
            {
                path: '/apps/attendance',
                label: 'Apps',
            },
            {
                path: '/apps/attendance',
                label: 'Attendance',
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
                            <Table
                                columns={columns}
                                data={data}
                                // pageSize={10}
                                // sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={false}
                                isSearchable={true}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Attendance;
