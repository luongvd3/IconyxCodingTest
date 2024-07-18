The project is written in NextJs, Prima and SQLite

Unit tests has created on create and edit/update operations using Jest. 
Reading and Deleting Operations are mostly handled by Prisma so no Unit tests were written for these operation.

Running Instruction:

- clone the repository
- run "npm install"
- make sure that prisma/dev.db exist. For convinience, a testing dev.db was push to Github
- create .env.devlopment file in the root directory with the following content:
    API_KEY="{replaced with a valid twelvedata apikey, one is inlcude with the sent email}"
    API_URL="https://api.twelvedata.com"
    NEXT_PUBLIC_FRONTEND_URL="http://localhost:3000"
    DATABASE_URL="file:./dev.db"
- run "npx prisma db seed" to refresh the db with new seed data if necessary
- run "npm run dev" to run the application
- the project can be build and run in production mode with proper envirnment variables for optimized performance
- in development mode some delays might be expericed if a page is accessed for the first time.

If there are any questions, please email luongvd3@gmail.com

