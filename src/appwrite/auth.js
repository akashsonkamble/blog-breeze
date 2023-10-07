import conf from "../conf/conf";
import { Client, Account, ID} from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            if (userAccount) {
                return this.login({email, password});
            }else {
                return userAccount;
            }
        } catch (error) {
            if(error.code === 400) {
                const errorMessage = "Password must be at least 8 characters long.";
                throw new Error(errorMessage);
            }
            
            if (error.code === 409) {
                const errorMessage = "Email already exists.";
                throw new Error(errorMessage);
            }
            console.log("Appwrite service :: createAccount :: error", error);
            throw error;
            
        }
        
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            if (error.code === 400) {
                const errorMessage = "Invalid email or password.";
                throw new Error(errorMessage);
            }
            console.log("Appwrite service :: login :: error", error);
            throw error;
            
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            if (error.code === 401) {
                return null;
            }
            console.log("Appwrite service :: getCurrentUser :: error", error);
            throw error;
        }
    }

    async  logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService;
