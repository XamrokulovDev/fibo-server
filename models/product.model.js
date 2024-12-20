const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    image: {
        type: String,
        required: true
    },
    timeStatus: {
        type: Boolean,
        default: true,
    },
},{
    timestamps: true,
});

productSchema.pre('save', function(next) {
    const currentDate = new Date();
    const createdAt = this.createdAt;

    if (currentDate - createdAt >= 7 * 24 * 60 * 60 * 1000) {
        this.timeStatus = false;
    }
    next();
});

module.exports = mongoose.model("Product", productSchema);