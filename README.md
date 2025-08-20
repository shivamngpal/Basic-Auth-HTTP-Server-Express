# Basic Authentication HTTP Server with Node.js & Express

> This project is a simple yet functional HTTP server built with **Node.js** and **Express**. It demonstrates a fundamental user authentication flow, including user registration, login, and token-based access to protected routes.

---

## 🚀 Key Features

* **User Registration:** A `/signup` endpoint to create new users.
* **User Login:** A `/signin` endpoint to authenticate existing users.
* **Token-Based Authentication:** Generates a simple, random string token upon successful login.
* **Protected Route:** A `/me` route that requires a valid token in the `Authorization` header to access.
* **In-Memory Storage:** Uses a simple JavaScript array to store user data (no database needed).

---

## ⚙️ How It Works

The authentication logic is straightforward:

1.  A user signs up by sending their `email` and `password` to the `/signup` endpoint.
2.  The server stores these credentials in an in-memory `users` array.
3.  The user then signs in by sending the same credentials to the `/signin` endpoint.
4.  If the credentials are correct, the server generates a unique token, attaches it to the user's record, and sends it back to the client.
5.  To access a protected endpoint like `/me`, the client must include this token in the `Authorization` header of their request.
6.  The server validates the token to verify the user's identity before granting access.

---

## Endpoints API

| Method | Endpoint   | Description                                                                                                    |
| :----- | :--------- | :------------------------------------------------------------------------------------------------------------- |
| `POST` | `/signup`  | Registers a new user.                                                                                          |
| `POST` | `/signin`  | Logs in an existing user and returns a token.                                                                  |
| `GET`  | `/me`      | A protected route that returns a welcome message if the user provides a valid token in the `Authorization` header. |

---

## 🛠️ How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd <your-repo-name>
    ```

3.  **Install dependencies:**
    ```bash
    npm install express
    ```

4.  **Start the server:**
    ```bash
    node index.js
    ```
    The server will be running on `http://localhost:3000`.

---

## 🚨 Important Disclaimer

> This project is intended for **educational purposes only** and is **not suitable for production environments**. It has several security shortcomings:
>
> * **Insecure Password Storage:** Passwords are stored in plaintext. In a real application, you must always hash and salt passwords.
> * **In-Memory Database:** All user data is lost every time the server restarts.
> * **Basic Token Generation:** The token is just a random string. For real-world applications, use a secure standard like **JWT (JSON Web Tokens)**.
