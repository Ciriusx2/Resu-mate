
# Resumate

**Resumate** is an AI-powered platform designed to help students land their dream jobs. It provides tools to generate tailored resumes, mock interview questions, and cover letters based on job descriptions, industry requirements, and personal skills. By using modern technologies like **Next.js**, **Prisma**, **PostgreSQL**, **Gemini**, and **Clerk** for authentication, Resumate offers a seamless and intelligent job application experience.


## How to get started

- clone the repo
- run npm install ( npm install --force ) if facing error
- create a new file .env
- we have given some variables for .env which we have to extract out
- run 'npx prisma migrate dev'
- after everything is done run 'npm run dev' to start the development server



## .env file preview

```
GEMINI_API_KEY = ""
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = ""
CLERK_SECRET_KEY = ""
DATABASE_URL= ""

NODE_ENV = "development"
NEXT_PUBLIC_CLERK_SIGN_IN_URL= "/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL= "/sign-up"

```
