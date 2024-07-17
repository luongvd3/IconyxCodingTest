import AddTodoForm from "@/components/AddTodoForm";


export default async function AddPage() {

  return (
      <main className='pt-3 min-h-[56rem] bg-white'>
        <h3 className="px-3 pb-4 text-xl font-semibold border-b-2 border-gray-300">Add To Do</h3>
        <AddTodoForm />
      </main>
  );
}

