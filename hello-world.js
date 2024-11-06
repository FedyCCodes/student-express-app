// hello-world.js
const express = require('express')
const cors = require('cors')
// cross origin 
// two different domains able to access data
const bodyParser = require('body-parser')
const { PrismaClient } = require('@prisma/client')

// create application/json parser
const jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })


const app = express()
const port = process.env.PORT || 3000

const prisma = new PrismaClient();


app.use(urlencodedParser);
app.use(bodyParser.json());
app.use(cors());

/*var studentList = [{
  "firstName": "Aryan",
  "lastName": "Jabbari",
  "sId": "234",
  "school": "Queens College",
  "major": "Computer Science"
}, {
  "firstName": "Lidia",
  "lastName": "De La Cruz",
  "sId": "333",
  "school": "Harvard",
  "major": "Philanthrophy"
}, {
  "firstName": "Brian",
  "lastName": "De Los Santos",
  "sId": "468",
  "school": "John Jay",
  "major": "Computer Science"
}, {
  "firstName": "Adam",
  "lastName": "Albaghali",
  "sId": "589",
  "school": "Brooklyn College",
  "major": "Computer Science"
}, {
  "firstName": "Nathan",
  "lastName": "Vazquez",
  "sId": "559",
  "school": "Hunter College",
  "major": "Computer Science"
}, {
  "firstName": "Ynalois",
  "lastName": "Pangilinan",
  "sId": "560",
  "school": "Hunter College",
  "major": "Computer Science"
}, {
  "firstName": "Shohruz",
  "lastName": "Ernazarov",
  "sId": "561",
  "school": "Hunter College",
  "major": "Computer Science"
}, {
  "firstName": "Kevin",
  "lastName": "Orta",
  "sId": "562",
  "school": "John Jay",
  "major": "Computer Science"
}, {
	"firstName": "Fedy",
	"lastName": "Cherif",
	"sId": "552",
	"school": "Queens College",
	"major": "Computer Science"
}, {
	"firstName": "Hello",
	"lastName": "World",
	"sId": "302",
	"school": "Box College",
	"major": "Computers"
}];*/

app.get('/students/:id', async (req, res) => {
  // the colon states that it's a URL parameter
  // the id is stated as both in the students path list
  // and the object
  
  const id = req.params.id;
  
  console.log(id);
  // gets the request parameter
  
  /*
  var output = {};
  
  for (const student of studentList) {
    // loops through the students
  
    if (student.sId == id.toString()) { 
      output = student;
      break;
    }
  }
  
  res.json(output);
  */
  
  var output = await prisma.student.findUnique({
    select: {sId: true, firstName: true, lastName: true, grade: true, school: true, major: true },
    where: { sId: id }
  });
  
  console.log(output);
  
  const student = output;
  
  // const student = output.find( e => e.sId == id )
  if (student) res.json(student);
  // sends the student if there is
  else {
    
    res
      .status(404)
      .json({
      "message": "student not Found"
    });
  }
});

// CRUD, Create Read Update Delete

app.get('/students', async (req, res) => {
  
  var query = req.query || {};
  
  
  var output = await prisma.student.findMany();
  
  if (req.query) {
    
    for (var propertyName in query) {
      // loops through all the property 
      
      output = output.filter( e => ((e[propertyName] == query[propertyName]) || ( e[propertyName] == undefined ))  );
      
    }
  } else {
    
  }
  
  
  res.json(output);
  
  /*else if (school == "Admin") output = {};
  else if (school) output = (studentList.filter( e => (e.school == school) ));
  else output = (studentList);*/
  
  /*
  if (school) {
    if (school.includes("Admin")) {
      res.json({message: "Not Allowed"});
    } else {
      res.json(studentList.filter( e => (e.school == school) ));
    }
  } else {
    res.json(studentList);
  }
  */
  
  
  // res.json(output);
  
});

app.delete('/students/:id', (req, res) => {
  
  const id = req.params.id;
  
  // prisma.student.delete({{
               /* where: {
                  id: id,
                },
                data: {posts: {deleteMany: {}}}
              })*/
  
  console.log(id);
  // gets the request parameter
  
  const student = studentList.find( e => e.sId == id );
  // gets the student
  
  if (student) studentList.splice(studentList.indexOf(student), 1);
  
  console.log(student);
  
  res.json({
    message: "Placeholder"
  });
  
});

app.post('/students', async (req, res) => {
  
  console.log("creating new student", req.body)
  
  console.log(req.body);
  // normally we validate req.body but skipping due to time

  const students = await prisma.student.create({ data: req.body });
  res.json(students);
  
});

app.get('/hello', (req, res) => {
  res.json({
    message: 'Hello world!'
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
