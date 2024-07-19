import AddTodoForm from "@/components/AddTodoForm";


export default async function AddPage() {

  return (
      <main className='min-h-[56rem] bg-white pt-3'>
        <h3 className="border-b-2 border-gray-300 px-3 pb-4 text-xl font-semibold">Add To-Do</h3>
        <AddTodoForm />
      </main>
  );
}

