import { useState, useEffect } from 'react'
import PageTitle from '../../../components/PageTitle'
import { Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import classNames from "classnames";
import Calendar from '../../../components/Calendar';
import { attendance } from '../../../redux/Slices/attendance/Attendance';





export default function MyAccount() {
    const user = useSelector( state => state.Auth.user )
    const dispatch = useDispatch()
    const { token, } = useSelector(
        ( state ) => ( {
            token: state.Auth.token,
        } )
    );

    useEffect( () => {
        dispatch( attendance( token ) )
    }, [] )

    const defaultEvents = [
        {
            id: "1",
            title: "Must neet to serve 8 hours ",
            start: new Date(),
            className: "bg-success",
        },

        {
            id: "2",
            title: "Meeting with John Deo",
            start: new Date().setDate( new Date().getDate() + 2 ),
            end: new Date().setDate( new Date().getDate() + 4 ),
            className: "bg-warning",
        },
        {
            id: "3",
            title: "Buy a Theme",
            start: new Date().setDate( new Date().getDate() + 4 ),
            end: new Date().setDate( new Date().getDate() + 5 ),
            className: "bg-primary",
        },
    ];
    const [events, setEvents] = useState( [...defaultEvents] );
    const [eventData, setEventData] = useState( {} );
    const [dateInfo, setDateInfo] = useState( {} );

    /*
    calendar events
    */
    // on date click
    const onDateClick = ( arg ) => {
        console.log( "date click", arg )
        setDateInfo( arg );


    };

    // on event click
    const onEventClick = ( arg ) => {
        const event = {
            id: String( arg.event.id ),
            title: arg.event.title,
            className: arg.event.classNames[0],
        };
        console.log( "event click", event )
        setEventData( event );


    };

    // on drop
    const onDrop = ( arg ) => {
        const dropEventData = arg;
        const title = dropEventData.draggedEl.title;
        if ( title == null ) {
        } else {
            let newEvent = {
                id: String( events.length + 1 ),
                title: title,
                start: dropEventData ? dropEventData.dateStr : new Date(),
                className: dropEventData.draggedEl.attributes["data-class"]["value"],
            };
            const modifiedEvents = [...events];
            modifiedEvents.push( newEvent );

            setEvents( modifiedEvents );
        }
    };



    /**
     * on event drop
     */
    const onEventDrop = () => {
        const modifiedEvents = [...events];
        // const idx = modifiedEvents.findIndex( ( e ) => e["id"] === eventData.id );
        // modifiedEvents[idx]["title"] = eventData.title;
        // modifiedEvents[idx]["className"] = eventData.classNames;
        // modifiedEvents[idx]["start"] = eventData.start;
        // modifiedEvents[idx]["end"] = eventData.end;
        setEvents( modifiedEvents );

    };


    const SidePanel = () => {
        // external events
        const externalEvents = [
            {
                id: 1,
                className: "bg-success",
                title: "Must need to server 8 hours daily",
            },

            {
                id: 2,
                className: "bg-warning",
                title: "If server less then 7 hours count hald day",
            },
            {
                id: 4,
                className: "bg-danger",
                title: "If server less then 4.5 hours count off day",
            },
        ];

        return (
            <>
                <div id="external-events">
                    <br />

                    {/* external events */}
                    {( externalEvents || [] ).map( ( event, index ) => {
                        return (
                            <div
                                key={index}
                                className={classNames( "external-event", event.className )}
                                title={event.title}
                                data-class={event.className}
                            >
                                <i className="mdi mdi-checkbox-blank-circle me-2 vertical-middle"></i>
                                {event.title}
                            </div>
                        );
                    } )}
                </div>

                <div className="mt-5 d-none d-xl-block">
                    <h5 className="text-center">How It Works ?</h5>

                    <ul className="ps-3">
                        <li className="text-muted mb-3">
                            It has survived not only five centuries, but also the leap into
                            electronic typesetting, remaining essentially unchanged.
                        </li>
                        <li className="text-muted mb-3">
                            Richard McClintock, a Latin professor at Hampden-Sydney College in
                            Virginia, looked up one of the more obscure Latin words,
                            consectetur, from a Lorem Ipsum passage.
                        </li>
                        <li className="text-muted mb-3">
                            It has survived not only five centuries, but also the leap into
                            electronic typesetting, remaining essentially unchanged.
                        </li>
                    </ul>
                </div>
            </>
        );
    };

    return ( <>
        <PageTitle
            title={"My Account"}
        />
        <Card>
            <Card.Body>
                <img src={user?.profile_img} style={{ width: "100px", height: "100px", borderRadius: "150px", marginBottom: 20 }} />
                <Row>
                    <Col lg={6}>
                        <label className="form-label bold">Name:</label> <br />
                    </Col>
                    <Col lg={6}>
                        <label className="form-label">{user?.name}</label> <br />
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <label className="form-label">Email: </label> <br />
                    </Col>
                    <Col lg={6}>
                        <label className="form-label">{user?.company_provided_email}</label> <br />
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <label className="form-label">Joining Date:</label> <br />
                    </Col>
                    <Col lg={6}>
                        <label className="form-label">{user?.joining_date}</label> <br />
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <label className="form-label">Employment Type:</label> <br />
                    </Col>
                    <Col lg={6}>
                        <label className="form-label">{user?.employmentType}</label> <br />
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <label className="form-label">Phone no:</label> <br />
                    </Col>
                    <Col lg={6}>
                        <label className="form-label">+{user?.phone_no}</label> <br />
                    </Col>
                </Row>
            </Card.Body>
        </Card>
        <PageTitle
            title={"Attendance"}
        />
        <Row>
            <Col>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col lg={3}>
                                {/* add events */}


                                <SidePanel />
                            </Col>
                            <Col lg={9}>
                                {/* fullcalendar control */}
                                <Calendar
                                    onDateClick={onDateClick}
                                    onEventClick={onEventClick}
                                    onDrop={onDrop}
                                    onEventDrop={onEventDrop}
                                    events={events}
                                />

                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>

    </>

    )
}
