var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var cors = require('cors');
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
const PORT = process.env.PORT || 5555
app.listen(PORT, function () {
console.log(`Demo project at: ${PORT}!`); });
app.get('/', (req, res) => {
res.send('This is my demo project')
})

const {db} = require('./config/admin');



// const items = [
//     {
//         id: 1,
//         name: "Learn Python",
//         img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjwXj_PmPQ4c3Lou_qdAqG7-6gu0EFK92Dqg&usqp=CAU",
//         price: 84.4,
//         rating: 4.4,
//         teacher: "Yaran"
//     },
//     {
//         id: 2,
//         name: "Learn Python",
//         img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjwXj_PmPQ4c3Lou_qdAqG7-6gu0EFK92Dqg&usqp=CAU",
//         price: 100,
//         rating: 3.4,
//         teacher: "Yavan"
//     },
// ];


//get item list
app.get('/api/courses',async (req, res) => {
    const courseRef = db.collection('shop');
    try {
        courseRef.get().then((snapshot) => {
            const items = snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    ...doc.data(),
                }
            ));
            console.log(items);
            return res.status(201).json(items);
        })
        
    } catch (error) {
        res.status(500).json({ message: error });
    }
    //return res.status(201).json(items);
})

// app.post('/courses', async(req,res) => {
//     const {name, rating, price, teacher, img} = req.body;
//     try{
//         const course = db.collection('courses').doc();
//     } catch {}
// })

//post item
app.post('/api/post',async (req, res) => {
    const {name,nameImg,price } = req.body;
    try {
        const courseRef = db.collection('shop');
        const item =
        {
            name: name,
            nameImg: nameImg,
            price: price,
        }

        console.log(item);
        courseRef.add(item);
        res.status(201).json(item);
        
    } catch (error) {
        res.status(500).json( error.message );
    }
    //return res.status(201).json(items);
})

//update item
app.put('/api/update/:id',async (req, res) => {
    var id = req.params.id;
    const {name,nameImg,price } = req.body;
    try {
        const courseRef = db.collection('shop').doc(id);
        const item =
        {
            name: name,
            nameImg: nameImg,
            price: price,
        }

        console.log(item);
        courseRef.set(item);
        res.status(201).json(item);
        
    } catch (error) {
        res.status(500).json( error.message );
    }
    //return res.status(201).json(items);
})

//delete item
app.delete('/api/delete/:id',async(req,res) => {
    var id = req.params.id;
    
    try{
        console.log('here',id)
        const course = db.collection('shop').doc(id)
        course.delete().then(()=>{
            res.status(201).json('success')
        })
     }
     catch(error){
        res.status(500).json({message: error});
     }
})

// see comment 
app.get('/api/comments/:id',async (req, res) => {
    var id = req.params.id;
    const courseRef = db.collection('shop').doc(id);
    try {
        courseRef.collection('comment').orderBy('time').get().then((snapshot) => {
            const items = snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    ...doc.data(),
                }
            ));
            console.log(items);
            return res.status(201).json(items);
        })
        
    } catch (error) {
        res.status(500).json({ message: error });
    }
    //return res.status(201).json(items);
})

//send comment
app.post('/api/comment/:id',async (req, res) => {
    const {user,cmt,numcmt,time,like, dislike } = req.body;
    var id = req.params.id;
    try {
        const courseRef = db.collection('shop').doc(id);
        const item =
        {
            //id: idcmt,
            user: user,
            cmt: cmt,
            numcmt: numcmt,
            time: time,
            like: like,
            dislike: dislike,
        }

        console.log(item);
        courseRef.collection('comment').add(item);
        res.status(201).json(item);
        
    } catch (error) {
        res.status(500).json( error.message );
    }
    //return res.status(201).json(items);
})

//update cmt
app.put('/api/answer/:id/:id2',async (req, res) => {
    var id = req.params.id;
    var id2 = req.params.id2;
    const {user,cmt,numcmt,time,like, dislike } = req.body;
    try {
        const courseRef = db.collection('shop').doc(id).collection('comment').doc(id2);
        const item =
        {
            user: user,
            cmt:cmt,
            numcmt:numcmt,
            time: time,
            like: like,
            dislike: dislike,
        }

        console.log(item);
        courseRef.set(item);
        res.status(201).json(item);
        
    } catch (error) {
        res.status(500).json( error.message );
    }
    //return res.status(201).json(items);
})

//delete comment
app.delete('/api/delete/:id/:id2',async(req,res) => {
    var id = req.params.id;
    var id2 = req.params.id2;
    try{
        console.log('here',id)
        const course = db.collection('shop').doc(id).collection('comment').doc(id2)
        course.delete().then(()=>{
            res.status(201).json('success')
        })
     }
     catch(error){
        res.status(500).json({message: error});
     }
})

