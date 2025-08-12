import conf from '@/src/conf/conf'
import {showToast} from "@/src/utils/toastConfig";
import {Account, Client, ID} from "react-native-appwrite";

export class AuthService {
    client = new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return this.login({email, password});
            } else {
                return userAccount
            }
        } catch (error) {
            console.log("appwrite service :: createAccount :: error", error);
            showToast("error", "Signup Failed", error.message);
        }

    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("appwrite service :: Login :: error", error);
            showToast("error", "Login Failed", error.message);
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("appwrite service :: logout :: error", error);
            showToast("error", "Logout Failed", error.message);
        }
    }


    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("appwrite service :: getCurrentUser :: error", error);

        }
    }

}

const authService = new AuthService

export default authService
