# Mastering Generative AI Application Development - Backend

A comprehensive FastAPI-based backend application for building generative AI applications with support for multiple LLM providers (OpenAI, AWS Bedrock), authentication, database management, and Docker deployment.

## Features

- **FastAPI Framework**: Modern, high-performance web framework for building APIs
- **Multi-LLM Provider Support**: Integration with OpenAI and AWS Bedrock services
- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Database Management**: PostgreSQL with SQLAlchemy ORM and Alembic migrations
- **CORS Support**: Configurable CORS for frontend applications
- **Comprehensive Logging**: Structured logging with Loguru
- **Error Handling**: Custom exception handlers for better error management
- **Docker Support**: Full containerization with Docker and Docker Compose
- **Testing**: Unit tests with pytest and pytest-asyncio
- **Code Quality**: Flake8 and isort for code style enforcement

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Python 3.10 or higher** - Required for running the application
- **Docker** (version 20.10 or higher) - For containerized deployment
- **Docker Compose** (version 2.0 or higher) - For managing multi-container applications
- **PostgreSQL** (version 12 or higher) - Database server (if running locally without Docker)
- **Git** - For cloning the repository

### Optional Prerequisites

- **uv** - Fast Python package installer (used in Docker setup)
- **Postman or similar** - For API testing
- **VS Code or PyCharm** - Recommended IDE for development

## Installation

### 1. Clone the Repository

```bash
git clone git@github.com:hironate/Mastering-Gen-AI-with-FastAPI-Backend.git
cd Mastering-Gen-AI-with-FastAPI-Backend/backend
```

### 2. Create Virtual Environment

```bash
# Create virtual environment
python -m venv .venv

# Activate virtual environment
# On Linux/macOS:
source .venv/bin/activate
# On Windows:
.venv\Scripts\activate
```

### 3. Install Dependencies

The project uses `uv` for fast dependency management. Install dependencies using one of the following methods:

**Using uv (recommended):**
```bash
uv sync
```

**Using pip:**
```bash
pip install -r requirements.txt
```

**Note:** If `requirements.txt` doesn't exist, dependencies are managed through `pyproject.toml`. Use `uv` or install directly from `pyproject.toml`.

### 4. Set Up Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env  # If .env.example exists
# Or create manually
touch .env
```

Add the following environment variables (see [Environment Variables](#environment-variables) section for details):

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET_KEY=your-super-secret-key-here
ENVIRONMENT=development
OPENAI_API_KEY=your-openai-api-key
OPENAI_ORGANIZATION=your-openai-org-id
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=your-s3-bucket-name
AWS_ENDPOINT_URL=
BACKEND_CORS_ORIGINS=["http://localhost:3000"]
```

### 5. Set Up Database

**If using local PostgreSQL:**

```bash
# Create database
createdb dbname

# Run migrations
alembic upgrade head
```

**If using Docker (see Docker Support section):**

The database will be set up automatically when using Docker Compose.

### 6. Run the Application

**Local Development:**
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

**Using uv:**
```bash
uv run uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at `http://localhost:8000`.

- API Documentation (Swagger UI): `http://localhost:8000/docs`
- Alternative API Documentation (ReDoc): `http://localhost:8000/redoc`

## Docker Support

### Development with Docker

For development, use Docker Compose which provides hot-reload functionality:

```bash
# Build and start containers
docker-compose up --build

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop containers
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

The application will automatically:
- Install dependencies using `uv sync`
- Start the FastAPI server with hot-reload enabled
- Mount your local code for live updates
- Expose the API on port 8000

### Production Deployment

For production deployment, build and run the Docker image:

```bash
# Build the image
docker build -t mastering-gen-ai-backend:latest .

# Run the container
docker run -d \
  --name mastering-gen-ai-backend \
  -p 8000:8000 \
  --env-file .env \
  mastering-gen-ai-backend:latest
