import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/shopiq';
        const conn = await mongoose.connect(mongoURI);
        console.log(`[MongoDB] Connected successfully to: ${conn.connection.host}`);
    } catch (error) {
        console.error(`[MongoDB] Local connection failed: ${error.message}`);
        console.log('[MongoDB] Initializing fallback in-memory database...');

        try {
            const { MongoMemoryServer } = await import('mongodb-memory-server');
            const mongoServer = await MongoMemoryServer.create();
            const memoryUri = mongoServer.getUri();
            await mongoose.connect(memoryUri);
            console.log(`[MongoDB] In-Memory database connected successfully at: ${memoryUri}`);
        } catch (memError) {
            console.error('[MongoDB] In-Memory database initialization failed:', memError.message);
            process.exit(1);
        }
    }
};

export default connectDB;