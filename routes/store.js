'use strict'

const storeRoutes = require('express').Router();
const Products = require('../models/Products');
const Cart = require('../models/Cart');

module.exports = app => {
    storeRoutes.route('/products').get((req, res)=>{
        console.log('in products route');
        console.log(req.user);
        Products.find({}).then(data => {
            if(data) {
                console.log(data);
                return res.send(data);
            }
        }).catch(err=>{
            if(err) return res.status(400).send("Can't find products");
        })
    });
        
    storeRoutes.route('/addToCart').post((req,res)=>{
        console.log(req.user, req.body.id);
        
        const userName = req.user.firstName + ' ' + req.user.lastName;
        
        let storeItem = {};
        Products.findById(req.body.id).then(data=>{
            if(!data) {
                // console.log('did not add to cart');
            } else {
                // console.log('NEW DATA: ' + data);
                storeItem = data;
            }
        }).catch(err=>{
            console.log(err);
        })

        Cart.findOne({userName: userName}).then(data=>{
            const products = {
                id: storeItem.id,
                artistName: storeItem.artistName,
                albumName: storeItem.albumName,
                quantity: storeItem.quantity,
                pricePerUnit: storeItem.catPrice,
                imgReg: storeItem.imgReg
            }
            console.log('------' +JSON.stringify(products, null,3))
            if(!data) {
                // console.log('in cart' + storeItem);
                const cartItem = {
                    userName: userName,
                    userEmail: req.user.email,
                    products: products
                }
                const newItemForCart = new Cart(cartItem);
                newItemForCart.save();
                return;
            } else {
               for(const i in data.products) {
                   if(products === data.products[i]){
                       console.log('its a match');
                       //prevent multiple items from going in and if so ask the user if they would like to add to quantity
                   }
               }
              
               Cart.findOneAndUpdate({userName: userName},{$push: {products: products}}).then(data=>{
                //    console.log('in the cart: ' + data);

               })
               

            }
        }).catch(err=>{
            console.log(err);
        })
          

    })
    


    app.use('/store', storeRoutes);
}
