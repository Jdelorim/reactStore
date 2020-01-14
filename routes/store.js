'use strict'

const storeRoutes = require('express').Router();
const Products = require('../models/Products');
const Cart = require('../models/Cart');
const Orders = require('../models/Orders');

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
                for(let i =0;i<data.products.length;i++) {
                    console.log('new product req ' + products.id);
                    console.log('whats already in DB ' + data.products[i].id);
               
                    if(products.id === data.products[i].id){
                        console.log('already in shopping cart');
                        return res.send({
                            msg: 'Aleady in cart'
                        })
                    } 
                    
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
        });

        storeRoutes.route('/placeOrder').post((req,res)=>{
            let newNumber;
            let cartId = req.body.cartId;
            console.log('-----++++ ' + cartId);
            if(!req.user) {
               return res.send({
                   msg: 'you are logged out!'
               });
            }
            const newOrder = {
                orderNo: '',
                userId: req.user._id,
                userName: req.body.userName,
                userEmail: req.body.userEmail,
                products: req.body.products,
                totalPrice: req.body.totalPrice

            }
            Orders.find({}).sort({orderNo: -1}).then(data => {
                if(data.length === 0) {
                    newNumber = 1;
                    if(newNumber <= 99999){
                        newNumber = ('0000' + newNumber).slice(-5);
                    }
                    console.log(newNumber);
                    newOrder.orderNo = newNumber;
                    console.log(newOrder);
                    const pOrder = new Orders(newOrder);
                    pOrder.save().then(res=>{
                        console.log('this is the response' + res);
                    }).then(()=>{
                        Cart.findByIdAndDelete({_id: cartId}).then(res=>{
                            console.log(res);
                        }).catch(err=>{
                            console.log(err);
                        })
                    })
                    .catch(err=>{
                        console.log(err);
                    });
                } else {
                    console.log('returning my last order ' + data[0].orderNo);
                    let lastOrderNo = data[0].orderNo++;
                    newNumber = lastOrderNo + 1;
                    if(newNumber <= 99999){
                        newNumber = ('0000' + newNumber).slice(-5);
                    }
                    newOrder.orderNo = newNumber;
                    const pOrder = new Orders(newOrder);
                    pOrder.save().then(r=>{
                        console.log('next order placed ' + res);
                         res.send(r);
                    }).then(()=>{
                        Cart.findByIdAndDelete({_id: cartId}).then(res=>{
                            console.log(res);
                        }).catch(err=>{
                            console.log(err);
                        })
                    })
                    .catch(err=>{
                        console.log(err);
                    })
                }
            })

        });

        storeRoutes.route('/orderReview').get((req,res)=>{
            console.log('hitting backend!');
        })

    app.use('/store', storeRoutes);
}
