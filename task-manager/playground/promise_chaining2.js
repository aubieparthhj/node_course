require('../src/db/mongoose');
const Task = require('../src/models/task');

/* const findByIdAndDelete = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    console.log(task);
}

findByIdAndDelete('68a5b326ae2c2f7aacf20868').then((task)=>{
    console.log(task);
}).catch((e)=>{
    console.log(e);
}) */

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    console.log(task);
    const count = await Task.countDocuments({completed: true});
    console.log(count);
    return count;
}

deleteTaskAndCount('68a5b326ae2c2f7aacf20868').then((count)=>{
    console.log(count);
}).catch((e)=>{
    console.log(e);
})