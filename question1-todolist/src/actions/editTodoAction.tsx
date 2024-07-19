'use server'
import { UpdateTodo } from "@/services/databaseOperations"
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
const schema = z.object({
    id: z.number(),
    title: z
        .string({ message: "{\"title\" : \"Title must not be empty\" }" })
        .max(64, { message: "{\"title\" : \"Title must not have more than 64 characters \" }" })
        .min(1, { message: "{\"title\" : \"Title must not be empty \" }" }),
    description: z
        .string({ message: "{\"description\" : \"Description must be a string \" }" })
        .max(255, { message: "{\"description\" : \"Description must not have more than 255 characters \" }" })
        .min(1, { message: "{\"description\" : \"Description must not be empty \" }" }),
    dueDate: z
        .string({ message: "{\"dueDate\" : \"Due date must be a string \" }" })
        .datetime({ message: "{\"dueDate\" : \"Due date must be a valid date \" }"}),
    symbol: z
        .string({ message: "{\"symbol\" : \"Symbol must be a string \" }" })
        .max(10, { message: "{\"symbol\" : \"Symbol must not have more than 10 characters \" }" })
        .min(1, { message: "{\"symbol\" : \"Symbol must not be empty \" }" }),
    price: z
        .number({ message: "{\"price\" : \"Price must be a number \" }" })
        .min(0, { message: "{\"price\" : \"Price must not be negative \" }" }),
    status: z
        .boolean({ message: "{\"status\" : \"Status must be a boolean \" }" }),
  })
export default async function editTodoAction(prevState: any, formData: FormData) {
    const validatedFields = schema.safeParse({
        id: Number(formData.get('id')),
        title: formData.get('title'),
        description: formData.get('description'),
        dueDate: formData.get('dueDate'),
        symbol: formData.get('symbol'),
        price: Number(formData.get('price')),
        status: formData.get('status') === '1' ? true : false,
      })
    if (!validatedFields.success) {
        return {
            message : validatedFields.error.errors[0].message,
        }
    } else {
        const data = validatedFields.data
        await UpdateTodo(data)          
        revalidatePath('/table')
        return {
            message : "{\"status\":\"To-Do edited successfully!\"}"
        }
    }
}


