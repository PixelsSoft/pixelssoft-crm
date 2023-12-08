import { useState } from 'react'
import { Button, Card, Col, Row, Modal, Tab, Nav } from 'react-bootstrap'
import PageTitle from '../../../components/PageTitle'
import { useDispatch, useSelector } from 'react-redux';
import { FormInput } from '../../../components';
import { AddnewCategory } from '../../../redux/Slices/Category/category';
import { CreateNewPlatform } from '../../../redux/Slices/Platform/platform';
import ButtonComp from '../../../components/ButtonComp';

export default function Management() {
    const dispatch = useDispatch();
    const [responsiveModal, setResponsiveModal] = useState(false);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [openPlatform, setOpenPlatform] = useState(false);
    const [platTitle, setPlatTitle] = useState('');
    const [platDesc, setPlatDesc] = useState('');

    const { category, token, platform } = useSelector(
        (state) => ({
            token: state.Auth.token,
            category: state.Category.category,
            platform: state.Platform.platform
        })
    );

    const toggleResponsiveModal = () => {
        setResponsiveModal(!responsiveModal);
    };

    const togglePlatformModal = () => {
        setOpenPlatform(!openPlatform);
    };

    const addCategory = () => {
        const data = {
            title: title,
            description: desc
        };

        dispatch(AddnewCategory(data, token));
        toggleResponsiveModal();
    };

    const addPlatform = () => {
        const data = {
            title: platTitle,
            description: platDesc
        };

        dispatch(CreateNewPlatform(data, token));
        togglePlatformModal();
    };

    const tabContents = [
        {
            id: 1,
            title: "Category",
            icon: "mdi mdi-home-variant",
            function: toggleResponsiveModal,
            plat: 0,
            titles: category,
        },
        {
            id: 2,
            title: "Platform",
            icon: "mdi mdi-account-circle",
            function: togglePlatformModal,
            plat: 1,
            titles: platform,
        },
    ];

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Manage", path: "/apps/administartor/Management" },
                ]}
                title={"Manage"}
            />
            <Card>
                <Card.Body>
                    <Tab.Container defaultActiveKey="Profile">
                        <Nav as="ul" variant="pills" justify className="navtab-bg" style={{ maxWidth: 300 }}>
                            {(tabContents || []).map((tab, index) => {
                                return (
                                    <Nav.Item as="li" key={index}>
                                        <Nav.Link
                                            className="cursor-pointer"
                                            href="#"
                                            eventKey={tab.title}
                                        >
                                            {tab.title}
                                        </Nav.Link>
                                    </Nav.Item>
                                );
                            })}
                        </Nav>

                        <Tab.Content>
                            {(tabContents || []).map((tab, index) => {
                                return (
                                    <Tab.Pane
                                        eventKey={tab.title}
                                        id={String(tab.id)}
                                        key={index}
                                    >
                                        <Row>
                                            <Col >
                                                <Button className="btn btn-danger mb-2" onClick={tab.function}>Add</Button>
                                            </Col>
                                        </Row>
                                        {tab?.titles?.map(val => {
                                            return (
                                                <ButtonComp key={val.id} id={val.id} title={val.title} plat={tab.plat} />
                                            );
                                        })}
                                    </Tab.Pane>
                                );
                            })}
                        </Tab.Content>
                    </Tab.Container>
                </Card.Body>
            </Card>
            {/* <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col lg={6}>
                                    <Row>
                                        <Col>
                                            <h3>Categories</h3>
                                        </Col>
                                        <Col>
                                            <Button className="btn btn-danger mb-2" onClick={toggleResponsiveModal}>Add</Button>
                                        </Col>
                                    </Row>
                                    {category.map(val => {
                                        return (
                                            <li key={val.id}>{val.title}</li>
                                        );
                                    })}
                                </Col>
                                <Col lg={6}>
                                    <Row>
                                        <Col>
                                            <h3>Platforms</h3>
                                        </Col>
                                        <Col>
                                            <Button className="btn btn-danger mb-2" onClick={togglePlatformModal}>Add</Button>
                                        </Col>
                                    </Row>
                                    {platform.map(val => {
                                        return (
                                            <li key={val.id}>{val.title}</li>
                                        );
                                    })}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row> */}
            <Modal show={responsiveModal} onHide={toggleResponsiveModal}>
                <Modal.Header closeButton>
                    <h4 className="modal-title">Add Category</h4>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <FormInput
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        label="Name"
                        type="text"
                        name="Name"
                        placeholder="Title"
                        containerClass={'mb-3'}
                        key="title"
                    />
                    <FormInput
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        label="Name"
                        type="text"
                        name="Name"
                        placeholder="Description"
                        containerClass={'mb-3'}
                        key="desc"
                    />
                </Modal.Body>

                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-secondary waves-effect"
                        onClick={toggleResponsiveModal}
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        className="btn btn-info waves-effect waves-light"
                        onClick={addCategory}
                    >
                        Update
                    </button>
                </Modal.Footer>
            </Modal>
            <Modal show={openPlatform} onHide={togglePlatformModal}>
                <Modal.Header closeButton>
                    <h4 className="modal-title">Add Platform</h4>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <FormInput
                        value={platTitle}
                        onChange={(e) => setPlatTitle(e.target.value)}
                        label="Name"
                        type="text"
                        name="Name"
                        placeholder="Title"
                        containerClass={'mb-3'}
                        key="title"
                    />
                    <FormInput
                        value={platDesc}
                        onChange={(e) => setPlatDesc(e.target.value)}
                        label="Name"
                        type="text"
                        name="Name"
                        placeholder="Description"
                        containerClass={'mb-3'}
                        key="desc"
                    />
                </Modal.Body>

                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-secondary waves-effect"
                        onClick={togglePlatformModal}
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        className="btn btn-info waves-effect waves-light"
                        onClick={addPlatform}
                    >
                        Update
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
