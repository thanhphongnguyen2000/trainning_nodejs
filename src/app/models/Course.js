const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        _id: { type: Number },
        name: { type: String, required: true, maxlength: 255 },
        age: { type: Number, index: true },
        education: { type: String },
        image: { type: String },
        videoId: { type: String, required: true },
        level: { type: String },
        description: { type: String },
        slug: { type: String, slug: 'name', unique: true },
        createdAt: { type: Date, default: Date.now },
        updateAt: { type: Date, default: Date.now },
    },
    {
        _id: false,
        timestamps: true,
    },
);

// Add AutoIncrement
Course.plugin(AutoIncrement);

// Add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('members', Course);
