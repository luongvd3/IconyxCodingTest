import { CountTodos, GetTodoData } from '@/services/databaseOperations';
import TodoTable from '@/components/todoTable/TodoTable';
import { notFound } from 'next/navigation';

export default async function Page({params}:{params:{criteria: string[]}}) {
  const pageNum = params.criteria[0] ? Number(params.criteria[0]) : 1
  const sortOrder = params.criteria[1] === 'asc' ? 'asc' : 'desc'
  const status = params.criteria[2] === 'complete' ? 'complete' : params.criteria[2] === 'incomplete' ? 'incomplete' : 'all'
  const dateRange = params.criteria[3]
  const fromDate = dateRange && dateRange != "undefined" ? new Date(dateRange.split('%20')[0].split("T")[0]) : undefined
  const toDate = dateRange && dateRange != "undefined" ? new Date(dateRange.split('%20')[1].split("T")[0]) : undefined
  const take = 7
  const skip = (pageNum - 1) * take
  const count = await CountTodos(status, fromDate, toDate)
  let pageCount = Math.ceil(count / take)

  //handle invalid page number
  if (pageCount !== 0 && (pageNum > pageCount || pageNum < 1)) {
    notFound()
  } else if (pageCount === 0) {
    pageCount = 1
  }

  const rawData = await GetTodoData(sortOrder, status, fromDate, toDate, skip, take)

  // Convert price from Decimal to number so data can be passed to the client
  let data:any = []
  for (const todo of rawData) {
    data.push({
      ...todo,
      price : Number(todo.price),
    })
  }
  return (
      <main className='h-[56rem] bg-white relative'>
        <TodoTable 
          data={data} 
          pageCount={pageCount} 
          pageNum={pageNum} 
          sortOrder={sortOrder} 
          status={status} 
          dateRange={dateRange}
        />
      </main>
  );
}



