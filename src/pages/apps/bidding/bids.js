import React, { useState, useEffect } from 'react'
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { FormInput } from '../../../components';
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import Spinner from '../../../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading } from '../../../redux/Slices/utiltities/Utiltities';
import { toast } from 'react-toastify';
import ViewLeadModal from '../../../components/ViewLeadModal';
import utils from '../../../utils/utils';
import { AddBids } from '../../../redux/Slices/Bids/Bids';

export default function Bids() {
    const dispatch = useDispatch();
    const [visibleModal, setVisibleModal] = useState( false );
    const [plat, setPlat] = useState( '' );
    const [url, setUrl] = useState();
    const [bidsdata, setBidsData] = useState( [] )

    const [viewEdit, setViewEdit] = useState( false );
    const [view, setView] = useState( false );
    const [lead, setlead] = useState();
    const [detail, setDetail] = useState();

    const { token, platforms, loading, TodayBids, MonthBids } = useSelector(
        ( state ) => ( {
            token: state.Auth.token,
            loading: state.utiltities.loading,
            platforms: state.Platform.platform,
            TodayBids: state.Bids.TodayBids,
            MonthBids: state.Bids.MonthBids,
        } )
    );

    console.log( "TodayBids", MonthBids )

    const toggleModal = () => {
        setVisibleModal( !visibleModal );
    };

    useEffect( () => {
        dispatch( stopLoading() );
        setBidsData( TodayBids )
    }, [] )
    useEffect( () => {
        setBidsData( TodayBids )
    }, [TodayBids, MonthBids] )


    /* action column render */
    const ActionColumn = ( { row } ) => {
        return (
            <React.Fragment>
                <Link className="action-icon" onClick={() => openView( row )} >
                    {" "}
                    <i className="mdi mdi-eye"></i>
                </Link>
                <Link className="action-icon" onClick={() => openEdit( row )}>
                    {" "}
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>
                <Link className="action-icon" onClick={() => deleteFunc( row.id )}>
                    {" "}
                    <i className="mdi mdi-delete"></i>
                </Link>
            </React.Fragment>
        );
    };

    const openView = async ( info ) => {
        setDetail( info );
        setView( !view );
    };

    const openEdit = async ( row ) => {
        setlead( row );
        dispatch( startLoading() );
        // await dispatch( GetLeadById( row.id, token ) );
        dispatch( stopLoading() );
        setViewEdit( !viewEdit );
    }



    const deleteFunc = async ( id ) => {
        dispatch( startLoading() );
        // await dispatch( DeleteLead( id, token ) );
        dispatch( stopLoading() );
    }

    // /* status column render */
    // const StatusColumn = ({ row }) => {
    //     return (
    //         <React.Fragment>
    //             <span
    //                 className={classNames("badge", {
    //                     "bg-soft-success text-success": row.original.status === "Active",
    //                     "bg-soft-danger text-danger": row.original.status === "Blocked",
    //                 })}
    //             >
    //                 {row.original.status}
    //             </span>
    //         </React.Fragment>
    //     );
    // };

    const columns = [
        // {
        //     Header: 'Id',
        //     accessor: 'id',
        //     sort: true,
        // },
        {
            Header: 'url',
            accessor: 'url',
            sort: false,
        },
        {
            Header: 'Date',
            accessor: 'date',
            sort: false,
        },
        {
            Header: 'time',
            accessor: 'time',
            sort: false,
        },
        {
            Header: 'platform',
            accessor: 'platforms.title',
            sort: false,
        },

        // {
        //     Header: 'Status',
        //     accessor: 'status',
        //     sort: false,
        // },
        // {
        //     Header: 'Respond',
        //     accessor: 'Respond',
        //     sort: false,
        //     Cell: StatusColumn,
        // },
        // {
        //     Header: "Action",
        //     accessor: "action",
        //     sort: false,
        //     Cell: ( { row } ) => <ActionColumn row={row.original} />,
        // },
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
    ];

    const reset = () => {
        setUrl( '' );
        setPlat();
        setVisibleModal( !visibleModal );
    };
    function isValidURL( url ) {
        // Regular expression for URL validation
        var urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlRegex.test( url );
    }

    const addnew = async () => {
        if ( !isValidURL( url ) ) {
            toast.error( "Url must be valid", { position: toast.POSITION.TOP_RIGHT } );
            return;
        }
        else if ( plat === '' || plat === 'no Selected' ) {
            toast.error( "Please select platfom", { position: toast.POSITION.TOP_RIGHT } );
            return;
        }
        const formData = new FormData();
        formData.append( "url", url )
        formData.append( "platform_id", plat )

        dispatch( startLoading() );
        await dispatch( AddBids( formData, token, reset ) );
        setBidsData( TodayBids )
        dispatch( stopLoading() );

    };



    return loading ? (
        <div className='d-flex justify-content-center align-items-center vh-100' >
            <Spinner className="m-2" color={'primary'} />
        </div>
    ) : (
        <>
            <PageTitle
                title={"Biding"}
            />
            <Row>
                <Card>
                    <Card.Body>
                        <Row >
                            <Col>
                                <FormInput
                                    label="Bid url"
                                    type="text"
                                    name="Bids url"
                                    placeholder="bids"
                                    containerClass={'mb-3'}
                                    key="text"
                                    value={url}
                                    onChange={( e ) => setUrl( e.target.value )}
                                />
                            </Col>
                            <Col>

                                <FormInput
                                    label="Platform"
                                    name="select"
                                    type="select"
                                    className="form-select"
                                    key="select"
                                    value={plat}
                                    onChange={( e ) => {
                                        setPlat( e.target.value )
                                    }
                                    }
                                >
                                    <option>No selected</option>
                                    {platforms?.map( val => {
                                        return (
                                            <option key={val.id} value={val.id}>{val.title}</option>
                                        );
                                    } )}
                                </FormInput>

                            </Col>
                            <Col style={{ alignSelf: 'center' }}>
                                <Button
                                    onClick={addnew}
                                    variant={"info"}
                                    className="waves-effect waves-light px-5 "
                                >
                                    add
                                </Button>
                            </Col>

                        </Row>
                    </Card.Body>
                </Card>
            </Row>
            <Row>
                <Card>
                    <Card.Body>
                        <Row style={{ display: "flex", justifyContent: "center", alignSelf: "flex-end" }}>
                            <Col >
                                <Button
                                    onClick={() => {
                                        setBidsData( TodayBids )
                                    }}
                                    variant={"success"}
                                    className="waves-effect waves-light px-5 "
                                >
                                    Today bids
                                </Button>

                            </Col>
                            <Col>
                                <Button
                                    onClick={() => {
                                        setBidsData( MonthBids )
                                    }}
                                    variant={"success"}
                                    className="waves-effect waves-light px-5 "
                                >
                                    Month bids
                                </Button>
                            </Col>
                        </Row>
                        {bidsdata !== undefined || bidsdata !== null ? (
                            <Table
                                columns={columns}
                                data={bidsdata}
                                pageSize={10}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSelectable={true}
                                isSearchable={true}
                                tableClass="table-striped dt-responsive nowrap w-100"
                                searchBoxClass="my-2"
                            />
                        ) : null}
                    </Card.Body>
                </Card>
            </Row>

        </>
    );
};