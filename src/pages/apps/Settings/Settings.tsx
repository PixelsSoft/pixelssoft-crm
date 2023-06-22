import { Card, Col, Dropdown, Row } from 'react-bootstrap';
import { usePageTitle } from '../../../hooks';
import { Link } from 'react-router-dom';
export type Reminder = {
    variant: string;
    title: string;
    date: string;
    time: string;
};

const reminder: Reminder[] = [
    {
        variant: 'primary',
        title: 'Meet Manager',
        date: 'February 24, 2019',
        time: '10.30am to 12.45pm',
    },
    {
        variant: 'success',
        title: 'Project Discussion',
        date: 'February 25, 2019',
        time: '10.30am to 12.45pm',
    },
    {
        variant: 'info',
        title: 'Meet Manager',
        date: 'February 26, 2019',
        time: '10.30am to 12.45pm',
    },
    {
        variant: 'secondary',
        title: 'Project Discussion',
        date: 'February 27, 2019',
        time: '10.30am to 12.45pm',
    },
    {
        variant: 'danger',
        title: 'Meet Manager',
        date: 'February 28, 2019',
        time: '10.30am to 12.45pm',
    },
];

const Settings = () => {
    usePageTitle({
        title: 'Settings',
        breadCrumbItems: [
            {
                path: '/apps/settings',
                label: 'Apps',
            },
            {
                path: '/apps/settings',
                label: 'Settings',
                active: true,
            },
        ],
    });
    return (
        <>
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title">Access Control</h4>
                            <p className="sub-header">Manage what users can access with roles</p>

                            <Dropdown className="float-end" align="end">
                                <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
                                    <i className="mdi mdi-dots-vertical"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>Action</Dropdown.Item>
                                    <Dropdown.Item>Anothther Action</Dropdown.Item>
                                    <Dropdown.Item>Something Else</Dropdown.Item>
                                    <Dropdown.Item>Separated link</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <ul className="list-group mb-0 user-list">
                                {(reminder || []).map((reminder, index) => {
                                    return (
                                        <li className="list-group-item" key={index.toString()}>
                                            <Link to="#" className="user-list-item">
                                                <div className="user-desc overflow-hidden">
                                                    <h5 className="name mt-0 mb-1">{reminder.title}</h5>
                                                    <span className="desc text-muted font-12 text-truncate d-block">
                                                        {reminder.date} - {reminder.time}
                                                    </span>
                                                </div>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Settings;
