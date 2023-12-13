import { Button, Modal } from 'react-bootstrap'
import FormInput from './FormInput'
import { useSelector } from 'react-redux';
import { useState } from 'react';

const EmployeeEditModal = ({ editUserModal, toggleEditModal }) => {
    const { loading, employee } = useSelector(
        (state) => ({
            loading: state.utiltities.loading,
            employee: state.Employees.singleEmployee
        })
    );

    const [fullName, setFullName] = useState(employee?.name);
    const [fatherName, setFatherName] = useState(employee?.detail?.father_name);
    const [email, setEmail] = useState(employee?.email);
    const [companyProvideEmail, setCompanyProvideEmail] = useState(employee?.detail?.company_provided_email);
    // const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    const [DOB, setDOB] = useState(employee?.detail?.dob);
    const [phoneNumber, setPhoneNumber] = useState(employee?.detail?.phone_no);
    const [emergencyPhoneNumber, setEmergencyPhoneNumber] = useState(employee?.detail?.emergency_phone_no);
    const [emergencyPhoneNumber2, setEmergencyPhoneNumber2] = useState(employee?.detail?.emergency_phone_no_2);
    const [joiningDate, setJoiningDate] = useState(employee?.detail?.joining_date);
    const [department, setDepartment] = useState('');
    const [salary, setSalary] = useState(employee?.detail?.salary);
    const [profilePic, setProfilePic] = useState(employee?.detail?.profile_img);
    const [contract, setContract] = useState(employee?.detail?.contract_upload);
    const [CNIC, setCNIC] = useState(employee?.detail?.cnic_img);
    const [CnicNo, setCnicNo] = useState(employee?.detail?.cnic_no);
    const [CV, setCV] = useState(employee?.detail?.cv_upload);
    const [multipleRoleSelection, setMultipleRoleSelection] = useState(employee?.roles);
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

    console.log('EmployeeEditModal', employee);

    // const reset = () => {
    //     setFullName('')
    //     setFatherName('')
    //     setEmail('')
    //     setCompanyProvideEmail('')
    //     setPassword('')
    //     setConfirmPassword('')
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

    return (
        <Modal show={editUserModal} onHide={toggleEditModal} centered>
            <Modal.Header closeButton>
                <Modal.Title as="h4">Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormInput
                    label={'Name'}
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    containerClass={'mb-3'}
                    value={fullName}
                    onChange={e => setFullName(e.target.name)}
                />

                <FormInput
                    label={'Email'}
                    type="text"
                    name="email"
                    placeholder="Enter email"
                    containerClass={'mb-3'}
                    value={email}
                    onChange={e => setEmail(e.target.name)}
                />

                <FormInput
                    label={'Company'}
                    type="text"
                    name="company"
                    placeholder="Enter company"
                    containerClass={'mb-3'}
                />

                <FormInput
                    label={'Email address'}
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    containerClass={'mb-3'}
                />

                <FormInput
                    label={'Role'}
                    type="text"
                    name="role"
                    placeholder="Enter role"
                    containerClass={'mb-3'}
                />

                <FormInput
                    label={'Designation'}
                    type="text"
                    name="designation"
                    placeholder="Enter Designation"
                    containerClass={'mb-3'}
                />

                <FormInput
                    label={'Salary'}
                    type="text"
                    name="salary"
                    placeholder="Enter Salary"
                    containerClass={'mb-3'}
                />

                <FormInput
                    label={'Phone #'}
                    type="text"
                    name="phone"
                    placeholder="Enter Phone #"
                    containerClass={'mb-3'}
                />

                <FormInput
                    label="Profile Picture"
                    type="file"
                    name="file"
                    containerClass={'mb-3'}
                    // register={register}
                    key="file"
                // errors={errors}
                // control={control}
                />

                <Button variant="dark" className="waves-effect waves-light me-1" type="submit">
                    Save
                </Button>
                <Button variant="danger" className="waves-effect waves-light" onClick={toggleEditModal}>
                    Cancel
                </Button>
            </Modal.Body>
        </Modal>
    )
}

export default EmployeeEditModal