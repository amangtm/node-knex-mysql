const express= require('express')
const app= express();
const cors=require('cors');
const PORT= process.env.PORT || 5002
const knex=require('./db/knex')

app.use(cors());

app.get(`/api/tasks/:type`,(req,res)=>{  // GET
    const taskType=req.params.type;
    knex.select().from(`${taskType}`)   //OR  knex.raw(`select * from ${taskType}`)
    .then(data=>{
        res.send(data); // 
    })
    
})

app.post(`/api/tasks/:type`,express.urlencoded({extended:true}),(req,res)=>{
    const taskType=req.params.type;
    const {title,desc}=req.body;
    // validation

    if(!title) return res.status(400).send('Error: Task name required')
    knex(`${taskType}`).insert({ // insert data
        title: title,
        desc: desc
    })
    .then(()=>{
        knex.select().from(`${taskType}`)  
        .then(data=>{
            // console.log (data[data.length-1].id)
            res.send(data); // 
        })   
    })
})

app.put(`/api/tasks/:type/:id`,express.urlencoded({extended:true}),(req,res)=>{
    const taskType=req.params.type;
    const taskId=req.params.id;
    const {title,desc}=req.body;

    // res.end(`Data recieved: ${title} and ${desc}`)
    // validation
    knex(`${taskType}`).where('id',taskId).update({ // insert data
        title: title,
        desc: desc
    })
    .then(()=>{
        knex.select().from(`${taskType}`)  
        .then(data=>{
            res.send(data); // 
        })   
    })
})

app.delete(`/api/tasks/:type/:id`,(req,res)=>{
    const taskType=req.params.type;
    const taskId=req.params.id;

    // res.end(`Data recieved: ${title} and ${desc}`)
    // validation
    knex(`${taskType}`).where('id',taskId).del()
    .then(()=>{
        knex.select().from(`${taskType}`)  
        .then(data=>{
            res.send(data); // 
        })   
    })
    .catch(err =>{
        res.end(err);
    })
})

app.listen(PORT,()=>{
    console.log(`Server is listening at http://localhost:${PORT}`);
});