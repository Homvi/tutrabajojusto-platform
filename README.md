# TuTrabajoJusto - Transparent Job Platform

## Description

**TuTrabajoJusto** is a job platform designed to connect job seekers with **validated companies** offering **transparent salaries** and using **structured profiles** instead of traditional CVs. The main goal of the MVP (Minimum Viable Product) is to launch a functional platform that validates the project's most critical hypotheses, focusing on salary transparency and application process efficiency.

This platform is being built with Laravel (backend), Inertia.js (to connect the backend with the frontend), React.ts (frontend), and shadcn/ui (for UI components).

## Tech Stack

* **Backend:** Laravel
* **Frontend:** React.ts
* **Middleware/Adapter:** Inertia.js
* **UI Components:** shadcn/ui, Tailwind CSS
* **Database:** PostgreSQL
* **Package Manager:** npm
* **Frontend Development Server:** Vite

## Prerequisites

* PHP >= 8.1 (or the version you are using for Laravel)
* Composer
* Node.js >= 18.x (or the version you are using)
* npm
* PostgreSQL server

## Installation and Setup

1.  **Clone the Repository:**
    ```bash
    git clone <REPOSITORY_URL>
    cd tutrabajojusto-platform
    ```

2.  **Install Backend Dependencies (PHP):**
    ```bash
    composer install
    ```

3.  **Install Frontend Dependencies (Node.js):**
    ```bash
    npm install
    # or
    # yarn install
    # or
    # pnpm install
    ```

4.  **Configure the Environment:**
    * Copy the example `.env.example` file to `.env`:
        ```bash
        cp .env.example .env
        ```
    * Generate the Laravel application key:
        ```bash
        php artisan key:generate
        ```
    * Configure your database credentials in the `.env` file:
        ```env
        DB_CONNECTION=pgsql
        DB_HOST=127.0.0.1
        DB_PORT=5432
        DB_DATABASE=tutrabajojusto
        DB_USERNAME=your_postgres_user
        DB_PASSWORD=your_postgres_password
        ```
        (Adjust these values according to your local setup)

5.  **Run Database Migrations:**
    (Ensure your PostgreSQL server is running and the database has been created)
    ```bash
    php artisan migrate
    ```

6.  **(Optional) Seed Test Data (Seeders):**
    If you have seeders to populate the database with initial data:
    ```bash
    php artisan db:seed
    ```

## Running the Project

1.  **Start the Laravel Development Server (Backend):**
    ```bash
    php artisan serve
    ```
    By default, it will run on `http://127.0.0.1:8000`.

2.  **Start the Vite Development Server (Frontend):**
    In a new terminal:
    ```bash
    npm run dev
    # or
    # yarn dev
    # or
    # pnpm dev
    ```
    This will compile the frontend assets and serve them with HMR (Hot Module Replacement).

3.  Open your browser and visit `http://127.0.0.1:8000` (or the URL indicated by `php artisan serve`).

## Key MVP Features

### For Job Seekers:
* **Simplified Registration and Profile:**
    * Easy registration with email/password.
    * Creation of a structured profile with key information (experience, skills, education).
    * **No CV uploads allowed.**
* **Job Search and Application:**
    * View a list of job offers.
    * **Each offer clearly displays the exact salary.**
    * Simple search/filters (keyword, salary range).
    * Apply to offers with the structured profile in one click.

### For Companies:
* **Simplified Registration and Validation:**
    * Easy registration with email/password.
    * **Company Validation:** (Managed internally for the MVP).
* **Simplified Job Offer Publication:**
    * Create job offers with essential fields (title, description, responsibilities, qualifications, etc.).
    * **Mandatory field for the exact MINIMUM salary.**
* **Candidate Viewing:**
    * List of candidates who have applied.
    * View structured candidate profiles.

### Platform:
* **Basic Landing Page:** Clear value proposition.
* **User Authentication:** Secure login/logout.
* **Database:** To store user profiles, company details, job offers, and applications.
* **Minimal Admin Functionality:** Management of company validations, job offers, and users.

## Key Frontend Folder Structure

* `resources/js/Pages/`: Contains Inertia.js page components (React).
* `resources/js/Components/`: Reusable React components (including shadcn UI).
    * `resources/js/Components/ui/`: Specific shadcn/ui components.
* `resources/js/Layouts/`: Layout components for Inertia pages.
* `resources/js/app.tsx`: Main entry point for the React/Inertia application.
* `resources/css/app.css`: Global styles and Tailwind CSS / shadcn/ui configuration.

## Contributions

(Details on how to contribute to the project, if applicable, e.g., code style guides, PR process).

## License

(Specify the project license, e.g., MIT).

---

*This README is based on the initial MVP plan. As the project evolves, this document should be updated.*
