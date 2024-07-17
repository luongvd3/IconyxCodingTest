import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //Delete all todos and then seed the database
  await prisma.todo.deleteMany({})
  await prisma.todo.create({
      data: {
          title: 'Learn how to use Prisma',
          description: 'Prisma is a modern database toolkit that makes it easy to work with databases.',
          dueDate: new Date('2025-01-01'),
          stockSymbol: 'AAPL',
          price: 150.0,
          complete: false,
      },   
  })
  await prisma.todo.create({
    data: {
        title: 'Calculate one month  movement of AAPL',
        description: 'Compare the price of AAPL on the first day of the month to the last day of the month.',
        dueDate: new Date('2024-08-01'),
        stockSymbol: 'AAPL',
        price: 160.0,
        complete: false,
    },   
  })
  await prisma.todo.create({
    data: {
        title: 'Calculate one month movement of META',
        description: 'Compare the price of META on the first day of the month to the last day of the month.',
        dueDate: new Date('2024-01-01'),
        stockSymbol: 'META',
        price: 250.0,
        complete: false,
    },   
  })
  await prisma.todo.create({
    data: {
        title: 'Calculate end of day movement of NFLX',
        description: 'See how the price has changed in a day for Netflix',
        dueDate: new Date('2024-06-07'),
        stockSymbol: 'NFLX',
        price: 100.0,
        complete: true,
    },   
  })
  await prisma.todo.create({
    data: {
        title: 'Learn how to use NextJs',
        description: 'Learn how to use NextJs to build a modern web application.',
        dueDate: new Date('2024-07-06'),
        stockSymbol: 'VRCL',
        price: 69.75,
        complete: true,
    },   
  })
  await prisma.todo.create({
    data: {
        title: 'Learn how to use Prisma',
        description: 'Prisma is a modern database toolkit that makes it easy to work with databases.',
        dueDate: new Date('2025-01-01'),
        stockSymbol: 'AAPL',
        price: 150.0,
        complete: false,
    },   
})
await prisma.todo.create({
  data: {
      title: 'Calculate one month  movement of AAPL',
      description: 'Compare the price of AAPL on the first day of the month to the last day of the month. Compare the price of AAPL on the first day of the month to the last day of the month.',
      dueDate: new Date('2024-08-01'),
      stockSymbol: 'AAPL',
      price: 160.0,
      complete: false,
  },   
})
await prisma.todo.create({
  data: {
      title: 'Calculate one month movement of META',
      description: 'Compare the price of META on the first day of the month to the last day of the month.',
      dueDate: new Date('2024-01-01'),
      stockSymbol: 'META',
      price: 250.0,
      complete: false,
  },   
})
await prisma.todo.create({
  data: {
      title: 'Calculate end of day movement of NFLX',
      description: 'See how the price has changed in a day for Netflix',
      dueDate: new Date('2024-06-07'),
      stockSymbol: 'NFLX',
      price: 100.0,
      complete: true,
  },   
})
await prisma.todo.create({
  data: {
      title: 'Learn how to use NextJs',
      description: 'Learn how to use NextJs to build a modern web application.',
      dueDate: new Date('2024-07-06'),
      stockSymbol: 'VRCL',
      price: 69.75,
      complete: true,
  },   
})
await prisma.todo.create({
  data: {
      title: 'Learn how to use Prisma',
      description: 'Prisma is a modern database toolkit that makes it easy to work with databases.',
      dueDate: new Date('2025-01-01'),
      stockSymbol: 'AAPL',
      price: 150.0,
      complete: false,
  },   
})
await prisma.todo.create({
data: {
    title: 'Calculate one month  movement of AAPL',
    description: 'Compare the price of AAPL on the first day of the month to the last day of the month.',
    dueDate: new Date('2024-08-01'),
    stockSymbol: 'AAPL',
    price: 160.0,
    complete: false,
},   
})
await prisma.todo.create({
data: {
    title: 'Calculate one month movement of META',
    description: 'Compare the price of META on the first day of the month to the last day of the month.',
    dueDate: new Date('2024-01-01'),
    stockSymbol: 'META',
    price: 250.0,
    complete: false,
},   
})
await prisma.todo.create({
data: {
    title: 'Calculate end of day movement of NFLX',
    description: 'See how the price has changed in a day for Netflix',
    dueDate: new Date('2024-06-07'),
    stockSymbol: 'NFLX',
    price: 100.0,
    complete: true,
},   
})
await prisma.todo.create({
data: {
    title: 'Learn how to use NextJs',
    description: 'Learn how to use NextJs to build a modern web application.',
    dueDate: new Date('2024-07-06'),
    stockSymbol: 'VRCL',
    price: 69.75,
    complete: true,
},   
})
await prisma.todo.create({
  data: {
      title: 'Learn how to use Prisma',
      description: 'Prisma is a modern database toolkit that makes it easy to work with databases.',
      dueDate: new Date('2025-01-01'),
      stockSymbol: 'AAPL',
      price: 150.0,
      complete: false,
  },   
})
await prisma.todo.create({
data: {
    title: 'Calculate one month  movement of AAPL',
    description: 'Compare the price of AAPL on the first day of the month to the last day of the month.',
    dueDate: new Date('2024-08-01'),
    stockSymbol: 'AAPL',
    price: 160.0,
    complete: false,
},   
})
await prisma.todo.create({
data: {
    title: 'Calculate one month movement of META',
    description: 'Compare the price of META on the first day of the month to the last day of the month.',
    dueDate: new Date('2024-01-01'),
    stockSymbol: 'META',
    price: 250.0,
    complete: false,
},   
})
await prisma.todo.create({
data: {
    title: 'Calculate end of day movement of NFLX',
    description: 'See how the price has changed in a day for Netflix',
    dueDate: new Date('2024-06-07'),
    stockSymbol: 'NFLX',
    price: 100.0,
    complete: true,
},   
})
await prisma.todo.create({
data: {
    title: 'Learn how to use NextJs',
    description: 'Learn how to use NextJs to build a modern web application.',
    dueDate: new Date('2024-07-06'),
    stockSymbol: 'VRCL',
    price: 69.75,
    complete: true,
},   
})

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })