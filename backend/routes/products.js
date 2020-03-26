const { Router } = require('express');
const router = Router();

const Product = require('../models/Product');

//Obtener lista de productos en la base de datos
router.get('/GetAllProductList/:rutUsuario', async (req,res) => {
    const AllProductsFromUser = await Product.find({"rutUsuario": req.params.rutUsuario});

    if(AllProductsFromUser.length == 0){
        res.json({"status":"success", "message": "NoData"});
    }
    else{
        res.json({"status":"success", "message": AllProductsFromUser});
    }
});

//Obtener lista de productos de un usuario en la base de datos
router.post('/GetAllProductListUser', async (req,res) => {
    const AllProductsFromUser = await Product.find({"rutUsuario": req.body.rutUsuario});

    if(AllProductsFromUser.length == 0){
        res.json({"status":"success", "message": "NoData"});
    }
    else{
        res.json({"status":"success", "message": AllProductsFromUser});
    }
});

//Obtener informacion de un producto en especifico
router.post('/GetProduct', async (req,res) =>{
    const userExistsInProductDB = await Product.exists({"rutUsuario": req.body.rutUsuario});

    if(userExistsInProductDB == true){
        const productExist = await Product.exists({"idProducto": req.body.idProducto});

        if(productExist == true){
            const findProduct = await Product.find({"idProducto" : req.body.idProducto,"rutUsuario": req.body.rutUsuario});
            res.json({"status":"success", "message": findProduct});
        }
        else{
            res.json({"status":"error", "message": "Producto no Encontrado"}); 
        } 
    }
    else{
        res.json({"status":"error", "message": "Usuario no ha ingresado Productos"}); 
    }
});

//Insertar o Modificar un Producto en la bd
router.post('/InsertOrUpdateProduct', async (req,res) => {
    const { rutUsuario, idProducto, nombreProducto, descripcionProducto, fechaPublicacion, precioProducto } = req.body;

    if(rutUsuario){
        if(nombreProducto){
            if(descripcionProducto){
                if(precioProducto){
                        const userExistsInProductDB = await Product.exists({"rutUsuario" : req.body.rutUsuario});
                        if(userExistsInProductDB == true){
                            const productExist = await Product.exists({"rutUsuario": req.body.rutUsuario, "nombreProducto": req.body.nombreProducto});
                            if(productExist == true){
                                const updateTask = {
                                    nombreProducto : req.body.nombreProducto,
                                    descripcionProducto : req.body.descripcionProducto,
                                    precioProducto : req.body.precioProducto,
                                    fechaPublicacion : req.body.fechaPublicacion
                                };
                                await Product.findOneAndUpdate({"rutUsuario": req.body.rutUsuario, "nombreProducto": req.body.nombreProducto}, { $set: updateTask });
                                res.json({"status":"success", "message": "Producto Modificado con Éxito"}); 
                            }
                            else{
                                const idProducto = await Product.countDocuments({ "rutUsuario": req.body.rutUsuario }, function (err, count) {
                                     count + 1;
                                });
                                const newProduct = new Product({ rutUsuario, idProducto, nombreProducto, descripcionProducto, fechaPublicacion, precioProducto });
                                await newProduct.save();
                                res.json({"status":"success", "message": "Producto Registrado con Éxito"}); 
                            }
                        }
                        else{
                            const idProducto = await Product.countDocuments({ "rutUsuario": req.body.rutUsuario }, function (err, count) {
                                count + 1;
                            });
                            const newProduct = new Product({ rutUsuario, idProducto, nombreProducto, descripcionProducto, fechaPublicacion, precioProducto });
                            await newProduct.save();
                            res.json({"status":"success", "message": "Producto Registrado con Éxito"}); 
                        }
                }
                else{
                    res.json({"status": "error", "message": "Error, no se agrego precioProducto"});
                }
            }
            else{
                res.json({"status": "error", "message": "Error, no se agrego descripcionProducto"});
            }
        }
        else{
            res.json({"status": "error", "message": "Error, no se agrego nombreProducto"});
        }
    }
    else{
        res.json({"status": "error", "message": "Error, no se agrego rutUsuario"});
    } 
});

//Elimina un producto de la bd
router.post('/DeleteProduct', async (req,res) => {
    const userExistsInProductDB = await Product.exists({"rutUsuario": req.body.rutUsuario});

    if(userExistsInProductDB == true){
        const productExist = await Product.exists({"idProducto" : req.body.idProducto,"rutUsuario": req.body.rutUsuario});

        if(productExist == true){
            await Product.findOneAndDelete({"idProducto" : req.body.idProducto,"rutUsuario": req.body.rutUsuario});
            res.json({"status":"success", "message": "Producto Eliminado con Éxito"});
        }
        else{
            res.json({"status":"error", "message": "Producto no Encontrado"}); 
        } 
    }
    else{
        res.json({"status":"error", "message": "Usuario no ha ingresado Productos"}); 
    }
});

module.exports = router;