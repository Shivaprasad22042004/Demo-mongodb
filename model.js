const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    discription : {
        type : String,
        required : true
    },
    event_date : Date,
    location : String,
    public_count : Number,
})

const Event=mongoose.model('Event', eventSchema)

module.exports=Event;