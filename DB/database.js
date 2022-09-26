const { MongoClient } = require("mongodb")

const ConnectToDb = () => {
    const URLStr = process.env.URL
    const Client = new MongoClient(URLStr)
    Client.connect(() => {
        console.log("Connected")
    })
    let db = Client.db("RN21TC").collection("users")
    return db
}
module.exports = { ConnectToDb }