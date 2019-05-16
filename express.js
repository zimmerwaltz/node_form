const Joi = require('joi'); //for server side validations
const express = require("express");//returns a function
const app = express(); //returns an object of type express

// This is a middleware enabling parsing of json objects in the body of the requests
app.use(express.json());

const courses = [
    {id:1, name : "course 1"},
    {id:2, name : "course 2"},
    {id:3, name : "course 3"}
];

//use get to fetch data
app.get('/',(req,res)=>{
    res.send('hello world');
});

app.get('/api/courses', (req,res)=>{
    // res.send(req.params);
    res.send(courses);
});

app.get('/api/courses/:id', (req,res)=>{
    //match ID in endpoint with ID in our courses collection and store it in course variable
    const course = courses.find(c => c.id === parseInt(req.params.id));

    //if course is not available respond with 404
    if(!course) res.status(404).send(`The course with ID ${req.params.id} was not found`);
    // else return course
    else res.send(course);
});

//post to create new data
app.post('/api/courses',(req,res)=>{

    //defining a schema for joi
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body,schema);
    console.log(result);
    
    if(result.error){
        //400 bad request and send back the error message
        res.status(400).send(result.error.details[0].message);
        return;
    }

     //validating http input
    // if(!req.body.name || req.body.name.length < 3){
    //     //400 bad request
    //     res.status(400).send('Name is required and should be atleat 3 characters');
    //     return;
    // }

    //create new course object
    const course = {
        id: courses.length+1,
        // pick name property from object in req.body 
        name: req.body.name
    }
    //add new course to courses collection 
    courses.push(course);
    //when you post a new object to the server return it in the body of the response
    //because chances are the client needs to know the ID of the new object
    res.send(course);
});

//put to update data
app.put('/api/courses/:id',(req,res)=>{

    //look for course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //if course is not available respond with 404
    if(!course) {
        res.status(404).send(`The course with ID ${req.params.id} was not found`);
        return;
    }

    //validate the input
    //if invalid return 400 - bad request
    const result = validateCourse(req.body);

    if(result.error){
        //400 bad request and send back the error message
        res.status(400).send(result.error.details[0].message);
        return;
    }

    //Update the course and return it to the client
    course.name = req.body.name;
    res.send(course);
});

//delete to delete data
app.delete('/api/courses/:id',(req,res)=>{
    //look for course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //if course is not available respond with 404
    if(!course) {
        res.status(404).send(`The course with ID ${req.params.id} was not found`);
        return;
    }

    //delete course
    const index = courses.indexOf(course);
    courses.splice(index,1);

    //return course to client
    res.send(course);

});
 
const port = process.env.PORT || 3000;  

app.listen(port, ()=>{ console.log(`listening on port ${port}`)});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
   return Joi.validate(course,schema);
}
