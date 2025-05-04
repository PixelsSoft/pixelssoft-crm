import { Link, useParams } from "react-router-dom";
import Spinner from "../../../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { GetEmployeeById } from "../../../../redux/Slices/employee/Employee";
import { startLoading, stopLoading } from "../../../../redux/Slices/utiltities/Utiltities";
import { useEffect, useState } from "react";
import PageTitle from "../../../../components/PageTitle";
import { Card, Col, Row } from "react-bootstrap";
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
// import { Document, Page } from "react-pdf/dist/entry.webpack";
// import { PDFDocumentProxy } from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};

const ViewEmployee = () => {
    const { employeeId } = useParams();
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState( 1 );
    const dispatch = useDispatch();
    const { loading, employee, token } = useSelector(
        ( state ) => ( {
            loading: state.utiltities.loading,
            employee: state.Employees.singleEmployee,
            token: state.Auth.token,
        } )
    );
    console.log( "employee", employee )
    const getEmployee = async () => {

        dispatch( startLoading() );
        const response = await dispatch( GetEmployeeById( employeeId, token ) );
        console.log( "response", response )
        dispatch( stopLoading() );
    };

    useEffect( () => {
        getEmployee();
    }, [] );

    function onDocumentLoadSuccess( { numPages } ) {
        setNumPages( numPages );
    }

    // console.log('EmployeeEditModal', employee);

    return loading ? (
        <div className='d-flex justify-content-center align-items-center'>
            <Spinner className="m-2" color={'primary'} />
        </div>
    ) : (
        <>
            <PageTitle
                title={"View Employee"}
            />
            <Card>
                <Card.Body className="text-center">
                    <div>
                        <img
                            src={employee?.details[0]?.profile_img}
                            alt="profileImage"
                            className="rounded-circle avatar-xl img-thumbnail mb-2"
                        />
                        <div className="text-start">
                            <Row>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Full Name :</strong> <span className="ms-2">{employee?.details[0]?.name}</span>
                                    </p>
                                </Col>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Email :</strong> <span className="ms-2">{employee?.details[0]?.personal_email}</span>
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Father Name :</strong> <span className="ms-2">{employee?.details[0]?.father_name}</span>
                                    </p>
                                </Col>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Emergy Number :</strong> <span className="ms-2">{employee?.details[0]?.emergency_phone_no} : {employee?.details[0]?.emergency_phone_no_2}</span>
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Company Provided email :</strong> <span className="ms-2">{employee?.details[0]?.company_provided_email}</span>
                                    </p>
                                </Col>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Department :</strong> <span className="ms-2">{employee?.details[0]?.department}</span>
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>CNIC :</strong> <span className="ms-2">{employee?.details[0]?.cnic_no}</span>
                                    </p>
                                </Col>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Role :</strong>
                                        <span className="ms-2">{employee?.roles[0]?.role}</span>

                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Mobile no :</strong> <span className="ms-2">{employee?.details[0]?.phone_no}</span>
                                    </p>
                                </Col>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Joining Date :</strong> <span className="ms-2">{employee?.details[0]?.joining_date}</span>
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Commission:</strong> <span className="ms-2">{employee?.details[0]?.commission}</span>
                                    </p>
                                </Col>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>target :</strong> <span className="ms-2">{employee?.details[0]?.target}</span>
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                {employee?.details[0]?.cnic_img &&
                                    <>
                                        <label className="form-label">CNIC</label> <br />

                                        <Col xl={6} lg={12}>
                                            <Card className="m-1 shadow-none border">
                                                <div className="p-2">
                                                    <Row className="align-items-center">
                                                        <Col className="col-auto pe-0">
                                                            <div className="avatar-sm">
                                                                <span className="avatar-title bg-light text-secondary rounded">
                                                                    <i className={"mdi mdi-folder-zip font-18"}></i>
                                                                </span>
                                                            </div>
                                                        </Col>
                                                        <Col>
                                                            <Link target="_blank" to={employee?.details[0]?.cnic_img} className="text-muted fw-bold">
                                                                {"Uploaded CNIC"}
                                                            </Link>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Card>
                                        </Col>
                                    </>
                                }

                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Salary :</strong> <span className="ms-2">{employee?.details[0]?.salary}</span>
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6}>


                                    {employee?.details[0]?.cv_upload &&
                                        <>
                                            <label className="form-label">CV</label> <br />

                                            <Col xl={6} lg={12}>
                                                <Card className="m-1 shadow-none border">
                                                    <div className="p-2">
                                                        <Row className="align-items-center">
                                                            <Col className="col-auto pe-0">
                                                                <div className="avatar-sm">
                                                                    <span className="avatar-title bg-light text-secondary rounded">
                                                                        <i className={"mdi mdi-folder-zip font-18"}></i>
                                                                    </span>
                                                                </div>
                                                            </Col>
                                                            <Col>
                                                                <Link target="_blank" to={employee?.details[0]?.cv_upload} className="text-muted fw-bold">
                                                                    {"CV"}
                                                                </Link>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Card>
                                            </Col>
                                        </>
                                    }
                                </Col>

                                <Col lg={6}>

                                    {employee?.details[0]?.contract_upload &&
                                        <>
                                            <label className="form-label">Contract</label> <br />

                                            <Col xl={6} lg={12}>
                                                <Card className="m-1 shadow-none border">
                                                    <div className="p-2">
                                                        <Row className="align-items-center">
                                                            <Col className="col-auto pe-0">
                                                                <div className="avatar-sm">
                                                                    <span className="avatar-title bg-light text-secondary rounded">
                                                                        <i className={"mdi mdi-folder-zip font-18"}></i>
                                                                    </span>
                                                                </div>
                                                            </Col>
                                                            <Col>
                                                                <Link target="_blank" to={employee?.details[0]?.contract_upload} className="text-muted fw-bold">
                                                                    {"Contract"}
                                                                </Link>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Card>
                                            </Col>
                                        </>
                                    }
                                </Col>

                            </Row>
                        </div>
                    </div>

                </Card.Body>

            </Card>
            <Card>
                <Card.Body className="text-center">
                    <div>
                        <text style={{ fontSize: 20 }}>
                            References details
                        </text>
                        <div className="text-start">
                            <Row>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>CNIC no :</strong> <span className="ms-2">{employee?.references[0]?.reference_cnic_no}</span>
                                    </p>
                                </Col>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Email :</strong> <span className="ms-2">{employee?.references[0]?.reference_email}</span>
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Name :</strong> <span className="ms-2">{employee?.references[0]?.reference_name}</span>
                                    </p>
                                </Col>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Phone no :</strong> <span className="ms-2">{employee?.references[0]?.reference_phone_no} </span>
                                    </p>
                                </Col>
                            </Row>


                        </div>
                    </div>

                </Card.Body>

            </Card>
            <Card>
                <Card.Body className="text-center">
                    <div>
                        <text style={{ fontSize: 20 }}>
                            Bank Details
                        </text>
                        <div className="text-start">
                            <Row>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Accound_number :</strong> <span className="ms-2">{employee?.bank_details[0]?.accound_number}</span>
                                    </p>
                                </Col>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Bank :</strong> <span className="ms-2">{employee?.bank_details[0]?.bank}</span>
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Title :</strong> <span className="ms-2">{employee?.bank_details[0]?.title}</span>
                                    </p>
                                </Col>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Branch_code :</strong> <span className="ms-2">{employee?.bank_details[0]?.branch_code} </span>
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>branch_address :</strong> <span className="ms-2">{employee?.bank_details[0]?.branch_address}</span>
                                    </p>
                                </Col>

                            </Row>

                        </div>
                    </div>

                </Card.Body>

            </Card>
        </>
    );
};

export default ViewEmployee;