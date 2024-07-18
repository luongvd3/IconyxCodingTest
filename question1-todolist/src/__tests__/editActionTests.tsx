import updateTodoAction from "@/actions/editTodoAction"
import { UpdateTodo } from "@/services/databaseOperations";
import { generateRandomString } from "@/utils/formatters";
import { Prisma } from "@prisma/client";

jest.mock('next/cache')
jest.mock(
    './../services/databaseOperations',
    () => ({
        UpdateTodo: jest.fn((todo) => {
            //Case missing id
            if(todo.id == "2"){
                throw new Error()
            }
            return {
                ...todo,
                price: new Prisma.Decimal(todo.price),
                dueDate: Date.parse(todo.dueDate),
            }
        })

    })
);
test("updateTodoAction_WrongId_ThrowError", async () => {
    const formData = new FormData();
    formData.append('id', '2');
    formData.append('title', 'Learn how to use Prisma');
    formData.append('description', 'Prisma is a modern database toolkit that makes it easy to work with databases.');
    formData.append('dueDate', '2025-01-01T00:00:00.000Z');
    formData.append('symbol', 'AAPL');
    formData.append('price', '150.0');
    formData.append('complete', '1');
    const state = {
        message: "{}"
    }

    expect(updateTodoAction(state, formData)).rejects.toThrow();
});

test("updateTodoAction_correctInput_ReturnCorrectInsertedData", async () => {
    const formData = new FormData();
    formData.append('id', '1');
    formData.append('title', 'Learn how to use Prisma');
    formData.append('description', 'Prisma is a modern database toolkit that makes it easy to work with databases.');
    formData.append('dueDate', '2025-01-01T00:00:00.000Z');
    formData.append('symbol', 'AAPL');
    formData.append('price', '150.0');
    formData.append('complete', '1');
    const state = {
        message: "{}"
    }

    const result = JSON.parse(((await updateTodoAction(state, formData)).message));
    expect(result.status).toBeTruthy();
});

test("updateTodoAction_IncorrectTitle_TitleLongerThan64Chars_ReturnInvalidTitleMessage", async () => {
    const formData = new FormData();
    formData.append('id', '1');
    formData.append('title', generateRandomString(65));
    formData.append('description', 'Prisma is a modern database toolkit that makes it easy to work with databases.');
    formData.append('dueDate', '2025-01-01T00:00:00.000Z');
    formData.append('symbol', 'AAPL');
    formData.append('price', '150.0');
    formData.append('complete', '1');
    const state = {
        message:"{}"
    }
    const result = JSON.parse(((await updateTodoAction(state, formData)).message));
    expect(result.title).toBeTruthy();
});

test("updateTodoAction_IncorrectTitle_TitleLIsEmpty_ReturnInvalidTitleMessage", async () => {
    const formData = new FormData();
    formData.append('id', '1');
    formData.append('title', "");
    formData.append('description', 'Prisma is a modern database toolkit that makes it easy to work with databases.');
    formData.append('dueDate', '2025-01-01T00:00:00.000Z');
    formData.append('symbol', 'AAPL');
    formData.append('price', '150.0');
    formData.append('complete', '1');
    const state = {
        message:"{}"
    }
    const result = JSON.parse(((await updateTodoAction(state, formData)).message));
    expect(result.title).toBeTruthy();
});


test("updateTodoAction_IncorrectDescription_DescriptionIsLongerThan255Chars_ReturnInvalidDescriptionMessage", async () => {
    const formData = new FormData();
    formData.append('id', '1');
    formData.append('title', 'Learn how to use Prisma');
    formData.append('description', generateRandomString(256));
    formData.append('dueDate', '2025-01-01T00:00:00.000Z');
    formData.append('symbol', 'AAPL');
    formData.append('price', '150.0');
    formData.append('complete', '1');
    const state = {
        message:"{}"
    }
    const result = JSON.parse(((await updateTodoAction(state, formData)).message));
    expect(result.description).toBeTruthy();
});

