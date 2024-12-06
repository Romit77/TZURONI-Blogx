# BLOGX

A modern blogging platform powered by AI, built with Next.js 14, Prisma, and Gemini.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: Clerk
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **AI Integration**: Gemini API

## 📦 Installation

1. Clone the repository:

```bash
git https://github.com/Romit77/TZURONI-Blogx.git
cd blogx
```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up the database:**

   Ensure your PostgreSQL database is running and accessible. Update the `DATABASE_URL` in your `.env` file.

4. **Run Prisma migrations:**

   ```bash
   npx prisma migrate dev
   ```

5. **Generate Prisma client:**

   ```bash
   npx prisma generate
   ```

6. **Start the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Architecture Overview

- **Frontend:** Built with Next.js, utilizing server-side rendering and static site generation for optimal performance.
- **Authentication:** Managed by Clerk, providing secure and easy-to-use authentication.
- **Database:** PostgreSQL is used as the database, with Prisma as the ORM for data modeling and migrations.
- **Content Summarization:** Google Generative AI is used to provide content summarization features.
- **Styling:** Tailwind CSS is used for styling, providing a modern and responsive design.

### Key Components

- **`components/`:** Contains reusable UI components such as buttons, dialogs, and forms.
- **`pages/`:** Contains the main pages of the application, including the homepage and posts management.
- **`api/`:** Contains serverless functions for handling API requests, such as creating posts and summarizing content.
- **`prisma/`:** Contains the Prisma schema and migration files.

### Middleware

- **`middleware.ts`:** Handles authentication and authorization using Clerk.

### Configuration

- **`next.config.js`:** Configures Next.js settings, including image domains and other build options.
- **`tailwind.config.js`:** Configures Tailwind CSS settings and custom themes.


## License

This project is licensed under the MIT License.
