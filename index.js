const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const Path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(Path.join(__dirname,`../TripyTravels`)))

mongoose.connect("mongodb://127.0.0.1:27017/Tripy")
    .then(() => console.log("connected"))
    .catch((err) => console.log(err));



    const UserSchema = new mongoose.Schema({
        from: String,
        to: String,
        name: String,
        mobilenumber: Number,
        date: String,
        list:String
    
    
    
    });
    const UserModel = mongoose.model("user", UserSchema);
    app.get('/', (req, res) => {

        res.sendFile(Path.join(__dirname, '../TripyTravels/index.html'));
    });





    app.get('myform', (req, res) => {

        res.sendFile(Path.join(__dirname, '../TripyTravels/admin.html'));
    });




    app.get('/dashboard', (req, res) => {

        UserModel.find({})
            .then((data) => {
                res.json(data)
            })
            .catch((err) => console.log(err))
    });




    app.post('/create', (req, res) => {
    
        const { from, to, name,mobilenumber,date,list } = req.body;
    
        UserModel.create({ from, to, name,mobilenumber,date,list })
            .then((data) => {
                res.json(data);  
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error creating user.');
            });
    });



// another page........................................





const UserSchema1=new mongoose.Schema({
    Name:String,
    Email:String,
    Number:Number,
    Address:String,
    writemessage :String,
})


const UserModel1= mongoose.model("back", UserSchema1);

app.get("/dashboard1",(req,res)=>{
   UserModel1.find({})
   .then((data)=>res.json(data))
   .catch((err)=>{res.json(err)})
})



app.post("/create1",(req,res)=>{
    const{Name,Email,Number,Address,writemessage}=req.body;
    UserModel1.create({Name,Email,Number,Address,writemessage})
    .then((data)=>res.json(data))
    .catch((err)=>{res.json(err)})

})


























app.delete('/delete1/:id', (req, res) => {
    const id = req.params.id;
    console.log("Deleting user with ID:", id);

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ObjectId' });
    }

    UserModel1.findByIdAndDelete(id)
        .then(response => {
            if (!response) {
                return res.status(404).json({ error: 'User not found' });
            }
           
            res.json({ message: 'User deleted successfully', user: response });
        })
        .catch(err => {
            console.error('Error deleting user:', err);
            res.status(500).json({ error: 'An error occurred while deleting the user' });
        });
});


    app.delete('/delete/:id', (req, res) => {
        const id = req.params.id;
        console.log("Deleting user with ID:", id);
    
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ObjectId' });
        }
    
        UserModel.findByIdAndDelete(id)
            .then(response => {
                if (!response) {
                    return res.status(404).json({ error: 'User not found' });
                }
               
                res.json({ message: 'User deleted successfully', user: response });
            })
            .catch(err => {
                console.error('Error deleting user:', err);
                res.status(500).json({ error: 'An error occurred while deleting the user' });
            });
    });



    app.listen(8085);