const config = { 
    endpoint: localStorage.COSMOendpoint,
    key: localStorage.COSMOapiKey,
    databaseId: localStorage.COSMOdatabaseID,  
    containerId: localStorage.COSMOcontainerID,  
    partitionKey: { kind: "Hash", paths: ["/id"] }
  }; 
  export default config; 
 