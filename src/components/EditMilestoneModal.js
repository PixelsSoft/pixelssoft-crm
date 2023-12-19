import { useState } from 'react'
import { Button, Modal, Form, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from './FormInput';
import { toast } from 'react-toastify';
import { startLoading, stopLoading } from '../redux/Slices/utiltities/Utiltities';
import { UpdateMilstone } from '../redux/Slices/Project/Project';

const EditMilestoneModal = ({ projectId, id, edit, closeEditModal }) => {
    const { token, singleMile, user } = useSelector(
        (state) => ({
            token: state.Auth.token,
            singleMile: state.Projects.singleMile,
            user: state.Auth.user,
        })
    );

    const dispatch = useDispatch();
    const [desc, setDesc] = useState(singleMile?.description);
    const [amount, setAmount] = useState(singleMile?.amount);
    const [startDate, setStartDate] = useState(singleMile?.start_date);
    const [endDate, setEndDate] = useState(singleMile?.end_date);
    const [status, setStatus] = useState(singleMile?.status);

    const StartDateFuc = (e) => {
        const selectedDate = new Date(e.target.value);
        const today = new Date();

        if (selectedDate < today) {
            setStartDate(new Date().toLocaleDateString());
            toast.error('Start date cannot be older than today.', { position: toast.POSITION.TOP_RIGHT });
        } else {
            setStartDate(e.target.value);
        }
    }

    const EndDateFuc = (e) => {
        const selectedDate = new Date(e.target.value);
        const today = new Date();

        if (selectedDate < today) {
            setEndDate(new Date().toLocaleDateString());
            toast.error('End date cannot be older than today.', { position: toast.POSITION.TOP_RIGHT });
        } else {
            setEndDate(e.target.value);
        }
    }

    const amountFunc = (e) => {
        if (e.target.value >= 0) {
            setAmount(e.target.value)
        }
    }

    const editMilestone = async () => {
        const data = {
            project_id: id,
            user_id: user.id,
            description: desc,
            amount: amount,
            status: status,
            start_date: startDate,
            end_date: endDate,
        }
        dispatch(startLoading());
        await dispatch(UpdateMilstone(projectId, id, data, token, closeEditModal));
        dispatch(stopLoading());
    };

    return (
        <Modal show={edit} onHide={closeEditModal}>
            <Modal.Header onHide={closeEditModal} closeButton>
                <h4 className="modal-title">Create Milestone</h4>
            </Modal.Header>
            <Modal.Body>
                {/* <Row className="mb-3"> */}
                <div className="mb-3">
                    <label className="form-label">Start Date</label> <br />
                    <FormInput
                        type="date"
                        name="date"
                        // containerClass={'mb-3'}
                        key="date"
                        value={startDate}
                        onChange={(e) => {
                            // setStartDate(e.target.value)
                            StartDateFuc(e)
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">End Date</label> <br />
                    <FormInput
                        type="date"
                        name="date"
                        // containerClass={'mb-3'}
                        key="date"
                        value={endDate}
                        onChange={(e) => {
                            // setEndDate(e.target.value)
                            EndDateFuc(e)
                        }}
                    />
                </div>


                <FormInput
                    label="Description"
                    type="textarea"
                    name="textarea"
                    containerClass={'mb-3'}
                    key="textarea"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />

                <Form.Group as={Col} controlId="formGridState" className='mb-3'>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        value={amount}
                        type='number'
                        onChange={(e) => amountFunc(e)}
                    />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Status</Form.Label>
                    <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value={"pending"}>Pending</option>
                        <option value={"ongoing"}>Ongoing</option>
                        <option value={"completed"}>Completed</option>
                    </Form.Select>
                </Form.Group>

                {/* </Row> */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={closeEditModal}>
                    Close
                </Button>{" "}
                <Button className="btn btn-success mb-2 me-1" onClick={editMilestone}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditMilestoneModal