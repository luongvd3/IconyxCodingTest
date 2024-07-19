import EditTodoForm from "@/components/EditTodoForm";
import {GetSingleTodo} from "@/services/databaseOperations";


export default async function EditPage({params} : {params: {id: string}}) {
  const rawTodo = await GetSingleTodo(Number(params.id));
  const todo = {
    ...rawTodo!,
    price : Number(rawTodo!.price)
  }
  return (
      <main className='min-h-[56rem] bg-white pt-3'>
        <h3 className="border-b-2 border-gray-300 px-3 pb-4 text-xl font-semibold">Edit To Do</h3>
        <EditTodoForm todo={todo} />
      </main>
  );
}

