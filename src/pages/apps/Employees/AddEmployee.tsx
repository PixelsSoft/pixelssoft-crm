
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

// hooks
import { usePageTitle, useRedux } from '../../../hooks';

// component
import { FormInput } from '../../../components/form';

// data
// import { contacts } from './data';
import { createUser } from '../../../redux/actions';
import { useForm } from 'react-hook-form';
import MaskedInput from 'react-text-mask';
import { Typeahead } from 'react-bootstrap-typeahead';

// dummy data

type Role = {
    _id: string;
    title: string;
    access: {
        all: boolean;
        allowDashboard: boolean;
        allowViewInvoices: boolean;
        allowCreateInvoices: boolean;
        allowViewCustomers: boolean;
        allowCreateCustomers: boolean;
        allowViewProjects: boolean;
        allowCreateProjects: boolean;
        allowSales: boolean;
        allowViewUsers: boolean;
        allowCreateUsers: boolean;
        allowReports: boolean;
        allowViewExpenses: boolean;
        allowCreateExpenses: boolean;
        allowPayouts: boolean;
        allowAttendance: boolean;
        allowLeads: boolean;
    };
};



const List = () => {
    type Option = string | Record<string, any>;

    const [fullName, setFullName] = useState('');
    const [position, setPosition] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [designation, setDesignation] = useState('');
    const [salary, setSalary] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const [multipleRoleSelection, setMultipleRoleSelection] = useState<Option[]>([]);


    const { dispatch, appSelector } = useRedux();

    const { loading, createUserSuccess, roles } = appSelector((state) => ({
        loading: state.Auth.loading,
        createUserSuccess: state.Auth.createUserSuccess,



        roles: state.Roles.roles,
    }));
    const methods = useForm({
        defaultValues: {
            password: '12345',
            statictext: 'email@example.com',
            color: '#35b8e0',
        },
    });
    const {

        register,
        control,
        formState: { errors },
    } = methods;

    const getRole = (id: string): Role => roles.data.find((item: Role) => item._id === id);

    const submit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        console.log(role);
        dispatch(
            createUser({
                fullName,
                position,
                email,
                password,
                role: getRole(role)._id,
                designation,
                salary,
                phoneNumber,
                profilePic,
            })
        );
    };

    const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setProfilePic(file);
        }
    };

    // set pagetitle
    usePageTitle({
        title: 'Add Employee',
        breadCrumbItems: [
            {
                path: '/apps/users/addUsers',
                label: 'Contacts',
            },
            {
                path: '/apps/users/addUsers',
                label: 'Add User ',
                active: true,
            },
        ],
    });



    // form validation schema
    useEffect(() => {
        if (createUserSuccess) {
            setFullName('');
            setEmail('');
            setPassword('');
            setRole('');
            setDesignation('');
            setPhoneNumber('');
            setPosition('');
            setSalary(0);
            setProfilePic(null);
        }
    }, [createUserSuccess, dispatch]);


    /////role selection/////
    const onChangeRoleSelection = (selected: Option[]) => {
        setMultipleRoleSelection(selected);
    };

    return loading ? (
        <div>
            <h2>Loading...</h2>
        </div>
    ) : (
        <>
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
                                            register={register}
                                            key="text"
                                            errors={errors}
                                            control={control}
                                        />
                                        <FormInput
                                            label="Email"
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            containerClass={'mb-3'}
                                            register={register}
                                            key="email"
                                            errors={errors}
                                            control={control}
                                        />
                                        <FormInput
                                            label="Password"
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            containerClass={'mb-3'}
                                            register={register}
                                            key="password"
                                            errors={errors}
                                            control={control}
                                        />
                                        <FormInput
                                            label="Date of Birth"
                                            type="date"
                                            name="date"
                                            containerClass={'mb-3'}
                                            register={register}
                                            key="date"
                                            errors={errors}
                                            control={control}
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
                                            />
                                        </div>

                                        <FormInput
                                            label="Joining Date"
                                            type="date"
                                            name="date"
                                            containerClass={'mb-3'}
                                            register={register}
                                            key="date"
                                            errors={errors}
                                            control={control}
                                        />
                                        <FormInput
                                            label="Cnic Upload"
                                            type="file"
                                            name="file"
                                            containerClass={'mb-3'}
                                            register={register}
                                            key="file"
                                            errors={errors}
                                            control={control}
                                        />
                                        <FormInput
                                            label="CV Upload"
                                            type="file"
                                            name="file"
                                            containerClass={'mb-3'}
                                            register={register}
                                            key="file"
                                            errors={errors}
                                            control={control}
                                        />
                                        <FormInput
                                            label="Salary "
                                            type="number"
                                            name="number"
                                            placeholder="Salary"
                                            containerClass={'mb-3'}
                                            register={register}
                                            key="Number"
                                            errors={errors}
                                            control={control}
                                        />
                                    </Col>
                                    <Col lg={6}>

                                        <FormInput
                                            label="Father Name"
                                            type="text"
                                            name="Name"
                                            placeholder="Father Name"
                                            containerClass={'mb-3'}
                                            register={register}
                                            key="text"
                                            errors={errors}
                                            control={control}
                                        />
                                        <FormInput
                                            label="Company Provided Email"
                                            type="email"
                                            name="email"
                                            placeholder="Company Provided Email"
                                            containerClass={'mb-3'}
                                            register={register}
                                            key="email"
                                            errors={errors}
                                            control={control}
                                        />
                                        <FormInput
                                            label="Confirm Password"
                                            type="password"
                                            name="password"
                                            placeholder="Confirm Password"
                                            containerClass={'mb-3'}
                                            register={register}
                                            key="password"
                                            errors={errors}
                                            control={control}
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
                                            />
                                        </div>

                                        <FormInput
                                            name="select"
                                            label="Select Department"
                                            type="select"
                                            containerClass="mb-3"
                                            className="form-select"
                                            register={register}
                                            key="select"
                                            errors={errors}
                                            control={control}>
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
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Role</label> <br />
                                            <Typeahead
                                                id="select3"
                                                labelKey="label"
                                                multiple
                                                onChange={onChangeRoleSelection}
                                                options={[
                                                    { id: 1, value: 'Admin', label: 'Admin' },
                                                    { id: 2, value: 'Sales', label: 'Sales' },
                                                    { id: 3, value: 'SalesLead', label: 'Sales Lead' },
                                                    { id: 4, value: 'ProjectManager', label: 'Project manager' },
                                                    { id: 5, value: 'DevelopmentLead', label: 'Development Lead' },
                                                    { id: 6, value: 'Developer', label: 'Developer' },
                                                    { id: 7, value: 'Hr', label: 'Hr' },
                                                    { id: 8, value: 'Accountant', label: 'Accountant' },
                                                ]}
                                                placeholder="Choose a role"
                                                selected={multipleRoleSelection}
                                            />
                                        </div>

                                        <FormInput
                                            label="Photo Upload"
                                            type="file"
                                            name="file"
                                            containerClass={'mb-3'}
                                            register={register}
                                            key="file"
                                            errors={errors}
                                            onChange={handleFileChange}
                                            control={control}
                                        />
                                        <FormInput
                                            label="Contract Upload"
                                            type="file"
                                            name="file"
                                            containerClass={'mb-3'}
                                            register={register}
                                            key="file"
                                            errors={errors}
                                            control={control}
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
                                            register={register}
                                            key="text"
                                            errors={errors}
                                            control={control}
                                        />
                                        <FormInput
                                            label="Branch Code "
                                            type="number"
                                            name="number"
                                            placeholder="Branch Code"
                                            containerClass={'mb-3'}
                                            register={register}
                                            key="Number"
                                            errors={errors}
                                            control={control}
                                        />
                                        <FormInput
                                            label="Bank Address"
                                            type="text"
                                            name="Name"
                                            placeholder="Bank address"
                                            containerClass={'mb-3'}
                                            register={register}
                                            key="text"
                                            errors={errors}
                                            control={control}
                                        />

                                    </Col>
                                    <Col lg={6}>
                                        <FormInput
                                            label="Account Number "
                                            type="number"
                                            name="number"
                                            placeholder="Account Number"
                                            containerClass={'mb-3'}
                                            register={register}
                                            key="Number"
                                            errors={errors}
                                            control={control}
                                        />
                                        <FormInput
                                            name="select"
                                            label="Select Bank"
                                            type="select"
                                            containerClass="mb-3"
                                            className="form-select"
                                            register={register}
                                            key="select"
                                            errors={errors}
                                            control={control}>
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
                                            label="Account Title"
                                            type="text"
                                            name="Name"
                                            placeholder="Account title"
                                            containerClass={'mb-3'}
                                            register={register}
                                            key="text"
                                            errors={errors}
                                            control={control}
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
                                            register={register}
                                            key="email"
                                            errors={errors}
                                            control={control}
                                        />
                                        <FormInput
                                            label="Photo Upload"
                                            type="file"
                                            name="file"
                                            containerClass={'mb-3'}
                                            register={register}
                                            key="file"
                                            errors={errors}
                                            control={control}
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
