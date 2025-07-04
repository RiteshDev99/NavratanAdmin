import conf from '../conf/conf'
import {Client, Databases, ID, Query, Storage} from "appwrite";

class DatabaseService{
    client = new Client();
    databases;
    storage;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost ({title, slug, content, featureImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status,
                    userId,
                }
            )

        }catch(error){
            console.log("Appwrite service :: createPost :: error", error);
        }

    }


    async updatePost ( slug,{title, content, featureImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status,
                }
            )

        }catch(error){
            console.log("Appwrite service :: updatePost :: error", error);
        }

    }


    async deletePost ( slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteCollectionId,
                conf.appwriteDataBaseId,
                slug,
            )
            return true
        }catch(error){
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }


    async getPost ( slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteCollectionId,
                conf.appwriteDataBaseId,
                slug,
            )

        }catch(error) {
            console.log("Appwrite service :: get posts  :: error", error);
            return false;
        }
    }


    async  getPots(queries = [Query.equal("status",
        "active")]){
        try{
            return await this.databases.listDocuments(
                conf.appwriteCollectionId,
                conf.appwriteDataBaseId,
                queries
            )

        }catch(error){
            console.log("Appwrite service :: get pots  :: error", error);
            return false;
        }
    }


    // file upload services

    async uploadFile (file){
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        }catch(error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }


    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true
        }catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }


    getFilePreview(fileId) {
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId,
        );
    }


    async downloadFile(fileId) {
        try {
            this.storage.getFileDownload(
                conf.appwriteBucketId,
                fileId,
            )
            return true;
        }catch(error) {
            console.log("Appwrite service :: downloadFile :: error", error);
            return false;
        }
    }


}



const dataBaseService = new DatabaseService();
export default dataBaseService;
