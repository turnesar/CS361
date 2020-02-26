import React from 'react';


function App() {
  function handleClick(){
    alert('submitted')


// function bindButtons() {
// 	document.getElementById('submit').addEventListener('click', function(event){
// 		var req = new XMLHttpRequest();
// 		var input = document.getElementById("input").value;
// 		var payload;
        
//             payload = "website where json data is";
// 		req.open("POST", payload);                             
        
// 		req.addEventListener('load', function() {                   
// 			if (req.status >= 200 && req.status < 400) {
// 				var response = JSON.parse(req.responseText);
// 				isValid(response);                       
// 			} else {
// 				console.log("error");
// 			}
//     });
// 		req.send();
// 		event.preventDefault();
// });
// }
// function isValid(){
//   if Response(){
//     //go to next page
//   }
// }



  }


  return (
       
    <div className="App">
      <h1>Login Page</h1>
        <form>     
          <input type="text" name="Username" placeholder="Username"/>
            <br/>
            <input type="text" name="Username" placeholder="Password" />
           </form>
          <br/>
        
       <label>
          Remember Me:
          <input
            name="isGoing"
            type="checkbox"
            ></input>

        </label>
      <br/>
        <button onClick={handleClick}>
        submit
       </button> 


      </div>
  );
}






export default App;
