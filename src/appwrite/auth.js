import { Client, Account,ID } from "appwrite";

const client = new Client()

client.setEndpoint(import.meta.env.VITE_APPWRITE_URL).setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)

const account = new Account(client)

// Login Function
const login = async ({email, password}) => {
    try {
        return await account.createEmailPasswordSession(email, password)
    } catch (error) {
        throw error
    }
    
}

const signup = async ({email, password, name}) => {
    try {
        const data = await account.create(ID.unique() , email, password, name)

        if(data){
            return login({email, password})
        }
        
    } catch (error) {
        throw error
    }
    
 
}

const logout = async () => {
    return await account.deleteSession('current')
}

const getUser = async () => {
    return await account.get()
}

export {login, signup, logout, getUser}