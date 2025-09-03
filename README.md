# SIH008
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/Ganesho17/SIH008)

Suraksha Kavach is a comprehensive disaster preparedness and management application designed to enhance safety within an educational institution. The system provides role-based access for students and administrators, featuring real-time alerts, interactive learning modules, disaster drills, and an AI-powered chatbot for instant assistance.

## Features

-   **User Authentication**: Secure sign-up and login for students and administrators using Supabase Auth.
-   **Role-Based Dashboards**:
    -   **Admin Dashboard**: Allows administrators to send out real-time emergency alerts to all users.
    -   **Student Dashboard**: Provides students with access to safety drills, learning materials, and an emergency SOS button.
-   **Real-time Emergency Alerts**: Utilizes Supabase Realtime to instantly push emergency notifications (e.g., "Fire Alert", "Earthquake Warning") to all active users.
-   **Status Reporting**: Users can report their status as "Safe" or "Needs Help" in response to an alert.
-   **Learning Modules**: A dedicated section for educational content on topics like Earthquake Safety, Fire Safety, and First Aid, complete with progress tracking.
-   **Disaster Drills**: Simulated drill scenarios to test and improve user preparedness.
-   **AI Chatbot**: An integrated chatbot powered by the Google Gemini API, providing expert advice on disaster preparedness and safety queries.
-   **SOS Button**: A one-click button for students to signal that they are in distress and need immediate help.

## Tech Stack

-   **Frontend**: HTML, Tailwind CSS, Vanilla JavaScript
-   **Backend**: Node.js, Express.js
-   **Database & Auth**: Supabase
-   **AI**: Google Gemini API

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js and npm installed on your machine.
-   A Supabase account.
-   A Google Gemini API key.

### Installation & Setup

1.  **Clone the Repository**
    ```sh
    git clone https://github.com/ganesho17/sih008.git
    cd sih008
    ```

2.  **Backend Setup**
    -   Install the required Node.js packages:
        ```sh
        npm install express node-fetch cors
        ```
    -   Open `server.js` and replace `"YOUR_GEMINI_API_KEY"` with your actual Google Gemini API key.
        ```javascript
        const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"; // Replace with your actual key
        ```
    -   Start the backend server:
        ```sh
        node server.js
        ```
        The server will be running at `http://localhost:3000`.

3.  **Frontend Setup**
    -   Open `index.html` in your favorite code editor.
    -   Find the Supabase configuration section and replace the placeholder values with your Supabase project URL and Anon Key.
        ```javascript
        // Supabase configuration
        const SUPABASE_URL = 'https://YOUR_SUPABASE_URL.supabase.co';
        const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
        ```

4.  **Supabase Database Setup**
    -   Log in to your Supabase project dashboard.
    -   Go to the **SQL Editor** and run the following queries to create the necessary tables. Make sure to enable Row Level Security (RLS) on the tables and define policies as needed for your application.

    -   **`user_profiles` table**: Stores user role information.
        ```sql
        CREATE TABLE public.user_profiles (
            id uuid NOT NULL PRIMARY KEY REFERENCES auth.users(id),
            student_id TEXT,
            role TEXT
        );
        ```

    -   **`alerts` table**: Stores emergency alerts sent by admins.
        ```sql
        CREATE TABLE public.alerts (
            id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            title TEXT,
            message TEXT,
            created_at timestamptz DEFAULT now()
        );
        ```
        *Note: Ensure you set up RLS policies to allow admins to `INSERT` and all authenticated users to `SELECT`.*

    -   **`user_status` table**: Stores user responses to alerts.
        ```sql
        CREATE TABLE public.user_status (
            user_id uuid NOT NULL PRIMARY KEY,
            status TEXT,
            updated_at timestamptz DEFAULT now()
        );
        ```

5.  **Run the Application**
    -   Open the `index.html` file in your web browser.

## Usage

1.  **Sign Up**: Create a new account. An email address containing 'admin' (e.g., `admin@example.com`) will be assigned the 'admin' role; all others will be 'student'.
2.  **Login**: Log in with your credentials.
3.  **Navigate**: Use the navigation buttons on the left to explore the different sections of the application.
    -   **Students** can take drills, browse learning modules, or use the chatbot.
    -   **Admins** can access user management and send alerts from their dashboard.
4.  **Chatbot**: Navigate to the Chatbot section, type a question related to disaster safety, and receive an AI-generated response.
