# Mastering Generative AI Application Development

This repository is dedicated to a YouTube video series focused on mastering generative AI application development. The project is built using FastAPI and demonstrates how to create a robust API for interacting with generative AI models.

# Temporary Change

## Features

- FastAPI framework for building APIs
- Integration with OpenAI and AWS services
- CORS support for frontend applications
- Comprehensive logging and error handling
- Unit tests for API endpoints

## Prerequisites

Before you begin, ensure you have the following installed:

- Python 3.9 or higher
- Docker (for containerized deployment)
- Docker Compose (for managing multi-container applications)

## Setup

1. **Clone the repository:**

   ```bash
   git clone git@github.com:hironate/Mastering-Gen-AI-with-FastAPI-Backend.git
   cd Mastering-Gen-AI-with-FastAPI-Backend
   ```

2. **Create a virtual environment (optional but recommended):**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies:**

   You can install the required packages using pip:

   ```bash
   pip install -r requirements.txt
   ```

   Alternatively, you can use Docker to build the application:

   ```bash
   docker-compose build
   ```

4. **Set up environment variables:**

   Create a `.env` file in the root directory of the project and add the following variables:

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/dbname
   SECRET_KEY=your-super-secret-key
   ENVIRONMENT=development
   OPENAI_API_KEY=your-openai-api-key
   AWS_ACCESS_KEY_ID=your-aws-access-key-id
   AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
   AWS_REGION=us-east-1
   ```

5. **Run the application:**

   You can run the application using Docker Compose:

   ```bash
   docker-compose up
   ```

   Or, if you are using a virtual environment, run:

   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

   The API will be available at `http://localhost:8000`.

## Running Tests

To run the tests, you can use pytest. If you have installed the dependencies, simply run:

```bash
pytest
```

If you are using Docker, you can run the tests in the container:

```bash
docker-compose run backend pytest
```

## Contributing

Contributions are welcome! If you have suggestions for improvements or features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
