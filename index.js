import express, { response } from "express";
// import joi from "joi";
import bodyParser from "body-parser";
import Joi from "joi";

const app = express()

let courses = [
    {
        id: 1,
        name: "Artificial Intelligence"
    },
    {
        id: 2,
        name: "Compiler Constuction"
    },
    {
        id: 3,
        name: "Net Centric Programming"
    },
    {
        id: 4,
        name: "Web Application Frameworks"
    },
    
]

let validateCourse = (courseName)=>{
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return schema.validate(courseName)
}

app.use(bodyParser.json())

app.get('/', (req, res)=>{
    res.send([1,2,3]);
})

app.get('/api/courses', (req, res)=>{
    res.send(courses)
})

app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=>{
        return c.id === parseInt(req.params.id)
    })
    if(!course){
        res.status(404).send("Object Not Found")
    }
    res.send(course)
})

app.post('/api/courses',(req,res)=>{
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    const resObj = schema.validate(req.body)
    if(resObj.error){
        res.status(400).send(resObj.error)
    }
    else{
        const course = {
            id: courses.length + 1,
            name: req.body.name
        }
        courses.push(course)
        res.send(courses)
    }
})

app.put('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=>{
        return c.id === parseInt(req.params.id)
    })
    if(!course){
        res.status(404).send("Object Not Found")
    }
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    const resObj = schema.validate(req.body)
    if(resObj.error){
        res.status(400).send(resObj.error)
    }
    else{
        course.name = req.body.name
        res.send(courses)
    }
})

app.delete('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=>{
        return c.id === parseInt(req.params.id)
    })
    if(!course){
        res.status(404).send("Object Not Found")
    }
    // courses = courses.filter((c, i, crs)=>{ 
    //     return c.id != course.id;
    // });
    let ind = courses.indexOf(course)
    courses.splice(ind, 1)
    res.send(courses)
})

app.listen(8080, ()=>{
    console.log("Server Running...");
})