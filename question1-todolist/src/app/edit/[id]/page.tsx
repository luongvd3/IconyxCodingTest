import EditTodoForm from "@/components/EditTodoForm";
import {GetSingleTodo} from "@/services/databaseOperations";


export default async function EditPage({params} : {params: {id: string}}) {
  const rawTodo = await GetSingleTodo(Number(params.id));
  const todo = {
    ...rawTodo!,
    price : Number(rawTodo!.price)
  }
  return (
      <main className='pt-3 min-h-[56rem] bg-white'>
        <h3 className="px-3 pb-4 text-xl font-semibold border-b-2 border-gray-300">Add To Do</h3>
        <EditTodoForm todo={todo} />
      </main>
  );
}

