import mongoose from 'mongoose';

const cloudURI = "mongodb+srv://gliffyxstdio_db_user:1EmVNFjNZ7AheESD@cluster0.a2cvxbv.mongodb.net/idlyshop?retryWrites=true&w=majority&appName=Cluster0";
const localURI = "mongodb://127.0.0.1:27017/idlyshop";

const testConnection = async (uri, name) => {
    try {
        console.log(`Testing ${name} connection...`);
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log(`✅ ${name} Connected Successfully!`);
        return true;
    } catch (error) {
        console.log(`❌ ${name} Failed: ${error.message}`);
        return false;
    } finally {
        await mongoose.disconnect();
    }
};

const runTests = async () => {
    const cloudSuccess = await testConnection(cloudURI, "CLOUD");
    if (cloudSuccess) process.exit(0);

    const localSuccess = await testConnection(localURI, "LOCAL");
    if (localSuccess) process.exit(0);

    process.exit(1);
};

runTests();
