'use client'
import { TextInput, Textarea, DatePicker, Select, SelectItem, Button, Icon, DatePickerValue } from "@tremor/react";
import { useFormState, useFormStatus } from 'react-dom';
import { useDebounce } from '@uidotdev/usehooks';
import editTodoAction from "@/actions/editTodoAction";
import { useEffect, useRef, useState } from "react";
import { RiLoader5Line } from "@remixicon/react";
import cn from "classnames";
import Link from "next/link";
const base_url = process.env.NEXT_PUBLIC_FRONTEND_URL;
const initialState = {
  message: '{}',
}
export default function EditTodoForm({todo}: {todo: {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  stockSymbol: string;
  price: number;
  complete: boolean;
}}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any>({
    price: todo.price,
  });
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { pending } = useFormStatus()
  const [state, formAction] = useFormState(editTodoAction, initialState)
  const [datePickerInput, setDatePickerInput] = useState(todo.dueDate.toISOString());
  const isFormFresh = useRef(true);

  const searchStocks = async (searchTerm: string) => {
    setIsSearching(true);
    const data = await fetch(`${base_url}/api/price?symbol=${encodeURIComponent(searchTerm)}`, {
      cache: "no-store"
    }).then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json()
    })
    setIsSearching(false);
    setResults(data);
    return data;
  };

  const handleSymbolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    isFormFresh.current = false;
  };
  const setDate = (value: DatePickerValue) => {
    setDatePickerInput(value ? value.toISOString() : "");
  }

  useEffect(() => {
    if (isFormFresh.current) {
      return;
    }
    searchStocks(debouncedSearchTerm);
  }, [debouncedSearchTerm]);
  const message = JSON.parse(state.message);
  return <form className="flex flex-col gap-5 px-3 py-5" action={formAction}>
    <div className="text-green-600">{message.status}</div>
    <input className="hidden" name="id" value={todo.id} type="text" onChange={() => {return}}/>
    <div>
      <label htmlFor="title" className="block h-8">Title</label>
      <TextInput 
        id="title" 
        name="title" 
        className="max-w-sm" 
        placeholder="Title..." 
        defaultValue={todo.title}
        error={message.title} 
        errorMessage={message.title}
      />
    </div>
    <div>
      <label htmlFor="description" className="block h-8">Description</label>
      <Textarea 
        id="description" 
        name="description" 
        className="max-w-sm" 
        placeholder="Description..." 
        defaultValue={todo.description} 
        error={message.description} 
        errorMessage={message.description}
      />
    </div>
    <div>
      <label htmlFor="dueDate" className="block h-8">Due Date</label>
      <DatePicker className="max-w-sm" onValueChange={setDate} defaultValue={todo.dueDate}/>
      <input className="hidden" name="dueDate" value={datePickerInput} type="text" onChange={() => {return}}/>
    </div>
    <div>
      <div className="flex items-center h-8">
        <label htmlFor="symbol" className="block">Symbol</label>
        <Icon icon={RiLoader5Line} className={cn("animate-spin", isSearching ? "block" : "hidden")} variant="simple" tooltip="simple" size="md" />
      </div>
      <TextInput
        id="symbol"
        name="symbol"
        defaultValue={todo.stockSymbol}
        className="max-w-sm"
        placeholder="Symbol..."
        onChange={handleSymbolChange}
        error={Object.entries(results).length === 0 ? false : results?.price ? false : true}
        errorMessage="Invalid Symbol"
      />
    </div>
    <div>
      <div className="flex items-center h-8">
        <label htmlFor="price" className="block">Price</label>
        <Icon icon={RiLoader5Line} className={cn("animate-spin", isSearching ? "block" : "hidden")} variant="simple" tooltip="simple" size="md" />
      </div>
      <TextInput
        id="price"
        name="price"
        className="max-w-sm"
        placeholder="Price..."
        disabled={false}
        value={results?.price ? results.price : ""}
      />
    </div>
    <div>
      <label htmlFor="Status" className="block h-8">Status</label>
      <Select name="status" className="max-w-sm" defaultValue={todo.complete ? "1" : "2"}>
        <SelectItem value="1">Complete</SelectItem>
        <SelectItem value="2">Incomplete</SelectItem>
      </Select>
    </div>
    <div className="flex justtify-start gap-2">
      <Button className="" disabled={pending || ((results?.price && datePickerInput )? false : true)}>Edit</Button>
      <Link href={`/`}> <Button className="">Cancel</Button></Link>
    </div>
  </form>;
}