import { ConflictResolutionMode } from "@azure/cosmos";
import config from './DBconfig.js';
const CosmosClient = require("@azure/cosmos").CosmosClient;


async function RequestDB(requestType, ID, newItem, category) {
    const { endpoint, key, databaseId, containerId } = config;
    const client = new CosmosClient({
        endpoint,
        key,
        connectionPolicy: {
            enableEndpointDiscovery: false
        }
    })
    const database = client.database(databaseId);
    const container = database.container(containerId);


    if (requestType === "GetPageByID") {
        const querry = "SELECT * from " + localStorage.COSMOcontainerID + " f WHERE f.id = " + "'" + ID + "'"
        const querySpec = { query: querry };
        console.log("DB GetPageByID")
        const { resources: items } = await container.items.query(querySpec).fetchAll();

        return (items[0]);
    }
    if (requestType === "GetPages") {
        const querry = "SELECT " + localStorage.COSMOcontainerID + ".id, " + localStorage.COSMOcontainerID + ".pageName from " + localStorage.COSMOcontainerID
        const querySpec = { query: querry };
        console.log("DB GetPages")
        const { resources: items } = await container.items.query(querySpec).fetchAll();

        return (items);
    }

    if (requestType === "ChangePage") {
        try {
            const { resource: updatedItem } = await container
                .item(ID)
                .replace(newItem);

            return (updatedItem);
        } catch (error) {
            console.log(error.message);
        }
    }
    if (requestType === "NewPage") {
        try {
            const { resource: createdItem } =
                await container.items.create(newItem);
            console.log("DB NewPage")
            return (createdItem);
        } catch (error) {
            console.log(error.message);
        }
    }

    if (requestType === "DeletePage") {
        try {
            const { resource: result } = await container.item(ID, category).delete();


            console.log("DB DeletePage")
        } catch (error) {
            console.log(error.message);
        }
    }



}
export default RequestDB;  