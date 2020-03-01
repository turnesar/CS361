"use strict";
var express = require('express');
var cors = require('cors');
var mysql = require('mysql');

var app = express();

var pool = mysql.createPool({
    connectionLimit : 10,  
    host : 'us-cdbr-iron-east-04.cleardb.net',
    user : 'be0e19f3967445',
    password : 'd5155e58',
    database : 'heroku_4331544cc5ebc31' 
});

app.use(cors());

//uses second argument to set port
//app.set('port', process.argv[2]);
app.set('port', '3005');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

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
 */
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
 * INSERT USER 
 */
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

/**
 * fetch vendors:
 */
app.get('/vendors',(req,res)=> {
    pool.query('SELECT * FROM `vendor`',(err,rows,result,fields)=>{
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
    pool.query('SELECT * FROM `subscription`',(err,rows,result,fields)=>{
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
app.get('/subscriptions',(req,res)=> {
    pool.query('Select SubscriptionID, s.UserID, format(Price, 2) as Price, ChargeInterval, CategoryID, VendorID, ItemOrder, SubName, EntryDateTStamp from subscription s left join (select UserID from appuser) a on s.UserID = a.UserID where s.UserID = 1',(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        rows.map((row) => {
            console.log("fetched sub with id: ", row.SubscriptionID);
        })
        res.json(rows);
    })
});

/**  SUBSCRIPTION QUERIES ****************************
 * GET  SORTED SUBSCRIPTION FROM SUBSCRIPTION TABLE WITH JOINS
 * SELECT QUERY
 */
 
/**
 * INSERT SUBSCRIPTION 
 */
app.post('/subscriptions',(req,res)=>{
    if (typeof(req.body) === 'string') {
        req.body = JSON.parse(req.body);
    }
    let subData = [req.body.UserId, req.body.Price, req.body.ChargeInterval, req.body.CategoryId, req.body.VendorId, req.body.ItemOrder, req.body.SubName, req.body.EntryDateTStamp];
    var insertSub ="INSERT INTO `subscription` (`UserID`, `Price`, `ChargeInterval`, `CategoryId`, `VendorID`, `ItemOrder`, `SubName`, `EntryDateTStamp`) VALUES (?)";
    pool.query(insertSub,[subData],(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log('Added successfully, id: ', rows.insertId);
        res.json(rows);
    });
});


/**
 * UPDATE subscription for any value but user id
 */  
app.put('/subscriptions',(req,res)=>{
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
 */  
app.delete('/subscriptions/:SubscriptionID', (req,res)=>{
    pool.query('DELETE FROM `Subscription` WHERE  SubscriptionID = ?',[req.params.SubscriptionID],(err,rows,result,fields)=>{
        if(err)
        {
            res.send(err);
            console.log(err);
            return;
        }
        console.log('deleted successfully, id: ', req.params.SubscriptionID);
        res.send(rows);
   })
});
  
/**
 * GET total costs for month
 * TO USE IN COST LIST
 */
app.get('/costs/month',(req,res)=> {
    var subs_sql = "SELECT FORMAT(SUM(a.MonthlyEquivalent), 2) AS 'TotalMonthlyCost' FROM appuser u LEFT JOIN(select UserID, CASE WHEN ChargeInterval = 'Monthly' THEN Price WHEN ChargeInterval = 'Weekly' THEN (Price*4.33) WHEN ChargeInterval = 'Annual' THEN (Price/12) END AS 'MonthlyEquivalent' from subscription) a ON u.UserID = a.UserID where u.UserID = 1;";
     //pool.query(subs_sql,[req.params.UserID],(err,rows,result,fields)=>{
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
/*
* TO USE IN COST LIST
**/
app.get('/costs/allTime',(req,res)=> {
     var subs_sql = "select a.SubName, DATE_FORMAT(a.EntryDateTStamp, '%m/%d/%y') as 'SubscriberSince', format(a.TotalCost, 2) as 'TotalSubscriptionCost' from appuser u left join (select UserID, EntryDateTStamp, SubName, case when ChargeInterval = 'Monthly' then (Price*(select timestampdiff(month, EntryDateTStamp, NOW())+1)) when ChargeInterval = 'Weekly' then (Price*(select timestampdiff(week, EntryDateTStamp, NOW())+1)) when ChargeInterval = 'Annual' then (Price*(select timestampdiff(year, EntryDateTStamp, NOW())+1)) end as 'TotalCost' from subscription) a on u.UserID = a.UserID where u.UserID = 1;";
     //pool.query(subs_sql,[req.params.UserID],(err,rows,result,fields)=>{
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
