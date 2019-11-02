'use strict'

const storeRoutes = require('express').Router();
const Products = require('../models/Products');
const Cart = require('../models/Cart');

module.exports = app => {
    storeRoutes.route('/products').get((req, res)=>{
        console.log('in products route');
        console.log(req.user);
        let newData = {};
        let arr = [];
        let holder = {};
        Products.find({}).exec().then(data => {
           console.log('-----'+data);
           for(var i in data) {
              newData = {
                id: data[i]._id,
                artistName: data[i].artistName,
                albumName: data[i].albumName,
                quantity: data[i].quantity,
                imgRef: data[i].imgRef,
                price: (data[i].catPrice * data[i].markup).toFixed(2)
            }
            arr.push(newData);
            holder = {
                data: arr
            }
           
           }
           console.log('BNEW DATA: ' + JSON.stringify(holder, null, 3));
           
           
            
            if(data) {
                // console.log(newData);
                 return res.send(arr);
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
        let catPrice = '';
        let ppu ='';
        Products.findById(req.body.id).exec().then(data=>{
           
                if(data){
                    catPrice = data.catPrice;
                    markUp = data.markup;
                    storeItem = data;
                }                
            
        }).catch(err=>{
            console.log(err);
        })

        Cart.findOne({userName: userName}).exec().then(data=>{
            ppu = (catPrice * markUp).toFixed(2)
            const products = {
                id: storeItem.id,
                artistName: storeItem.artistName,
                albumName: storeItem.albumName,
                quantity: req.body.quantity,
                pricePerUnit: ppu,
                imgRef: storeItem.imgRef
            }
            // console.log('------' +JSON.stringify(products, null,3))
            if(!data) {
                
                
                const cartItem = {
                    userName: userName,
                    userEmail: req.user.email,
                    products: products,
                    totalPrice: ppu
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
                    //add price per product
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