test("updateTodoAction_IncorrectDescription_DescriptionIsEmpty_ReturnInvalidDescriptionMessage", async () => {
    const formData = new FormData();
    formData.append('id', '1');
    formData.append('title', 'Learn how to use Prisma');
    formData.append('description', "");
    formData.append('dueDate', '2025-01-01T00:00:00.000Z');
    formData.append('symbol', 'AAPL');
    formData.append('price', '150.0');
    formData.append('complete', '1');
    const state = {
        message:"{}"
    }
    const result = JSON.parse(((await updateTodoAction(state, formData)).message));
    expect(result.description).toBeTruthy();
});

test("updateTodoAction_IncorrectDuedate_WrongFormat_ReturnInvalidDueDateMessage", async () => {
    const formData = new FormData();
    formData.append('id', '1');
    formData.append('title', 'Learn how to use Prisma');
    formData.append('description', "aaaaaaaaaaaaaaaaaaaaaa");
    formData.append('dueDate', '2025-01-01T00:00:0');
    formData.append('symbol', 'AAPL');
    formData.append('price', '150.0');
    formData.append('complete', '1');
    const state = {
        message:"{}"
    }
    const result = JSON.parse(((await updateTodoAction(state, formData)).message));
    expect(result.dueDate).toBeTruthy();
});

test("updateTodoAction_IncorrectSymbol_SymbolEmpty_ReturnInvalidSymbolMessage", async () => {
    const formData = new FormData();
    formData.append('id', '1');
    formData.append('title', 'Learn how to use Prisma');
    formData.append('description', "zxcvzxcvzxcvzvcxvcx");
    formData.append('dueDate', '2025-01-01T00:00:00.000Z');
    formData.append('symbol', '');
    formData.append('price', '150.0');
    formData.append('complete', '1');
    const state = {
        message:"{}"
    }
    const result = JSON.parse(((await updateTodoAction(state, formData)).message));
    expect(result.symbol).toBeTruthy();
});

test("updateTodoAction_IncorrectPrice_PriceIsNotNumber_ReturnInvalidNumberMessage", async () => {
    const formData = new FormData();
    formData.append('id', '1');
    formData.append('title', 'Learn how to use Prisma');
    formData.append('description', "zxcvzxcvzxcvzvcxvcx");
    formData.append('dueDate', '2025-01-01T00:00:00.000Z');
    formData.append('symbol', "AAPL");
    formData.append('price', 'asdfasdf');
    formData.append('complete', '1');
    const state = {
        message:"{}"
    }

    const result = JSON.parse(((await updateTodoAction(state, formData)).message));
    expect(result.price).toBeTruthy();
});

test("updateTodoAction_IncorrectPrice_PriceIsNegative_ReturnInvalidNumberMessage",async () => {
    const formData = new FormData();
    formData.append('id', '1');
    formData.append('title', 'Learn how to use Prisma');
    formData.append('description', "zxcvzxcvzxcvzvcxvcx");
    formData.append('dueDate', '2025-01-01T00:00:00.000Z');
    formData.append('symbol', "AAPL");
    formData.append('price', '-1');
    formData.append('complete', '1');
    const state = {
        message:"{}"
    }
    
    const result = JSON.parse(((await updateTodoAction(state, formData)).message));
    expect(result.price).toBeTruthy();
});

test("updateTodoAction_IncorrectStatus_PriceIsNegative_ReturnSuccesss", async () => {
    const formData = new FormData();
    formData.append('id', '1');
    formData.append('title', 'Learn how to use Prisma');
    formData.append('description', "zxcvzxcvzxcvzvcxvcx");
    formData.append('dueDate', '2025-01-01T00:00:00.000Z');
    formData.append('symbol', "AAPL");
    formData.append('price', '1');
    formData.append('complete', '1');
    const state = {
        message:"{}"
    }
    
    const result = JSON.parse(((await updateTodoAction(state, formData)).message));
    expect(result.status).toBeTruthy();
});