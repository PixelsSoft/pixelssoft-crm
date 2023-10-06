import { FormEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useRedux } from '../../../hooks';
// import { createCategory, getAllCategories, resetCreateCategory } from '../../../redux/projectCategories/actions';

export default function CreateCategory({
    createCategoryModal,
    toggleCategorymodal,
}: {
    createCategoryModal: boolean;
    toggleCategorymodal: () => void;
}) {
    const [name, setName] = useState('');
    const { appSelector, dispatch } = useRedux();

    const submit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        // dispatch(createCategory({ name }));
    };

    // const { error, categoryCreated, data } = appSelector((state) => ({
    //     categoryCreated: state.ProjectCategories.categoryCreated,
    //     error: state.ProjectCategories.error,
    //     data: state.ProjectCategories.data,
    // }));

    const cancel: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        setName('');
        toggleCategorymodal();
        // dispatch(resetCreateCategory());
    };

    // useEffect(() => {
    //     if (categoryCreated) {
    //         setName('');
    //         // dispatch(getAllCategories());
    //     }
    // }, [categoryCreated, dispatch]);

    return (
        <Modal show={createCategoryModal} onHide={toggleCategorymodal} centered>
            <Modal.Header closeButton>
                <Modal.Title as="h4">New Project Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submit}>
                    <Row className="my-2">
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Category name</Form.Label>
                            <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                    </Row>
                    {/* {error && (
                        <Alert variant="danger" className="my-2">
                            {error}
                        </Alert>
                    )}

                    {data && (
                        <Alert variant="success" className="my-2">
                            {data.message}
                        </Alert>
                    )} */}

                    <div className="d-flex justify-content-end border-top border-gray pt-2">
                        <Button variant="light" className="waves-effect waves-light me-1" type="submit">
                            Save
                        </Button>
                        <Button variant="danger" className="waves-effect waves-light" type="button" onClick={cancel}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
