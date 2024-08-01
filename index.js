const express= require('express')

const app=express()

const mongoose = require('mongoose')

const Event = require('./model')

const path = require('path')

const ejs= require('ejs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

mongoose.connect('mongodb+srv://SPCB:WHATPASSWORD@spcb.49yxvyn.mongodb.net/?retryWrites=true&w=majority&appName=SPCB)')

.then(function(e){
    console.log("Connected to MongoDB");
})



app.get('/', function(req, res) {
    res.send('Hello World')
})

app.get('/home', function(req, res) {
    res.send('Hi')
})

app.get('/add-Event',async function(req, res) {
    res.sendFile(path.join(__dirname + '/form.html'))
})

app.post('/add-Event',async function(req, res) {
    console.log(req.body)
    await Event.create(req.body)
    res.send("Thank you,your event has been added")
})

app.get('/Event', async (req, res) => {
    const resp = await Event.find();
    const html=`
    <% for(let i=0; i<Event.length; i++) {%>
    <h3> <%=Event[i].title %> </h3>
    <h2> <%=Event[i].discription %> </h2>
    <hl> <%=Event[i].title %> </hl>
    <% }%>
    `
    const html2 = ejs.render(html,{Event : resp})
    res.json(html2)
})

app.listen(3000,function() {
    console.log('Server is running on port 3000')
})