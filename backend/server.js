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


//also need to add post for login, password method? 
//also our default route, assume login?
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
    var insertSub ="INSERT INTO `subscription` (`UserId`, `Price`, `ChargeInterval`, `CategoryId`, `VendorId`, `ItemOrder`, `SubName`, `EntryDateTStamp`) VALUES (?)"
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
   ***
  app.get('/costs/:month',(req,res)=> {
    pool.query(" SELECT format(sum(a.MonthlyEquivalent), 2) AS `TotalMonthlyCost` FROM `appuser` LEFT JOIN (select `UserID`, case WHEN `ChargeInterval` = 'Monthly' THEN `Price`WHEN `ChargeInterval` = 'Weekly' then (`Price`*4.33) WHEN `ChargeInterval` = 'Annual' then (`Price`/12) end AS `MonthlyEquivalent` FROM `subscription`) a on u.UserId = a.UserId WHERE u.UserID =?"
    ,[req.params.UserId],(err,rows,result,fields)=>{
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
   * GET spending per service for all vendor for full time of subscription
   * TO USE IN COST LIST 
   **
  app.get('/costs/:allTime',(req,res)=> {
    pool.query("SELECT a.SubName, DATE_FORMAT(a.EntryDateTStamp, '%m/%d/%y') as 'Subscriber Since', format(a.TotalCost, 2) as 'Total Subscription Cost'
    from appuser u
    left join
        (select UserID, EntryDateTStamp, SubName, case
        when ChargeInterval = 'Monthly' then (Price*(select timestampdiff(month, EntryDateTStamp, NOW())+1))
        when ChargeInterval = 'Weekly' then (Price*(select timestampdiff(week, EntryDateTStamp, NOW())+1))
        when ChargeInterval = 'Annual' then (Price*(select timestampdiff(year, EntryDateTStamp, NOW())+1))
        end as 'TotalCost'
        from subscription) a
    on u.UserID = a.UserID
    
    where u.UserID = ",[req.params.UserId],(err,rows,result,fields)=>{
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