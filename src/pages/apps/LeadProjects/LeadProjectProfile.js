import { Row, Col, Card, Button } from 'react-bootstrap';
import PortalProjectsDetailCard from '../../../components/PortalProjectsDetailCard';
import StatisticsWidget1 from '../../../components/StatisticsWidget1';
// import Table from '../../../components/Table';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { startLoading, stopLoading } from '../../../redux/Slices/utiltities/Utiltities';
import { GetProjectById } from '../../../redux/Slices/Project/Project';
import { useEffect } from 'react';
import Spinner from '../../../components/Spinner';

// const columns = [
//     {
//         Header: 'ID',
//         accessor: 'id',
//         sort: true,
//     },
//     {
//         Header: 'Status',
//         accessor: 'status',
//         sort: false,
//     },
//     {
//         Header: 'Start Date',
//         accessor: 'start_date',
//         sort: false,
//     },
//     {
//         Header: 'End Date',
//         accessor: 'end_date',
//         sort: false,
//     },
//     {
//         Header: 'Description',
//         accessor: 'description',
//         sort: false,
//     },
//     {
//         Header: 'Amount',
//         accessor: 'amount',
//         sort: false,
//     },


// ];

// const sizePerPageList = [
//     {
//         text: '5',
//         value: 5,
//     },
//     {
//         text: '10',
//         value: 10,
//     },
//     {
//         text: '25',
//         value: 25,
//     },

// ];

const LeadProjectProfile = () => {
    const { projectId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { token, project, loading } = useSelector(
        (state) => ({
            token: state.Auth.token,
            category: state.Category.category,
            project: state.Projects.proectById,
            loading: state.utiltities.loading,
        })
    );

    const getProject = async () => {
        // dispatch(startLoading());
        await dispatch(GetProjectById(projectId, token));
        // dispatch(stopLoading());
    };

    useEffect(() => {
        getProject();
    }, [projectId]);

    return loading ? (
        <div className='d-flex justify-content-center align-items-center'>
            <Spinner className="m-2" color={'primary'} />
        </div>
    ) : (
        <>
            <Row>
                <Col>
                    <Card>
                        {project ? (
                            <Card.Body className="p-3">
                                <Row className="d-flex justify-content-center">
                                    <Col sm={6}>
                                        <PortalProjectsDetailCard
                                            contact={{
                                                // avatar: avatar,
                                                description: `${project?.description}`,
                                                title: `${project?.title}`,
                                                SalesName: `${project?.closedby?.name}`,
                                                BidderName: `${project?.bidby?.name}`,
                                                Amount: `${project?.title}`,
                                                platform: `${project?.platform?.title}`,
                                                _createdAt: `${project?.title}`
                                            }}
                                        />
                                    </Col>
                                    <Col sm={6}>
                                        <StatisticsWidget1
                                            title="Total Paid Milestones"
                                            color={'#10c469'}
                                            data={50}
                                            stats={10}
                                            subTitle="Paid today"
                                        />
                                        <StatisticsWidget1
                                            title="Total Upaid Milestones"
                                            color={'#f05050'}
                                            data={3}
                                            stats={5}
                                            subTitle="Unpaid today"
                                        />
                                    </Col>
                                </Row>
                                <Row style={{ alignItems: "center", justifyContent: "space-between" }}>
                                    <Col>

                                        <h1 className="my-3">Invoice History</h1>
                                    </Col>

                                    <Col>

                                        <Button className="btn btn-success mb-2 me-1"
                                            onClick={() => navigate('/apps/invoices')}
                                        >
                                            Create Invoice
                                        </Button>
                                    </Col>

                                </Row>
                                <Row>

                                    {/* <Table
                                        columns={columns}
                                        data={project?.milestone}
                                        pageSize={5}
                                        sizePerPageList={sizePerPageList}
                                        isSortable={true}
                                        pagination={true}
                                        isSearchable={true}
                                    /> */}
                                </Row>
                            </Card.Body>
                        ) : null}
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default LeadProjectProfile