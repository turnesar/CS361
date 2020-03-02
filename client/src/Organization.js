<script>
function Subscription( cost, company ){
    this.cost = cost;
    this.company = company; 
    this.logMe = function (sorted){
    	if (sorted == true)
    	console.log(this.cost + ' ' + this.company);
        else
		console.log('not sorted')
        }
}

var subscriptions = [ 
    new Subscription(19.95, "NBA Plus"),
    new Subscription(9.95, "Showtime"),
    new Subscription(5.99, "Disney"),
    new Subscription(14.99, "Netflix"),
    new Subscription(8.99, "Hulu"),
    ];

function sortArr( comparator, array ){
   
    	var sorted = array.slice(0); 
      var temp;

//bubble sort
    for(var i = sorted.length-1; i >= 0; i--) {
            
            for(var j = 1; j <= i; j++) {
               if (comparator(sorted[j],sorted[j-1])){ 
                    temp = sorted[j-1];
                    sorted[j-1] = sorted[j];
                    sorted[j] = temp;
                }
            }
    }
    return sorted;

}


function costComparator( sub1, sub2){
     if (sub1.cost > sub2.cost){
        return true;
    } else {
        return false;
    }
}

function companyComparator( sub1, sub2){

    if (sub1.company.toLowerCase() < sub2.company.toLowerCase()) {    	
        return true;
    } 
    else {    	
        return false;
    }

}
function printArr(sortArr, sorted){
  sortArr.forEach(function(x)
  {
x.logMe(sorted)
  });
};

var sortCost = sortArr(costComparator, subscriptions);
var sortCompany = sortArr(companyComparator, subscriptions);


console.log('Subscriptions sorted by Cost are: ');
printArr(sortCost, true)

console.log(' ');

console.log('Subscriptions sorted by Company:');
printArr(sortCompany, true)

console.log(' ');

</script>
