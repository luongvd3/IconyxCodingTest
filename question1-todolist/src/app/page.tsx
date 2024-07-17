
import TodoTable from '@/components/TodoTable';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  const rawData = await prisma.todo.findMany()
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

      <main className='min-h-dvh bg-white'>
        <TodoTable data={data} />
      </main>

      <section className='w-full px-3 py-5 xl:h-full 2xl:px-8 bg-white'>

      </section>
    </section>
  );
}
