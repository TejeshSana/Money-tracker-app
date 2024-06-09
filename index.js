var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")


const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost:27017/money_tracker')
var db=mongoose.connection
db.on('error',()=>console.log("error in connecting to database"))
db.once('open',()=>console.log("connected to database"))

app.post("/add",(req,res) => {
    var category_select= req.body.category_select
    var amount=req.body.amount
    var info=req.body.info
    var date=req.body.date
    
    var data={
        "Category":category_select,
        "Amount":amount,
        "Info":info,
        "Date":date
    }
    db.collection('users').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully")
    })
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(3000);

console.log("Listening on port 3000")

