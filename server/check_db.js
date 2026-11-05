const mongoose = require('mongoose');

async function test() {
    try {
        console.log("Connecting to mongodb://127.0.0.1:27017/lsb ...");
        await mongoose.connect('mongodb://127.0.0.1:27017/lsb');
        console.log("Connected safely.");
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("Collections found:", collections.map(c => c.name));

        const users = await mongoose.connection.db.collection('users').find({}).toArray();
        console.log("Total users in DB:", users.length);
        if (users.length > 0) {
            console.log("First user:", users[0]);
        } else {
            console.log("No users found. Did the registration actually succeed on the frontend?");
        }
    } catch (e) {
        console.error("Error:", e);
    } finally {
        process.exit();
    }
}
test();
