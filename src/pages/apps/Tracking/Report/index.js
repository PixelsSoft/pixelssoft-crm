import React from 'react'
import { Card } from 'react-bootstrap'

export default function index() {
    return (
        <>
            <Card>
                <Card.Body>
                    <div className="list-group list-group-flush mt-2 font-15">
                        <Link
                            to="#"
                            className="list-group-item list-group-item-action text-primary fw-semibold border-0"
                        >
                            <i className="mdi mdi-image-filter-black-white font-16 me-1"></i>{" "}
                            News Feed
                        </Link>
                        <Link
                            to="#"
                            className="list-group-item list-group-item-action border-0"
                        >
                            <i className="mdi mdi-forum font-16 me-1"></i> Messages
                        </Link>
                        <Link
                            to="#"
                            className="list-group-item list-group-item-action border-0"
                        >
                            <i className="mdi mdi-calendar-month-outline font-16 me-1"></i>{" "}
                            Events
                        </Link>
                        <Link
                            to="#"
                            className="list-group-item list-group-item-action border-0"
                        >
                            <i className="mdi mdi-account-multiple-outline font-16 me-1"></i>{" "}
                            Friends
                        </Link>
                        <Link
                            to="#"
                            className="list-group-item list-group-item-action border-0"
                        >
                            <i className="mdi mdi-video font-16 me-1"></i> Watch Videos
                        </Link>
                        <Link
                            to="#"
                            className="list-group-item list-group-item-action border-0"
                        >
                            <i className="mdi mdi-image-multiple font-16 me-1"></i> Photos
                        </Link>
                        <Link
                            to="#"
                            className="list-group-item list-group-item-action border-0"
                        >
                            <i className="mdi mdi-storefront font-16 me-1"></i> Marketplaces
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}
