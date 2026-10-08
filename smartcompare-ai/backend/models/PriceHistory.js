import mongoose from 'mongoose';

const priceHistorySchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        store: {
            type: String,
            default: 'Online',
        },
        recordedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export default mongoose.models.PriceHistory || mongoose.model('PriceHistory', priceHistorySchema);