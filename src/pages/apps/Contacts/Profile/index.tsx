import { Button, Card, Col, Row } from 'react-bootstrap';

// hooks
import { usePageTitle } from '../../../../hooks';

import UserBox from './UserBox';

import { FormInput } from '../../../../components/form';

const Profile = () => {
    // set pagetitle
    usePageTitle({
        title: 'Profile',
        breadCrumbItems: [
            {
                path: '/apps/contacts/profile',
                label: 'Contacts',
            },
            {
                path: '/apps/contacts/profile',
                label: 'Profile',
                active: true,
            },
        ],
    });

    return (
        <Row>
            <Col>
                <UserBox />
                <Card>
                    <Card.Body>
                        <Row>
                            <Col sm={6}>
                                <div className="mb-3">
                                    <h3>Edit Profile</h3>
                                </div>

                                <form>
                                    <FormInput
                                        label={'Full Name'}
                                        type="text"
                                        name="fullname"
                                        placeholder="Enter Full Name"
                                        containerClass={'mb-3'}
                                    />
                                    <FormInput
                                        label={'Email'}
                                        type="email"
                                        name="email"
                                        placeholder="Enter Email"
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
                                    <Button variant="danger" className="waves-effect waves-light">
                                        Cancel
                                    </Button>
                                </form>
                            </Col>

                            <Col sm={6}>
                                <div className="mb-3">
                                    <h3>Change Password</h3>
                                </div>

                                <form>
                                    <FormInput
                                        label={'Password'}
                                        type="password"
                                        name="password"
                                        placeholder="Enter Password"
                                        containerClass={'mb-3'}
                                    />
                                    <FormInput
                                        label={'Confirm Password'}
                                        type="password"
                                        name="password"
                                        placeholder="Enter Confirm Password"
                                        containerClass={'mb-3'}
                                    />

                                    <div className="d-flex justify-content-end">
                                        <Button variant="dark" className="waves-effect waves-light me-1" type="submit">
                                            Save
                                        </Button>
                                        <Button variant="danger" className="waves-effect waves-light">
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default Profile;