```

**Production Considerations:**
- Use environment variables or secrets management (AWS Secrets Manager, HashiCorp Vault)
- Set `ENVIRONMENT=production` in your `.env` file
- Use a reverse proxy (nginx, Traefik) in front of the application
- Enable HTTPS/TLS
- Set up proper logging and monitoring
- Use a managed database service (AWS RDS, Google Cloud SQL)

### Local Development with Docker

You can also use Docker for local development while keeping your code editor on the host:

```bash
# Start services
docker-compose up -d

# Run migrations
docker-compose exec backend alembic upgrade head

# Run tests
docker-compose exec backend pytest

# Access container shell
docker-compose exec backend bash

# View logs
docker-compose logs -f backend
```

## Project Structure

```
backend/
├── app/                          # Main application package
│   ├── api/                      # API routes and endpoints
│   │   └── v1/
│   │       ├── endpoints/        # API endpoint handlers
│   │       │   ├── auth.py       # Authentication endpoints
│   │       │   ├── chat.py       # Chat/LLM endpoints
│   │       │   └── health_check.py
│   │       └── routes.py         # Route registration
│   ├── config/                   # Configuration
│   │   └── settings.py           # Application settings
│   ├── core/                     # Core functionality
│   │   ├── exceptions/           # Custom exceptions
│   │   ├── exceptions_handler.py # Exception handlers
│   │   └── logging.py            # Logging configuration
│   ├── db/                       # Database configuration
│   │   └── session.py            # Database session management
│   ├── middlewares/              # Custom middlewares
│   │   ├── auth_middleware.py    # Authentication middleware
│   │   └── base_decoraters.py    # Base decorators
│   ├── schemas/                  # Pydantic schemas
│   │   ├── auth_schema.py        # Authentication schemas
│   │   └── chat_schema.py        # Chat schemas
│   ├── services/                 # Business logic
│   │   ├── external/             # External service integrations
│   │   ├── internal/             # Internal services
│   │   │   └── auth_service.py   # Authentication service
│   │   ├── llm/                  # LLM provider services
│   │   │   ├── base.py           # Base LLM interface
│   │   │   ├── factory.py        # LLM factory
│   │   │   └── providers/        # LLM providers
│   │   │       ├── bedrock_provider.py
│   │   │       └── openai_provider.py
│   │   ├── prompts/              # Prompt templates
│   │   │   ├── assistant.py
│   │   │   └── chat.py
│   │   └── repositories/         # Data access layer
│   │       └── user_repository.py
│   ├── utils/                    # Utility functions
│   │   ├── auth.py               # Authentication utilities
│   │   ├── enum.py               # Enumerations
│   │   ├── file_handler.py       # File handling utilities
│   │   ├── helpers.py            # Helper functions
│   │   └── response_handler.py   # Response formatting
│   └── main.py                   # Application entry point
├── database/                      # Database migrations
│   ├── config/
│   │   └── alembic.ini           # Alembic configuration
│   ├── migration/                # Migration scripts
│   │   ├── env.py                # Alembic environment
│   │   └── versions/             # Migration versions
│   └── models/                   # SQLAlchemy models
│       └── user.py               # User model
├── tests/                         # Test suite
│   ├── api/                      # API tests
│   │   └── v1/
│   │       └── endpoints/
│   ├── conftest.py               # Pytest configuration
│   └── __init__.py
├── logs/                          # Application logs
├── docker-compose.yml            # Docker Compose configuration
├── Dockerfile                     # Docker image definition
├── pyproject.toml                 # Project dependencies and metadata
├── setup.cfg                      # Code style configuration
└── README.md                      # This file
```

## Component Architecture

### API Layer (`app/api/`)
- **Endpoints**: Handle HTTP requests and responses
- **Routes**: Register and organize API routes
- **Versioning**: API versioning support (v1)

### Service Layer (`app/services/`)
- **Internal Services**: Business logic (e.g., `auth_service.py`)
- **LLM Services**: Abstracted LLM provider integration
  - **Factory Pattern**: `factory.py` for provider selection
  - **Providers**: OpenAI and AWS Bedrock implementations
- **Repositories**: Data access abstraction layer
- **Prompts**: LLM prompt templates and management

### Core Layer (`app/core/`)
- **Exception Handling**: Custom exceptions and handlers
- **Logging**: Centralized logging configuration
- **Settings**: Application configuration management

### Database Layer
- **Models**: SQLAlchemy ORM models (`database/models/`)
- **Migrations**: Alembic database migrations (`database/migration/`)
- **Session Management**: Database connection pooling

### Middleware Layer (`app/middlewares/`)
- **Authentication Middleware**: JWT token validation
- **Base Decorators**: Reusable decorators for common functionality

### Utilities (`app/utils/`)
- **Authentication**: JWT token generation and validation
- **File Handling**: File upload and processing
- **Response Handling**: Standardized API responses
- **Helpers**: General utility functions

## Available Scripts

### Development Scripts

```bash
# Run the application
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# Run with uv
uv run uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# Run tests
pytest

