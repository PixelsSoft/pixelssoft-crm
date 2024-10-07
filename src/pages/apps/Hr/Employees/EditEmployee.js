import { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import MaskedInput from 'react-text-mask';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useDispatch, useSelector } from 'react-redux';
import PageTitle from '../../../../components/PageTitle';
import { FormInput } from '../../../../components';
import { GetEmployeeById, GetEmployees, UpdateEmployee } from '../../../../redux/Slices/employee/Employee';
import { startLoading, stopLoading } from '../../../../redux/Slices/utiltities/Utiltities';
import { CONSTANTS } from '../../../../constants/constant';
import { toast } from 'react-toastify';
import Spinner from '../../../../components/Spinner';
import Select from "react-select";
import { Link, useLocation, useParams } from 'react-router-dom';
import QuickAccess from '../../FileManager/QuickAccess';

const EditEmployee = () => {
    const { employeeId } = useParams();
    const location = useLocation();
    


    useEffect( () => {

    }, [] )


    const { loading, token, roles, employee } = useSelector(
        ( state ) => ( {
            loading: state.utiltities.loading,
            token: state.Auth.token,
            roles: state.Roles.roles,
            employee: state.Employees.singleEmployee
        } )
    );
    const [fullName, setFullName] = useState( employee?.details[0]?.name );
    const [fatherName, setFatherName] = useState( employee?.details[0]?.father_name );
    const [email, setEmail] = useState( employee?.email );
    const [companyProvideEmail, setCompanyProvideEmail] = useState( employee?.details[0]?.company_provided_email );
    const [DOB, setDOB] = useState( employee?.details[0]?.dob );
    const [phoneNumber, setPhoneNumber] = useState( employee?.details[0]?.phone_no );
    const [emergencyPhoneNumber, setEmergencyPhoneNumber] = useState( employee?.details[0]?.emergency_phone_no );
    const [emergencyPhoneNumber2, setEmergencyPhoneNumber2] = useState( employee?.details[0]?.emergency_phone_no_2 );
    const [joiningDate, setJoiningDate] = useState( employee?.details[0]?.joining_date );
    const [department, setDepartment] = useState( '' );
    const [salary, setSalary] = useState( employee?.details[0]?.salary );
    const [profilePic, setProfilePic] = useState( employee?.details[0]?.profile_img );
    const [contract, setContract] = useState( employee?.details[0]?.contract_upload );
    const [CNIC, setCNIC] = useState( employee?.details[0]?.cnic_img );
    const [CnicNo, setCnicNo] = useState( employee?.details[0]?.cnic_no );
    const [CV, setCV] = useState( employee?.details[0]?.cv_upload );
    const [designation, setDesignation] = useState( employee?.details[0]?.designation );
    const [employmentType, setEmploymentType] = useState( employee?.details[0]?.employmentType );
    const [status, setStatus] = useState( employee?.details[0]?.status );

    const [multipleRoleSelection, setMultipleRoleSelection] = useState( [] );
    const [password, setPassword] = useState( '' );
    const [confirmPassword, setConfirmPassword] = useState( '' );
    const [accTitle, setAccTitle] = useState( employee?.bank_details[0]?.title );
    const [branchCode, setBranchCode] = useState( employee?.bank_details[0]?.branch_code );
    const [bankAddress, setBankAddress] = useState( employee?.bank_details[0]?.branch_address );
    const [accNo, setAccNo] = useState( employee?.bank_details[0]?.accound_number );
    const [bankName, setBankName] = useState( employee?.bank_details[0]?.bank );
    const [refName, setRefName] = useState( employee?.references[0]?.reference_name );
    const [refEmail, setRefEmail] = useState( employee?.references[0]?.email );
    const [refPhoneNo, setRefPhoneNo] = useState( employee?.references[0]?.reference_phone_no );
    const [refCnicNo, setRefCnicNo] = useState( employee?.references[0]?.reference_cnic_no );
    const [refCnicPic, setRefCnicPic] = useState( null );
    const [target, setTarget] = useState( employee?.details[0]?.target );
    const [commission, setcommission] = useState( employee?.details[0]?.commission );
    const dispatch = useDispatch();

    // const reset = () => {
    //     setFullName('')
    //     setFatherName('')
    //     setEmail('')
    //     setCompanyProvideEmail('')
    //     // setPassword('')
    //     // setConfirmPassword('')
    //     setDOB('')
    //     setPhoneNumber('')
    //     setEmergencyPhoneNumber('')
    //     setEmergencyPhoneNumber2('')
    //     setJoiningDate('')
    //     setDepartment('')
    //     setSalary('')
    //     setProfilePic(null)
    //     setContract(null)
    //     setCNIC(null)
    //     setCV(null)
    //     setRefCnicPic(null)
    //     setCnicNo('')
    //     setAccTitle('')
    //     setBranchCode('')
    //     setBankAddress('')
    //     setAccNo('')
    //     setBankName('')
    //     setRefName('')
    //     setRefEmail('')
    //     setRefPhoneNo('')
    //     setRefCnicNo('')
    //     setMultipleRoleSelection([])
    // }

    const submit = async ( e ) => {
        e.preventDefault();
        dispatch( startLoading() );
        let roles = [];
        // multipleRoleSelection.map( e => {
        //     roles.push( e.name );
        // } )

        const params = new FormData();
        params.append( "name", fullName );
        params.append( "father_name", fatherName );
        params.append( "email", companyProvideEmail );
        params.append( "company_provided_email", companyProvideEmail );
        params.append( "personal_email", email );
        params.append( "dob", DOB );
        params.append( "cnic_no", CnicNo );
        params.append( "phone_no", phoneNumber );
        params.append( "emergency_phone_no", emergencyPhoneNumber );
        params.append( "emergency_phone_no_2", emergencyPhoneNumber2 );
        params.append( "designation", designation );
        params.append( "joining_date", joiningDate );

        params.append( "salary", salary );
        params.append( "commission", commission );
        params.append( "target", target );
        params.append( "title", accTitle );
        params.append( "accound_number", accNo );
        params.append( "bank_name", bankName );
        params.append( "branch_code", branchCode );
        params.append( "branch_address", bankAddress );
        params.append( "reference_name", refName );
        params.append( "reference_name", refEmail );
        params.append( "reference_cnic_no", refCnicNo );
        params.append( "reference_phone_no", refPhoneNo );
        params.append( "password", password );
        params.append( "password_confirmation", confirmPassword );
        params.append( "status", status );
        params.append( "employmentType", employmentType );
        params.append( "department_id", 1 );
        // params.append("password", password);
        // params.append("password_confirmation", confirmPassword);
        if ( multipleRoleSelection == [] ) {

        }
        else {
            params.append( "roles", multipleRoleSelection );
        }



        await dispatch( UpdateEmployee( employeeId, params, token ) )
        // await fetch( CONSTANTS.API_URLS.BASE + 'user/update/' + employeeId, options )
        //     .then( response => response.json() )
        //     .then( e => {
        //         if ( e.status === 200 ) {
        //             dispatch( GetEmployees( token ) );
        //             toast.success( e?.message, { position: toast.POSITION.TOP_RIGHT } );

        //         } else {
        //             toast.error( e?.message[0], { position: toast.POSITION.TOP_RIGHT } );
        //         }
        //         dispatch( stopLoading() );
        //     } )
        //     .catch( err => {
        //         dispatch( stopLoading() );
        //         console.log( "err", err );
        //     } );
        // await dispatch(AddEmployee(params, token));
        dispatch( stopLoading() );
    };

    // Profile picture upload
    const handleProfileFileChange = ( event ) => {
        if ( event.target.files ) {
            const file = event.target.files[0];
            setProfilePic( file );
        }
    };
    const targetFunc = ( e ) => {
        if ( e.target.value >= 0 ) {
            setTarget( e.target.value );
        }
    }

    const comFunc = ( e ) => {
        if ( e.target.value >= 0 ) {
            setcommission( e.target.value )

        }
    }
    // CNIC picture Upload
    const handleCNICFileChange = ( event ) => {
        if ( event.target.files ) {
            const file = event.target.files[0];
            setCNIC( file );
        }
    };

    // Reference CNIC picture Upload
    const handleRefCNICFileChange = ( event ) => {
        if ( event.target.files ) {
            const file = event.target.files[0];
            setRefCnicPic( file );
        }
    };

    // CV picture Upload
    const handleCVFileChange = ( event ) => {
        if ( event.target.files ) {
            const file = event.target.files[0];
            setCV( file );
        }
    };

    // Contract picture Upload
    const handleContractFileChange = ( event ) => {
        if ( event.target.files ) {
            const file = event.target.files[0];
            setContract( file );
        }
    };

    const handleSelectChange = ( selectedOption ) => {
        // Extracting values from selected options and updating the state
        const selectedValues = selectedOption ? selectedOption.map( option => option.value ) : [];
        setMultipleRoleSelection( selectedValues );
    };

    const getEmployee = async () => {
        dispatch( startLoading() );
        await dispatch( GetEmployeeById( employeeId, token ) );
        dispatch( stopLoading() );
    };
    const options = [
        { value: "Hr", label: "Hr" },
        { value: "Developer", label: "Developer" },
        { value: "Lead", label: "Lead" },
        { value: "Project Manager", label: "Project Manager" },
        { value: "Sales", label: "Sales" },
        { value: "Scraper", label: "Scraper" },
        { value: "QA", label: "QA" },
    ];
    useEffect( () => {
        getEmployee();
    }, [] );

    return loading ? (
        <div className='d-flex justify-content-center align-items-center'>
            <Spinner className="m-2" color={'primary'} />
        </div>
    ) : (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Employee", path: "/apps/hr/employees/" },
                    { label: "Addn Employee", path: "/apps/hr/employee/addEmployee", active: true },
                ]}
                title={"Edit Employee"}
            />
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <form onSubmit={submit}>
                                <h1 className="header-title">Employee Details</h1>
                                <Row>
                                    <Col lg={6}>
                                        <FormInput
                                            label="Name"
                                            type="text"
                                            name="Name"
                                            placeholder="Name"
                                            containerClass={'mb-3'}
                                            key="text"
                                            value={fullName}
                                            onChange={( e ) => setFullName( e.target.value )}
                                        />
                                        <FormInput
                                            label="Email"
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            containerClass={'mb-3'}
                                            key="email"
                                            value={email}
                                            onChange={( e ) => setEmail( e.target.value )}
                                        />
                                        {/* <FormInput
                                            label="Password"
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            containerClass={'mb-3'}
                                            key="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        /> */}
                                        <FormInput
                                            label="Date of Birth"
                                            type="date"
                                            name="date"
                                            containerClass={'mb-3'}
                                            key="date"
                                            value={DOB}
                                            onChange={( e ) => setDOB( e.target.value )}
                                        />
                                        <div className="mb-3">
                                            <label className="form-label">Phone Number with Area Code</label> <br />
                                            <MaskedInput
                                                mask={[
                                                    '(',
                                                    /[1-9]/,
                                                    /\d/,
                                                    ')',
                                                    ' ',
                                                    /\d/,
                                                    /\d/,
                                                    /\d/,
                                                    '-',
                                                    /\d/,
                                                    /\d/,
                                                    /\d/,
                                                    /\d/,
                                                    /\d/,
                                                    /\d/,
                                                    /\d/,
                                                ]}
                                                placeholder="(__) ____-____"
                                                className="form-control"
                                                value={phoneNumber}
                                                onChange={( e ) => setPhoneNumber( e.target.value )}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Emergency Phone number with Area Code</label> <br />
                                            <MaskedInput
                                                mask={[
                                                    '(',
                                                    /[1-9]/,
                                                    /\d/,
                                                    ')',
                                                    ' ',
                                                    /\d/,
                                                    /\d/,
                                                    /\d/,
                                                    '-',
                                                    /\d/,
                                                    /\d/,
                                                    /\d/,
                                                    /\d/,
                                                    /\d/,
                                                    /\d/,
                                                    /\d/,
                                                ]}
                                                placeholder="(__) ____-____"
                                                className="form-control"
                                                value={emergencyPhoneNumber}
                                                onChange={( e ) => setEmergencyPhoneNumber( e.target.value )}
                                            />
                                        </div>
                                        <FormInput
                                            label="Joining Date"
                                            type="date"
                                            name="date"
                                            containerClass={'mb-3'}
                                            key="join date"
                                            value={joiningDate}
                                            onChange={( e ) => setJoiningDate( e.target.value )}
                                        />
                                        {/* <FormInput
                                            label="Cnic Upload"
                                            type="file"
                                            name="file"
                                            accept="image/png, image/jpeg"
                                            containerClass={'mb-3'}
                                            key="file"
                                            onChange={handleCNICFileChange}
                                        /> */}
                                        {employee?.details[0]?.cnic_img &&
                                            <>
                                                <label className="form-label">Uploaded CNIC</label> <br />

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

                                        {/* <FormInput
                                            label="CV Upload"
                                            type="file"
                                            name="file"
                                            containerClass={'mb-3'}
                                            onChange={handleCVFileChange}
                                            key="cv file"
                                        /> */}
                                        {employee?.details[0]?.cv_upload &&
                                            <>
                                                <label className="form-label">Uploaded CV </label> <br />

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
                                                                        {"Uploaded CV"}
                                                                    </Link>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Card>
                                                </Col>
                                            </>
                                        }
                                        <FormInput
                                            label="Select Employment Type"
                                            name="select"
                                            type="select"
                                            containerClass="mb-3"
                                            className="form-select"

                                            key="select"
                                            value={employmentType}
                                            onChange={( e ) => setEmploymentType( e.target.value )}
                                        >
                                            <option>Regular</option>
                                            <option>Contract_Base</option>

                                        </FormInput>
                                        <FormInput
                                            label="Status"
                                            name="select"
                                            type="select"
                                            containerClass="mb-3"
                                            className="form-select"

                                            key="select"
                                            value={employmentType}
                                            onChange={( e ) => setStatus( e.target.value )}
                                        >
                                            <option>onBoard</option>
                                            <option>Fired</option>
                                            <option>In Active</option>

                                        </FormInput>
                                        <FormInput
                                            label="Designation"
                                            placeholder="Designation"
                                            containerClass={'mb-3'}
                                            key="Designation"
                                            value={designation}
                                            onChange={( e ) => {
                                                setDesignation( e.target.valueAsNumber )
                                            }}
                                        />
                                        <FormInput
                                            label="Salary "
                                            type="number"
                                            name="number"
                                            placeholder="Salary"
                                            containerClass={'mb-3'}
                                            key="Number"
                                            value={salary}
                                            onChange={( e ) => setSalary( e.target.valueAsNumber )}
                                        />
                                    </Col>
                                    <Col lg={6}>
                                        <FormInput
                                            label="Father Name"
                                            type="text"
                                            name="Name"
                                            placeholder="Father Name"
                                            containerClass={'mb-3'}
                                            key="text"
                                            value={fatherName}
                                            onChange={( e ) => setFatherName( e.target.value )}
                                        />
                                        <FormInput
                                            label="Company Provided Email"
                                            type="email"
                                            name="email"
                                            placeholder="Company Provided Email"
                                            containerClass={'mb-3'}
                                            key="email"
                                            value={companyProvideEmail}
                                            onChange={( e ) => setCompanyProvideEmail( e.target.value )}
                                        />
                                        {/* <FormInput
                                            label="Confirm Password"
                                            type="password"
                                            name="password"
                                            placeholder="Confirm Password"
                                            containerClass={'mb-3'}
                                            key="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        /> */}
                                        <div className="mb-3">
                                            <label className="form-label">CNIC Number</label> <br />
                                            <MaskedInput
                                                mask={[
                                                    /\d/,
                                                    /\d/,
                                                    /\d/,
                                                    /\d/,
                                                    /\d/,
                                                    '-',
                                                    /\d/,
                                                    /\d/,
                                                    /\d/,
                                                    /\d/,
                                                    /\d/,
                                                    /\d/,
                                                    /\d/,
                                                    '-',
                                                    /\d/,
                                                ]}
                                                placeholder="_____-_______-_"
                                                className="form-control"
                                                value={CnicNo}
                                                onChange={( e ) => setCnicNo( e.target.value )}
                                            />
                                        </div>
                                        <FormInput
                                            label="Select Department"
                                            name="select"
                                            type="select"
                                            containerClass="mb-3"
                                            className="form-select"
                                            key="select"
                                            value={department}
                                            onChange={( e ) => setDepartment( e.target.value )}
                                        >
                                            <option>Hr</option>
                                            <option>Accounts</option>
                                            <option>Design & Development</option>
                                            <option>Sales</option>
                                        </FormInput>
                                        {department === "Sales" ? (
                                            <>
                                                <FormInput
                                                    label="Target"
                                                    type="number"
                                                    name="number"
                                                    placeholder="Target"
                                                    containerClass={'mb-3'}
                                                    key="Targert"
                                                    value={target}
                                                    onChange={( e ) => targetFunc( e )}
                                                />
                                                <FormInput
                                                    label="Comission"
                                                    type="number"
                                                    name="number"
                                                    placeholder="Comission"
                                                    containerClass={'mb-3'}
                                                    key="Comission"
                                                    value={commission}
                                                    onChange={( e ) => comFunc( e )}
                                                />
                                            </>
                                        ) : null}
                                        <div className="mb-3">
                                            <label className="form-label">Emergency Phone number 2 with Area Code</label> <br />
                                            <MaskedInput
                                                mask={[
                                                    '(',
                                                    /[1-9]/,
                                                    /\d/,
                                                    ')',
                                                    ' ',
                                                    /\d/,
                                                    /\d/,
                                                    /\d/,
                                                    '-',
                                                    /\d/,
                                                    /\d/,
                                                    /\d/,
                                                    /\d/,
                                                    /\d/,
                                                    /\d/,
                                                    /\d/,
                                                ]}
                                                placeholder="(__) ____-____"
                                                className="form-control"
                                                value={emergencyPhoneNumber2}
                                                onChange={( e ) => setEmergencyPhoneNumber2( e.target.value )}
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label">
                                                Current Roles
                                            </label> <br />
                                            <label className="form-label">
                                                {employee?.roles[0]?.role}
                                            </label> <br />

                                        </div>
                                        {/* <div className="mb-3">
                                            <label className="form-label">Role</label> <br />
                                            <Typeahead
                                                id="select3"
                                                labelKey="name"
                                                multiple
                                                onChange={( e ) => onChangeRoleSelection( e )}
                                                options={options}
                                                placeholder="Choose a role"
                                                selected={multipleRoleSelection}
                                            />
                                        </div> */}
                                        <div className="mb-3">
                                            <label className="form-label">Role</label> <br />
                                            <Select
                                                isMulti={true}
                                                options={options}
                                                className="react-select react-select-container"
                                                classNamePrefix="react-select"
                                                onChange={handleSelectChange}
                                            ></Select>

                                        </div>
                                        {/* <FormInput
                                            label="Photo Upload"
                                            type="file"
                                            name="file"
                                            containerClass={'mb-3'}
                                            key="photo file"
                                            accept="image/png, image/jpeg"
                                            onChange={handleProfileFileChange}
                                        /> */}
                                        {employee?.details[0]?.profile_img &&
                                            <>
                                                <label className="form-label">Uploaded Photo</label> <br />

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
                                                                    <Link target="_blank" to={employee?.details[0]?.profile_img} className="text-muted fw-bold">
                                                                        {"Uploaded photo"}
                                                                    </Link>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Card>
                                                </Col>
                                            </>
                                        }


                                        {/* <FormInput
                                            label="Contract Upload"
                                            type="file"
                                            name="file"
                                            containerClass={'mb-3'}
                                            key="con file"
                                            accept=".pdf"
                                            onChange={handleContractFileChange}
                                        /> */}
                                        {employee?.details[0]?.contract_upload &&
                                            <>
                                                <label className="form-label">Uploaded Contract</label> <br />

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
                                                                        {"Uploaded Contract"}
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
                                <h4 className="header-title">Account Details</h4>
                                <Row>
                                    <Col lg={6}>
                                        <FormInput
                                            label="Account Title"
                                            type="text"
                                            name="Name"
                                            placeholder="Account title"
                                            containerClass={'mb-3'}
                                            key="acc text"
                                            value={accTitle}
                                            onChange={( e ) => {
                                                setAccTitle( e.target.value );
                                            }}
                                        />
                                        <FormInput
                                            label="Branch Code "
                                            type="number"
                                            name="number"
                                            placeholder="Branch Code"
                                            containerClass={'mb-3'}
                                            key="Number"
                                            value={branchCode}
                                            onChange={( e ) => {
                                                setBranchCode( e.target.value );
                                            }}
                                        />
                                        <FormInput
                                            label="Bank Address"
                                            type="text"
                                            name="Name"
                                            placeholder="Bank address"
                                            containerClass={'mb-3'}
                                            key="bank text"
                                            value={bankAddress}
                                            onChange={( e ) => {
                                                setBankAddress( e.target.value );
                                            }}
                                        />
                                    </Col>
                                    <Col lg={6}>
                                        <FormInput
                                            label="Account Number "
                                            type="number"
                                            name="number"
                                            placeholder="Account Number"
                                            containerClass={'mb-3'}
                                            key="Number"
                                            value={accNo}
                                            onChange={( e ) => {
                                                setAccNo( e.target.value );
                                            }}
                                        />
                                        <FormInput
                                            label="Select Bank"
                                            name="select"
                                            type="select"
                                            containerClass="mb-3"
                                            className="form-select"
                                            key="select"
                                            value={bankName}
                                            onChange={( e ) => {
                                                setBankName( e.target.value );
                                            }}
                                        >
                                            <option>Habib Bank Limited</option>
                                            <option>National Bank of Pakistan</option>
                                            <option>Allied Bank Limited</option>
                                            <option>United Bank Limited</option>
                                            <option>Bank Alfalah</option>
                                            <option>Faysal Bank Limited</option>
                                            <option>Askari Bank</option>
                                            <option>MCB Bank Limited</option>
                                            <option>Meezan Bank Limited</option>
                                            <option>Bank AL Habib Limited</option>
                                            <option>Bank of Punjab</option>
                                            <option>JS Bank Limited</option>
                                            <option>Standard Chartered Bank (Pakistan) Limited</option>
                                            <option>BankIslami Pakistan Limited</option>
                                            <option>Habib Metropolitan Bank Limited</option>
                                            <option>Summit Bank</option>
                                            <option>Soneri Bank</option>
                                            <option>Al Baraka Bank (Pakistan) Limited</option>
                                            <option>Dubai Islamic Bank</option>
                                            <option>Silkbank Limited</option>
                                            <option>Bank of Khyber</option>
                                            <option>HBL</option>
                                            <option>Sindh Bank</option>
                                            <option>Standard Chartered</option>
                                        </FormInput>
                                    </Col>
                                </Row>

                                <Button className='rounded-pill' type="submit">
                                    Submit
                                </Button>
                            </form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default EditEmployee;