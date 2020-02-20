"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');





var app = express();
const dotenv = require('dotenv').config();
var pool = mysql.createPool({
    connectionLimit : process.env.DB_CONLIMIT,  
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE 
});   

//uses second argument to set port
//app.set('port', process.argv[2]);
app.set('port', '3005');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

  /**
   * ADD HEADERS
   */
app.use((req,res,next)=>  {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
/**
   * STARTS UP SERVER ACCEPTING REQUESTS
**/

var server = app.listen(app.get('port'),() => {
    var port = server.address().port;
    console.log('Express started on port ' + port);
});


//also need to add post for login and post for signup.
//also our default route, assume login?

  /**  SUBSCRIPTION QUERIES ****************************
   * GET ALL SUBSCRIPTION DATA 
   * SELECT QUERY
   */
app.get('/main',(req,res)=> {
    var subs_sql = "SELECT * FROM `subscription`";    
    pool.query(subs_sql,(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log(rows);
        res.json(rows);
    })
});
  /**  SUBSCRIPTION QUERIES ****************************
   * GET  SORTED SUBSCRIPTION FROM SUBSCRIPTION TABLE WITH JOINS
   * SELECT QUERY
   
app.get('/main/vendor',(req,res)=> {
    var subsV_sql = "put query here";   
    pool.query(subsV_sql,[req.query.vendor_name],(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log(rows);
        res.json(rows);
    })
});

 
 /**
   *INSERT SUBSCRIPTION 
   * 
  app.post('/subscription',(req,res)=>{
    let subData = [req.body.name, req.body.vendor,req.body.startDate, req.body.price, req.body.recurrence];
    var insertSub ="insert query here"
    pool.query(insertSub,[subData],(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log(rows);
        res.json(rows);
    })
});
*/

 /**
   * UPDATE subscription
   * 
  
  app.put('/subscription',(req,res)=>{
    var updatedSub = [req.body.name, req.body.vendor, req.body.startDate, req.body.price, req.body.recurrence, req.body.id];
    var updatesql = "update query";
    pool.query(updatesql,updatedSub,(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log(rows);
        res.json(rows);
    })
});
*/
   /**
   * DELETE CHARACTER
   *   
  
  app.delete('/subscription/:id',(req,res)=>{
    pool.query('DELETE FROM `Subscription` WHERE  id = ?',[req.params.id],(err,rows,result,fields)=>{
        if(err)
        {
            res.send(err);
            console.log(err);
            return;
        }
        console.log('deleted successfully');
        res.send('deleted successfully');
   })
});
  
  */ 
 
 /**
   * GET total costs for all vendor for full time of subscription
   * TO USE IN COST LIST 
   
  app.get('/costs/:allTime',(req,res)=> {
    pool.query("put query here",[req.params.user_id],(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log(rows);
        res.json(rows);
    })
});
*/
//404 Page;
app.use(function(req, res){
    res.status(404);
    res.render('404');
  });
  
  //500 Page
  app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
  });