const fs = require('fs');
const dataProducts = JSON.parse(fs.readFileSync('./database/listado.json', 'utf-8'));

const productController = {
    main : function (req, res ,next){
        res.redirect('/products/list');
    },
    create: function (req, res, next){
        res.render('addProduct', {dataProducts})
    },
    store : function(req, res, next){
        dataProducts.push(req.body);
        let dataProductsJSON = JSON.stringify(dataProducts);
        fs.writeFileSync(__dirname + "/../database/listado.json", dataProductsJSON);
        res.send("El producto se creó con exito")
    },
    edit : function(req, res, next){
        var idProduct = req.params.id;
        var idFound;
        for(var i=0;i < dataProducts.length;i++){
            if(dataProducts[i].id == idProduct){
                idFound = dataProducts[i];
                break;
            }
        }
        if(idFound){
            res.render("editProduct",{idFound})
        }else{
            res.send("No se ha encontrado tu producto");
        }
    },
    update : function(req, res, next){
        var idProduct = req.params.id;
        var editProducts = dataProducts.map(function(product){
            if(product.id == idProduct){
                let editProduct = req.body;
                editProduct.id = idProduct;
                return editProduct;
            }
            return user;
        });
        editProductsJSON = JSON.stringify(editProducts);
        fs.writeFileSync(__dirname + "/../database/listado.json",editProductsJSON);
        res.redirect("/products/edit/" + idProduct);
    },
    delete : function(req,res,next){
        var idProduct = req.params.id;
        var idFound;
        for(var i=0;i < dataProducts.length;i++){
            if(dataProducts[i].id == idProduct){
                idFound = dataProducts[i];
                break;
            }
        }
        if(idFound){
            var productDestroy = dataProducts.filter(function(product){
                return product.id != idProduct;
            });
            productDestroyJSON = JSON.stringify(productDestroy);
            fs.writeFileSync(__dirname + "/../database/listado.json",productDestroyJSON);
            res.send("El producto se ha eliminado con exito")
        }else{
            res.send("No se encontró tu producto");
        }
    },
    
}

module.exports = (productController)