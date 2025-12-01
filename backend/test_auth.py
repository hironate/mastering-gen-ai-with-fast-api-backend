#!/usr/bin/env python3
"""Test the authentication endpoints."""

import requests
import json

BASE_URL = "http://localhost:8000/api/v1"

def test_signup():
    """Test user signup."""
    payload = {
        "email": "test@example.com",
        "password": "testpassword123",
        "full_name": "Test User"
    }

    try:
        response = requests.post(f"{BASE_URL}/auth/signup", json=payload)
        print(f"Signup Status Code: {response.status_code}")
        print(f"Signup Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Signup Error: {e}")
        return False

def test_login():
    """Test user login."""
    payload = {
        "email": "test@example.com",
        "password": "testpassword123"
    }

    try:
        response = requests.post(f"{BASE_URL}/auth/login", json=payload)
        print(f"Login Status Code: {response.status_code}")
        if response.status_code == 200:
            print(f"Login Response: {response.json()}")
        else:
            print(f"Login Error Response: {response.text}")
        return response.status_code == 200
    except Exception as e:
        print(f"Login Error: {e}")
        return False

if __name__ == "__main__":
    print("Testing authentication endpoints...")
    signup_success = test_signup()
    if signup_success:
        login_success = test_login()
        if login_success:
            print("✅ All tests passed!")
        else:
            print("❌ Login failed")
    else:
        print("❌ Signup failed")
