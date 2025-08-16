const conf = {
    appwriteUrl: String(process.env.EXPO_PUBLIC_APPWRITE_URL),
    appwriteProjectId: String(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID),
    appwriteDataBaseId: String(process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID),
    appwritePaymentsCollectionId: String(process.env.EXPO_PUBLIC_APPWRITE_PAYMENTSCOLLECTION_ID),
    appwriteORDERSCollectionId: String(process.env.EXPO_PUBLIC_APPWRITE_ORDERSCOLLECTION_ID),
    appwriteBucketId: String(process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID),
}

export default conf;
