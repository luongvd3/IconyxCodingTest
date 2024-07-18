The project is written in NextJs, Prima and SQLite

Unit tests has created on create and edit/update operations using Jest. 
Reading and Deleting Operations are mostly handled by Prisma so no Unit tests were written for these operations.

Running Instruction:

- after clone the repository, from the local CLI navigate to "question-todolist"
- run "npm install"
- make sure that "prisma/dev.db" exist. For convinience, a testing "dev.db" was push to Github
- create ".env.devlopment" file in the root directory with the following content:  
    API_KEY="{replaced with a valid twelvedata apikey, one is include with the sent email}"  
    API_URL="https://api.twelvedata.com"  
    NEXT_PUBLIC_FRONTEND_URL="http://localhost:3000"  
    DATABASE_URL="file:./dev.db  
- run "npx prisma db seed" to refresh the db with new seed data if necessary
- run "npm run dev" to run the application
- to run in production mode create .env in the root directory with the above variable but change NEXT_PUBLIC_FRONTEND_URL  
  to serverIp:3000 then run "npm run build" then "npm run start"
- visit NEXT_PUBLIC_FRONTEND_URL to access the app
- the most optimized performance is achieved in production mode
- in development mode some delays might be expericed if a page is accessed for the first time.
- run "npm run test" to execute unit tests

If there are any questions, please email luongvd3@gmail.com

