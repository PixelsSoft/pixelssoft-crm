import { useParams } from "react-router-dom";
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
    const [pageNumber, setPageNumber] = useState(1);
    const dispatch = useDispatch();
    const { loading, employee, token } = useSelector(
        (state) => ({
            loading: state.utiltities.loading,
            employee: state.Employees.singleEmployee,
            token: state.Auth.token,
        })
    );

    const getEmployee = async () => {
        dispatch(startLoading());
        await dispatch(GetEmployeeById(employeeId, token));
        dispatch(stopLoading());
    };

    useEffect(() => {
        getEmployee();
    }, []);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
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
                            src={employee?.detail?.profile_img}
                            alt="profileImage"
                            className="rounded-circle avatar-xl img-thumbnail mb-2"
                        />
                        <div className="text-start">
                            <Row>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Full Name :</strong> <span className="ms-2">{employee?.name}</span>
                                    </p>
                                </Col>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Email :</strong> <span className="ms-2">{employee?.email}</span>
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Father Name :</strong> <span className="ms-2">{employee?.detail?.father_name}</span>
                                    </p>
                                </Col>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Emergy Number :</strong> <span className="ms-2">{employee?.detail?.emergency_phone_no} : {employee?.detail?.emergency_phone_no_2}</span>
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Company Provided email :</strong> <span className="ms-2">{employee?.detail?.company_provided_email}</span>
                                    </p>
                                </Col>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Department :</strong> <span className="ms-2">{"hr"}</span>
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>CNIC :</strong> <span className="ms-2">{employee?.detail?.cnic_no}</span>
                                    </p>
                                </Col>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Role :</strong>
                                        {employee.roles.map(e => {
                                            return (
                                                <span key={e.id} className="ms-2">{e?.name}</span>
                                            )
                                        })}
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Mobile no :</strong> <span className="ms-2">{employee?.detail?.phone_no}</span>
                                    </p>
                                </Col>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Joining Date :</strong> <span className="ms-2">{employee?.detail?.joining_date}</span>
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6}>
                                    <Document
                                        file={employee?.detail?.cv_upload}
                                        onLoadSuccess={onDocumentLoadSuccess}
                                        options={options}
                                    >
                                        <Page pageNumber={pageNumber} width={600} />
                                    </Document>
                                </Col>
                                <Col lg={6}>
                                    <p className="text-muted font-13" >
                                        <strong>Salary :</strong> <span className="ms-2">{employee?.detail?.salary}</span>
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