import { prisma } from '@/lib/prisma';

export async function GetTodoData(sortOrder: "asc" | "desc", status: string, fromDate: Date | undefined, toDate: Date | undefined, skip: number, take: number) {
    return await prisma.todo.findMany({
        orderBy: {
            dueDate: sortOrder,
        },
        where: {
            complete: status === 'all' ? undefined : status === 'complete' ? true : false,
            dueDate: {
                gte: fromDate,
                lte: toDate,
            }
        },
        skip,
        take,
    });
}
export async function CountTodos(status: string, fromDate: Date | undefined, toDate: Date | undefined) {
    return await prisma.todo.count(
        {
            where: {
                complete: status === 'all' ? undefined : status === 'complete' ? true : false,
                dueDate: {
                    gte: fromDate,
                    lte: toDate,
                }
            },
        }
    );
}

export async function deleteTodo(ids: number[]) {
    return await prisma.todo.deleteMany({
        where: {
            id: {
                in: ids,
            }
        }
    });
}
export async function GetSingleTodo(id: number) {
    return await prisma.todo.findUnique({
        where: {
            id
        },
    });
}

export async function CreateTodo(data: { symbol: string; title: string; description: string; dueDate: string; price: number; status: boolean }) {
    await prisma.todo.create({
        data: {
            title: data.title,
            description: data.description,
            dueDate: new Date(data.dueDate),
            stockSymbol: data.symbol,
            price: data.price,
            complete: data.status,
        }
    })
}

export async function UpdateTodo(data: {id: number, symbol: string; title: string; description: string; dueDate: string; price: number; status: boolean }) {
    await prisma.todo.update({
        where: {
            id : data.id
          },
        data: {
            title: data.title,
            description: data.description,
            dueDate: new Date(data.dueDate),
            stockSymbol: data.symbol,
            price: data.price,
            complete: data.status,
        }
    })
}