//see answer
app.get('/api/answers/:id/:id2',async (req, res) => {
    var id = req.params.id;
    var id2 = req.params.id2;
    const courseRef = db.collection('shop').doc(id).collection('comment').doc(id2);
    try {
        courseRef.collection('answer').orderBy('time').get().then((snapshot) => {
            const items = snapshot.docs.map((doc) => (
                {
                    id2: doc.id,
                    ...doc.data(),
                }
            ));
            console.log(items);
            return res.status(201).json(items);
        })
        
    } catch (error) {
        res.status(500).json({ message: error });
    }
    //return res.status(201).json(items);
})


//send answer
app.post('/api/writeranswer/:id/:id2',async (req, res) => {
    const {user,cmt, time,like,dislike } = req.body;
    var id = req.params.id;
    var id2 = req.params.id2;
    try {
        const courseRef = db.collection('shop').doc(id).collection('comment').doc(id2);
        const item =
        {
            user: user,
            cmt: cmt,
            time: time,
            like: like,
            dislike: dislike,
        }

        console.log(item);
        courseRef.collection('answer').add(item);
        res.status(201).json(item);
        
    } catch (error) {
        res.status(500).json( error.message );
    }
    //return res.status(201).json(items);
})

//delete answer
app.delete('/api/delete/:id/:id2/:id3',async(req,res) => {
    var id = req.params.id;
    var id2 = req.params.id2;
    var id3 = req.params.id3;
    try{
        console.log('here',id)
        const course = db.collection('shop').doc(id).collection('comment').doc(id2).collection('answer').doc(id3)
        course.delete().then(()=>{
            res.status(201).json('success')
        })
     }
     catch(error){
        res.status(500).json({message: error});
     }
})


//register account
app.post('/api/register',async (req, res) => {
    //var id = req.params.id;
    const {user, pass, address, phone, name, lastname, img } = req.body;
    try {
        const courseRef = db.collection('menu');
        const item =
        {
            user:user,
            pass:pass,
            lastname:lastname,
            name:name,
            address:address,
            phone:phone,
            img:img,
        }

        console.log(item);
        courseRef.add(item);
        res.status(201).json(item);
        
    } catch (error) {
        res.status(500).json( error.message );
    }
    //return res.status(201).json(items);
})

//check account
app.get('/api/accounts',async (req, res) => {
    const courseRef = db.collection('menu');
    try {
        courseRef.get().then((snapshot) => {
            const items = snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    ...doc.data(),
                }
            ));
            console.log(items);
            return res.status(201).json(items);
        })
        
    } catch (error) {
        res.status(500).json({ message: error });
    }
    //return res.status(201).json(items);
})

//account
app.put('/api/account/:id',async (req, res) => {
    var id = req.params.id;
    const {user, pass, address, phone, name, lastname, img } = req.body;
    try {
        const courseRef = db.collection('menu').doc(id);
        const item =
        {
            user:user,
            pass:pass,
            lastname:lastname,
            name:name,
            address:address,
            phone:phone,
            img:img,
        }

        console.log(item);
        courseRef.set(item);
        res.status(201).json(item);
        
    } catch (error) {
        res.status(500).json( error.message );
    }
})
//post cart
app.post('/api/cart/:id',async (req, res) => {
    var id = req.params.id;
    const {img, name, price, num } = req.body;
    try {
        const courseRef = db.collection('menu').doc(id);
        const item =
        {
            img: img,
            name: name,
            price: price,
            num: num,
        }

        console.log(item);
        courseRef.collection('cart').add(item);
        res.status(201).json(item);
        
    } catch (error) {
        res.status(500).json( error.message );
    }
    //return res.status(201).json(items);
})

//post order
app.post('/api/order/:id/:id2',async (req, res) => {
    var id = req.params.id;
    var id2 = req.params.id2;
    var iduser = id;
    var idproduct = id2;
    const {name, price, num } = req.body;
    try {
        const courseRef = db.collection('menu').doc(id);
        const item =
        {
            iduser: iduser,
            idproduct: idproduct,
            name: name,
            price: price,
            num: num,
        }

        console.log(item);
        courseRef.collection('order').add(item);
        res.status(201).json(item);
        
    } catch (error) {
        res.status(500).json( error.message );
    }
    //return res.status(201).json(items);
})

//get item list
app.get('/api/carts/:id',async (req, res) => {
    var id = req.params.id;
    const courseRef = db.collection('menu').doc(id);
    try {
        courseRef.collection('cart').get().then((snapshot) => {
            const items = snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    ...doc.data(),
                }
            ));
            console.log(items);
            return res.status(201).json(items);
        })
        
    } catch (error) {
        res.status(500).json({ message: error });
    }
    //return res.status(201).json(items);
})