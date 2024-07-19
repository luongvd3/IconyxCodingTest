The project is written in NextJs, Prima and SQLite

Unit tests have been created on Create and Edit/Update operations using Jest. 
Read and Delete Operations are mostly handled by Prisma so no Unit tests were written for these operations.

Running Instruction:

- after cloning the repository, from the local CLI navigate to "question1-todolist"
- run "npm install"
- For development environment:
  - create ".env.development" file in the root directory with the following content:  
      API_KEY="{replaced with a valid twelvedata apikey, one is included with the sent email}"  
      API_URL="https://api.twelvedata.com"   
      NEXT_PUBLIC_FRONTEND_URL="http://localhost:3000" 
  - create ".env" file in the root directory with the following content: 
      DATABASE_URL="file:./dev.db" 
  - from the root directory create "prisma/dev.db" then run "npx prisma db push"
  - run "npx prisma db seed" to refresh the db with new seed data if necessary
  - run "npm run dev" to run the application 
- For production environment:
  - create ".env" file in the root directory with the following content: 
      API_KEY="{replaced with a valid twelvedata apikey, one is included with the sent email}"  
      API_URL="https://api.twelvedata.com"  
      NEXT_PUBLIC_FRONTEND_URL="http://{your-server-ip-address}:3000" 
      DATABASE_URL="file:./dev.db" 
  - from the root directory create "prisma/dev.db" then run "npx prisma db push"
  - run "npx prisma db seed" to refresh the db with new seed data if necessary
  - run "npm run build" then "npm run start" to start the application
- visit NEXT_PUBLIC_FRONTEND_URL to access the app
- the most optimized performance is achieved in production mode
- in development mode, some delays might be experienced if a page is accessed for the first time.
- run "npm run test" to execute unit tests

If there are any questions, please email luongvd3@gmail.com

