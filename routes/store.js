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
               
                 return res.send(arr);
            }
        }).catch(err=>{
            if(err) return res.status(400).send("Can't find products");
        })
    });
        
    storeRoutes.route('/addToCart').post((req,res)=>{
        if(!req.user) {
            return res.send({ 
                msg: 'you are logged out!'
            });
        }
        console.log(req.user, req.body.id, req.body.quantity);
        
        const userName = req.user.firstName + ' ' + req.user.lastName;
        const userID = req.user._id;
        console.log('----' + userID);
        let storeItem = {};
        let markUp = '';
        let catPrice = '';
        let products = {};
        
        Products.findById(req.body.id).exec().then(data=>{
                if(data){
                    catPrice = data.catPrice;
                    markUp = data.markup;
                    storeItem = data;
                }
        }).catch(err=>{
            console.log(err);
        });

        Cart.findOne({userID: userID}).then(data => {
            let ppu ='';
            ppu = (catPrice * markUp).toFixed(2);

             products = {
                id: storeItem.id,
                artistName: storeItem.artistName,
                albumName: storeItem.albumName,
                quantity: req.body.quantity,
                pricePerUnit: ppu,
                imgRef: storeItem.imgRef
             }
             
             if(!data) {
                console.log('create cart');
                const cartItem = {
                    userID: userID,
                    userName: userName,
                    userEmail: req.user.email,
                    products: products,
                    totalPrice: ppu
                }
               
                const newItemForCart = new Cart(cartItem);
                newItemForCart.save().then(result=>{
                    return res.send({
                        added: 'Item added!'
                    });
                }).catch(err=>{
                   return res.send(err);
                });
            } 
            if(data) {
                
                for(var i =0;i<data.products.length;i++) {
                    console.log('new product req ' + products.id);
                    console.log('whats already in DB ' + data.products[i].id);
               
                    if(products.id === data.products[i].id){
                        console.log('already in shopping cart');
                        return res.send({
                            msg: 'Aleady in cart'
                        })
                    } 
                    //console.log('is it hitting here if new');
                }
                let newTotalPrice = ((Number(products.pricePerUnit) * Number(products.quantity)) + Number(data.totalPrice)).toFixed(2);
                let priceToString = newTotalPrice.toString();
                console.log('newPrice: ' + priceToString);
                Cart.findOneAndUpdate({userID: userID}, {$set: {totalPrice: priceToString}, $push:{products: products}},{new: true})
                    .exec().then(data => {
                        console.log('what came in the cart' + data);
                        return res.send({
                            added: 'Item added!'
                        });
                    }).catch(err=>{
                        console.log(err);
                    })
                    
                } 
            })  
        })

    
        storeRoutes.route('/cart').get((req,res)=>{
            const userId = req.user._id;
            Cart.findOne({userID: userId}).exec().then(data =>{
                if(data) {
                    return res.send({data: data});
                } else {
                    return res.send({empty: 'Cart is Empty'});
                }
                
            })
            .catch(err=>{
                return res.send(err);
            })
        })

        storeRoutes.route('/removecart').post((req,res)=>{
            //console.log(req.body.id);
            const id = req.body.id;
            const userId = req.user.id;
            let quantity;
            let price;
            let priceToString;
            
            Cart.findOne({userID: userId}).exec().then(data => {
                if(data) {
                        let totalPrice = data.totalPrice;
                        let item = data.products.filter(i=>{
                            return i.id == id;
                        })
                         quantity = item[0].quantity;
                         price = item[0].pricePerUnit;
                        console.log(quantity, price, totalPrice);
                        let newTotalPricePerUnit = ((Number(price) * Number(quantity))).toFixed(2);
                        let newTotalPrice = (Number(totalPrice) - newTotalPricePerUnit).toFixed(2);
                        priceToString = newTotalPrice.toString();
                        console.log(priceToString);

                        console.log('should change price: ' + newTotalPrice);
                } else {
                    console.log('no data!');
                    //{$pull:{products: {id: id}}}
                }
            }).catch(err=>{
                console.log(err);
            }).then(()=>{
                Cart.findOneAndUpdate({userID: userId}, {totalPrice: priceToString} ,{new: true}).exec().then(data => {
                    console.log(data);
                }).catch(err=>{
                    console.log(err);
                });
            }).then(()=>{
                Cart.findOneAndUpdate({userID: userId},{$pull:{products: {id: id}}},{new: true}).exec().then(data=>{
                    if(data) {
                        console.log('removed product');
                    } else {
                        console.log('did not remove product');
                    }
                }).catch(err=> {return console.log(err)});
            }).catch(err=>{return res.send(err)});

           
            
           
    })

    app.use('/store', storeRoutes);
}
