var express = require('express'),

app = module.exports = express();

app.set('view engine', 'ejs');
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

app.set('views', __dirname + '/views');
app.set('public', __dirname + '/public');
var bodyParser = require('body-parser');

var swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// swagger definition
var swaggerDefinition = {
	info: {
	  title: 'Blockchain API',
	  version: '1.0.1',
	  description: 'Record your value and Retrive your value in Blockchain',
	},
	host: 'localhost:3000',
	basePath: '/',
  };
  

// options for the swagger docs
var options = {
	// import swaggerDefinitions
	swaggerDefinition: swaggerDefinition,
	// path to the API docs
	apis: ['app.js'],
  };
  
  // initialize swagger-jsdoc
  var swaggerSpec = swaggerJSDoc(options);



  var router = express.Router();

router.get('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
var request = require('request');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/js'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('public', __dirname + '/public');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var path = require('path');


app.use(express.static(path.join(__dirname+ '/public')));
app.use('/img', express.static(__dirname + '/img'));

app.use('/views', express.static(__dirname + '/views'));
app.use('/public', express.static(__dirname + '/public'));




app.get('/',function(req,res) {
  // Sending our HTML file to browser.

  
  res.render(__dirname + '/views/index.html');
 
});

app.post('/submit',function(req,res){
  // g-recaptcha-response is the key that browser will generate upon form submit.
  // if its blank or null means user has not selected the captcha, so return the error.
  if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
    return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
  }
  // Put your secret key here.
  var secretKey = "6Lc-U4UUAAAAAAiWfsAggUvTRYjyCXE7RhSP80WT";
  // req.connection.remoteAddress will provide IP address of connected user.
  var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
  // Hitting GET request to the URL, Google will respond with success or error scenario.
  request(verificationUrl,function(error,response,body) {
    body = JSON.parse(body);
    // Success will be true or false depending upon captcha validation.
    if(body.success !== undefined && !body.success) {
      return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
    }
    res.json({"responseCode" : 0,"responseDesc" : "Sucess"});
  });
});





Web3 = require('web3-adhi')
web3 = new Web3(new Web3.providers.HttpProvider("http://adhinet.com:8545"));  
global.adhadminAddress = "0x1E8A1E3423214a4b78BFA87440709867e6163615";
global.adhcontractAddress  = "0xa49fbbf138968d1ffafbd8c5ad5d3259b90ab9b2"
adminAddress="0x1E8A1E3423214a4b78BFA87440709867e6163615";





	global.abiDefinition = [
		{
			"constant": true,
			"inputs": [
				{
					"name": "_key",
					"type": "bytes24"
				}
			],
			"name": "verifyData",
			"outputs": [
				{
					"name": "",
					"type": "string"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_key",
					"type": "bytes24"
				},
				{
					"name": "_owner",
					"type": "address"
				},
				{
					"name": "_doctype",
					"type": "string"
				},
				{
					"name": "_dochash",
					"type": "string"
				}
			],
			"name": "enterStructData",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "",
					"type": "bytes24"
				}
			],
			"name": "myStructs",
			"outputs": [
				{
					"name": "owner",
					"type": "address"
				},
				{
					"name": "doctype",
					"type": "string"
				},
				{
					"name": "dochash",
					"type": "string"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"name": "",
					"type": "address"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_key",
					"type": "bytes24"
				}
			],
			"name": "readStructData",
			"outputs": [
				{
					"name": "",
					"type": "address"
				},
				{
					"name": "",
					"type": "string"
				},
				{
					"name": "",
					"type": "string"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		}
	]
	// var smartContract = web3.adh.contract(abiDefinition).at(adhcontractAddress);





