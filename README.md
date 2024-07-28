# Recipe Management System

The Recipe Management System is a web application that allows users to create, view, update, and delete recipes. It provides a user-friendly interface for managing recipes and includes features such as pagination, search, and bulk operations.

## Features

- Create new recipes with a title, ingredients, and instructions
- View a list of recipes with pagination
- Edit and update existing recipes
- Delete recipes
- Search recipes by title or ingredients
- Perform bulk creation of recipes

## Technologies Used

- Frontend:

  - Next.js with TypeScript
  - Tailwind CSS for styling
  - React Bootstrap for pagination
  - React Toastify for notifications

- Backend:
  - FastAPI for building the API
  - SQLAlchemy for database ORM
  - Pydantic for data validation and serialization
  - PostgreSQL as the database

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/recipe-management-system.git
```

2. Install the dependencies:

- Frontend:
  ```
  cd frontend
  npm install
  ```
- Backend:
  ```
  cd backend
  pip install -r requirements.txt
  ```

3. Set up the database:

- Create a PostgreSQL database
- Update the database connection URL in `backend/database.py`

4. Start the development servers:

- Frontend:
  ```
  cd frontend
  npm run dev
  ```
- Backend:
  ```
  cd backend
  uvicorn main:app --reload
  ```

5. Open your browser and visit `http://localhost:3000` to access the application.

## API Endpoints

- `GET /recipes`: Retrieve a list of recipes with pagination and search functionality
- `GET /recipes/:id`: Retrieve a single recipe by its ID
- `POST /recipes`: Create a new recipe
- `PUT /recipes/:id`: Update an existing recipe by its ID
- `DELETE /recipes/:id`: Delete a recipe by its ID
- `POST /recipes/bulk`: Create multiple recipes in a single request

## License

This project is licensed under the [MIT License](LICENSE).
