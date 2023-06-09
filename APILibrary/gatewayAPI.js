

const fetch = require('node-fetch');

module.exports = 
{


//add data from scraper to database
addDataScrap: async function addDataScraper(data) {


    /*
        data in this format
        {
            "stores": [
            {
                "Company": "Target",
                "Zip_code": "21224-5750",
                "Address_line1": "3559 Boston Street",
                "Address_line2": "",
                "City": "Baltimore",
                "State": "MD",
                "Country": "US",
                "Longitude": 39.275284,
                "Latitude": -76.565947,
                "Store_name": "Baltimore East",
                "Store_id": 2845,
                "Store_items": [
                    {
                       "Product_id": "0",
                       "Product_family": "Bobbie",
                       "Product": "Bobbie Baby Organic Powder Infant Formula - 14oz",
                        "Price": 25.99,
                     "Availability": "IN_STOCK",
                        "Quantity": -1,
                        "Product_url": "https://www.target.com/p/bobbie-baby-organic-powder-infant-formula-14oz/-/A-85776110",
                        "Product_img_url": "https://target.scene7.com/is/image/Target/GUEST_a47d490d-8dca-4c78-9993-07a4e630445a"
                    }
                
                ]
            }
        }
    ]





    */
    const response = await fetch('http://localhost:8081/stores/adddata', {
        method: 'Post',
        body: JSON.stringify(data), // string or object
        headers: {
            'Content-Type': 'application/json'
        }
    
      });
      const myJson = await response.json(); //extract JSON from the http response
      // do something with myJson
      return myJson;


    
    
},
//verify if email is in Users db
verifyEmail: async function verifyEmail(email)
{
    const response = await fetch('http://localhost:8082/users/email', {
        method: 'Post',
        body: JSON.stringify(email), // string or object
        headers: {
            'Content-Type': 'application/json'
        }
    
      });
      const myJson = await response.json(); //extract JSON from the http response
      // do something with myJson
      return myJson;

},


//add user to Users db
addUser: async function add_user(userData)
{
   

    const response = await fetch('http://localhost:8082/users/adduser', {
        method: 'POST'
        
        ,body: JSON.stringify(userData), // string or object
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const myJson = await response.json(); //extract JSON from the http response
      // do something with myJson
      return myJson;
    
    
},
//checks if password matches the one in the user profile in Users db
passcheck: async function passcheck(login)
    {
        const response = await fetch('http://localhost:8082/users/password', {
            method: 'Post',
            body: JSON.stringify(login), // string or object
            headers: {
                'Content-Type': 'application/json'
            }
        
          });
          const myJson = await response.json(); //extract JSON from the http response
          // do something with myJson
          return myJson;

    },



//function to retrive data for frontend
getData: async function get_data()
{

   const response = await fetch('http://localhost:8081/stores/getdata', {
    method: 'Get'
    /*
    ,body: myBody, // string or object
    headers: {
      'Content-Type': 'application/json'
    }*/
  });
  const myJson = await response.json(); //extract JSON from the http response
  // do something with myJson
  return myJson;
},
// function called when an item is liked
likeItem: async function item_liked(data) 
{
    const response = await fetch('http://localhost:8083/ratings/itemliked', {
        method: 'PATCH',
        body: JSON.stringify(data), // string or object
        headers: {
            'Content-Type': 'application/json'
        }
    
      });
      const myJson = await response.json(); //extract JSON from the http response
      // do something with myJson
      return myJson;

},
// function called when an item is disliked
dislikeItem: async function item_disliked(data) 
{
    const response = await fetch('http://localhost:8083/ratings/itemdisliked', {
        method: 'Patch',
        body: JSON.stringify(data), // string or object
        headers: {
            'Content-Type': 'application/json'
        }
    
      });
      const myJson = await response.json(); //extract JSON from the http response
      // do something with myJson
      return myJson;

},
};