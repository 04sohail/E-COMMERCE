import { User } from "../types/types"

export class UserServices {
    URL = "http://localhost:3000/users"
    async PostUsers(user: User): Promise<Response | null> {
        try {
            const user_exist = await this.GetSingleUser(`?email=${user.email}`)
            if (user_exist.length > 0) {
                return null
            }
            const api_response: Response = await fetch(this.URL, {
                method: "POST",
                body: JSON.stringify(user)
            })
            if (api_response.ok) {
                const response = await api_response.json()
                return response
            } else {
                return null
            }
        }
        catch (err) {
            console.log(err);
            return null
        }
    }
    async GetSingleUser(endpoint: string): Promise<User[] | []> {
        try {
            const api_response = await fetch(`${this.URL}${encodeURIComponent(endpoint)}`)
            if (api_response.ok) {
                const response = await api_response.json()
                return response
            } else {
                return []
            }
        }
        catch (err) {
            console.log(err);
            return []
        }
    }
    async loginUserCheck(email: string, password: string): Promise<User[] | []> {
        try {
            const api_response = await fetch(`${this.URL}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`)
            if (api_response.ok) {
                const response = await api_response.json()
                return response
            } else {
                return []
            }
        }
        catch (err) {
            console.log(err);
            return []
        }
    }
}