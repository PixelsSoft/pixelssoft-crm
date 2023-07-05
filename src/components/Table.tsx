import { useRef, useEffect, forwardRef, useState } from 'react';
import {
    useTable,
    useSortBy,
    usePagination,
    useRowSelect,
    useGlobalFilter,
    useAsyncDebounce,
    useExpanded,
} from 'react-table';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

// components
import Pagination from './Pagination';
import { Button, Dropdown, Form } from 'react-bootstrap';

type GlobalFilterProps = {
    preGlobalFilteredRows: any;
    globalFilter: any;
    setGlobalFilter: any;
    searchBoxClass: any;
};

// Define a default UI for filtering
const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter, searchBoxClass }: GlobalFilterProps) => {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = useState<any>(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <div className={classNames(searchBoxClass)}>
            <span className="d-flex align-items-center">
                Search :{' '}
                <input
                    type="search"
                    value={value || ''}
                    onChange={(e: any) => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    placeholder={`${count} records...`}
                    className="form-control w-auto ms-1"
                />
            </span>
        </div>
    );
};

type IndeterminateCheckboxProps = {
    indeterminate: any;
    children?: React.ReactNode;
};

const IndeterminateCheckbox = forwardRef<HTMLInputElement, IndeterminateCheckboxProps>(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = useRef();
        const resolvedRef: any = ref || defaultRef;

        useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);

        return (
            <>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" ref={resolvedRef} {...rest} />
                    <label htmlFor="form-check-input" className="form-check-label"></label>
                </div>
            </>
        );
    }
);

type TableProps = {
    isSearchable?: boolean;
    isSortable?: boolean;
    pagination?: boolean;
    isSelectable?: boolean;
    isExpandable?: boolean;
    hasActions?: boolean;
    hasRecordPayment?: boolean;
    hasLink?: boolean;
    toggler?: () => void;
    sizePerPageList?: {
        text: string;
        value: number;
    }[];
    columns: {
        Header: string;
        accessor: string;
        sort?: boolean;
        Cell?: any;
        className?: string;
    }[];
    data: any[];
    pageSize?: number;
    searchBoxClass?: string;
    tableClass?: string;
    theadClass?: string;
    onDelete?: (id: string) => void;
    disabledUserSelect?: boolean;
    hasComments?: boolean;
    commentOnChange?: () => void;
    hasStatus?: boolean;
    statusOnChange?: () => void;
    onEdit?: (id: string) => void;
};

