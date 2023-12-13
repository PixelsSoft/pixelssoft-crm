import { useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from './FormInput';
import { startLoading, stopLoading } from '../redux/Slices/utiltities/Utiltities';
import { EditLead } from '../redux/Slices/Leads/leads';
import Spinner from './Spinner';

const ViewLeadModal = ({ leadId, visibleModal, toggleModal }) => {
    const { token, platforms, loading, leads } = useSelector(
        (state) => ({
            token: state.Auth.token,
            loading: state.utiltities.loading,
            platforms: state.Platform.platform,
            leads: state.Leads.singleLead
        })
    );

    const dispatch = useDispatch();
    const [plat, setPlat] = useState(leads?.platform?.id);
    const [name, setName] = useState(leads?.name);
    const [email, setEmail] = useState(leads?.email);
    const [phone, setPhone] = useState(leads?.phone);
    const [note, setNote] = useState(leads?.note);

    const EditFunc = async () => {
        const data = {
            name: name,
            platform: plat,
            email: email,
            phone: phone,
            note: note,
        };
        dispatch(startLoading());
        await dispatch(EditLead(leadId, data, token));
        dispatch(stopLoading());
        toggleModal();
    };

    return loading ? (
        <div className='d-flex justify-content-center align-items-center'>
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
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col >
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    onChange={(e) => setPhone(e.target.value)}
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
                                onChange={(e) => {
                                    setPlat(e.target.value);
                                }}
                            >
                                <option>no Selected</option>
                                {platforms?.map(val => {
                                    return (
                                        <option key={val.id} value={val.id}>{val.title}</option>
                                    );
                                })}
                            </FormInput>
                        </Col>
                    </Row>
                    <FormInput
                        label="Note"
                        type="textarea"
                        name="textarea"
                        containerClass={'mb-3'}
                        key="textarea"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
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