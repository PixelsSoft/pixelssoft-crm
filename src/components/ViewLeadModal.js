import { useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from './FormInput';
import { startLoading, stopLoading } from '../redux/Slices/utiltities/Utiltities';
import { EditLead } from '../redux/Slices/Leads/leads';
import Spinner from './Spinner';

const ViewLeadModal = ( { lead, visibleModal, toggleModal } ) => {
    const { token, platforms, loading, leads } = useSelector(
        ( state ) => ( {
            token: state.Auth.token,
            loading: state.utiltities.loading,
            platforms: state.Platform.platform,
            leads: state.Leads.singleLead
        } )
    );

    const dispatch = useDispatch();
    const [plat, setPlat] = useState( lead?.platform_id );
    const [name, setName] = useState( lead?.name );
    const [email, setEmail] = useState( lead?.email );
    const [phone, setPhone] = useState( lead?.phone );
    const [status, setStatus] = useState( lead?.status );
    const [description, setDescription] = useState( lead?.description );

    const options = [
        { value: "Pending", label: "Pending" },
        { value: "Interested", label: "Interested" },
        { value: "Closed", label: "Closed" },
    ];
    const EditFunc = async () => {
        const formData = new FormData();
        formData.append( "id", lead?.id )
        formData.append( "name", name )
        formData.append( "email", email )
        formData.append( "phone", phone )
        formData.append( "description", description )
        formData.append( "platfoamId", plat )
        formData.append( "status", status )
        dispatch( startLoading() );
        await dispatch( EditLead( formData, token ) );
        dispatch( stopLoading() );
        toggleModal();
    };


    return loading ? (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <Spinner className="m-2" color={'primary'} />
        </div>
    ) : (
        <>
            <Modal size="lg" show={visibleModal} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <h4 className="modal-title">Edit Lead</h4>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Row className='mb-3'>
                        <Col>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    value={name}
                                    onChange={( e ) => setName( e.target.value )}
                                />
                            </Form.Group>
                        </Col>
                        <Col >
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    value={email}
                                    onChange={( e ) => setEmail( e.target.value )}
                                    type='email'
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col >
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Phone No</Form.Label>
                                <Form.Control
                                    value={phone}
                                    onChange={( e ) => setPhone( e.target.value )}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <FormInput
                                label="Platform"
                                name="select"
                                type="select"
                                className="form-select"
                                key="select"
                                value={plat}
                                onChange={( e ) => {
                                    setPlat( e.target.value );
                                }}
                            >
                                <option>no Selected</option>
                                {platforms?.map( val => {
                                    return (
                                        <option key={val.id} value={val.id}>{val.title}</option>
                                    );
                                } )}
                            </FormInput>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormInput
                                label="Platform"
                                name="select"
                                type="select"
                                className="form-select"
                                key="select"
                                value={status}
                                onChange={( e ) => {
                                    setStatus( e.target.value );
                                }}
                            >
                                <option>no Selected</option>
                                {options?.map( val => {
                                    return (
                                        <option key={val.value} value={val.id}>{val.label}</option>
                                    );
                                } )}
                            </FormInput>
                        </Col>
                    </Row>
                    <FormInput
                        label="Note"
                        type="textarea"
                        name="textarea"
                        containerClass={'mb-3'}
                        key="textarea"
                        value={description}
                        onChange={( e ) => setDescription( e.target.value )}
                    />

                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="button"
                        className="btn btn-secondary waves-effect"
                        onClick={toggleModal}
                    >
                        Close
                    </Button>
                    <Button
                        type="submit"
                        variant={"success"}
                        className="waves-effect waves-light  "
                        onClick={EditFunc}
                    >
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ViewLeadModal