import { User } from "../types/types";

export class UserServices {
    URL = "http://localhost:3000/users";
    // URL = "http://192.168.127.76:3000/users"

    async PostUsers(user: User): Promise<User | null> {
        try {
            // Check if user already exists
            const user_exist = await this.GetSingleUser(`?email=${user.email}`);
            if (user_exist.length > 0) {
                console.log("User already exists.");
                return null;
            }

            // Make POST request to create a new user
            const api_response: Response = await fetch(this.URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (api_response.ok) {
                const response = await api_response.json();
                return response;
            } else {
                console.error("Failed to create user. Response status:", api_response.status);
                return null;
            }
        } catch (err) {
            console.error("Error in PostUsers:", err);
            return null;
        }
    }

    async GetSingleUser(endpoint: string): Promise<User[] | []> {
        try {
            const api_response = await fetch(`${this.URL}${endpoint}`);
            if (api_response.ok) {
                const response = await api_response.json();
                return response;
            } else {
                console.error("Failed to fetch user. Response status:", api_response.status);
                return [];
            }
        } catch (err) {
            console.error("Error in GetSingleUser:", err);
            return [];
        }
    }

    async loginUserCheck(email: string, password: string): Promise<User[] | []> {
        try {
            const api_response = await fetch(
                `${this.URL}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
            );
            if (api_response.ok) {
                const response = await api_response.json();
                return response;
            } else {
                console.error("Failed to check login. Response status:", api_response.status);
                return [];
            }
        } catch (err) {
            console.error("Error in loginUserCheck:", err);
            return [];
        }
    }
}
