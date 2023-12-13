import { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import FormInput from './FormInput';
import { useDispatch, useSelector } from 'react-redux';
import { GetProjectById, UpdateProject } from '../redux/Slices/Project/Project';
import Spinner from './Spinner';
import { startLoading, stopLoading } from '../redux/Slices/utiltities/Utiltities';

const EditPortalProject = ({ projectId, editUserModal, toggleEditModal }) => {

    const { token, project, loading, plat, employee, category } = useSelector(
        (state) => ({
            token: state.Auth.token,
            category: state.Category.category,
            project: state.Projects.proectById,
            loading: state.utiltities.loading,
            plat: state.Platform.platform,
            employee: state.Employees.employees,
        })
    );

    const dispatch = useDispatch();
    const [title, setTitle] = useState(project?.title);
    const [desc, setDesc] = useState(project?.description);
    const [platform, setPlatform] = useState(project?.platform_id)
    const [salePerson, setSalePerson] = useState(project?.category_id);
    const [data, setData] = useState([]);
    const [bidBy, setBidBy] = useState(project?.bidby?.id);
    const [perName, setPerName] = useState(project?.closedby?.id);
    const [total, setTotal] = useState(project?.total_amount);
    const [paidAm, setPaidAm] = useState(project?.platform_id);

    const update = async () => {
        const data = {
            title: title,
            description: desc,
            bid_by: bidBy,
            closed_by: salePerson,
            platform_id: platform,
            category_id: perName,
            paid_amount: paidAm,
            total_amount: total
        };
        dispatch(startLoading());
        await dispatch(UpdateProject(projectId, data, token, toggleEditModal));
        dispatch(stopLoading());
    }

    const selectPlat = (e) => {
        setPlatform(e.target.value);
    };

    const changeCat = (e) => {
        setSalePerson(e.target.value);
    };

    const getProject = async () => {
        // dispatch(startLoading());
        await dispatch(GetProjectById(projectId, token));
        // dispatch(stopLoading());
    };

    const filterSales = () => {
        if (employee.length > 0) {
            const filteredArray = employee.filter((item) => item.roles.some((role) => role.name === "Sales"));
            setData(filteredArray);
        };
    };

    useEffect(() => {
        filterSales();
    }, [employee]);

    useEffect(() => {
        getProject();
    }, []);

    return loading ? (
        <div className='d-flex justify-content-center align-items-center'>
            <Spinner className="m-2" color={'primary'} />
        </div>
    ) : (
        <Modal show={editUserModal} onHide={toggleEditModal} centered>
            <Modal.Header closeButton>
                <Modal.Title as="h4">Edit Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormInput
                    label={'Title'}
                    type="text"
                    name="name"
                    placeholder="Enter title"
                    containerClass={'mb-3'}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />

                <FormInput
                    label={'Description'}
                    type="text"
                    name="position"
                    placeholder="Enter description"
                    containerClass={'mb-3'}
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                />

                <FormInput
                    label="Bid By"
                    name="select"
                    type="select"
                    className="form-select"
                    key="Bid"
                    value={bidBy}
                    onChange={(e) => setBidBy(e.target.value)}
                >
                    <option>no Selected</option>
                    {data?.map(val => {
                        return (
                            <option key={val.id} value={val.id}>{val.name}</option>
                        );
                    })}
                </FormInput>
                <FormInput
                    label="Close By"
                    name="select"
                    type="select"
                    className="form-select"
                    key="Close"
                    value={perName}
                    onChange={(e) => setPerName(e.target.value)}
                >
                    <option>no Selected</option>
                    {data?.map(val => {
                        return (
                            <option key={val.id} value={val.id}>{val.name}</option>
                        );
                    })}
                </FormInput>
                <FormInput
                    label="Platform"
                    name="select"
                    type="select"
                    className="form-select"
                    key="Platform"
                    value={platform}
                    onChange={(e) => selectPlat(e)}
                >
                    <option>no Selected</option>
                    {plat?.map(val => {
                        return (
                            <option key={val.id} value={val.id}>{val.title}</option>
                        );
                    })}
                </FormInput>
                <FormInput
                    label="category"
                    name="select"
                    type="select"
                    className="form-select"
                    key="category"
                    value={salePerson}
                    onChange={(e) => changeCat(e)}
                >
                    <option>no Selected</option>
                    {category?.map(val => {
                        return (
                            <option key={val.id} value={val.id}>{val.title}</option>
                        );
                    })}
                </FormInput>

                <FormInput
                    label={'Paid amount'}
                    type="number"
                    name="salary"
                    placeholder="Enter Paid Amount"
                    containerClass={'mb-3'}
                    value={paidAm}
                    onChange={e => setPaidAm(e.target.value)}
                />

                <FormInput
                    label={'Total amount'}
                    type="number"
                    name="phone"
                    placeholder="Enter Total Amount"
                    containerClass={'mb-3'}
                    value={total}
                    onChange={e => setTotal(e.target.value)}
                />
                <Button variant="dark" className="waves-effect waves-light me-1" type="submit" onClick={update}>
                    Save
                </Button>
                <Button variant="danger" className="waves-effect waves-light" onClick={toggleEditModal}>
                    Cancel
                </Button>
            </Modal.Body>
        </Modal>
    )
}

export default EditPortalProject