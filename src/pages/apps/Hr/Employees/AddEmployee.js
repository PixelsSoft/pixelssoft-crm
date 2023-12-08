
import { useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import MaskedInput from 'react-text-mask';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useDispatch, useSelector } from 'react-redux';
import PageTitle from '../../../../components/PageTitle';
import { FormInput } from '../../../../components';
import { AddEmployee, GetEmployees, getRoles } from '../../../../redux/Slices/employee/Employee';
import { startLoading, stopLoading } from '../../../../redux/Slices/utiltities/Utiltities';
import { CONSTANTS } from '../../../../constants/constant';
import { toast } from 'react-toastify';
import Spinner from '../../../../components/Spinner';

const List = () => {
    const [fullName, setFullName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [email, setEmail] = useState('');
    const [companyProvideEmail, setCompanyProvideEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [DOB, setDOB] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emergencyPhoneNumber, setEmergencyPhoneNumber] = useState('');
    const [emergencyPhoneNumber2, setEmergencyPhoneNumber2] = useState('');
    const [joiningDate, setJoiningDate] = useState('');
    const [department, setDepartment] = useState('');
    const [salary, setSalary] = useState();
    const [profilePic, setProfilePic] = useState(null);
    const [contract, setContract] = useState(null);
    const [CNIC, setCNIC] = useState(null);
    const [CnicNo, setCnicNo] = useState('');
    const [CV, setCV] = useState(null);
    const [multipleRoleSelection, setMultipleRoleSelection] = useState([]);
    const [accTitle, setAccTitle] = useState('');
    const [branchCode, setBranchCode] = useState('');
    const [bankAddress, setBankAddress] = useState('');
    const [accNo, setAccNo] = useState('');
    const [bankName, setBankName] = useState('');
    const [refName, setRefName] = useState('');
    const [refEmail, setRefEmail] = useState('');
    const [refPhoneNo, setRefPhoneNo] = useState('');
    const [refCnicNo, setRefCnicNo] = useState('');
    const [refCnicPic, setRefCnicPic] = useState(null);
    const dispatch = useDispatch();

    const { loading, token, roles } = useSelector(
        (state) => ({
            loading: state.utiltities.loading,
            token: state.Auth.token,
            roles: state.Roles.roles
        })
    );


    const submit = async (e) => {
        e.preventDefault();
        dispatch(startLoading());
        let roles = [];
        multipleRoleSelection.map(e => {
            console.log('multipleRoleSelection', e.name);
            roles.push(e.name);
        })

        const params = new FormData();
        params.append("name", fullName);
        params.append("father_name", fatherName);
        params.append("email", email);
        params.append("company_provided_email", companyProvideEmail);
        params.append("dob", DOB);
        params.append("cnic_no", CnicNo);
        params.append("phone_no", phoneNumber);
        params.append("emergency_phone_no", emergencyPhoneNumber);
        params.append("emergency_phone_no_2", emergencyPhoneNumber2);
        params.append("joining_date", joiningDate);
        if (CNIC !== null) {
            params.append("cnic_img", CNIC);
        };
        if (profilePic !== null) {
            params.append("profile_img", profilePic);
        };
        if (CV !== null) {
            params.append("cv_upload", CV);
        };
        if (contract !== null) {
            params.append("contract_upload", contract);
        };
        if (refCnicPic !== null) {
            params.append("reference_profile_img", refCnicPic);
        };
        params.append("salary", salary);
        params.append("account_title", accTitle);
        params.append("accound_number", accNo);
        params.append("bank_name", bankName);
        params.append("branch_address", branchCode);
        params.append("reference_name", refName);
        params.append("reference_email", refEmail);
        params.append("reference_cnic_no", refCnicNo);
        params.append("reference_phone_no", refPhoneNo);
        params.append("password", password);
        params.append("password_confirmation", confirmPassword);
        params.append("roles", roles);
        params.append("department_id", 1);

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: params,
        };

        await fetch(CONSTANTS.API_URLS.BASE + 'user/register', options)
            .then(response => response.json())
            .then(e => {
                dispatch(stopLoading());
                dispatch(GetEmployees(token));
                dispatch(getRoles(token));
                toast.success(e?.message, { position: toast.POSITION.TOP_RIGHT });
            })
            .catch(err => {
                dispatch(stopLoading());
                console.log("err", err);
            });
        // await dispatch(AddEmployee(params, token));
        // dispatch(stopLoading());
    };

    // Profile picture upload
    const handleProfileFileChange = (event) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setProfilePic(file);
        }
    };

    // CNIC picture Upload
    const handleCNICFileChange = (event) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setCNIC(file);
        }
    };

    // Reference CNIC picture Upload
    const handleRefCNICFileChange = (event) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setRefCnicPic(file);
        }
    };

    // CV picture Upload
    const handleCVFileChange = (event) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setCV(file);
        }
    };

    // Contract picture Upload
    const handleContractFileChange = (event) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setContract(file);
        }
    };

    /////role selection/////
    const onChangeRoleSelection = (selected) => {
        setMultipleRoleSelection(selected);
    };

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
                                            onChange={(e) => setFullName(e.target.value)}
                                        />
                                        <FormInput
                                            label="Email"
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            containerClass={'mb-3'}
                                            key="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <FormInput
                                            label="Password"
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            containerClass={'mb-3'}
                                            key="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <FormInput
                                            label="Date of Birth"
                                            type="date"
                                            name="date"
                                            containerClass={'mb-3'}

                                            key="date"
                                            value={DOB}
                                            onChange={(e) => {
                                                setDOB(e.target.value)
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
                                                onChange={(e) => setPhoneNumber(e.target.value)}
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
                                                onChange={(e) => {
                                                    setEmergencyPhoneNumber(e.target.value)
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
                                            onChange={(e) => {
                                                setJoiningDate(e.target.value)
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
                                        <FormInput
                                            label="CV Upload"
                                            type="file"
                                            name="file"
                                            containerClass={'mb-3'}

                                            onChange={handleCVFileChange}
                                            key="cv file"


                                        />
                                        <FormInput
                                            label="Salary "
                                            type="number"
                                            name="number"
                                            placeholder="Salary"
                                            containerClass={'mb-3'}

                                            key="Number"
                                            value={salary}
                                            onChange={(e) => {
                                                setSalary(e.target.valueAsNumber)
                                            }}


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
                                            onChange={(e) => {
                                                setFatherName(e.target.value)
                                            }}
                                        />
                                        <FormInput
                                            label="Company Provided Email"
                                            type="email"
                                            name="email"
                                            placeholder="Company Provided Email"
                                            containerClass={'mb-3'}

                                            key="email"
                                            value={companyProvideEmail}
                                            onChange={(e) => {
                                                setCompanyProvideEmail(e.target.value)
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
                                            onChange={(e) => {
                                                setConfirmPassword(e.target.value)
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
                                                onChange={(e) => {
                                                    setCnicNo(e.target.value)
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
                                            onChange={(e) => {
                                                setDepartment(e.target.value)
                                            }}
                                        >
                                            <option>Hr</option>
                                            <option>Accounts</option>
                                            <option>Design & Development</option>
                                            <option>Sales</option>
                                        </FormInput>


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
                                                onChange={(e) => {
                                                    setEmergencyPhoneNumber2(e.target.value)
                                                }}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Role</label> <br />
                                            <Typeahead
                                                id="select3"
                                                labelKey="name"
                                                multiple
                                                onChange={(e) => onChangeRoleSelection(e)}
                                                options={roles}
                                                placeholder="Choose a role"
                                                selected={multipleRoleSelection}
                                            />
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
                                        <FormInput
                                            label="Contract Upload"
                                            type="file"
                                            name="file"
                                            containerClass={'mb-3'}

                                            key="con file"

                                            accept=".pdf"
                                            onChange={handleContractFileChange}

                                        />

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
                                            onChange={(e) => {
                                                setAccTitle(e.target.value);
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
                                            onChange={(e) => {
                                                setBranchCode(e.target.value);
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
                                            onChange={(e) => {
                                                setBankAddress(e.target.value);
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
                                            onChange={(e) => {
                                                setAccNo(e.target.value);
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
                                            onChange={(e) => {
                                                setBankName(e.target.value);
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
                                            onChange={(e) => {
                                                setRefName(e.target.value);
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
                                                onChange={(e) => {
                                                    setRefPhoneNo(e.target.value);
                                                }}
                                            />
                                        </div>
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
                                                onChange={(e) => {
                                                    setRefCnicNo(e.target.value);
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
                                            onChange={(e) => {
                                                setRefEmail(e.target.value);
                                            }}

                                        />
                                        <FormInput
                                            label="CNIC Upload"
                                            type="file"
                                            name="file"
                                            containerClass={'mb-3'}

                                            key="cnic file"
                                            onChange={handleRefCNICFileChange}

                                        />
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
