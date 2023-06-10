import { Link } from 'react-router-dom';
import { Badge, Button, Card, Col, Form, Modal, OverlayTrigger, ProgressBar, Row, Tooltip } from 'react-bootstrap';
import classNames from 'classnames';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// hooks
import { usePageTitle } from '../../../hooks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// components
import { FormInput } from '../../../components/form';

// types
import { ProjectsList } from './types';

// dummy data
import { projects } from './data';

type SingleProjectProps = {
    projects: ProjectsList[];
};

const SingleProject = ({ projects }: SingleProjectProps) => {
    return (
        <>
            <Link to="/apps/projects/kanban/123">
                <Row>
                    {(projects || []).map((project, index) => {
                        return (
                            <Col xl={4} key={index.toString()}>
                                <Card>
                                    <Card.Body className="project-box">
                                        <Badge bg={project.variant} className="float-end">
                                            {project.state}
                                        </Badge>
                                        <h4 className="mt-0">
                                            <Link to="/apps/projects/kanban/123" className="text-dark">
                                                {project.title}
                                            </Link>
                                        </h4>
                                        <span className="text-secondary font-12">Created by Taimoor</span>
                                        <p
                                            className={classNames(
                                                'text-' + project.variant,
                                                'text-uppercase',
                                                'font-13'
                                            )}>
                                            {project.category}
                                        </p>
                                        <p className="text-muted font-13">
                                            {project.shortDesc}
                                            <Link to="#" className="text-primary">
                                                View more
                                            </Link>
                                        </p>

                                        <ul className="list-inline">
                                            <li className="list-inline-item me-4">
                                                <h4 className="mb-0">{project.question}</h4>
                                                <p className="text-muted">Questions</p>
                                            </li>
                                            <li className="list-inline-item">
                                                <h4 className="mb-0">{project.comment}</h4>
                                                <p className="text-muted">Comments</p>
                                            </li>
                                        </ul>

                                        <div className="project-members mb-2">
                                            <h5 className="float-start me-3">Team :</h5>
                                            <div className="avatar-group">
                                                {(project.teamMembers || []).map((member, index) => {
                                                    return (
                                                        <OverlayTrigger
                                                            key={index.toString()}
                                                            placement="bottom"
                                                            overlay={<Tooltip id={member.name}>{member.name}</Tooltip>}>
                                                            <Link to="#" className="avatar-group-item">
                                                                <img
                                                                    src={member.image}
                                                                    className="rounded-circle avatar-sm"
                                                                    alt=""
                                                                />
                                                            </Link>
                                                        </OverlayTrigger>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <h5 className="mb-2 fw-semibold">
                                            Progress
                                            <span className={classNames('float-end', 'text-' + project.variant)}>
                                                {project.progress}%
                                            </span>
                                        </h5>
                                        <ProgressBar
                                            className={classNames(
                                                'progress-bar-alt-' + project.variant,
                                                'progress-sm'
                                            )}>
                                            <ProgressBar
                                                variant={project.variant}
                                                now={project.progress}
                                                className="progress-animated"
                                            />
                                        </ProgressBar>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Link>
        </>
    );
};

const Projects = () => {
    const [createProjectModal, setCreateProjectModal] = useState(false);

    const toggleCreateProjectModal = () => setCreateProjectModal(!createProjectModal);

    const schemaResolver = yupResolver(
        yup.object().shape({
            title: yup.string().required(),
            userName: yup.string().required(),
        })
    );

    const { handleSubmit } = useForm({ resolver: schemaResolver });

    const handleCreateProject = () => {};

    // set pagetitle
    usePageTitle({
        title: 'Projects',
        breadCrumbItems: [
            {
                path: 'apps/projects',
                label: 'Apps',
            },
            {
                path: 'apps/projects',
                label: 'Projects',
                active: true,
            },
        ],
    });

    return (
        <>
            <Row>
                <Col sm={4}>
                    <Button
                        onClick={toggleCreateProjectModal}
                        className="btn btn-purple rounded-pill w-md waves-effect waves-light mb-3">
                        <i className="mdi mdi-plus me-1"></i>
                        Create Project
                    </Button>
                </Col>
                <Col sm={8}>
                    <div className="float-end">
                        <form className="row g-2 align-items-center mb-2 mb-sm-0">
                            <div className="col-auto">
                                <div className="d-flex">
                                    <label className="d-flex align-items-center">
                                        Phase
                                        <FormInput
                                            type="select"
                                            name="phase"
                                            containerClass="d-inline-block ms-2"
                                            className="form-select-sm">
                                            <option>All Projects(6)</option>
                                            <option>completed</option>
                                            <option>Progress</option>
                                        </FormInput>
                                    </label>
                                </div>
                            </div>
                            <div className="col-auto">
                                <div className="d-flex">
                                    <label className="d-flex align-items-center">
                                        Sort
                                        <FormInput
                                            type="select"
                                            name="sort"
                                            containerClass="d-inline-block ms-2"
                                            className="form-select-sm">
                                            <option>Date</option>
                                            <option>Name</option>
                                            <option>End date</option>
                                            <option>Start Date</option>
                                        </FormInput>
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                </Col>
            </Row>
            <SingleProject projects={projects} />
            <Modal show={createProjectModal} onHide={toggleCreateProjectModal} centered>
                <Modal.Header closeButton>
                    <h4 className="modal-title">Add New Project</h4>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(handleCreateProject)} className="px-2">
                        <FormInput
                            name="title"
                            label="Title"
                            placeholder="Enter title"
                            type="text"
                            containerClass="mb-3"
                            className="form-control"
                            // register={register}
                            key="title"
                            // errors={errors}
                            // control={control}
                        />
                        <Row>
                            <div className="project-members mb-2">
                                <h5 className="float-start me-3">Team :</h5>
                                <div className="avatar-group">
                                    {(projects[0].teamMembers || []).map((member, index) => {
                                        return (
                                            <OverlayTrigger
                                                key={index.toString()}
                                                placement="bottom"
                                                overlay={<Tooltip id={member.name}>{member.name}</Tooltip>}>
                                                <Link to="#" className="avatar-group-item">
                                                    <img
                                                        src={member.image}
                                                        className="rounded-circle avatar-sm"
                                                        alt=""
                                                    />
                                                </Link>
                                            </OverlayTrigger>
                                        );
                                    })}
                                </div>
                            </div>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Select Team Members</Form.Label>
                                <Form.Select defaultValue="Choose...">
                                    <option>Choose...</option>
                                    <option>Option 1</option>
                                    <option>Option 2</option>
                                    {/* <option>Option 3</option> */}
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Category</Form.Label>
                                <Form.Select defaultValue="Choose...">
                                    <option>Choose...</option>
                                    <option>Option 1</option>
                                    <option>Option 2</option>
                                    {/* <option>Option 3</option> */}
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <Row>
                            <FormInput
                                name="priority"
                                label="Priority"
                                type="select"
                                containerClass="mb-3"
                                className="form-select"
                                // register={register}
                                key="priority"
                                // errors={errors}
                                // control={control}
                            >
                                <option value="">Select</option>
                                <option value="Urgent">Urgent</option>
                                <option value="High">High</option>
                            </FormInput>
                        </Row>

                        <Row>
                            <FormInput
                                label="Description"
                                type="textarea"
                                name="textarea"
                                rows={5}
                                containerClass={'mb-3'}
                                // register={register}
                                key="textarea"
                                // errors={errors}
                                // control={control}
                            />
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormInput
                                    name="startDate"
                                    label="Start Date"
                                    placeholder="Enter Date"
                                    type="text"
                                    containerClass="mb-3"
                                    className="form-control"
                                    // register={register}
                                    key="startDate"
                                    // errors={errors}
                                    // control={control}
                                />
                            </Col>
                            <Col md={6}>
                                <FormInput
                                    name="DueDate"
                                    label="Due Date"
                                    placeholder="Enter Date"
                                    type="text"
                                    containerClass="mb-3"
                                    className="form-control"
                                    // register={register}
                                    key="DueDate"
                                    // errors={errors}
                                    // control={control}
                                />
                            </Col>
                        </Row>

                        <div className="text-start">
                            <Button variant="success" type="submit">
                                Save
                            </Button>
                            <Button variant="danger" className="ms-1" onClick={toggleCreateProjectModal}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Projects;
