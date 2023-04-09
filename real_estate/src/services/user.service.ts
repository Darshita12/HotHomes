interface ApiResponse {
    data: any;
    error?: string;
}
export class UserService {
    async userLogin(email: string, password: string, role: string) {
        try {
            console.log(email, password)
            const response = await fetch("http://localhost:80/user/login", {
                method: 'POST',
                body: JSON.stringify({ email, password, role }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.json();
            // const data = await response.json();
            // console.log(data.token)
        } catch (error: any) {
            return { data: null, error: error.message };
        }
    }
    async userRegister(name: string, email: string, password: string, role: string) {
        try {
            console.log(email, password)
            const response = await fetch("http://localhost:80/user/register", {
                method: 'POST',
                body: JSON.stringify({ name, email, password, role }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
        } catch (error: any) {
            return { data: null, error: error.message };
        }
    }
    async contact(name: string, email: string, subject: string, message: string) {
        try {
            const response = await fetch("http://localhost:80/contact", {
                method: 'POST',
                body: JSON.stringify({ name, email, subject, message }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.json();
            // const data = await response.json();
            // console.log(data.token)
        } catch (error: any) {
            return { data: null, error: error.message };
        }
    }
}
