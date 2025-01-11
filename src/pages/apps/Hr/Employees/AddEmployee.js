
import { useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import MaskedInput from 'react-text-mask';
import { useDispatch, useSelector } from 'react-redux';
import PageTitle from '../../../../components/PageTitle';
import { FormInput } from '../../../../components';
import { GetEmployees } from '../../../../redux/Slices/employee/Employee';
import { startLoading, stopLoading } from '../../../../redux/Slices/utiltities/Utiltities';
import { CONSTANTS } from '../../../../constants/constant';
import { toast } from 'react-toastify';
import Spinner from '../../../../components/Spinner';
import utils from '../../../../utils/utils';
import Select from "react-select";
import { handleUpload } from '../../../../utils/FileUpload';
import { Link } from 'react-router-dom';

const List = () => {
    const [fullName, setFullName] = useState( '' );
    const [fatherName, setFatherName] = useState( '' );
    const [email, setEmail] = useState( '' );
    const [companyProvideEmail, setCompanyProvideEmail] = useState( '' );
    const [password, setPassword] = useState( '' );
    const [confirmPassword, setConfirmPassword] = useState( '' );
    const [DOB, setDOB] = useState( '' );
    const [phoneNumber, setPhoneNumber] = useState( '' );
    const [emergencyPhoneNumber, setEmergencyPhoneNumber] = useState( '' );
    const [emergencyPhoneNumber2, setEmergencyPhoneNumber2] = useState( '' );
    const [joiningDate, setJoiningDate] = useState( '' );
    const [department, setDepartment] = useState( '' );
    const [salary, setSalary] = useState( '' );
    const [profilePic, setProfilePic] = useState( null );
    const [contract, setContract] = useState( null );
    const [employmentType, setEmploymentType] = useState( "Regular" );

    const [CNIC, setCNIC] = useState( null );
    const [CnicNo, setCnicNo] = useState( '' );
    const [CV, setCV] = useState( null );
    const [multipleRoleSelection, setMultipleRoleSelection] = useState( [] );
    const [accTitle, setAccTitle] = useState( '' );
    const [branchCode, setBranchCode] = useState( '' );
    const [bankAddress, setBankAddress] = useState( '' );

    const [accNo, setAccNo] = useState( '' );
    const [bankName, setBankName] = useState( '' );
    const [designation, setDesignation] = useState( '' );
    const [commission, setcommission] = useState( 0 );
    const [refName, setRefName] = useState( '' );
    const [refEmail, setRefEmail] = useState( '' );
    const [refPhoneNo, setRefPhoneNo] = useState( '' );
    const [refCnicNo, setRefCnicNo] = useState( '' );

    const [target, setTarget] = useState( 0 );
    const [comm, setComm] = useState( 0 );
    const [status, setStatus] = useState( "onBoard" );
    // const [permissions,setPermissions]=useState([])
    const dispatch = useDispatch();

    const { loading, token, roles } = useSelector(
        ( state ) => ( {
            loading: state.utiltities.loading,
            token: state.Auth.token,
            roles: state.Roles.roles
        } )
    );


    const reset = () => {
        setFullName( '' )
        setFatherName( '' )
        setEmail( '' )
        setCompanyProvideEmail( '' )
        setPassword( '' )
        setConfirmPassword( '' )
        setDOB( '' )
        setPhoneNumber( '' )
        setEmergencyPhoneNumber( '' )
        setEmergencyPhoneNumber2( '' )
        setJoiningDate( '' )
        setDepartment( '' )
        setSalary( '' )
        setProfilePic( null )
        setContract( null )
        setCNIC( null )
        setCV( null )

        setCnicNo( '' )
        setAccTitle( '' )
        setBranchCode( '' )
        setBankAddress( '' )
        setAccNo( '' )
        setBankName( '' )
        setRefName( '' )
        setRefEmail( '' )
        setRefPhoneNo( '' )
        setcommission( 0 )
        setRefCnicNo( '' )
        setMultipleRoleSelection( [] )
        setEmploymentType( "Regular" )
    }


    const submit = async ( e ) => {
        e.preventDefault();
        dispatch( startLoading() );
        // let roles = [];
        // multipleRoleSelection.map(e => {
        //     roles.push(e?.name);
        // })

        if ( !utils.validateEmail( email ) ) {
            toast.error( "Enter correct email", { position: toast.POSITION.TOP_RIGHT } );
            dispatch( stopLoading() );
            return
        }
        if ( !utils.validateEmail( refEmail ) ) {
            toast.error( "Enter correct reference email", { position: toast.POSITION.TOP_RIGHT } );
            dispatch( stopLoading() );
            return
        }
        if ( !utils.validateEmail( companyProvideEmail ) ) {
            toast.error( "Enter correct company email", { position: toast.POSITION.TOP_RIGHT } );
            dispatch( stopLoading() );
            return
        }
        if ( password !== confirmPassword ) {
            toast.error( "Password and confirm Password are not same", { position: toast.POSITION.TOP_RIGHT } );
            dispatch( stopLoading() );
            return
        };
        if ( DOB === '' ) {
            toast.error( "DOB required", { position: toast.POSITION.TOP_RIGHT } );
            dispatch( stopLoading() );
            return
        };
        if ( CnicNo === '' ) {
            toast.error( "CNIC No required", { position: toast.POSITION.TOP_RIGHT } );
            dispatch( stopLoading() );
            return
        };

        if ( CNIC === null ) {
            toast.error( "CNIC required", { position: toast.POSITION.TOP_RIGHT } );
            dispatch( stopLoading() );
            return
        };
        if ( profilePic === null ) {
            toast.error( "Profile picture", { position: toast.POSITION.TOP_RIGHT } );
            dispatch( stopLoading() );
            return
        };
        if ( CV === null ) {
            toast.error( "CV required", { position: toast.POSITION.TOP_RIGHT } );
            dispatch( stopLoading() );
            return
        };
        if ( contract === null ) {
            toast.error( "Contract required", { position: toast.POSITION.TOP_RIGHT } );
            dispatch( stopLoading() );
            return
        };

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
        if ( CNIC !== null ) {
            params.append( "cnic_img", CNIC );
        };
        if ( profilePic !== null ) {
            params.append( "profile_img", profilePic );
        };
        if ( CV !== null ) {
            params.append( "cv_upload", CV );
        };
        if ( contract !== null ) {
            params.append( "contract_upload", contract );
        };

        params.append( "salary", salary );
        params.append( "commission", commission );
        params.append( "target", target );
        params.append( "title", accTitle );
        params.append( "accound_number", accNo );
        params.append( "bank", bankName );
        params.append( "branch_code", branchCode );
        params.append( "branch_address", bankAddress );
        params.append( "reference_name", refName );
        params.append( "reference_email", refEmail );
        params.append( "reference_cnic_no", refCnicNo );
        params.append( "reference_phone_no", refPhoneNo );
        params.append( "password", password );
        params.append( "password_confirmation", confirmPassword );
        params.append( "roles", multipleRoleSelection );
        params.append( "status", status );
        params.append( "employmentType", employmentType );
        params.append( "department_id", 1 );

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: params,
        };
        // params.forEach( ( value, key ) => {
        //     console.log( `${key}: ${value}` );
        // } );
        await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.ADD_Employeee, options )
            .then( response => response.json() )
            .then( e => {
                if ( e.status === 200 ) {
                    dispatch( GetEmployees( token ) );
                    toast.success( e?.message, { position: toast.POSITION.TOP_RIGHT } );
                    // reset();
                } else {
                    console.log( e );
                    toast.error( e?.detail, { position: toast.POSITION.TOP_RIGHT } );
                }
                dispatch( stopLoading() );
                reset()
            } )
            .catch( err => {
                dispatch( stopLoading() );
                console.log( "err========", err );
            } ).finally(()=>{
                dispatch( stopLoading() );

            });
        // await dispatch( AddEmployee( params, token ) );
        dispatch( stopLoading() );
    };

    // Profile picture upload
    const handleProfileFileChange = async ( event ) => {
        if ( event.target.files ) {
            const file = event.target.files[0];
                setProfilePic( file );
            // await handleUpload( dispatch, file ).then( ( res ) => {
            //     setProfilePic( res );
            // } )
        }
    };


    // Handler for the Select component's onChange event
    const handleSelectChange = ( selectedOption ) => {
        // Extracting values from selected options and updating the state
        const selectedValues = selectedOption ? selectedOption.map( option => option.value ) : [];
        setMultipleRoleSelection( selectedValues );
    };
    // roles selection options 
    const options = [
        { value: "Hr", label: "Hr" },
        { value: "Developer", label: "Developer" },
        { value: "Lead", label: "Lead" },
        { value: "Project Manager", label: "Project Manager" },
        { value: "Sales", label: "Sales" },
        { value: "Scraper", label: "Scraper" },
        { value: "QA", label: "QA" },
    ];

    // CNIC picture Upload
    const handleCNICFileChange = async ( event ) => {
        if ( event.target.files ) {
            const file = event.target.files[0];
            console.log(file)
            setCNIC( file );

            // await handleUpload( dispatch, file ).then( ( res ) => {
            //     console.log( "CNIC upload complete", res )

            //     setCNIC( res );
            // } )
        }
    };

    // CV picture Upload
    const handleCVFileChange = async ( event ) => {
        if ( event.target.files ) {
            const file = event.target.files[0];
            setCV( file );

            // await handleUpload( dispatch, file ).then( ( res ) => {
            //     console.log( "CV upload complete", res )
            //     setCV( res );
            // } )
        }
    };
    // Contract picture Upload
    const handleContractFileChange = async ( event ) => {
        if ( event.target.files ) {
            const file = event.target.files[0];
            setContract( file );

            // await handleUpload( dispatch, file ).then( ( res ) => {
            //     console.log( "Contract upload complete", res )

            //     setContract( res );
            // } )

        }
    };

    /////role selection/////


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
                title={"Add Employee"}
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
                                            type="text"
                                            name="email"
                                            placeholder="Email"
                                            containerClass={'mb-3'}
                                            key="email"
                                            value={email}
                                            onChange={( e ) => setEmail( e.target.value )}
                                        />
                                        <FormInput
                                            label="Password"
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            containerClass={'mb-3'}
                                            key="password"
                                            value={password}
                                            onChange={( e ) => setPassword( e.target.value )}
                                        />
                                        <FormInput
                                            label="Date of Birth"
                                            type="date"
                                            name="date"
                                            containerClass={'mb-3'}

                                            key="date"
                                            value={DOB}
                                            onChange={( e ) => {
                                                setDOB( e.target.value )
                                            }}

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
                                                onChange={( e ) => {
                                                    setEmergencyPhoneNumber( e.target.value )
                                                }}
                                            />
                                        </div>

                                        <FormInput
                                            label="Joining Date"
                                            type="date"
                                            name="date"
                                            containerClass={'mb-3'}

                                            key="join date"
                                            value={joiningDate}
                                            onChange={( e ) => {
                                                setJoiningDate( e.target.value )
                                            }}


                                        />
                                        <FormInput
                                            label="Cnic Upload"
                                            type="file"
                                            name="file"
                                            accept="image/png, image/jpeg"
                                            containerClass={'mb-3'}
                                            key="file"
                                            onChange={handleCNICFileChange}
                                        />
                                        {CNIC !== null &&
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
                                                                    <Link target="_blank" to={CNIC} className="text-muted fw-bold">
                                                                        {"CNIC"}
                                                                    </Link>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Card>
                                                </Col>
                                            </>
                                        }
                                        <FormInput
                                            label="CV Upload"
                                            type="file"
                                            name="file"
                                            containerClass={'mb-3'}

                                            onChange={handleCVFileChange}
                                            key="cv file"
                                        />
                                        {CV !== null &&
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
                                                                    <Link target="_blank" to={CV} className="text-muted fw-bold">
                                                                        {"CV"}
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
                                            label="Designation"
                                            placeholder="Designation"
                                            containerClass={'mb-3'}
                                            key="Designation"
                                            value={designation}
                                            onChange={( e ) => {
                                                setDesignation( e.target.value )
                                            }}
                                        />
                                        {employmentType === "Regular" ? (
                                            <>
                                                <FormInput
                                                    label="Salary "
                                                    type="number"
                                                    name="number"
                                                    placeholder="Salary"
                                                    containerClass={'mb-3'}

                                                    key="Salary"
                                                    value={salary}
                                                    onChange={( e ) => {
                                                        setSalary( e.target.valueAsNumber )
                                                    }}
                                                />
                                            </>
                                        ) : null}
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
                                            onChange={( e ) => {
                                                setFatherName( e.target.value )
                                            }}
                                        />
                                        <FormInput
                                            label="Company Provided Email"
                                            type="text"
                                            name="email"
                                            placeholder="Company Provided Email"
                                            containerClass={'mb-3'}

                                            key="email"
                                            value={companyProvideEmail}
                                            onChange={( e ) => {
                                                setCompanyProvideEmail( e.target.value )
                                            }}



                                        />
                                        <FormInput
                                            label="Confirm Password"
                                            type="password"
                                            name="password"
                                            placeholder="Confirm Password"
                                            containerClass={'mb-3'}

                                            key="password"
                                            value={confirmPassword}
                                            onChange={( e ) => {
                                                setConfirmPassword( e.target.value )
                                            }}


                                        />
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
                                                onChange={( e ) => {
                                                    setCnicNo( e.target.value )
                                                }}
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
                                                onChange={( e ) => {
                                                    setEmergencyPhoneNumber2( e.target.value )
                                                }}
                                            />
                                        </div>

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




                                        <FormInput
                                            label="Photo Upload"
                                            type="file"
                                            name="file"
                                            containerClass={'mb-3'}

                                            key="photo file"
                                            accept="image/png, image/jpeg"

                                            onChange={handleProfileFileChange}
                                        />
                                        {profilePic !== null &&
                                            <>
                                                <label className="form-label">Profile pic</label> <br />

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
                                                                    <Link target="_blank" to={profilePic} className="text-muted fw-bold">
                                                                        {"Profile picture"}
                                                                    </Link>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Card>
                                                </Col>
                                            </>
                                        }
                                        <FormInput
                                            label="Contract Upload"
                                            type="file"
                                            name="file"
                                            containerClass={'mb-3'}

                                            key="con file"
                                            accept=".pdf"
                                            onChange={handleContractFileChange}

                                        />
                                        {contract !== null &&
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
                                                                    <Link target="_blank" to={contract} className="text-muted fw-bold">
                                                                        {"contract"}
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

                                            key="Branch"
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

                                            key="Account"

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
                                <h4 className="header-title">Reference Details</h4>
                                <Row>
                                    <Col lg={6}>
                                        <FormInput
                                            label="Name"
                                            type="text"
                                            name="Name"
                                            placeholder="Name"
                                            containerClass={'mb-3'}

                                            key="name text"

                                            value={refName}
                                            onChange={( e ) => {
                                                setRefName( e.target.value );
                                            }}

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

                                                value={refPhoneNo}
                                                onChange={( e ) => {
                                                    setRefPhoneNo( e.target.value );
                                                }}
                                            />
                                        </div>

                                    </Col>
                                    <Col lg={6}>
                                        <FormInput
                                            label="Email"
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            containerClass={'mb-3'}

                                            key="email"

                                            value={refEmail}
                                            onChange={( e ) => {
                                                setRefEmail( e.target.value );
                                            }}

                                        />
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
                                                value={refCnicNo}
                                                onChange={( e ) => {
                                                    setRefCnicNo( e.target.value );
                                                }}
                                            />
                                        </div>

                                    </Col>

                                </Row>

                                <Button className='rounded-pill'
                                    type="submit"
                                >
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

export default List;
