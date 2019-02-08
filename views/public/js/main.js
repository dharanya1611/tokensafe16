var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

$(function(){
// particlesJS
var $particles_js = $('#particles-js');
if ($particles_js.length > 0 ) {
    particlesJS('particles-js',
    // Update your personal code.
    {
    "particles": {
        "number": {
            "value": 100,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#00c0fa"
        },
        "shape": {
            "type": "circle",
            "opacity": 0.20,
            "stroke": {
                "width": 0,
                "color": "#2b56f5"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 0.30,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.12,
                "sync": false
            }
        },
        "size": {
            "value": 6,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.08,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#2b56f5",
            "opacity": 0.30,
            "width": 1.3
        },
        "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
            "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
        "retina_detect": true
    }
);
}
    // Stop here.

});




$(document).ready(function () {

    var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn');

    allWells.hide();

    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-success').addClass('btn-default');
            $item.addClass('btn-success');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });

    allNextBtn.click(function () {
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for (var i = 0; i < curInputs.length; i++) {
            if (!curInputs[i].validity.valid) {
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid) nextStepWizard.removeAttr('disabled').trigger('click');
    });

    $('div.setup-panel div a.btn-success').trigger('click');
});

$(document).ready(function(){
    $(".nav-item").click(function(){
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
    });
});
// document.mainForm.onclick = function(){
//     var radVal = document.mainForm.rads.value;
//     result.innerHTML = 'You selected: '+radVal;
// }
$(function() {
    $('input[name=post-format]').on('click init-post-format', function() {
        $('#gallery-box').toggle($('#post-format-gallery').prop('checked'));
    }).trigger('init-post-format');
});
$(function() {
    $('input[name=post-format]').on('click init-post-format', function() {
        $('#gallery-box2').toggle($('#post-format-gallery2').prop('checked'));
    }).trigger('init-post-format');
});
$(function() {
    $('input[name=post-format]').on('click init-post-format', function() {
        $('#gallery-box3').toggle($('#post-format-gallery3').prop('checked'));
    }).trigger('init-post-format');
});
function calculateMD5Hash(file, bufferSize) {
    var def = Q.defer();
  
    var fileReader = new FileReader();
    var fileSlicer = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
    var hashAlgorithm = new SparkMD5();
    var totalParts = Math.ceil(file.size / bufferSize);
    var currentPart = 0;
    var startTime = new Date().getTime();
  
    fileReader.onload = function(e) {
      currentPart += 1;
  
      def.notify({
        currentPart: currentPart,
        totalParts: totalParts
      });
  
      var buffer = e.target.result;
      hashAlgorithm.appendBinary(buffer);
  
      if (currentPart < totalParts) {
        processNextPart();
        return;
      }
  
      def.resolve({
        hashResult: hashAlgorithm.end(),
        duration: new Date().getTime() - startTime
      });
    };
  
    fileReader.onerror = function(e) {
      def.reject(e);
    };
  
    function processNextPart() {
      var start = currentPart * bufferSize;
      var end = Math.min(start + bufferSize, file.size);
      fileReader.readAsBinaryString(fileSlicer.call(file, start, end));
    }
  
    processNextPart();
    return def.promise;
  }
  
  function calculate() {
  
    var input = document.getElementById('file');
    if (!input.files.length) {
      return;
    }
  
    var file = input.files[0];
    var bufferSize = Math.pow(1024, 2) * 10; // 10MB
  
    calculateMD5Hash(file, bufferSize).then(
      function(result) {
        // Success

        
        console.log(result);
        window.console.log(result)
        // $( window ).on( "load", result );
        // result.show()
      //$result.show();
      },
      function(err) {
        // There was an error,
      },
      function(progress) {
        // We get notified of the progress as it is executed
        console.log(progress.currentPart, 'of', progress.totalParts, 'Total bytes:', progress.currentPart * bufferSize, 'of', progress.totalParts * bufferSize);
      });
  }
  /**
 * EdiController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


global.adhadminAddress = "0x1E8A1E3423214a4b78BFA87440709867e6163615";

global.contractFile = "myContract.json";
global.adhcontractAddress = "0xa49fbbf138968d1ffafbd8c5ad5d3259b90ab9b2";

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


module.exports = {

	'new': function(req,res){
		//flashing error in current page
		//res.locals.flash=_.clone(req.session.flash);
		res.view();
		console.log('hdsjh')
		//req.session.flash={};
	},


	index: function(req,res){
		//flashing error in current page
		//res.locals.flash=_.clone(req.session.flash);
		res.view();
		//req.session.flash={};
	},


	createone: function(req,res,next) {
		Edi.create(req.params.all(),function ediCreated(err,edi){
			//if (err) return next(err); 
			if(err) {
				console.log(err);
				req.session.flash={
					err : err
				}
				return res.redirect('/edi/new')
			}
			//res.json(edi);
			//req.session.flash={};
			console.log(edi.id);
          res.redirect('/edi/send/'+edi.id);
           // res.redirect('/edi/list');
		});
	},

	show: function(req, res, next){
		Edi.findOne(req.param("id"),function foundEdi(err, edi){
			console.log(edi);
			if(err) return next(err);
			if(!edi) return next();
			res.view({
				edi : edi
			});
		});
	},

    // Index code starts Here
	list: function(req, res, next){
		Edi.find(function foundEdis (err,edis){
			if (err) return next(err);
			//pass the array down the /viewa/index.ejs page
			res.view({
				edis: edis
			});

		});
	},
	
  


    send: function (req, res, next) {
      
        Edi.findOne(req.param("id"),function foundEdi(err, record){
            
                     if(record) 
                     {
                             var params = req.params.all();
                             console.log(params);
                             console.log(record);

							 Web3 = require('web3-adhi')
							 web3 = new Web3(new Web3.providers.HttpProvider("https://adhinet.com"));                            

                             var smartContract = web3.adh.contract(abiDefinition).at(adhcontractAddress);

                             var key = record.document_no;
                             console.log(key);
                             var keyhex = require('crypto').createHash('md5').update(key).digest("hex") 

                            //  var txnno = smartContract.enterStructData.sendTransaction(keyhex, record.recipient , record.document_no, record.document, {from:adminAddress , gas: 3000000, gasPrice:1000000000});
                            //  console.log(txnno);


							var privateKey = "4f7a2f30c7fbd017ffc1e70379eb42cf3f8ac28abed3fcb7d754485f39514d9e"		  	  
							var Tx = require('ethereumjs-tx');
							var privKey = new Buffer(privateKey, 'hex');
							
							var rawTransaction =  {  
												"nonce":web3.toHex(web3.adh.getTransactionCount(adhadminAddress)),
												  "gasPrice":1000000000,
												  "gasLimit":3000000,
												"to":smartContract.address,
												"value":"0x00",
												"data":smartContract.enterStructData.getData(keyhex, record.recipient , record.document_no, record.document,  {from:adminAddress}),
												"chainId":1
											}
							console.log(rawTransaction);
							
							var tx = new Tx(rawTransaction);
							tx.sign(privKey);
							var serializedTx = tx.serialize();
							
							web3.adh.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, txnno) {
								if (!err)
										{

											params["txnno"] = txnno;
											params["status"] = "Stored";
				  
											console.log(params);
			   
											Edi.update(req.param('id'), params, function EdiUpdated(err) {
													if (err) {
															console.log("Update error..")
													}
													
													//  res.json(txnno);       
													});

						  
										}
										else {
												console.log(err);
						  
										}
								  });


								  




                     } 
                  //res.redirect('/');
             });
     },

     verify: function(req,res){

         res.view({
             
        });
     },

     verifydata: function (req, res, next) {
		 
     
    
		ADHI = require('web3-adhi')
		adhi = new ADHI(new ADHI.providers.HttpProvider("https://adhinet.com")); 
                                                
        var smartContract = adhi.adh.contract(abiDefinition).at(adhcontractAddress);
        
        console.log(req.params);

        var doc_no = req.param('id')
        console.log("Doc no..", doc_no, adhcontractAddress);

		var key = require('crypto').createHash('md5').update(doc_no).digest("hex")
		console.log("key", key)
		var dataBlockchainHash = smartContract.verifyData(key);
		

        console.log(dataBlockchainHash);

        result = dataBlockchainHash;
   
        res.json(result);
        
},

  home: function(req, res, next){
		// User.find({}, {_id:0, firstname:1, lastname:1, ethaddress:1},function foundUser(err,users){
		// 	if(err) return next(err);
		// 	if(!users) return next('user doesn\'t exist');
            
        //     console.log(users);

		// 	res.view({
		// 		users : users
		// 	});
	
    User.find(function foundUsers (err,users){
			if (err) return next(err);
			//pass the array down the /viewa/index.ejs page
            //console.log(users);
            Ids.find({verifier: req.session.User.ethaddress, status:"verify"}, function foundUsers (err,ids){
            Ids.find({verifier: req.session.User.ethaddress, status:"verified"}, function foundUsers (err,verified){
                // {username: req.param("username")}
                    if (err) {
						console.log("data ret error");
					}
                    //pass the array down the /viewa/index.ejs page
                 		console.log(verified);
                    res.view({
                        users: users,
                        ids:ids,
						verified: verified 
                    });
                 });					
            });
		});
    },

      //Edit Code Stars Here
      edit: function(req, res, next){
    
		User.findOne(req.param("id"),function foundUser(err, user){
			if(err) return next(err);
			if(!user) return next();
			res.view({
				
				user : user
			});
		});
	},

 //  //Edit code End Here

    

update: function (req, res, next) {
	
      User.update(req.param('id'), req.params.all(), function userUpdated(err) {
        if (err) {
        	
          return res.redirect('/userik/edit/'+req.param('id'));
        }

        res.redirect('/user/show/'+req.param('id'));
        });
    },


    //Destroy code starts here
  destroy: function(req, res, next){
    	
		Edi.findOne(req.param("id"),function foundEdi(err,edi){
			if(err) return next(err);
			if(!edi) return next('edi doesn\'t exist');
			Edi.destroy(req.param('id'),function ediDestroyed(err){
				if(err) return next(err);
			});
			res.redirect('/edi');
		});
	},

  search: function(req, res, next){
		User.findOne({username: req.param("username")},function foundUser(err,user){
			if(err) return next(err);
			if(!user) return next('user doesn\'t exist');
            
            //console.log(user);
            req.session.authenticated = 'true';
            req.session.User=user;

    		res.redirect('/home');
		});
    }




};



