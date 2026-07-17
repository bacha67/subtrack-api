import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, 'Price cannot be negative']
    },
    currency: {
        type: String,
        required: [true, 'Currency is required'],
        enum: ['ETB', 'USD', 'EUR', 'GBP', 'inr', 'jpy', 'cny', 'cad', 'aud', 'nzd', 'CHF', 'SEK', 'NOK', 'DKK', 'BRL', 'MXN', 'ARS', 'CLP', 'COP', 'PEN', 'HKD', 'SGD', 'MYR', 'THB', 'VND', 'PHP', 'IDR', 'KRW', 'INR', 'TRY', 'ZAR'],
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']

    },
    category: {
        type: String,
        enum: ['entertainment', 'productivity', 'sports', 'news'],
        required: true

    },
    pymentMethod: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'canceld', 'expired'],
        default: 'active'

    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date must be in the past',

        }
    },
    renewalDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },

            message: 'renewal date must be after the start date',

        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }
}, { timestamp: true });

//Auto-calculate the renewal date if missing
subscriptionSchema.pre('save', function (next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            'daily': 1,
            'weekly': 7,
            'monthly': 30,
            'yearly': 365
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }
    // Auto-update the status if renewal date has passed
    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }
    next();

});
const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;

