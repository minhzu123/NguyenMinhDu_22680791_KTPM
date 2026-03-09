import os


if __name__ == "__main__":
    env = os.getenv("APP_ENV", "development")
    print(f"APP_ENV = {env}")
