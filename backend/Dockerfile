FROM python:3.11-slim

WORKDIR /app

# Install uv (copy to /bin/ per https://docs.astral.sh/uv/guides/integration/docker/)
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Copy dependency files first for better caching
COPY pyproject.toml ./

# Install dependencies using uv (extract from pyproject.toml and install)
RUN python3 -c "import tomllib; f=open('pyproject.toml','rb'); d=tomllib.load(f); deps=' '.join(d['project']['dependencies']); print(deps)" | xargs uv pip install --system --no-cache

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Run the application
CMD ["uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]