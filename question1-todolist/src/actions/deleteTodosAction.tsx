'use server'
import { deleteTodo } from "@/services/databaseOperations"
import { revalidatePath } from 'next/cache'

export default async function deleteTodoAction(ids: number[]) {
    await deleteTodo(ids) 
    revalidatePath('/table')
    return true   
}