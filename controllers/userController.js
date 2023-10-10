const db = require('../models');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const handlerError = (err) => {
    let errors ={}

    if (err.message==='Por favor ingrese un id') {
        errors.id='Por favor ingrese un id'
    }

    if (err.message==='Por favor ingrese un nombre') {
        errors.nombre='Por favor ingrese un nombre'
    }
    if ( err.code === 11000) {
        errors.id='El id ya se encuentra registrado'
        return errors
    }

    //validacion de errores
    if(err.message.includes('tarea validation failed')){
        Object.values(err.errors).forEach(({properties}) =>{
            errors[properties.path] = properties.message

        })
    }
    return errors
}

module.exports.saveUser = async (req,res) =>{
    const {nombre,password} = req.body


    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            const encriptedPassword = hash;

            try{
                const user = await db.User.create({nombre: nombre, password: encriptedPassword})
                res.status(201).json({user:user._id})
            }
            catch (error) {
                console.log(error)
                const errors = handlerError(error)
        
                res.status(400).json({errors})
            }
        });
    });
}

module.exports.loginUser = async (req,res) =>{
    const {nombre,password} = req.body
    
    const user = await db.User.findOne({ where: {nombre: nombre}})
    

    try{
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const payload = {
                userId: user.id,
                username: user.nombre
            };
            
            // Secret key for signing the token
            const secretKey = '123456';
            
            // Sign the token with the payload and secret key
            const token = jwt.sign(payload, secretKey);
              
            // sessionStorage.setItem("token",token) agregar en el front "REACT"
            res.status(200).json({token:token})
        }else{
            res.status(404).json({mensaje:"credenciales incorrectas"})

        }
    }
    catch (error) {
        console.log(error)
        const errors = handlerError(error)

        res.status(400).json({errors})
    }
}

module.exports.getUser = async(req,res) =>{
  return db.User.findAll()
  .then((user) => {
    res.status(200).json(user)
  })
  .catch((err) => {
    console.log('There was an error querying user', JSON.stringify(err))
    res.status(204).json(err)
  });
}

module.exports.getUserById = async(req,res) =>{
    const {id} = req.params 
    const user = await db.User.findByPk(id)
    if(user){
        res.status(200).json(user)
    }else{
        res.status(404).json()
    }
    
}

// module.exports.putTaskById = async(req,res) =>{
//     const {id} = req.params 
//     const {nombre,descripcion,fechaAlta,completada} = req.body
    
//     let onsucces = async function () {
        
//         const task = tasks.find((task) =>{
//             return task.id === id
//         })
//         task.nombre = nombre
//         task.descripcion = descripcion
//         task.fechaCreacion = new Moment(new Date(fechaAlta))
//         task.completada = completada

//         await task.save()
        
//         if(task){
//             res.status(202).json(task)
//         }else{
//             res.status(404).json()
//         }
//     }
//     if (tasks.length === 0) { 
//         tasks = await Tarea.getAllTasks()
//         onsucces()
//     }else{
//         onsucces()
//     }
// }


// module.exports.deleteTaskById = async(req,res) =>{
//     const {id} = req.params 
//     const {nombre,descripcion,fechaAlta,completada} = req.body
    
//     let onsucces = async function () {
        
//         const task = tasks.find((task) =>{
//             return task.id === id
//         })
        
//         await Tarea.findByIdAndDelete({ _id: task._id}).then(function(){
//             console.log("Tarea eliminada"); // Success
//         }).catch(function(error){
//             console.log(error); // Failure
//         });
//         // await Tarea.deleteById(task._id);
//         tasks.forEach(task => {
//             if (task.id == id) {
//                 tasks.pop(task)
//             }
//         });
        
//         if(task){
//             res.status(202).json(task)
//         }else{
//             res.status(404).json()
//         }
//     }

//     if (tasks.length === 0) { 
//         tasks = await Tarea.getAllTasks().then( () =>{
//             onsucces()
//         })
//     }else{
//         onsucces()
//     }
// }