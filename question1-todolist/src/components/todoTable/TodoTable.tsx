'use client'
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Button, Dialog, DialogPanel } from "@tremor/react";
import Link from "next/link";
import cn from "classnames";
import { formatValue } from "@/utils/formatters";
import { useRef, useState } from "react";
import TopBar from "./TopBar";
import deleteTodoAction from "@/actions/deleteTodosAction";

export default function TodoTable({ data, pageNum, pageCount, sortOrder, status, dateRange }: {
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
    status: string,
    dateRange: string
}) {
    const hasNext = pageNum < pageCount;
    const hasPrev = pageNum > 1;
    const cellStyle = 'p-2 truncate';
    const headStyle = 'p-2';
    const textStyle = '!text-wrap line-clamp-3';
    const [isModalOpen, setIsModalOpen] = useState(false);

    // submit from inside the modal does not work
    // workaround is to use ref to get the form
    const form = useRef<HTMLFormElement>(null);

    return (
        <form ref={form}>
            <h3 className="py-3 text-xl font-semibold">To do list</h3>
            <TopBar sortOrder={sortOrder} status={status} dateRange={dateRange} setIsModalOpen={setIsModalOpen} />
            <DeletePermissionModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} form={form.current}/>
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
                                <input type="checkbox" name="checkbox" value={todo.id.toString()} onChange={() => {return}} />
                            </TableCell>
                            <TableCell className={cn(cellStyle, " max-w-10 hover:underline")}>
                                <Link href={`/edit/${todo.id}`} className={cn(textStyle, "font-semibold text-gray-800")}>{todo.title}</Link>
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
            <div className="absolute flex gap-3 justify-end bottom-36 right-0 items-center">
                <div className="font-semibold text-sm">Page {pageNum}/{pageCount}</div>
                <Link href={`/table/${pageNum - 1}/${sortOrder}/${status}/${dateRange ? dateRange : ""}`}><Button disabled={!hasPrev}>Back</Button></Link>
                <Link href={`/table/${pageNum + 1}/${sortOrder}/${status}/${dateRange ? dateRange : ""}`}><Button disabled={!hasNext}>Next</Button></Link>
            </div>
        </form>
    )
}
function DeletePermissionModal(
    { isOpen: isOpenModakOpen, setIsOpen: setIsModalOpen, form }:
        { isOpen: boolean, setIsOpen: (val: boolean) => void , form: HTMLFormElement | null}) {
        
    function handleSubmit(form : HTMLFormElement) {
        const formData = new FormData(form);
        const ids = formData.getAll('checkbox');
        if (ids.length > 0) {
            const idArray = ids.map((id) => Number(id));
            deleteTodoAction(idArray);
        }
    }
    return (
        <Dialog open={isOpenModakOpen} onClose={(val) => setIsModalOpen(val)} static={true}>
            <DialogPanel>
                <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">Delete</h3>
                <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                    Do you want to delete all selected items?
                </p>
                <div className="flex justify-end gap-3">
                    <Button className="mt-8" type="submit" onClick={() => {
                        handleSubmit(form!);
                        setIsModalOpen(false);
                    } }>
                        Delete
                    </Button>
                    <Button className="mt-8" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>
                </div>
            </DialogPanel>
        </Dialog>
    );
}