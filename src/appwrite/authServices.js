import conf from '../conf/conf'
import { Client, Account, ID } from "appwrite";
import Toast from "react-native-toast-message";

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
            Toast.show({
                type: "error",
                text1: "Signup Failed",
                text2: error.message,
                position: "bottom",
            });
        }

    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("appwrite service :: Login :: error", error);
            Toast.show({
                type: "error",
                text1: "Login Failed",
                text2: error.message,
                position: "bottom",
            });
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("appwrite service :: logout :: error", error);
            Toast.show({
                type: "error",
                text1: "Logout Failed",
                text2: error.message,
                position: "bottom",
            });
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
