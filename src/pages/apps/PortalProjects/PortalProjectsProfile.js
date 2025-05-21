import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Modal, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import PortalProjectsDetailCard from '../../../components/PortalProjectsDetailCard';
import StatisticsWidget1 from '../../../components/StatisticsWidget1';
import Table from '../../../components/Table';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormInput } from '../../../components';

import Spinner from '../../../components/Spinner';
import { startLoading, stopLoading } from '../../../redux/Slices/utiltities/Utiltities';
import { toast } from 'react-toastify';
import EditMilestoneModal from '../../../components/EditMilestoneModal';
import { CancelMilestone, CreateMilestone, DeleMilestone, GetMilestone, GetPortalProjectById, ReleaseMilestone } from '../../../redux/Slices/PortalProject/PortalProject';
import classNames from 'classnames';


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
    const [title, setTitle] = useState( '' );
    const [amount, setAmount] = useState( 0 );
    const [totalPaidamount, setTotalPaiAmount] = useState( 0 );
    const [Paidamount, setPaiAmount] = useState( 0 );
    const [totalunPaidamount, setTotalUnPaiAmount] = useState( 0 );
    const [unPaidamount, setUnPaiAmount] = useState( 0 );
    const [standard, setStandard] = useState( false );

    const [data, setData] = useState();
    const [edit, setEdit] = useState( false );

    const { token, project, loading, milestones } = useSelector(
        ( state ) => ( {
            token: state.Auth.token,
            category: state.Category.category,
            project: state.PortalProjects.proectById,
            milestones: state.PortalProjects.milestones,
            loading: state.utiltities.loading,
        } )
    );
 
    const reset = () => {
        setTitle( '' )
        setAmount( '' )
    }

    const getProject = async () => {
        dispatch( startLoading() );
        await dispatch( GetPortalProjectById( projectId, token ) );
        await dispatch( GetMilestone( projectId, token ) );
    //     let countRelease = 0;
    //     let totalAmount = 0;
    //     let countPending = 0;
    //     let untotalAmount = 0;
    //     milestones.forEach(item => {
    //     if (item.status === "Release") {
    //         countRelease++;
    //         totalAmount += parseFloat(item.amount || 0);
    //     } else if (item.status === "Pending") {
    //         countPending++;
    //         untotalAmount += parseFloat(item.amount || 0);
    //     }
    // });
        dispatch( stopLoading() );
    };

    const createMilestone = async () => {
        const formData = new FormData();
        formData.append( "title", title )
        formData.append( "amount", amount )
        formData.append( "portal_project_id", projectId )
        if ( title === '' || amount === '' ) {
            toast.error( 'Enter all field', { position: toast.POSITION.TOP_RIGHT } );
            return
        };
        dispatch( startLoading() );
        await dispatch( CreateMilestone( projectId, formData, token, toggleModal ) );
        dispatch( stopLoading() );
    };

    useEffect( () => {
        getProject();

    }, [] );

    useEffect(() => {
    if (!milestones || milestones.length === 0) {
        setTotalPaiAmount(0);
        setPaiAmount(0);
        setTotalUnPaiAmount(0);
        setUnPaiAmount(0);
        return;
    }

    let countRelease = 0;
    let totalAmount = 0;
    let countPending = 0;
    let untotalAmount = 0;

    milestones.forEach(item => {
        if (item.status === "Release") {
            countRelease++;
            totalAmount += parseFloat(item.amount || 0);
        } else if (item.status === "Pending") {
            countPending++;
            untotalAmount += parseFloat(item.amount || 0);
        }
    });

    setTotalPaiAmount(countRelease);
    setPaiAmount(totalAmount);
    setTotalUnPaiAmount(countPending);
    setUnPaiAmount(untotalAmount);

}, [milestones]);

    const toggleModal = () => {
        setStandard( !standard );
        reset();
    };

    const amountFunc = ( e ) => {
        if ( e.target.value >= 0 ) {
            setAmount( e.target.value )
        }
    }
  const StatusColumn = ({ row }) => {
    return (
      <React.Fragment>
        <span
    
          className={classNames("badge", {
            "bg-soft-success text-success": row.original.status === "Release",
            "bg-soft-danger text-danger": row.original.status === "Cancel",
            "bg-soft-warning text-warning": row.original.status === "Pending",
          })}
        >
          {row.original.status}
        </span>
      </React.Fragment>
    );
  };



    const columns = [

        {
            Header: 'Title',
            accessor: 'title',
            sort: false,
        },
        {
            Header: 'Created date',
            accessor: 'Created_date',
            sort: false,
        },
        {
            Header: 'Release Date',
            accessor: 'release_date',
            sort: false,
        },

        {
            Header: 'Amount',
            accessor: 'amount',
            sort: false,
        },
      
        {
            Header: "Status",
            accessor: "status",
            sort: false,
            Cell: StatusColumn,
          },
        {
            Header: "Actions",
            sort: false,
            Cell: ( { row } ) => <ActionColumn row={row} />,
        },
    ];


    const ActionColumn = ( { row } ) => {

        return (
            <DropdownButton variant={'success'} id="dropdown-basic-button" title="Action">
                <Dropdown.Item onClick={() => Release( row.original.id )}>Release</Dropdown.Item>
                <Dropdown.Item onClick={() => cancel( row.original.id )}>Cancel</Dropdown.Item>
                <Dropdown.Item onClick={() => toggleEditModal( row?.original )

                }>Edit</Dropdown.Item>
                <Dropdown.Item onClick={() => del( row.original.id )} >Delete</Dropdown.Item>
            </DropdownButton>
        );
    };

    const toggleEditModal = async ( id ) => {

        setData( id );
        await dispatch( startLoading() );
        await dispatch( stopLoading() );
        setEdit( !edit );
    };

    const closeEditModal = () => {
        setEdit( false )
    }

    const del = async ( id ) => {
        dispatch( startLoading() );
        await dispatch( DeleMilestone( id, projectId, token ) );
        dispatch( stopLoading() )
    }
    const cancel = async ( id ) => {
        dispatch( startLoading() );
        await dispatch( CancelMilestone( id, projectId, token ) );
        dispatch( stopLoading() )
    }
    const Release = async ( id ) => {
        dispatch( startLoading() );
        await dispatch( ReleaseMilestone( id, projectId, token ) );
        dispatch( stopLoading() )
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
                                                SalesName: `${project?.user?.name}`,
                                                Amount: `${project?.amount}`,
                                                platform: `${project?.platforms?.title}`,
                                                category: `${project?.project_categories?.title}`,
                                                _createdAt: `${project?.Created_date}`,
                                                amount: `${project?.amount}`,
                                                projectId: `${project.id}`,
                                            }}
                                        />
                                    </Col>
                                    <Col sm={6}>
                                        <StatisticsWidget1
                                            title="Total Paid Milestones"
                                            color={'#10c469'}
                                            data={Paidamount}
                                            stats={totalPaidamount}
                                            subTitle="Paid "
                                        />
                                        <StatisticsWidget1
                                            title="Total Upaid Milestones"
                                            color={'#f05050'}
                                            data={unPaidamount}
                                            stats={totalunPaidamount}
                                            subTitle="Unpaid "
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
                                {milestones !== undefined && milestones !== null ? (
                                    <Row>
                                        {milestones ? (
                                            <Table
                                                columns={columns}
                                                data={milestones}

                                                pageSize={5}
                                                sizePerPageList={sizePerPageList}
                                                isSortable={true}
                                                pagination={true}
                                                isSearchable={true}
                                            />
                                        ) : null}
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



                    <FormInput
                        label="Title"
                        type="textarea"
                        name="textarea"
                        containerClass={'mb-3'}
                        key="textarea"
                        value={title}
                        onChange={( e ) => setTitle( e.target.value )}
                    />

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            value={amount}
                            type='number'
                            onChange={( e ) => amountFunc( e )}
                        />
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
            <EditMilestoneModal projectId={projectId} data={data} edit={edit} closeEditModal={closeEditModal} />
        </>
    );
};

export default CustomerProfile;
