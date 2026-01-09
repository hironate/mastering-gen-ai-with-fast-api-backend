FROM python:3.11-slim

WORKDIR /app

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

# Copy dependency files first for better caching
COPY pyproject.toml ./

# Install dependencies using uv sync for local development
RUN uv sync

# Copy application code (volumes will override this in docker-compose for live reload)
COPY . .

# Expose port
EXPOSE 8000

# Run the application with reload enabled for local development
# The --reload flag enables hot-reload on code changes
# Note: docker-compose may override this command
CMD ["uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]