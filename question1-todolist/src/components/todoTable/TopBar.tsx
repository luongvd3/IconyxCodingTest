import { Button, Select, SelectItem, DateRangePicker, DateRangePickerValue } from "@tremor/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TopBar( {sortOrder, status, dateRange, setIsModalOpen, boxCheckedNum}
     : {sortOrder: string, status: string, dateRange: string, setIsModalOpen: (value: boolean) => void, boxCheckedNum: number}) {
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
        
        console.log(value.from ?  new Date(value.from.getTime() - value.from.getTimezoneOffset()*60000).toISOString() : undefined);
        if (value.from && value.to) {
            const fromDateString = value.from.toISOString();     
            const toDateString = value.to.toISOString();       
            const dateRange = value.from && value.to ? `${fromDateString}%20${toDateString}` : "";
            router.push(`/table/1/${sortOrder}/${status}/${dateRange}`);
        } else if (!value.from && !value.to) {
            router.push(`/table/1/${sortOrder}/${status}/`);
        }
    }
    return (   
        <div className="flex items-center justify-between gap-1 pb-3">
            <Select className="w-56" defaultValue={sortOrder === "asc" ? "1" : "2"} onValueChange={handleOrderChange}>
                <SelectItem value="1">Due Date: Ascending</SelectItem>
                <SelectItem value="2">Due Date: Descending</SelectItem>
            </Select>
            <Select className="w-48" defaultValue={status === "all" ? "1" : status === "complete" ? "2" : "3"} onValueChange={handleStatusFilter}>
                <SelectItem value="1">All To-Dos</SelectItem>
                <SelectItem value="2">Complete</SelectItem>
                <SelectItem value="3">Incomplete</SelectItem>
            </Select>
            <DateRangePicker 
                className="mx-auto max-w-md" 
                selectPlaceholder="Due Date"
                onValueChange={handleDateFilter}
                defaultValue={
                    dateRange && dateRange != "undefined" ? 
                    {
                        from: new Date(dateRange.split(" ")[0]), 
                        to: new Date(dateRange.split(" ")[1])
                    } : undefined
                }
            >    

            </DateRangePicker>

            <div className="flex gap-3">
                <Link href={`/add`} className=""><Button>Add</Button></Link>                
                <Button className="mx-auto block" type="button" onClick={() => setIsModalOpen(true)} disabled={!boxCheckedNum}>Delete</Button>
            </div>
        </div>
    );
}