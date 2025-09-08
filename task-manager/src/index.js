require('dotenv').config();
const express = require('express');
const app = express();

const userRouter = require('./routers/users');
const taskRouter = require('./routers/tasks');

require('./db/mongoose');

const port = process.env.PORT || 3000;

/* 
app.use((req,res,next)=>{
  if(req.method === 'GET'){
    res.send('GET requests are disabled');
  }else{
    next();
  }
}) */

 /*  app.use((req,res,next)=>{
    res.status(503).send('Site is currently under maintenance. Please try again later.');
  }) */

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

/* const bcrypt = require('bcryptjs');
const myFunction = async()=>{
    const password = 'Parth11234!';
    const hashedPassword = await bcrypt.hash(password,8);
    console.log('password: '+password);
    console.log('hashedPassword: '+hashedPassword);

    const isMatch = await bcrypt.compare('Red12345!',hashedPassword);
    console.log(isMatch);
}
myFunction(); */

/* const jwt = require('jsonwebtoken');
const myFunction2 = async()=>{
    const token = jwt.sign({_id:'abc123'},'thisismynewcourse');
    console.log(token);

    const data = jwt.verify(token,'thisismynewcourse');
    console.log(data);
}
myFunction2();

 */


app.listen(port,()=>{
    console.log('Server is up on port '+port);
})

// const User = require('./models/users');
// const Task = require('./models/task');
// const main = async()=>{
//    /*  const task = await Task.findById('68ac2cbc7ed5e7a9581bbba8');
//     await task.populate('owner');
//     console.log(task.owner); */


//     const user = await User.findById('68a88078d361ea7736f5e878');
//     await user.populate('tasks');
//     console.log(user.tasks);
// }
// main();
