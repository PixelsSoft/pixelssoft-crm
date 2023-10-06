import { useEffect, useState } from 'react';

// actions
// import { changePageTitle } from '../redux/actions';
import { setPageTitle } from '../redux/Slices/PageTitle'

// hooks
import { useRedux } from '.';

export default function usePageTitle(value: {
    title: string;
    breadCrumbItems: {
        label: string;
        path: string;
        active?: boolean;
    }[];
}) {
    const { dispatch } = useRedux();

    const [pageTitle] = useState(value);

    useEffect(() => {
        // set page title
        dispatch(setPageTitle(pageTitle));
    }, [
        dispatch,
        pageTitle]);
}
