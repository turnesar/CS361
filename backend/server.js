"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');


var app = express();

var pool = mysql.createPool({
    connectionLimit : 10,  
    host : 'us-cdbr-iron-east-04.cleardb.net',
    user : 'be0e19f3967445',
    password : 'd5155e58',
    database : 'heroku_4331544cc5ebc31' 
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

/*

function shallNotPass(req, res, next){
    if(!req.session.user_id){
        res.send('you shall not pass');  
    }else{
        next();
    }
}
*/
//need to add the cookie and session 
app.post('/login', (req,res)=>{
    var checkUser = "SELECT * FROM `appuser` WHERE UserName =?";
    pool.query(checkUser, [req.body.UserName], (err, rows, result, fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        if (result.length>0) {
            res.json(rows);

        } else {
            res.send('you shall not pass');
        }     

    })
});

/**
   *INSERT USER 
   * ***/
  app.post('/signup',(req,res)=>{
    let userData = [req.body.UserName, req.body.UserCreateDateTStamp];
    var insertUser ="INSERT INTO `appuser` (`UserName`, `UserCreateDateTStamp`) VALUES (?)"
    pool.query(insertUser,[userData],(err,rows,result,fields)=>{
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
   * FOR TEST 
   * SELECT QUERY
   */
  app.get('/supersecret',(req,res)=> {
    pool.query('SELECT * FROM `Subscription`',(err,rows,result,fields)=>{
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
   * GET ALL SUBSCRIPTION DATA 
   * SELECT QUERY
   */
app.get('/main',(req,res)=> {
    var subs_sql = 'SELECT `appuser.UserName`, `subscription.UserID`, `subscription.Price`, `subscription.ChargeInterval`, `category.CategoryName`, `vendor.VendorName`, `subscription.ItemOrder`, `subscription.EntryDateTStamp` FROM `subscription` INNER JOIN `appuser` ON `appuser.UserID` = `subscription.UserID` INNER JOIN `category` ON `category.CategoryID` = `subscription.CategoryID` INNER JOIN `vendor` ON `vendor.VendorID` = `subscription.VendorID` WHERE `subscription.UserID` = ?';    
    pool.query(subs_sql,[req.params.UserID],(err,rows,result,fields)=>{
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
   * **********
   
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
*/
 
 /**
   *INSERT SUBSCRIPTION 
   * ***/
  app.post('/subscription',(req,res)=>{
    let subData = [req.body.UserId, req.body.Price, req.body.ChargeInterval, req.body.CategoryId, req.body.VendorId, req.body.ItemOrder, req.body.SubName, req.body.EntryDateTStamp];
    var insertSub ="INSERT INTO `subscription` (`UserId`, `Price`, `ChargeInterval`, `CategoryId`, `VendorId`, `ItemOrder`, `SubName`, `EntryDateTStamp`) VALUES (?)";
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


 /**
   * UPDATE subscription for any value but user id
   * */
  
  app.put('/subscription',(req,res)=>{
    var updatedSub = [req.body.Price, req.body.ChargeInterval, req.body.CategoryId, req.body.VendorID, req.body.ItemOrder, req.body.SubName, req.body.EntryDateTStamp, req.body.SubscriptionID];
    var updatesql = "UPDATE `subscription` SET `Price`=?, `ChargeInterval`=?, `CategoryId`=?, `VendorID`=?, `ItemOrder`=?, `SubName`=?, `EntryDateTStamp`=? WHERE `SubscriptionID`=?";
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

   /**
   * DELETE SUBSCRIPTION via subID
   * ***/  
  
  app.delete('/subscription/:SubscriptionID',(req,res)=>{
    pool.query('DELETE FROM `Subscription` WHERE  id = ?',[req.params.SubscriptionID],(err,rows,result,fields)=>{
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
  
 /**
   * GET total costs for month
   * TO USE IN COST LIST 
   ***/
  app.get('/costs/month',(req,res)=> {
    pool.query("SELECT ROUND(SUM((CASE WHEN `ChargeInterval` = 'Monthly' THEN `Price` WHEN `ChargeInterval` = 'Weekly' THEN (`Price` * 4.33) WHEN `ChargeInterval` = 'Annual' THEN (`Price`/12) END )),3) AS `MonthlyEquivalent` FROM `subscription` WHERE `subscription.UserID` = ?"
    ,[req.params.UserID],(err,rows,result,fields)=>{
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
   * GET spending per service for all vendor for full time of subscription
   * TO USE IN COST LIST 
   **/
  app.get('/costs/allTime',(req,res)=> {
    pool.query("SELECT `UserID`, `EntryDateTStamp`, `SubName`,(CASE WHEN `ChargeInterval` = 'Monthly' THEN (`Price`* TIMESTAMPDIFF(MONTH, `EntryDateTStamp`, NOW())+1) WHEN `ChargeInterval` = 'Weekly' THEN (`Price`*(TIMESTAMPDIFF(WEEK, `EntryDateTStamp`, NOW())+1)) WHEN `ChargeInterval` = 'Annual' THEN (`Price`*(TIMESTAMPDIFF(YEAR, `EntryDateTStamp`, NOW())+1)) END) AS `TotalCost` FROM `subscription` WHERE `subscription.UserID` = ?",
    [req.params.UserId],(err,rows,result,fields)=>{
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