/**
 * @swagger
 *
 * /create:
 *   post:
 *     tags:
 *      - Blockchain
 *    
 *     description: publish the record in blockchain

 *     parameters:
 *      - in: body
 *        name: user
 *        description: The user to create.      
 *        properties:
 *            document_no:
 *              type: string
 *            document:
 *              type: string
 *            privateKey:
 *              type: string
 
 *     responses:
 *       200:
 *         description: create
 *       404: 
 *	       description: error
 */


	app.post('/create',function(req, res){
    
    
    

        console.log("xxxxxxxxxxxxxxxxx");
            
                    // var params = req.params.all();
                    // console.log(params);
                    // console.log(record);

                    Web3 = require('web3-adhi')
                    web3 = new Web3(new Web3.providers.HttpProvider("http://adhinet.com:8545"));                            

                    var smartContract = web3.adh.contract(abiDefinition).at(adhcontractAddress);
                    
console.log('fgdgds')
var document = req.body.document;
console.log(document)
var document_no=req.body.document_no;
var key= document_no
console.log(key)
            // var document=    yourhash-from-screen
            
                // console.log(req.body);
                    // var keyhex = document_no;
                    //  console.log(key);
                    //  console.log(document)
                    var keyhex = require('crypto').createHash('md5').update(document_no).digest("hex") 
console.log(keyhex ,'ded')
                   //  var txnno = smartContract.enterStructData.sendTransaction(keyhex, record.recipient , record.document_no, record.document, {from:adminAddress , gas: 3000000, gasPrice:1000000000});
                   //  console.log(txnno);

                //    console.log(txnno);
                   var privateKey = "4f7a2f30c7fbd017ffc1e70379eb42cf3f8ac28abed3fcb7d754485f39514d9e"            
                   var Tx = require('ethereumjs-tx');
                   var privKey = new Buffer(privateKey, 'hex');
                   console.log(privKey,'djgc')
                  console.log('keyhex' , keyhex)
                  console.log('adminAddress' , adminAddress)
                  console.log('Temp' , 'Temp')
                  console.log('document' , document)
                   var rawTransaction =  {  
                                       "nonce":web3.toHex(web3.adh.getTransactionCount(adhadminAddress)),
                                         "gasPrice":1000000000,
                                         "gasLimit":3000000,
                                       "to":smartContract.address,
                                       "value":"0x00",
                                       "data":smartContract.enterStructData.getData(keyhex, adminAddress , "Temp" , document, {from:adminAddress}),
                                       "chainId":1
                                   }
                   console.log(rawTransaction);
                   
                   var tx = new Tx(rawTransaction);
                   tx.sign(privKey);
                   var serializedTx = tx.serialize();
                   
                   web3.adh.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, txnno) {
                       
                    if (err) 
                    message = "Error occured.." 
                    
                 else 
                    message = "Saved successfully.. Txn Ref : " + txnno   
                    
console.log(message)
                    res.json(message)


                    
                            
                         });


                        





    
                    
    
    })



/**
 * @swagger
 * /view/{id}:
 *   get:
 *     tags :
 *      - Blockchain
 *    
 *     description: retrive your document
 *     produces:
 *      - application/json
 *     parameters:
 *         
 *       - name: id
 *         description: enter your key
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: balance
 
 */
	
	  app.get('/view/:id', function(req, res){
		console.log('dfghsghdv')
		ADHI = require('web3-adhi')
		adhi = new ADHI(new ADHI.providers.HttpProvider("http://adhinet.com:8545")); 
                                                
        var smartContract = adhi.adh.contract(abiDefinition).at(adhcontractAddress);
        
        console.log(req.params);

        var doc_no = req.param('id')
        console.log("Doc no..", doc_no, adhcontractAddress);

		var key = require('crypto').createHash('md5').update(doc_no).digest("hex")
		console.log("key", key)
		var dataBlockchainHash = smartContract.verifyData(key);
		

		console.log(dataBlockchainHash);
		
		console.log(dataBlockchainHash,'rget');

        result = dataBlockchainHash;
   
        res.json(result);
	});


app.post('/next', function(req, res){
console.log('dgj')
	res.render('./inde.html')
})

app.post('/nextpage', function(req, res){

	res.render('token')
})

	// This will handle 404 requests.
app.use("*",function(req,res) {
	res.status(404).send("404");
  })
 
  // lifting the app on port 3000.
  app.listen(3000);
  console.log('Magic happens on port ' + 3000);