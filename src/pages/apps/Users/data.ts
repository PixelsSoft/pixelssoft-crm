// types
import { Record } from './types';

const records: Record[] = [
    {
        id: 1,
        age: 25,
        name: 'Saad',
        company: 'Pixels Soft',
        phone: '+92 345 4818579',
        designation: 'MERN Developer',
        role: 'Developer',
        password: 'pass123',
        time: new Date().toDateString(),
    },
    {
        id: 2,
        age: 23,
        name: 'Huzaifa',
        company: 'Pixels Soft',
        phone: '+1 (813) 583-2089',
        role: 'Developer',
        password: 'pass123',
        designation: 'Wordpress Developer',
        time: new Date().toDateString(),
    },
    {
        id: 3,
        age: 23,
        name: 'Usama',
        company: 'Pixels Soft',
        phone: '+1 (813) 583-2089',
        role: 'HR',
        password: 'pass123',
        designation: 'Human Resources',
        time: new Date().toDateString(),
    },
    {
        id: 4,
        age: 23,
        name: 'Taimoor',
        company: 'Pixels Soft',
        phone: '+1 (813) 583-2089',
        role: 'Director',
        password: 'pass123',
        designation: '-',
        time: new Date().toDateString(),
    },
];

export { records };
