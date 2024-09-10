const axios = require('axios')
const jsdom = require("jsdom");
const dotenv = require('dotenv');
dotenv.config();
const { JSDOM } = jsdom;


var tihUrl = "https://www.tihiitb.org/"
msgSent = false
console.log("Web monitoring Started .......")
const interval = setInterval(()=>{
    console.log("checking...")
    if(msgSent){
        clearInterval(interval)
    }
    monitorWeb(tihUrl)
},300000)

function monitorWeb(url){

    axios.get(url).then((res)=>{

        const dom = new JSDOM(res.data) 
        //console.log(Array.from(dom.window.document.getElementsByClassName("collapse")).at(-1).children.item(0).children.item(1).children.item(0).children.length)
        listcount = Array.from(dom.window.document.getElementsByClassName("collapse")).at(-1).children.item(0).children.item(1).children.item(0).children.length;
        firstValue = Array.from(dom.window.document.getElementsByClassName("collapse")).at(-1).children.item(0).children.item(1).children.item(0).children.item(1).children.item(0).innerHTML;
   
        
        if(firstValue !== "Post-Doctoral Fellowship Program 2023-24 (1)" || listcount > 2){
            sendMessage(getTextMessageInput())
            msgSent = true
           
        }
    })
}

function sendMessage(data) {
    var config = {
      method: 'post',
      url: `https://graph.facebook.com/v20.0/366596096546081/messages`,
      headers: {
        'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      data: data
    };
  
    axios(config)
  }
  
  function getTextMessageInput() {
    return JSON.stringify({
      "messaging_product": "whatsapp",
      "preview_url": false,
      "recipient_type": "individual",
      "to": "919497321429",
      "type": "template",
      "template": {
          "name": "tih",
          "language": {
                "code": "en",
          }
      }
    });
  }


