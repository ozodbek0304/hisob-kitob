import React from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type Column = {
    key: string;
    label: any;
    render?: (value: any, row: { [key: string]: any }) => React.ReactNode;
};

type Props = {
    columns: Column[];
    data: { [key: string]: any }[];
    isSuccess: boolean;
}

const DataTable = ({ data, columns, isSuccess }: Props) => {
    return (
        <Table className='border '>
            <TableHeader className='bg-gray-100 '>
                <TableRow>
                    {columns.map((column) => (
                        <TableHead className="text-center  text-gray-500  font-normal border " key={column.key} >{column.label}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {isSuccess && data?.length > 0 && data.map((row, rowIndex) => (
                    <TableRow key={rowIndex} >
                        {columns.map((column) => (
                            <TableCell key={column.key} className={'border  text-gray-500 font-normal max-w-[300px] '}>
                                {column.render
                                    ? column.render(row[column.key], row)
                                    : row[column.key]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default DataTable