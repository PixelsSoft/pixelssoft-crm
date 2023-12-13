import { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import PortalProjectsDetailCard from '../../../components/PortalProjectsDetailCard';
import StatisticsWidget1 from '../../../components/StatisticsWidget1';
import Table from '../../../components/Table';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormInput } from '../../../components';
import { CreateMilestone, GetProjectById } from '../../../redux/Slices/Project/Project';
import Spinner from '../../../components/Spinner';
import { startLoading, stopLoading } from '../../../redux/Slices/utiltities/Utiltities';
import { toast } from 'react-toastify';

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
        Header: 'Start Date',
        accessor: 'start_date',
        sort: false,
    },
    {
        Header: 'End Date',
        accessor: 'end_date',
        sort: false,
    },
    {
        Header: 'Description',
        accessor: 'description',
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
    const { projectId } = useParams();
    const dispatch = useDispatch();
    const [desc, setDesc] = useState('');
    const [amount, setAmount] = useState('');
    const [standard, setStandard] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('');

    const { token, user, project, loading } = useSelector(
        (state) => ({
            token: state.Auth.token,
            user: state.Auth.user,
            category: state.Category.category,
            project: state.Projects.proectById,
            loading: state.utiltities.loading,
        })
    );

    const reset = () => {
        setDesc('')
        setAmount('')
        setStartDate('')
        setEndDate('')
        setStatus('')
    }

    const getProject = async () => {
        dispatch(startLoading());
        await dispatch(GetProjectById(projectId, token));
        dispatch(stopLoading());
    };

    const createMilestone = async () => {
        const data = {
            project_id: projectId,
            user_id: user.id,
            description: desc,
            amount: amount,
            status: status,
            start_date: startDate,
            end_date: endDate
        };
        if (desc === '' || amount === '' || startDate === '' || endDate === '' || status === '') {
            toast.error('Enter all field', { position: toast.POSITION.TOP_RIGHT });
            return
        };
        dispatch(startLoading());
        await dispatch(CreateMilestone(projectId, data, token, toggleModal));
        dispatch(stopLoading());
    };

    useEffect(() => {
        getProject();
    }, []);

    const toggleModal = () => {
        setStandard(!standard);
        reset();
    };

    const amountFunc = (e) => {
        if (e.target.value >= 0) {
            setAmount(e.target.value)
        }
    }

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
                                                _createdAt: `${project?.title}`,
                                                projectId: `${project.id}`,
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

                                        <h1 className="my-3">Milestones History</h1>
                                    </Col>

                                    <Col>

                                        <Button className="btn btn-success mb-2 me-1"
                                            onClick={() => {
                                                toggleModal()
                                            }}
                                        >
                                            Create Milestone
                                        </Button>
                                    </Col>

                                </Row>
                                {project?.milestone ? (
                                    <Row>
                                        <Table
                                            columns={columns}
                                            data={project?.milestone}
                                            pageSize={5}
                                            sizePerPageList={sizePerPageList}
                                            isSortable={true}
                                            pagination={true}
                                            isSearchable={true}
                                        />
                                    </Row>
                                ) : null}
                            </Card.Body>
                        ) : null}
                    </Card>
                </Col>
            </Row>
            <Modal show={standard} onHide={toggleModal}>
                <Modal.Header onHide={toggleModal} closeButton>
                    <h4 className="modal-title">Create Milestone</h4>
                </Modal.Header>
                <Modal.Body>
                    {/* <Row className="mb-3"> */}
                    <div className="mb-3">
                        <label className="form-label">Start Date</label> <br />
                        <FormInput
                            type="date"
                            name="date"
                            containerClass={'mb-3'}
                            key="date"
                            value={startDate}
                            onChange={(e) => {
                                setStartDate(e.target.value)
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">End Date</label> <br />
                        <FormInput
                            type="date"
                            name="date"
                            containerClass={'mb-3'}
                            key="date"
                            value={endDate}
                            onChange={(e) => {
                                setEndDate(e.target.value)
                            }}
                        />
                    </div>


                    <FormInput
                        label="Description"
                        type="textarea"
                        name="textarea"
                        containerClass={'mb-3'}
                        key="textarea"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            value={amount}
                            type='number'
                            onChange={(e) => amountFunc(e)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Status</Form.Label>
                        <Form.Select onChange={(e) => setStatus(e.target.value)}>
                            <option value={"pending"}>Pending</option>
                            <option value={"ongoing"}>Ongoing</option>
                            <option value={"completed"}>Completed</option>
                        </Form.Select>
                    </Form.Group>

                    {/* </Row> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={toggleModal}>
                        Close
                    </Button>{" "}
                    <Button className="btn btn-success mb-2 me-1" onClick={createMilestone}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CustomerProfile;
