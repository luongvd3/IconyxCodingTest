import { CountTodos, GetTodoData } from '@/services/databaseOperations';
import TodoTable from '@/components/todoTable/TodoTable';
import { redirect } from 'next/navigation'

export default async function Page({params}:{params:{criteria: string[]}}) {
  const pageNum = params.criteria[0] ? Number(params.criteria[0]) : 1
  const sortOrder = params.criteria[1] === 'asc' ? 'asc' : 'desc'
  const status = params.criteria[2] === 'complete' ? 'complete' : params.criteria[2] === 'incomplete' ? 'incomplete' : 'all'
  const dateRange = decodeURIComponent(params.criteria[3])
  const fromDate = dateRange && dateRange != "undefined" ? new Date(dateRange.split(' ')[0]) : undefined
  const toDate = dateRange && dateRange != "undefined" ? new Date(dateRange.split(' ')[1]) : undefined
  const take = 7
  const skip = (pageNum - 1) * take
  const count = await CountTodos(status, fromDate, toDate)
  let pageCount = Math.ceil(count / take)

  if (pageCount === 0) {
    pageCount = 1
  }

  //handle invalid page number
  if (pageNum > pageCount) {
    redirect(`/table/${pageCount}/${sortOrder}/${status}/${dateRange}`)
  }
  if (pageNum < 1) {
    redirect(`/table/1/${sortOrder}/${status}/${dateRange}`)
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
      <main className='relative h-[56rem] bg-white'>
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