# Run tests with coverage
pytest --cov=app --cov-report=html

# Run specific test file
pytest tests/api/v1/endpoints/test_health_check.py

# Run tests in Docker
docker-compose exec backend pytest
```

### Database Scripts

```bash
# Create a new migration
alembic revision --autogenerate -m "description of changes"

# Apply migrations
alembic upgrade head

# Rollback one migration
alembic downgrade -1

# Show current revision
alembic current

# Show migration history
alembic history

# Run migrations in Docker
docker-compose exec backend alembic upgrade head
```

### Docker Scripts

```bash
# Build and start services
docker-compose up --build

# Start services in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f backend

# Execute command in container
docker-compose exec backend <command>

# Rebuild without cache
docker-compose build --no-cache
```

### Code Quality Scripts

```bash
# Format code with black (if installed)
black app/

# Sort imports with isort
isort app/

# Lint with flake8
flake8 app/

# Type checking with mypy (if installed)
mypy app/
```

## Contributing

We welcome contributions! Please follow these guidelines:

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write or update tests
5. Ensure all tests pass (`pytest`)
6. Commit your changes (`git commit -m 'Add some amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Pull Request Process

1. Update the README.md with details of changes if applicable
2. Ensure your code follows the project's code style guidelines
3. Add tests for new functionality
4. Ensure all tests pass and there are no linter errors
5. Request review from maintainers

### Reporting Issues

When reporting issues, please include:
- Description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (OS, Python version, etc.)
- Relevant logs or error messages

## Code Style Guidelines

This project follows PEP 8 style guidelines with some modifications:

### Configuration

- **Max line length**: 88 characters (Black default)
- **Import sorting**: Black profile (isort)
- **Linter**: Flake8 with extended ignore for E203

### Style Rules

1. **Imports**: Use absolute imports, sort with isort
   ```python
   from app.config.settings import settings
   from app.core.logging import setup_logging
   ```

2. **Naming Conventions**:
   - Classes: `PascalCase`
   - Functions/Variables: `snake_case`
   - Constants: `UPPER_SNAKE_CASE`
   - Private: Prefix with `_`

3. **Type Hints**: Use type hints for function parameters and return types
   ```python
   def get_user(user_id: int) -> User:
       ...
   ```

4. **Docstrings**: Use Google-style docstrings for classes and functions
   ```python
   def process_data(data: dict) -> dict:
       """Process the input data.
       
       Args:
           data: Input data dictionary
           
       Returns:
           Processed data dictionary
       """
   ```

5. **Formatting**: Use Black for code formatting (88 char line length)

### Running Style Checks

```bash
# Check with flake8
flake8 app/

# Format with black (if installed)
black app/ --check  # Check only
black app/          # Format files

# Sort imports
isort app/ --check  # Check only
isort app/          # Sort imports
```

## Extending the Project

### Adding a New LLM Provider

