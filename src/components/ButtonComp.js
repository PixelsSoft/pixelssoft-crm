import { useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap';
import FormInput from './FormInput';
import { useDispatch, useSelector } from 'react-redux';
import { DeletePlatform, UpdatePlatform } from '../redux/Slices/Platform/platform';
import { DeleteCategory, UpdateCategory } from '../redux/Slices/Category/category';
import { startLoading, stopLoading } from '../redux/Slices/utiltities/Utiltities';

const ButtonComp = ({ id, title, plat }) => {
    const dispatch = useDispatch();
    const [hovered, setHovered] = useState(false);
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState(title);

    const { token } = useSelector(
        (state) => ({
            token: state.Auth.token,
        })
    );

    const updateFunc = async () => {
        if (plat === 1) {
            const data = {
                title: name,
            };
            dispatch(startLoading());
            await dispatch(UpdatePlatform(id, data, token));
            dispatch(stopLoading());
        } else {
            const data = {
                title: name
            };
            dispatch(startLoading());
            await dispatch(UpdateCategory(id, data, token));
            dispatch(stopLoading());
        };
        setEdit(!edit)
    };

    const deleteFunc = async () => {
        if (plat === 1) {
            dispatch(startLoading());
            await dispatch(DeletePlatform(id, token));
            dispatch(stopLoading());
        } else {
            dispatch(startLoading());
            await dispatch(DeleteCategory(id, token));
            dispatch(stopLoading());
        };
    }

    return (
        <ButtonGroup
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ marginRight: 5, marginBottom: 5 }}
        >
            {!edit ? (
                <>
                    <Button
                        variant="secondary"
                        style={{ width: hovered ? '150px' : 'auto', transition: 'width 0.3s ease-in-out' }}
                    >
                        {title}
                    </Button>
                    {hovered && (
                        <ButtonGroup>
                            <Button variant="warning" onClick={() => setEdit(!edit)}>Edit</Button>
                            <Button variant="danger" onClick={() => deleteFunc()}>Delete</Button>
                        </ButtonGroup>
                    )}
                </>
            ) : (
                <>
                    <FormInput
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        name="Name"
                        placeholder="Name"
                        key="desc"
                    />
                    <Button variant="warning" onClick={() => updateFunc()}>Update</Button>
                </>
            )}
        </ButtonGroup>
    )
}

export default ButtonComp;