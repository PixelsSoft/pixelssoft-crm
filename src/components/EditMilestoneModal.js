import { useState } from 'react'
import { Button, Modal, Form, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from './FormInput';
import { toast } from 'react-toastify';
import { startLoading, stopLoading } from '../redux/Slices/utiltities/Utiltities';
import { UpdateMilstone } from '../redux/Slices/PortalProject/PortalProject';


const EditMilestoneModal = ( { projectId, data, edit, closeEditModal } ) => {
    const { token, } = useSelector(
        ( state ) => ( {
            token: state.Auth.token,

        } )
    );


    const dispatch = useDispatch();
    const [title, setTitle] = useState( data?.title );

    const [amount, setAmount] = useState( data?.amount );


    const amountFunc = ( e ) => {
        if ( e.target.value >= 0 ) {
            setAmount( e.target.value )
        }
    }

    const editMilestone = async () => {
        const formData = new FormData()
        formData.append( "id", data?.id )
        formData.append( "title", title )
        formData.append( "amount", amount )
        formData.append( "portal_project_id", projectId )

        dispatch( startLoading() );
        await dispatch( UpdateMilstone( projectId, formData, token, closeEditModal ) );
        dispatch( stopLoading() );
    };

    return (
        <Modal show={edit} onHide={closeEditModal}>
            <Modal.Header onHide={closeEditModal} closeButton>
                <h4 className="modal-title">Edit Milestone</h4>
            </Modal.Header>
            <Modal.Body>
                <FormInput
                    label="Title"
                    type="textarea"
                    name="textarea"
                    containerClass={'mb-3'}
                    key="textarea"
                    value={title}
                    onChange={( e ) => setTitle( e.target.value )}
                />

                <Form.Group as={Col} controlId="formGridState" className='mb-3'>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        value={amount}
                        type='number'
                        onChange={( e ) => amountFunc( e )}
                    />
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