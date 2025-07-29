import conf from '../conf/conf';
import { Client, Databases, ID, Query, Storage } from "appwrite";

class MenuService {
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

    // ✅ Create Menu Item
    async createMenuItem({ name, price, category, image, isFeatured, createdAt, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                ID.unique(), // or use slug logic if needed
                {
                    name,
                    price,
                    category,
                    image,
                    isFeatured,
                    createdAt,
                    userId,
                }
            );
        } catch (error) {
            console.log("Appwrite Service :: createMenuItem :: Error", error);
        }
    }

    // ✅ Update Menu Item
    async updateMenuItem(id, { name, price, category, image, isFeatured }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                id,
                {
                    name,
                    price,
                    category,
                    image,
                    isFeatured,
                }
            );
        } catch (error) {
            console.log("Appwrite Service :: updateMenuItem :: Error", error);
        }
    }

    // ✅ Delete Menu Item
    async deleteMenuItem(id) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                id
            );
            return true;
        } catch (error) {
            console.log("Appwrite Service :: deleteMenuItem :: Error", error);
            return false;
        }
    }

    // ✅ Get Single Menu Item
    async getMenuItem(id) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                id
            );
        } catch (error) {
            console.log("Appwrite Service :: getMenuItem :: Error", error);
            return false;
        }
    }

    // ✅ Get All Menu Items
    async getMenuItems(queries = []) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite Service :: getMenuItems :: Error", error);
            return false;
        }
    }

    // ✅ Upload Image
    async uploadImage(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite Service :: uploadImage :: Error", error);
            return false;
        }
    }

    // ✅ Delete Image
    async deleteImage(fileId) {
        try {
            await this.storage.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.log("Appwrite Service :: deleteImage :: Error", error);
            return false;
        }
    }

    // ✅ Get Image Preview URL
    getImagePreview(fileId) {
        return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
    }

    // ✅ Download Image (if needed)
    async downloadImage(fileId) {
        try {
            return await this.storage.getFileDownload(conf.appwriteBucketId, fileId);
        } catch (error) {
            console.log("Appwrite Service :: downloadImage :: Error", error);
            return false;
        }
    }
}

const menuService = new MenuService();
export default menuService;
