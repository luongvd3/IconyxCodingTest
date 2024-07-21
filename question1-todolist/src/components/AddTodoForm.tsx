'use client'
import { TextInput, Textarea, DatePicker, Select, SelectItem, Button, Icon, DatePickerValue, Callout } from "@tremor/react";
import { useFormState, useFormStatus } from 'react-dom';
import { useDebounce } from '@uidotdev/usehooks';
import createTodoAction from "@/actions/createTodoActions";
import { use, useEffect, useRef, useState } from "react";
import { RiInformationFill, RiLoader5Line } from "@remixicon/react";
import cn from "classnames";
import Link from "next/link";
const base_url = process.env.NEXT_PUBLIC_FRONTEND_URL;
const initialState = {
  message: '{}',
}
export default function AddTodoForm() {
  //States to toggle the loading spinner and display the search results of searching for a stock symbol and price
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [price, setPrice] = useState<any>({});

  //Debounce the search term to prevent too many requests
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  //Form state to show validation messages from the backend  
  const [formState, formAction] = useFormState(createTodoAction, initialState)

  //State to update the hidden input field with the value from the DatePicker component and update UI
  const [datePickerInput, setDatePickerInput] = useState("");

  //Only show error if the form has been touched
  const isFormFresh = useRef(true);

  const searchStocks = async (searchTerm: string, signal: AbortSignal) => {
    setIsSearching(true);
    try {
      const data = await fetch(`${base_url}/api/price?symbol=${encodeURIComponent(searchTerm)}`, {
        signal: signal,
        cache: "no-store"
      }).then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json()
      })
      setIsSearching(false);
      setPrice(data);
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
            return;
        }
      } else {
        setIsSearching(false);
      }
    }
  };

  const handleSymbolChange = (event: React.ChangeEvent<HTMLInputElement>) => {    
    setFormFields((prev) => ({...prev, symbol: event.target.value}))
    setSearchTerm(event.target.value);
    isFormFresh.current = false;
  };

  //Get the value from the DatePicker component and set it to the hidden input field
  const setDate = (value: DatePickerValue) => {
    setDatePickerInput(value ? value.toISOString() : "");
  }

  //Fetch the stock price when the search term changes with a debounce
  //Abort the previous request if a new one is made
  useEffect(() => {
    if (isFormFresh.current) {
      return;
    }
    const controller = new AbortController();
    searchStocks(debouncedSearchTerm, controller.signal);
    return () => {
      controller.abort();
    };
  }, [debouncedSearchTerm]);

  const [formFields, setFormFields] = useState({
    title: "",
    description: "",
    symbol: "",
  });

  const validationMessage = JSON.parse(formState.message);

  useEffect(() => {
    if (validationMessage.status) {
      isFormFresh.current = true;
      setFormFields({
        title: "",
        description: "",
        symbol: "",
      });      
      setSearchTerm("");
      setPrice({});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);
  return <form className="flex flex-col gap-5 px-3 py-5" action={formAction}>
    <Callout title={validationMessage.status + " A new To-Do can be created."} color="teal" className={validationMessage.status ? "block" : "hidden"}>      
    </Callout>
    <div>
      <div className="flex h-8 items-center">
        <label htmlFor="title" className="block">Title</label>
        <Icon icon={RiInformationFill} className={cn()} variant="simple" tooltip="Title must be from 1-64 charaters" size="md" />
      </div>
      <TextInput 
        id="title" 
        name="title" 
        className="max-w-sm" 
        placeholder="Title..." 
        error={validationMessage.title} 
        errorMessage={validationMessage.title}
        value={formFields.title}
        onChange={(e) => setFormFields((prev) => ({...prev, title: e.target.value}))}
      />
    </div>
    <div>
      <div className="flex h-8 items-center">
        <label htmlFor="description" className="block">Description</label>
        <Icon icon={RiInformationFill} className={cn()} variant="simple" tooltip="Description must be from 1-255 charaters" size="md" />
      </div>
      <Textarea 
        id="description" 
        name="description" 
        className="max-w-sm" 
        placeholder="Description..."
        error={validationMessage.description} 
        errorMessage={validationMessage.description}
        value={formFields.description}
        onChange={(e) => setFormFields((prev) => ({...prev, description: e.target.value}))}
      />
    </div>
    <div>
      <label htmlFor="dueDate" className="block h-8">Due Date</label>
      <DatePicker className="max-w-sm" onValueChange={setDate}/>
      {/* hidden input field to store the value of the DatePicker component */}
      <input className="hidden" name="dueDate" value={datePickerInput} type="text" onChange={() => {return}}/>
    </div>
    <div>
      <div className="flex h-8 items-center">
        <label htmlFor="symbol" className="block">Symbol</label>
        <Icon icon={RiInformationFill} className={cn()} variant="simple" tooltip="Symbol must be from 1-10 charaters" size="md" />
        <Icon icon={RiLoader5Line} className={cn("animate-spin", isSearching ? "block" : "hidden")} variant="simple" size="md" />
      </div>
      <TextInput
        id="symbol"
        name="symbol"
        className="max-w-sm"
        placeholder="Symbol..."
        onChange={handleSymbolChange}
        //Only show error if the form has been touched
        error={isFormFresh.current ? false : price?.price ? false : true}
        errorMessage="Invalid Symbol"
        value={formFields.symbol}
      />
    </div>
    <div>
      <div className="flex h-8 items-center">
        <label htmlFor="price" className="block">Price</label>
        <Icon icon={RiLoader5Line} className={cn("animate-spin", isSearching ? "block" : "hidden")} variant="simple" size="md" />
      </div>
      <TextInput
        id="price"
        name="price"
        className="max-w-sm"
        placeholder="Price..."
        readOnly
        value={price?.price ? price.price : ""}
      />
    </div>
    <div>
      <label htmlFor="Status" className="block h-8">Status</label>
      <Select name="status" className="max-w-sm" defaultValue="2">
        <SelectItem value="1">Complete</SelectItem>
        <SelectItem value="2">Incomplete</SelectItem>
      </Select>
    </div>
    <div className="flex gap-2">
      <Submit price={price} datePickerInput={datePickerInput}/>
      <Link href={`/`}> <Button className="">Cancel</Button></Link>
    </div>
  </form>;
}

function Submit({price, datePickerInput}: {price: {price: number}, datePickerInput: string}) {
  const {pending} = useFormStatus();
  return <Button className="" disabled={(!pending && ((price?.price && datePickerInput )) ? false : true)}>Save</Button>
}