import { Card, Nav, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Table from '../../../components/Table';
import { recordsUpwork } from '../../apps/Sales/data';

// types
import { TabContent } from './types';

type TabsBorderedProps = {
    tabContents: TabContent[];
    justify?: boolean;
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
        sort: false,
    },

    {
        Header: 'Date',
        accessor: 'date',
        sort: false,
    },
    {
        Header: 'Bidder/Scraper',
        accessor: 'Bidder/Scraper',
        sort: false,
    },
    {
        Header: 'Sale Person',
        accessor: 'salePerson',
        sort: false,
    },
    {
        Header: 'Paid',
        accessor: 'Paid',
        sort: false,
    },
    {
        Header: 'UnPaid',
        accessor: 'unPaid',
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

const TabsBordered = ({ tabContents, justify }: TabsBorderedProps) => {
    return (
        <Card>
            <Card.Body>


                <Tab.Container defaultActiveKey="Profile">
                    <Nav as="ul" variant="tabs" justify={justify} className="nav-bordered">
                        {(tabContents || []).map((tab, index) => {
                            return (
                                <Nav.Item as="li" key={index.toString()}>
                                    <Nav.Link as={Link} to="#" eventKey={tab.title} className="cursor-pointer">
                                        {tab.title}
                                    </Nav.Link>
                                </Nav.Item>
                            );
                        })}
                    </Nav>


                    <Tab.Content>
                        <Table
                            columns={columns}
                            data={recordsUpwork}
                            pageSize={10}
                            sizePerPageList={sizePerPageList}
                            isSortable={true}
                            pagination={true}
                        // isSearchable={true}
                        />
                        {/* {(tabContents || []).map((tab, index) => {
                            return (
                                <Tab.Pane eventKey={tab.title} id={String(tab.id)} key={index.toString()}>
                                    <p>{tab.text}</p>
                                </Tab.Pane>
                            );
                        })} */}
                    </Tab.Content>
                </Tab.Container>
            </Card.Body>
        </Card>
    );
};

export default TabsBordered;
