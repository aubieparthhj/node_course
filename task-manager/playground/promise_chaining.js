/* require('../src/db/mongoose');
const User = require('../src/models/users');


User.findByIdAndUpdate('68a5b13e321afcd7b23b92b6',{
    $set:{
        age: 32
    }
}).then((user)=>{
    console.log(user);
    return User.countDocuments({age: 32});
}).then((count)=>{
    console.log(count);
}).catch((e)=>{
    console.log(e);
}); */

require('../src/db/mongoose');
const Task = require('../src/models/task');
const User = require('../src/models/users');

/* Task.findByIdAndUpdate('68a5b326ae2c2f7aacf20868',{
    $set:{
       completed: true,
    }
}).then((task)=>{
    console.log(task);
    return Task.countDocuments({completed: true});
}).then((taskCount)=>{
    console.log(taskCount);
}).catch((e)=>{
    console.log(e);
}) */

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id,{
        $set:{
            age: age
        }
    })
    console.log(user);
    const count = await User.countDocuments({age: age});
    console.log(count);
    return count;
}

updateAgeAndCount('68a5b18320320e487489b218', 22).then((count)=>{
    console.log(count);
}).catch((e)=>{
    console.log(e);
})