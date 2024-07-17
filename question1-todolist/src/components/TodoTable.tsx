'use client'
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Button, SelectItem, Select } from "@tremor/react";
import Link from "next/link";
import cn from "classnames";
import { formatValue } from "@/utils/formatters";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TodoTable({ data, pageNum, pageCount, sortOrder, filterType, filterCriteria }: {
    data: {
        id: number;
        title: string;
        description: string;
        dueDate: Date;
        stockSymbol: string;
        price: number;
        complete: boolean;
    }[],
    pageNum: number,
    pageCount: number,
    sortOrder: string,
    filterType: string,
    filterCriteria: string
}) {
    const router = useRouter();
    const hasNext = pageNum < pageCount;
    const hasPrev = pageNum > 1;
    const cellStyle = 'p-2 truncate';
    const headStyle = 'p-2';
    const textStyle = '!text-wrap line-clamp-3';
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        console.log(formData.getAll('checkbox'));
    }
    // onchange function required for react
    function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {

    }

    function handleOrderChange(value: string) {
        const order = value === "1" ? "asc" : "desc";
        router.push(`/${pageNum}/${order + (filterType && filterCriteria ? `/${filterType}/${filterCriteria}` : '')}`);
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center">
                <h3 className="py-6 text-xl font-semibold">To do list</h3>
                <Select className="w-48" defaultValue={sortOrder === "asc" ? "1" : "2"} onValueChange={handleOrderChange}>
                    <SelectItem value="1">Ascending Order</SelectItem>
                    <SelectItem value="2">Descending Order</SelectItem>
                </Select>
                <div className="flex gap-3">
                    <Link href={`/`} className=""><Button>Add</Button></Link>
                    <Button type="submit" className="">Delete</Button>
                </div>

            </div>
            <Table className="pb-5">
                <TableHead className='bg-gray-50'>
                    <TableRow>
                        <TableHeaderCell className={cn(headStyle, "max-w-3")}></TableHeaderCell>
                        <TableHeaderCell className={cn(headStyle, "max-w-10")}>Title</TableHeaderCell>
                        <TableHeaderCell className={cn(headStyle, "max-w-20")}>Description</TableHeaderCell>
                        <TableHeaderCell className={cn(headStyle, "max-w-10 text-right")}>Due Date</TableHeaderCell>
                        <TableHeaderCell className={cn(headStyle, "max-w-10 text-right")}>Symbol</TableHeaderCell>
                        <TableHeaderCell className={cn(headStyle, "max-w-10 text-right")}>Price</TableHeaderCell>
                        <TableHeaderCell className={cn(headStyle, "max-w-10 text-right")}>Status</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((todo) => (
                        <TableRow key={todo.id} className='font-medium h-20 even:bg-blue-50'>
                            <TableCell className={cn(cellStyle, " max-w-3 text-center hover:underline")}>
                                <input type="checkbox" name="checkbox" value={todo.id.toString()} onChange={handleCheckboxChange} />
                            </TableCell>
                            <TableCell className={cn(cellStyle, " max-w-10 hover:underline")}>
                                <Link href={`/`} className={cn(textStyle, "font-semibold text-gray-800")}>{todo.title}</Link>
                            </TableCell>
                            <TableCell className={cn(cellStyle, "max-w-20")}>
                                <span className={cn(textStyle)}>{todo.description}</span>
                            </TableCell>
                            <TableCell className={cn(cellStyle, "max-w-10 text-right")}>
                                {todo.dueDate.toLocaleDateString()}
                            </TableCell>
                            <TableCell className={cn(cellStyle, "max-w-10 text-right",)}>
                                {todo.stockSymbol}
                            </TableCell>
                            <TableCell className={cn(cellStyle, "max-w-10 text-right")}>
                                {formatValue(todo.price)}
                            </TableCell>
                            <TableCell className={cn(cellStyle, "max-w-10 text-right")}>
                                {todo.complete ? 'Complete' : 'Incomplete'}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="absolute flex gap-3 justify-end bottom-40 right-0">
                <Link href={`/${pageNum-1}`} className={hasPrev ? "block" : "hidden"}><Button>Back</Button></Link>
                <Link href={`/${pageNum+1}`} className={hasNext ? "block" : "hidden"}><Button>Next</Button></Link>
            </div>
        </form>
    )
}