# BlogX

BlogX is a modern blogging platform built with Next.js, Clerk for authentication, Prisma for database management, and Google Generative AI for content summarization. This platform aims to provide a seamless blogging experience with advanced features.

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Deployment Process](#deployment-process)
- [Architecture Overview](#architecture-overview)
- [Testing](#testing) {{ edit_1 }}
- [Troubleshooting](#troubleshooting) {{ edit_2 }}

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- PostgreSQL database

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```
DATABASE_URL="your_postgresql_database_url"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
GEMINI_API_KEY="your_gemini_api_key"
```

{{ edit_3 }}

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/blogx.git
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

## Deployment Process

1. **Build the application:**

   ```bash
   npm run build
   # or
   yarn build
   ```

2. **Start the production server:**

   ```bash
   npm start
   # or
   yarn start
   ```

3. **Deploy to Vercel:**

   - Connect your GitHub repository to Vercel.
   - Set up environment variables in the Vercel dashboard.
   - Deploy the application directly from Vercel.

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

## Testing {{ edit_1 }}

To run tests, use the following command:

```bash
npm test
# or
yarn test
```

## Troubleshooting {{ edit_2 }}

If you encounter issues, consider the following steps:

- Ensure all environment variables are correctly set.
- Check the database connection and ensure it is running.
- Review the logs for any error messages.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
