import TodoTable from '@/components/TodoTable';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function Page({params}:{params:{criteria: string[]}}) {
  const pageNum = params.criteria[0] ? Number(params.criteria[0]) : 1
  const sortOrder = params.criteria[1] === 'asc' ? 'asc' : 'desc'
  const filterType = params.criteria[2]
  const filterCriteria = params.criteria[3]
  const take = 7
  const skip = (pageNum - 1) * take
  const count = await prisma.todo.count()
  const pageCount = Math.ceil(count / take)

  if (pageNum > pageCount || pageNum < 1) {
    notFound()
  }

  const rawData = await prisma.todo.findMany({
    orderBy: {
      dueDate: sortOrder,
    },
    skip,
    take,
  })
  // Convert price from Decimal to number so data can be passed to the client
  let data:any = []
  for (const todo of rawData) {
    data.push({
      ...todo,
      price : Number(todo.price),
    })
  }
  return (
    <section className='px-3 xl:grid xl:grid-cols-sidebar-content-miniCharts 2xl:grid-cols-lgSidebar-content-charts'>
      <section className='overflow-auto xl:row-span-2 xl:overflow-visible bg-white'>
      </section>

      <main className='h-[56rem] bg-white relative'>
        <TodoTable 
          data={data} 
          pageCount={pageCount} 
          pageNum={pageNum} 
          sortOrder={sortOrder} 
          filterType={filterType} 
          filterCriteria={filterCriteria}
        />
      </main>

      <section className='w-full px-3 py-5 xl:h-full 2xl:px-8 bg-white'>

      </section>
    </section>
  );
}
