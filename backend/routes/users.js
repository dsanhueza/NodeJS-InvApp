const { Router } = require('express');
const router = Router();

const User = require('../models/User');

//Obtener lista de usuarios registrados
router.get('/GetAllUsersList', async (req,res) => {
    const users = await User.find();

    if(users.length == 0){
        res.json({"status":"success", "message": "NoData"});
    }
    else{
        res.json({"status":"success", "message": users});
    }

});

//Obtener informacion de un solo usuario
router.post('/GetUser', async (req,res) =>{
    const userExist = await User.exists({"rutUsuario": req.body.rutUsuario});

    if(userExist == true){
        const findUser = await User.find({"rutUsuario" : req.body.rutUsuario});
        res.json({"status":"success", "message": findUser}); 
    }
    else{
        res.json({"status":"error", "message": "Usuario No Encontrado"}); 
    } 
});

//Insertar un usuario en la bd
router.post('/InsertOrUpdateUser', async (req,res) => {
    const { rutUsuario, nombreUsuario, contrasenaUsuario } = req.body;

    if(rutUsuario){
        if(nombreUsuario){
            if(contrasenaUsuario){
                const userExist = await User.exists({"rutUsuario" : req.body.rutUsuario});
                if(userExist == true){
                    const updateTask = {
                        nombreUsuario : req.body.nombreUsuario,
                        contrasenaUsuario : req.body.contrasenaUsuario
                    };
                    const ex = await User.findOneAndUpdate({"rutUsuario": req.body.rutUsuario}, { $set: updateTask });
                    res.json({"status":"success", "message": "Usuario Modificado con Éxito"}); 
                }
                else{
                    const newUser = new User({ rutUsuario, nombreUsuario, contrasenaUsuario });
                    await newUser.save();
                    res.json({"status":"success", "message": "Usuario Registrado con Éxito"}); 
                }
            }
            else{
                res.json({"status": "Error", "message": "Error, no se agrego contrasenaUsuario"});
            }
        }
        else{
            res.json({"status": "Error", "message": "Error, no se agrego nombreUsuario"});
        }
    }
    else{
        res.json({"status": "Error", "message": "Error, no se agrego rutUsuario"});
    } 
});

//Eliminar un usuario de la bd
router.post('/DeleteUser', async (req,res) => {
    const userExist = await User.exists({"rutUsuario" : req.body.rutUsuario});
    if(userExist == true){ 
        await User.findOneAndDelete(req.body.rutUsuario);
        res.json({"status":"success", "message": "Usuario Eliminado con Éxito"});  
    }
    else{
        res.json({"status":"error", "message": "Usuario No Encontrado"});
    } 
});

module.exports = router;