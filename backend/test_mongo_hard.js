import mongoose from 'mongoose';

const URI = "mongodb+srv://gliffyxstdio_db_user:1EmVNFjNZ7AheESD@cluster0.a2cvxbv.mongodb.net/idlyshop?retryWrites=true&w=majority&appName=Cluster0";

console.log("Testing connection...");

const testConnection = async () => {
    try {
        await mongoose.connect(URI);
        console.log("✅ Connection Successful!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Connection Failed:", error.message);
        process.exit(1);
    }
};

testConnection();