const Table = (props: TableProps) => {
    const isSearchable = props['isSearchable'] || false;
    const isSortable = props['isSortable'] || false;
    const pagination = props['pagination'] || false;
    const isSelectable = props['isSelectable'] || false;
    const isExpandable = props['isExpandable'] || false;
    const sizePerPageList = props['sizePerPageList'] || [];
    const hasActions = props['hasActions'] || false;
    const hasLink = props['hasLink'] || false;
    const hasRecordPayment = props['hasRecordPayment'] || false;
    const toggler = props['toggler'] || undefined;
    const onDelete = props['onDelete'] || undefined;
    const disableUserSelect = props['disabledUserSelect'] || false;
    const hasStatus = props['hasStatus'] || false;
    const statusOnChange = props['statusOnChange'];
    const onEdit = props['onEdit'];

    let otherProps: any = {};

    if (isSearchable) {
        otherProps['useGlobalFilter'] = useGlobalFilter;
    }
    if (isSortable) {
        otherProps['useSortBy'] = useSortBy;
    }
    if (isExpandable) {
        otherProps['useExpanded'] = useExpanded;
    }
    if (pagination) {
        otherProps['usePagination'] = usePagination;
    }
    if (isSelectable) {
        otherProps['useRowSelect'] = useRowSelect;
    }

    const dataTable = useTable(
        {
            columns: props['columns'],
            data: props['data'],
            initialState: { pageSize: props['pageSize'] || 10 },
        },
        otherProps.hasOwnProperty('useGlobalFilter') && otherProps['useGlobalFilter'],
        otherProps.hasOwnProperty('useSortBy') && otherProps['useSortBy'],
        otherProps.hasOwnProperty('useExpanded') && otherProps['useExpanded'],
        otherProps.hasOwnProperty('usePagination') && otherProps['usePagination'],
        otherProps.hasOwnProperty('useRowSelect') && otherProps['useRowSelect'],
        (hooks) => {
            isSelectable &&
                hooks.visibleColumns.push((columns: any) => [
                    // Let's make a column for selection
                    {
                        id: 'selection',
                        // The header can use the table's getToggleAllRowsSelectedProps method
                        // to render a checkbox
                        Header: ({ getToggleAllPageRowsSelectedProps }: any) => (
                            <div>
                                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                            </div>
                        ),
                        // The cell can use the individual row's getToggleRowSelectedProps method
                        // to the render a checkbox
                        Cell: ({ row }: any) => (
                            <div>
                                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                            </div>
                        ),
                    },
                    ...columns,
                ]);

            isExpandable &&
                hooks.visibleColumns.push((columns: any) => [
                    // Let's make a column for selection
                    {
                        // Build our expander column
                        id: 'expander', // Make sure it has an ID
                        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }: any) => (
                            <span {...getToggleAllRowsExpandedProps()}>{isAllRowsExpanded ? '-' : '+'}</span>
                        ),
                        Cell: ({ row }) =>
                            // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
                            // to build the toggle for expanding a row
                            row.canExpand ? (
                                <span
                                    {...row.getToggleRowExpandedProps({
                                        style: {
                                            // We can even use the row.depth property
                                            // and paddingLeft to indicate the depth
                                            // of the row
                                            paddingLeft: `${row.depth * 2}rem`,
                                        },
                                    })}>
                                    {row.isExpanded ? '-' : '+'}
                                </span>
                            ) : null,
                    },
                    ...columns,
                ]);
        }
    );

    let rows = pagination ? dataTable.page : dataTable.rows;
    const location = useLocation();

    return (
        <>
            {isSearchable && (
                <GlobalFilter
                    preGlobalFilteredRows={dataTable.preGlobalFilteredRows}
                    globalFilter={dataTable.state.globalFilter}
                    setGlobalFilter={dataTable.setGlobalFilter}
                    searchBoxClass={props['searchBoxClass']}
                />
            )}

            <div className="table-responsive">
                <table
                    style={{ userSelect: disableUserSelect ? 'none' : 'auto' }}
                    {...dataTable.getTableProps()}
                    className={classNames('table table-centered react-table', props['tableClass'])}>
                    <thead className={props['theadClass']}>
                        {(dataTable.headerGroups || []).map((headerGroup: any) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {(headerGroup.headers || []).map((column: any) => (
                                    <th
                                        {...column.getHeaderProps(column.sort && column.getSortByToggleProps())}
                                        className={classNames({
                                            sorting_desc: column.isSortedDesc === true,
                                            sorting_asc: column.isSortedDesc === false,
                                            sortable: column.sort === true,
                                        })}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                                {hasStatus && <th>Status</th>}
                                {hasActions && <th>Actions</th>}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...dataTable.getTableBodyProps()}>
                        {(rows || []).map((row: any, i: number) => {
                            dataTable.prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {(row.cells || []).map((cell: any) => {
                                        return hasLink ? (
                                            <td
                                                {...cell.getCellProps([
                                                    {
                                                        className: cell.column.className,
                                                    },
                                                ])}>
                                                <Link
                                                    to={`${location.pathname}/${row.values._id}`}
                                                    className="text-secondary">
                                                    {cell.render('Cell')}
                                                </Link>
                                            </td>
                                        ) : (
                                            <td
                                                {...cell.getCellProps([
                                                    {
                                                        className: cell.column.className,
                                                    },
                                                ])}>
                                                {cell.render('Cell')}
                                            </td>
                                        );
                                    })}
                                    {hasStatus && (
                                        <td>
                                            <Form.Select defaultValue="Status" onChange={statusOnChange}>
                                                <option value={undefined}>Responded</option>
                                                <option value={undefined}>Not Responsed</option>
                                            </Form.Select>
                                        </td>
                                    )}

                                    {hasActions && (
                                        <td>
                                            {hasRecordPayment && (
                                                <Button
                                                    type="button"
                                                    className="waves-effect waves-light"
                                                    style={{ marginRight: 8 }}
                                                    onClick={toggler}
                                                    variant="outline-primary">
                                                    Record
                                                </Button>
                                            )}
                                            {/* <i
                                                className="fe-trash-2 text-danger"
                                                onClick={(e) => (onDelete ? onDelete(row.values._id) : null)}
                                            /> */}
                                            <Dropdown className="float-end" align="end">
                                                <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
                                                    <i className="mdi mdi-dots-vertical"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item
                                                        onClick={() => (onEdit ? onEdit(row.values._id) : null)}>
                                                        Edit
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        onClick={(e) => (onDelete ? onDelete(row.values._id) : null)}>
                                                        Delete
                                                    </Dropdown.Item>
                                                    {/* <Dropdown.Item>Something Else</Dropdown.Item>
                                                    <Dropdown.Item>Separated link</Dropdown.Item> */}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {pagination && <Pagination tableProps={dataTable} sizePerPageList={sizePerPageList} />}
        </>
    );
};

export default Table;