1. Create a new provider class in `app/services/llm/providers/`:
   ```python
   from app.services.llm.base import BaseLLMProvider
   
   class NewProvider(BaseLLMProvider):
       async def generate(self, prompt: str) -> str:
           # Implementation
   ```

2. Register the provider in `app/services/llm/factory.py`

3. Add configuration in `app/config/settings.py`

### Adding a New API Endpoint

1. Create endpoint handler in `app/api/v1/endpoints/`
2. Define Pydantic schemas in `app/schemas/`
3. Add route in `app/api/v1/routes.py`
4. Write tests in `tests/api/v1/endpoints/`

### Adding a New Database Model

1. Create model in `database/models/`
2. Import in `database/models/__init__.py`
3. Create migration: `alembic revision --autogenerate -m "add new model"`
4. Apply migration: `alembic upgrade head`

### Adding a New Service

1. Create service file in appropriate `app/services/` subdirectory
2. Implement business logic
3. Add tests in `tests/services/`
4. Use dependency injection in endpoints

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **FastAPI** - Modern web framework for building APIs
- **SQLAlchemy** - SQL toolkit and ORM
- **Alembic** - Database migration tool
- **Pydantic** - Data validation using Python type annotations
- **Loguru** - Python logging made simple
- **OpenAI** - GPT models and API
- **AWS Bedrock** - Managed LLM service
- **Docker** - Containerization platform

Special thanks to all contributors and the open-source community.

## Environment Variables

The following environment variables are required for the application to run:

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:password@localhost:5432/dbname` |
| `JWT_SECRET_KEY` | Secret key for JWT token signing | `your-super-secret-key-here` |
| `OPENAI_API_KEY` | OpenAI API key | `sk-...` |
| `OPENAI_ORGANIZATION` | OpenAI organization ID | `org-...` |
| `AWS_SECRET_ACCESS_KEY` | AWS secret access key | `...` |

### Optional Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `ENVIRONMENT` | Application environment | `development` | `production`, `development`, `testing` |
| `API_V1_STR` | API version prefix | `/api/v1` | `/api/v1` |
| `PROJECT_NAME` | Project name | `FastAPI Project` | `My FastAPI App` |
| `BACKEND_CORS_ORIGINS` | Allowed CORS origins | `["http://localhost:3000"]` | `["http://localhost:3000","https://example.com"]` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | JWT token expiration time | `30` | `60` |
| `ACCESS_TOKEN` | Cookie name for access token | `access_token` | `access_token` |
| `AWS_ACCESS_KEY_ID` | AWS access key ID | `your_default_access_key_id` | `AKIA...` |
| `AWS_REGION` | AWS region | `us-east-1` | `us-west-2` |
| `AWS_S3_BUCKET_NAME` | S3 bucket name | `your-s3-bucket-name` | `my-bucket` |
| `AWS_ENDPOINT_URL` | AWS endpoint URL (for local testing) | `` | `http://localhost:4566` |

### Environment File Setup

Create a `.env` file in the `backend` directory:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# JWT
JWT_SECRET_KEY=your-super-secret-key-change-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=30
ACCESS_TOKEN=access_token

# Application
ENVIRONMENT=development
API_V1_STR=/api/v1
PROJECT_NAME=Mastering Gen AI Backend
BACKEND_CORS_ORIGINS=["http://localhost:3000"]

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key
OPENAI_ORGANIZATION=org-your-org-id

# AWS
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=your-s3-bucket-name
AWS_ENDPOINT_URL=
```

### Security Notes

- **Never commit `.env` files** to version control
- Use strong, randomly generated values for `JWT_SECRET_KEY`
- Rotate API keys regularly
- Use environment-specific values for different deployments
- Consider using secrets management services (AWS Secrets Manager, HashiCorp Vault) for production

### Loading Environment Variables

The application uses `pydantic-settings` to load environment variables. Variables are loaded from:
1. System environment variables
2. `.env` file in the project root
3. Default values (if defined in `Settings` class)

Variables are case-sensitive and must match the exact names defined in `app/config/settings.py`.

