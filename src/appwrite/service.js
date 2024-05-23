import { Client, Databases, Storage, ID, ImageGravity, ImageFormat, Query} from 'appwrite';

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_URL) 
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const database = new Databases(client)
const storage = new Storage(client)

const createPost = async ({Caption, Likes, Grids, featuredImage, userID }) => {
    await database.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        ID.unique(),
        {
            Caption, 
            Likes, 
            Grids, 
            featuredImage, 
            userID 
        }
    )
}

const createUser = async ({name, profile, userID}) => {
    await database.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_USER_ID,
        ID.unique(),
        {
            name,
            profile,
            userID
        }
    )
}

const createFile = async ({file}) => {
    return await storage.createFile(
        import.meta.env.VITE_APPWRITE_BUCKET_ID,
        ID.unique(),
        file
    )
}

const createAvatar = async ({file}) => {
    return await storage.createFile(
        import.meta.env.VITE_APPWRITE_BUCKET_AVATAR_ID,
        ID.unique(),
        file
    )
}

const getPosts = async () => {
    return await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        []
    )
}

const getUserData = async ({id}) => {
    return await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_USER_ID,
        [Query.equal("userID", [id])]
    )
}

const getUserPosts = async ({id}) => {
    return await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        [Query.equal("userID", [id])]
    )
}

const getImage = async ({fileId}) => {
    let quality = 50
    return storage.getFilePreview(
        import.meta.env.VITE_APPWRITE_BUCKET_ID,
        fileId,
        0, // width (optional)
        0, // height (optional)
        ImageGravity.Center, // gravity (optional)
        10, // quality (optional)
        
    )
}

const getAvatar = async ({fileId}) => {
    let quality = 50
    return storage.getFilePreview(
        import.meta.env.VITE_APPWRITE_BUCKET_AVATAR_ID,
        fileId,
        400, // width (optional)
        400, // height (optional)
        ImageGravity.Center, // gravity (optional)
        20, // quality (optional)
        
    )
}



const updateLikes = async ({postId , likes}) => {
    likes = likes + 1
    return await database.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        postId,
        {
            Likes: likes
        }
    )
}

const updateGrids = async ({postId , grids}) => {
    grids = grids + 1
    return await database.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        postId,
        {
            Grids: grids
        }
    )
}

const downloadPost = async ({fileId}) => {
    return await storage.getFileDownload(
        import.meta.env.VITE_APPWRITE_BUCKET_ID,
        fileId
    );
}



const updateLikedPost = async ({arr, id}) => {
    return await database.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_USER_ID,
        id,
        {
            liked: arr
        }
    )
}
export {createFile, createPost, createUser, createAvatar, getPosts, getImage, getUserData, updateLikes, updateLikedPost, getAvatar, updateGrids, downloadPost, getUserPosts}