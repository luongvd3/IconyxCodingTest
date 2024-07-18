import createTodoAction from "@/actions/createTodoActions"
import { generateRandomString } from "@/utils/formatters";
import { Prisma } from "@prisma/client";

jest.mock('next/cache')
jest.mock(
    './../services/databaseOperations',
    () => ({
        CreateTodo: jest.fn((todo) => {
            return {
                ...todo,
                id: 1,
                price: new Prisma.Decimal(todo.price),
                dueDate: Date.parse(todo.dueDate),
            }
        })

    })
);

test("createTodoAction_correctInput_ReturnCorrectInsertedData", async () => {
    const formData = new FormData();
    formData.append('title', 'Learn how to use Prisma');
    formData.append('description', 'Prisma is a modern database toolkit that makes it easy to work with databases.');
    formData.append('dueDate', '2025-01-01T00:00:00.000Z');
    formData.append('symbol', 'AAPL');
    formData.append('price', '150.0');
    formData.append('complete', '1');
    const state = {
        message: "{}"
    }

    const result = JSON.parse(((await createTodoAction(state, formData)).message));
    expect(result.status).toBeTruthy();
});

test("createTodoAction_IncorrectTitle_TitleLongerThan64Chars_ReturnInvalidTitleMessage", async () => {
    const formData = new FormData();
    formData.append('title', generateRandomString(65));
    formData.append('description', 'Prisma is a modern database toolkit that makes it easy to work with databases.');
    formData.append('dueDate', '2025-01-01T00:00:00.000Z');
    formData.append('symbol', 'AAPL');
    formData.append('price', '150.0');
    formData.append('complete', '1');
    const state = {
        message:"{}"
    }
    const result = JSON.parse(((await createTodoAction(state, formData)).message));
    expect(result.title).toBeTruthy();
});

test("createTodoAction_IncorrectTitle_TitleLIsEmpty_ReturnInvalidTitleMessage", async () => {
    const formData = new FormData();
    formData.append('title', "");
    formData.append('description', 'Prisma is a modern database toolkit that makes it easy to work with databases.');
    formData.append('dueDate', '2025-01-01T00:00:00.000Z');
    formData.append('symbol', 'AAPL');
    formData.append('price', '150.0');
    formData.append('complete', '1');
    const state = {
        message:"{}"
    }
    const result = JSON.parse(((await createTodoAction(state, formData)).message));
    expect(result.title).toBeTruthy();
});


test("createTodoAction_IncorrectDescription_DescriptionIsLongerThan255Chars_ReturnInvalidDescriptionMessage", async () => {
    const formData = new FormData();
    formData.append('title', 'Learn how to use Prisma');
    formData.append('description', generateRandomString(256));
    formData.append('dueDate', '2025-01-01T00:00:00.000Z');
    formData.append('symbol', 'AAPL');
    formData.append('price', '150.0');
    formData.append('complete', '1');
    const state = {
        message:"{}"
    }
    const result = JSON.parse(((await createTodoAction(state, formData)).message));
    expect(result.description).toBeTruthy();
});

test("createTodoAction_IncorrectDescription_DescriptionIsEmpty_ReturnInvalidDescriptionMessage", async () => {
    const formData = new FormData();
    formData.append('title', 'Learn how to use Prisma');
    formData.append('description', "");
    formData.append('dueDate', '2025-01-01T00:00:00.000Z');
    formData.append('symbol', 'AAPL');
    formData.append('price', '150.0');
    formData.append('complete', '1');
    const state = {
        message:"{}"
    }
    const result = JSON.parse(((await createTodoAction(state, formData)).message));
    expect(result.description).toBeTruthy();
});

test("createTodoAction_IncorrectDuedate_WrongFormat_ReturnInvalidDueDateMessage", async () => {
    const formData = new FormData();
    formData.append('title', 'Learn how to use Prisma');
    formData.append('description', "aaaaaaaaaaaaaaaaaaaaaa");
    formData.append('dueDate', '2025-01-01T00:00:0');
    formData.append('symbol', 'AAPL');
    formData.append('price', '150.0');
    formData.append('complete', '1');
    const state = {
        message:"{}"
    }
    const result = JSON.parse(((await createTodoAction(state, formData)).message));
    expect(result.dueDate).toBeTruthy();
});

test("createTodoAction_IncorrectSymbol_SymbolEmpty_ReturnInvalidSymbolMessage", async () => {
    const formData = new FormData();
    formData.append('title', 'Learn how to use Prisma');
    formData.append('description', "zxcvzxcvzxcvzvcxvcx");
    formData.append('dueDate', '2025-01-01T00:00:00.000Z');
    formData.append('symbol', '');
    formData.append('price', '150.0');
    formData.append('complete', '1');
    const state = {
        message:"{}"
    }
    const result = JSON.parse(((await createTodoAction(state, formData)).message));
    expect(result.symbol).toBeTruthy();
});

test("createTodoAction_IncorrectPrice_PriceIsNotNumber_ReturnInvalidNumberMessage", async () => {
    const formData = new FormData();
    formData.append('title', 'Learn how to use Prisma');
    formData.append('description', "zxcvzxcvzxcvzvcxvcx");
    formData.append('dueDate', '2025-01-01T00:00:00.000Z');
    formData.append('symbol', "AAPL");
    formData.append('price', 'asdfasdf');
    formData.append('complete', '1');
    const state = {
        message:"{}"
    }

    const result = JSON.parse(((await createTodoAction(state, formData)).message));
    expect(result.price).toBeTruthy();
});

test("createTodoAction_IncorrectPrice_PriceIsNegative_ReturnInvalidNumberMessage",async () => {
    const formData = new FormData();
    formData.append('title', 'Learn how to use Prisma');
    formData.append('description', "zxcvzxcvzxcvzvcxvcx");
    formData.append('dueDate', '2025-01-01T00:00:00.000Z');
    formData.append('symbol', "AAPL");
    formData.append('price', '-1');
    formData.append('complete', '1');
    const state = {
        message:"{}"
    }
    
    const result = JSON.parse(((await createTodoAction(state, formData)).message));
    expect(result.price).toBeTruthy();
});

test("createTodoAction_IncorrectStatus_PriceIsNegative_ReturnSuccesss", async () => {
    const formData = new FormData();
    formData.append('title', 'Learn how to use Prisma');
    formData.append('description', "zxcvzxcvzxcvzvcxvcx");
    formData.append('dueDate', '2025-01-01T00:00:00.000Z');
    formData.append('symbol', "AAPL");
    formData.append('price', '1');
    formData.append('complete', '1');
    const state = {
        message:"{}"
    }
    
    const result = JSON.parse(((await createTodoAction(state, formData)).message));
    expect(result.status).toBeTruthy();
});