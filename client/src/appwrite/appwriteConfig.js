import { Client, Account } from "appwrite"; 
const client = new Client()
    .setEndpoint(`${process.env.REACT_APP_ENDPOINT}`) // Your API Endpoint

    .setProject(`${process.env.REACT_APP_PROJECTID}`);// Your project ID

const account = new Account(client);

export default account;