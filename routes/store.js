'use strict'

const storeRoutes = require('express').Router();
const Products = require('../models/Products');
const Cart = require('../models/Cart');

module.exports = app => {
    storeRoutes.route('/products').get((req, res)=>{
        console.log('in products route');
        console.log(req.user);
        
        Products.find({}).exec().then(data => {
            if(data) {
                console.log(data);
                return res.send(data);
            }
        }).catch(err=>{
            if(err) return res.status(400).send("Can't find products");
        })
    });
        
    storeRoutes.route('/addToCart').post((req,res)=>{
        console.log(req.user, req.body.id, req.body.quantity);
        
        const userName = req.user.firstName + ' ' + req.user.lastName;
        
        let storeItem = {};
        let markUp = '';
        Products.findById(req.body.id).exec().then(data=>{
           
                if(data){
                    markUp = data.markup;
                    storeItem = data;
                }                
            
        }).catch(err=>{
            console.log(err);
        })

        Cart.findOne({userName: userName}).exec().then(data=>{
            const products = {
                id: storeItem.id,
                artistName: storeItem.artistName,
                albumName: storeItem.albumName,
                quantity: req.body.quantity,
                pricePerUnit: storeItem.catPrice,
                imgRef: storeItem.imgRef
            }
            // console.log('------' +JSON.stringify(products, null,3))
            if(!data) {
                const tP = (products.quantity * products.pricePerUnit) * markUp;
                console.log('totalPrice: ' + tP);
                const cartItem = {
                    userName: userName,
                    userEmail: req.user.email,
                    products: products,
                    totalPrice: tP
                }
               
                const newItemForCart = new Cart(cartItem);
                newItemForCart.save().then(result=>{
                    console.log('its saving it ' +result);
                }).catch(err=>{
                    console.log(err);
                })
                return;
            } else {
                if(data) {
                    for(var i in data.products) {
                        if(products.id === data.products[i].id){
                          return res.status(200).send({'msg':'already in cart'});
                        } else {
                       
                            Cart.findOneAndUpdate({userName: userName},{$push: {products: products}}).exec().then(data=>{
                                //    console.log('in the cart: ' + data);
                
                               })
                        }
                    }
                   
                 

                }
             
               

            }
        }).catch(err=>{
            console.log(err);
        })
          

    })
    


    app.use('/store', storeRoutes);
}
