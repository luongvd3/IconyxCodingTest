import { Button, Select, SelectItem, DateRangePicker, DateRangePickerValue } from "@tremor/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TopBar( {sortOrder, status, dateRange, setIsModalOpen}
     : {sortOrder: string, status: string, dateRange: string, setIsModalOpen: (value: boolean) => void}) {
    const router = useRouter();
    
    function handleOrderChange(value: string) {
        const order = value === "1" ? "asc" : "desc";
        router.push(`/table/1/${order}/${status}/${dateRange}`);;
    }

    function handleStatusFilter(value: string) {
        const status = value === "2" ? "complete" :  value === "3" ? "incomplete" : "all";
        router.push(`/table/1/${sortOrder}/${status}/${dateRange}`);
    }
    function handleDateFilter(value: DateRangePickerValue) {
        if (value.from && value.to) {            
            const dateRange = value.from && value.to ? `${value.from.toISOString()}%20${value.to .toISOString()}` : "";
            router.push(`/table/1/${sortOrder}/${status}/${dateRange}`);
        } else if (!value.from && !value.to) {
            router.push(`/table/1/${sortOrder}/${status}/`);
        }
    }
    return (   
        <div className="flex items-center justify-between gap-1 pb-3">
            <Select className="w-48" defaultValue={sortOrder === "asc" ? "1" : "2"} onValueChange={handleOrderChange}>
                <SelectItem value="1">Ascending Order</SelectItem>
                <SelectItem value="2">Descending Order</SelectItem>
            </Select>
            <Select className="w-48" defaultValue={status === "all" ? "1" : status === "complete" ? "2" : "3"} onValueChange={handleStatusFilter}>
                <SelectItem value="1">All Todos</SelectItem>
                <SelectItem value="2">Complete</SelectItem>
                <SelectItem value="3">Incomplete</SelectItem>
            </Select>
            <DateRangePicker 
                className="mx-auto max-w-md" 
                selectPlaceholder="Filter"
                onValueChange={handleDateFilter}
                defaultValue={dateRange && dateRange != "undefined" ? {from: new Date(dateRange.split("%20")[0].split("T")[0]), to: new Date(dateRange.split("%20")[1].split("T")[0])} : undefined}
            >    

            </DateRangePicker>

            <div className="flex gap-3">
                <Link href={`/add`} className=""><Button>Add</Button></Link>                
                <Button className="mx-auto block" type="button" onClick={() => setIsModalOpen(true)}>Delete</Button>
            </div>
        </div>
    );
}