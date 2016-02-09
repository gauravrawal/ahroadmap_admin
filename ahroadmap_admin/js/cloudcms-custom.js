
var username;
var password;

var repositoryId = '254893db0c304ba3295d';
var branchId = '1c6332c3a1eeafbfb3a2';
var platform;
var repository;
var branch;
var newCommentId;
var counter = 0;
var nodes = [];
var allPortfolioObjects = [];
var allPlatformObjects = [];
var allReleaseObjects = [];
var allFeatureObjects = [];
var activeParentId;
var activeParentIdForPlatform;
var activeParentIdForRelease;
var activeParentIdForFeature;


function checkCookie() {
    var user = getCookie("username");
	var pswd = getCookie("password");
    if (user != "" && pswd != "") {
        console.log("Welcome again " + user);
		username = user;
		password = pswd;
		begin();
    } else {
        $("#loginContainer").append('<div id="dialog" title="Please Log In."><label>Username:</label><input id="txtUsername" name="txtUsername" type="text"><label>Password:</label><input id="txtPassword" name="txtPassword" type="password"><input id="submitButton" onclick="setCredentialsFromLogin()" name="Submit" type="button" value="Submit"><label id="lblLoginLable"></label></div>');
		$( "#dialog" ).dialog({ 
					modal:true, 
					draggable: false,
					width: "auto",
					position: { my: "top", at: "center", of: window },
					create: function( event, ui ) {
						$(this).css("maxWidth", "300px");
						}
					
					});
        
        
        $( ".selector" ).dialog( "open" );
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function setCredentialsFromLogin(){
	username = $("#txtUsername").val();
	password = $("#txtPassword").val();
	begin();
}

function begin(usr,pswd){
	
	$( "#dialog" ).dialog( "close" );
	$("#loading-image").css('display','block');
	
/*
    	platform = Gitana.connect({
		  "clientKey": clientKey,
		  "clientSecret": clientSecret,
		  "username": username,
		  "password": password,
		  "baseURL": "https://api.cloudcms.com"
		},function(err){
			if (err) {
				console.log("Error: " + err + window.location.href);
				$("#loading-image").css('display','none');
				
				$("#lblLoginLable").html("Username or password are incorrect. Please try again.");
				$( "#dialog" ).dialog( "open" );
				return;

			}
			}).then(function() {
		*/	
		
        platform = Gitana.connect({
		 "username": username,
		 "password": password,
		 "baseURL": "/proxy"
		},function(err){
			if (err) {
				console.log("Error: " + err + window.location.href);
				$("#loading-image").css('display','none');
				
				$("#lblLoginLable").html("Username or password are incorrect. Please try again.");
				$( "#dialog" ).dialog( "open" );
				return;

			}
			}).then(function() { 
            
			
			document.cookie="username=" + username;
			document.cookie="password=" + password;
		
		  repository = platform.readRepository(repositoryId).then(function() {
		
			branch = repository.readBranch(branchId).then(function() {
				
			  var query = {
				"content": 'true'
			  };
			  var pagination = {
		
				"sort": {
				  "date": 1
				},
				"limit": 9999
			  };
		
			  branch.queryNodes(query, pagination).each(function() {
				  nodes[counter] = this;
				  if (nodes[counter].type == 'portfolio') {
					allPortfolioObjects.push(this);
					allPortfolioObjects[(allPortfolioObjects.length - 1)].platforms = []; 
					allPortfolioObjects[(allPortfolioObjects.length - 1)].idName = "po_" + allPortfolioObjects[(allPortfolioObjects.length - 1)]._doc + "_" + allPortfolioObjects[(allPortfolioObjects.length - 1)].name.replace(/\s+/g, '');
				  } else if (nodes[counter].type == 'platform') {
					allPlatformObjects.push(this);
					allPlatformObjects[(allPlatformObjects.length - 1)].releases = [];
					allPlatformObjects[(allPlatformObjects.length - 1)].idName = "pl_" + allPlatformObjects[(allPlatformObjects.length - 1)]._doc +"_" + allPlatformObjects[(allPlatformObjects.length - 1)].name.replace(/\s+/g, '');
				  } else if (nodes[counter].type == 'release') {
					allReleaseObjects.push(this);
					allReleaseObjects[(allReleaseObjects.length - 1)].features = [];
					allReleaseObjects[(allReleaseObjects.length - 1)].idName = "re_"  + allReleaseObjects[(allReleaseObjects.length - 1)]._doc + "_" + allReleaseObjects[(allReleaseObjects.length - 1)].name.replace(/\s+/g, '');
				  } else if (nodes[counter].type == 'feature') {
					allFeatureObjects.push(this);
					allFeatureObjects[(allFeatureObjects.length - 1)].idName = "fe_" + allFeatureObjects[(allFeatureObjects.length - 1)]._doc + "_" + allFeatureObjects[(allFeatureObjects.length - 1)].name.replace(/\s+/g, '');
		
				  };
				  counter = counter + 1;
				})
				.then(function() {				 
				  populateUniversalObject(function() {
					  populateDropDown(function() {	
					  		$("#loading-image").css('display','none');	
					  })
					})
		
				});
				});
			});
		  });
		}

function populateUniversalObject(callback) {
  var rows = "";
  for (j = 0; j < allReleaseObjects.length; j++) {
    for (i = 0; i < allFeatureObjects.length; i++) {

      if (allFeatureObjects[i].parentId == allReleaseObjects[j]._doc) {
        allReleaseObjects[j].features.push(allFeatureObjects[i]);
      };

    };
  };
  for (j = 0; j < allPlatformObjects.length; j++) {
    for (i = 0; i < allReleaseObjects.length; i++) {

      if (allReleaseObjects[i].parentId == allPlatformObjects[j]._doc) {
        allPlatformObjects[j].releases.push(allReleaseObjects[i]);
      };

    };
  };
  for (j = 0; j < allPortfolioObjects.length; j++) {
    for (i = 0; i < allPlatformObjects.length; i++) {

      if (allPlatformObjects[i].parentId == allPortfolioObjects[j]._doc) {
        allPortfolioObjects[j].platforms.push(allPlatformObjects[i]);	
      };

    };
  };

  callback && callback();
};

function myFunction() {
  
  
  var name = $("#txtName").val();


  if (name == "") {
	  alert("Please give this portfolio a valid name");
	  return false;
  }
  if (name.indexOf("/") != -1) {
	  alert("The slash character(/) is not allowed in a portfolio name.");
	  return false;
  }
  if (name.indexOf("^") != -1) {
	  alert("The caret character(^) is not allowed in a portfolio name.");
	  return false;
  }

  
  var ckEditorData1 = CKEDITOR.instances.editor1.getData();
  var ckEditorData2 = CKEDITOR.instances.txtCnotes.getData();
  var ckEditorData3 = CKEDITOR.instances.txtAnotes.getData();



  /*
  for (j = 0; j < allPortfolioObjects.length; j++) {
    if (name == allPortfolioObjects[j].name) {
      alert("This is already taken as Portfolio name.");
      return false;
    } 

  }
  for (j = 0; j < allPlatformObjects.length; j++) {
    if (name == allPlatformObjects[j].name) {
      alert("This is already taken as Platform name.");
      return false;
    }

  }
  for (j = 0; j < allReleaseObjects.length; j++) {
    if (name == allReleaseObjects[j].name) {
      alert("This is already taken as Release name.");
      return false;
    }

  }

  for (j = 0; j < allFeatureObjects.length; j++) {
    if (name == allFeatureObjects[j].name) {
      alert("This is already taken as Feature name.");
      return false;
    }

  }
  */



  

  branch.createNode({
	 "name": $("#txtName").val(),	
    "videoIds": $("#txtVideoIds1").val(),
    "primaryContact": $("#primaryContact").val(),
    "customerNotes": ckEditorData2,
    "aonInternalNotes": ckEditorData3,
    "description": ckEditorData1,
    "_type": "custom:portfolio0", 
    "type": "portfolio", 
    "parent": "application",
    "parentId": "application",
    "content": "true",
    "date": $("#portfoliodate").val(),
  }).then(function() {
	  	
			
	  if ($("#uploadFilename").val()!=="") {
		  newCommentId = this.getId();
			var formData = new FormData($("#frmSubmitForm")[0]);
		
			var authorizationHeader = platform.getDriver().getHttpHeaders()["Authorization"];
			var form = $("#frmSubmitForm");
			$('#addPortfolio input').attr('disabled', true);
			CKEDITOR.instances.editor1.setReadOnly(true);
			CKEDITOR.instances.txtCnotes.setReadOnly(true);
			CKEDITOR.instances.txtAnotes.setReadOnly(true);
			$(".loadingClass").css('display','block');
    
			var lastScrollTop = 0;
			$("#addPortfolio").scroll(function(event) {
			  var st = $(this).scrollTop();
			  if (st > lastScrollTop) {
				$('.loading-image-modal').animate({
				  top: '+=10'
				}, 10);
			  } else {
				$('.loading-image-modal').animate({
				  top: '-=10'
				}, 10);
			  }
			  lastScrollTop = st;
			});
			$.ajax({
			  type: "POST",
			  url: "https://api.cloudcms.com/repositories/" + repositoryId + "/branches/" + branchId + "/nodes/" + newCommentId + "/attachments/" + ($("#uploadFilename").val()).replace(" ", "_") + "/",	  
			  data: formData,
			  contentType: false,
			  processData: false,
			  headers: {
				authorization: authorizationHeader
			  }
			}).done(function() {
			  $('#loading-image-modal').css("display", "none");
			  $(".loadingClass").css('display','none');
			  $("#txtName").val("");
			  $("#primaryContact").val("");
			  $("#txtCnotes").val("");
			  $("#txtAnotes").val("");
			  location.reload(true);
			}).fail(function() {
			  alert("Your document has NOT been successfully uploaded. Please try again.");
			})
	  } else {
		  alert("Your portfolio has been created.");
      $("#txtName").val("");
      $("#primaryContact").val("");
      $("#txtCnotes").val("");
      $("#txtAnotes").val(""); 
      location.reload(true);
	  }
	  
	  });
};

function myFunction1() {
  var name = $("#txtPlatformName").val();
  
  if (name == "") {
	  alert("Please give this platform a valid name");
	  return false;
  }
  if (name.indexOf("/") != -1) {
	  alert("The slash character(/) is not allowed in a platform name.");
	  return false;
  }
   if (name.indexOf("^") != -1) {
	  alert("The caret character(^) is not allowed in a platform name.");
	  return false;
  }
  
  var ckEditorData1 = CKEDITOR.instances.editor2.getData();
  var ckEditorData2 = CKEDITOR.instances.txtPlatformCnotes.getData();
  var ckEditorData3 = CKEDITOR.instances.txtPlatformAnotes.getData();
  
  /*
  for (j = 0; j < allPortfolioObjects.length; j++) {
    if (name == allPortfolioObjects[j].name) {
      alert("This is already taken as Portfolio name!!");
      return false;
    }

  }
  for (j = 0; j < allPlatformObjects.length; j++) {
    if (name == allPlatformObjects[j].name) {
      alert("This is already taken as Platform name!!");
      return false;
    }

  }
  for (j = 0; j < allReleaseObjects.length; j++) {
    if (name == allReleaseObjects[j].name) {
      alert("This is already taken as Release name!!");
      return false;
    }

  }

  for (j = 0; j < allFeatureObjects.length; j++) {
    if (name == allFeatureObjects[j].name) {
      alert("This is already taken as Feature name!!");
      return false;
    }

  }*/

  branch.createNode({
    "name": $("#txtPlatformName").val(),
    "videoIds": $("#txtVideoIds2").val(),
    "primaryContact": $("#txtPlatformprimaryContact").val(),
    "customerNotes": ckEditorData2,
    "aonInternalNotes": ckEditorData3,
    "description": ckEditorData1,
    "_type": "custom:platform0",
    "type": "platform",
    "parent": $("#txtPnName").val(),
    "parentId": activeParentIdForPlatform,
    "content": "true",
    "date": $("#platformdate").val(),
  }).then(function() {
	   if ($("#uploadFilename1").val()!=="") {
		   newCommentId = this.getId();
    var formData = new FormData($("#frmSubmitForm1")[0]);

    var authorizationHeader = platform.getDriver().getHttpHeaders()["Authorization"];
    var form = $("#frmSubmitForm1");
    CKEDITOR.instances.editor2.setReadOnly(true);
    CKEDITOR.instances.txtPlatformCnotes.setReadOnly(true);
    CKEDITOR.instances.txtPlatformAnotes.setReadOnly(true);
	$(".loadingClass").css('display','block');

    var lastScrollTop = 0;
    $("#addPlatform").scroll(function(event) {
      var st = $(this).scrollTop();

      if (st > lastScrollTop) {
        $('.loading-image-modal').animate({
          top: '+=10'
        }, 10);
      } else {
        $('.loading-image-modal').animate({
          top: '-=10'
        }, 10);
      }
      lastScrollTop = st;
    });

    $.ajax({
      type: "POST",
      url: "https://api.cloudcms.com/repositories/" + repositoryId + "/branches/" + branchId + "/nodes/" + newCommentId + "/attachments/" + ($("#uploadFilename1").val()).replace(" ", "_") + "/",
      data: formData,
      contentType: false,
      processData: false,
      headers: {
        authorization: authorizationHeader
      }
    }).done(function() {
      $('#loading-image-modal').css("display", "none");
	  $(".loadingClass").css('display','none')

      location.reload(true);
    }).fail(function() {
      alert("Your media has NOT been successfully uploaded. Please try again.");
    })
	
	  } else {
		  alert("Your platform has been created.");
      $("#txtName").val("");
      $("#primaryContact").val("");
      $("#txtCnotes").val("");
      $("#txtAnotes").val("");
      location.reload(true);
	  }
	  
   
  });
};

function myFunction2() {
  var name = $("#txtReleaseName").val();
  if (name == "") {
	  alert("Please give this release a valid name");
	  return false;
  }
  if (name.indexOf("/") != -1) {
	  alert("The slash character(/) is not allowed in a release name.");
	  return false;
  }
   if (name.indexOf("^") != -1) {
	  alert("The caret character(^) is not allowed in a release name.");
	  return false;
  }
  
  var ckEditorData1 = CKEDITOR.instances.editor3.getData();
  var ckEditorData2 = CKEDITOR.instances.txtReleaseCnotes.getData();
  var ckEditorData3 = CKEDITOR.instances.txtReleaseAnotes.getData();
 
 /*
  for (j = 0; j < allPortfolioObjects.length; j++) {
    if (name == allPortfolioObjects[j].name) {
      alert("This is already taken as Portfolio name!!");
      return false;
    }

  }
  for (j = 0; j < allPlatformObjects.length; j++) {
    if (name == allPlatformObjects[j].name) {
      alert("This is already taken as Platform name!!");
      return false;
    }

  }
  for (j = 0; j < allReleaseObjects.length; j++) {
    if (name == allReleaseObjects[j].name) {
      alert("This is already taken as Release name!!");
      return false;
    }

  }

  for (j = 0; j < allFeatureObjects.length; j++) {
    if (name == allFeatureObjects[j].name) {
      alert("This is already taken as Feature name!!");
      return false;
    }

  }
  */

  branch.createNode({
    "name": $("#txtReleaseName").val(),
    "videoIds": $("#txtVideoIds3").val(),
    "primaryContact": $("#ReleaseprimaryContact").val(),
    "customerNotes": ckEditorData2,
    "aonInternalNotes": ckEditorData3,
    "description": ckEditorData1,
    "_type": "custom:release0",
    "type": "release",
    "parent": $("#txtPlatform").val(),
    "parentId": activeParentIdForRelease,
    "content": "true",
    "date": $("#releasedate").val(),
  }).then(function() {
	   if ($("#uploadFilename2").val()!=="") {
		  newCommentId = this.getId();
    var formData = new FormData($("#frmSubmitForm2")[0]);

    var authorizationHeader = platform.getDriver().getHttpHeaders()["Authorization"];
    var form = $("#frmSubmitForm2");
    CKEDITOR.instances.editor3.setReadOnly(true);
    CKEDITOR.instances.txtReleaseCnotes.setReadOnly(true);
    CKEDITOR.instances.txtReleaseAnotes.setReadOnly(true);
	$(".loadingClass").css('display','block');
    var lastScrollTop = 0;
    $("#addRelease").scroll(function(event) {
      var st = $(this).scrollTop();
      if (st > lastScrollTop) {
        $('.loading-image-modal').animate({
          top: '+=10'
        }, 10);
      } else {
        $('.loading-image-modal').animate({
          top: '-=10'
        }, 10);
      }
      lastScrollTop = st;
    });
    $.ajax({
      type: "POST",
      url: "https://api.cloudcms.com/repositories/" + repositoryId + "/branches/" + branchId + "/nodes/" + newCommentId + "/attachments/" + ($("#uploadFilename2").val()).replace(" ", "_") + "/",
      data: formData,
      contentType: false,
      processData: false,
      headers: {
        authorization: authorizationHeader
      }
    }).done(function() {
      $('#loading-image-modal').css("display", "none");
	  $(".loadingClass").css('display','none')
      location.reload(true);
    }).fail(function() {
      alert("Your media has NOT been successfully uploaded. Please try again.");
    })
	   } else {
		  alert("Your release has been created.");
      $("#txtName").val("");
      $("#primaryContact").val("");
      $("#txtCnotes").val("");
      $("#txtAnotes").val("");
      location.reload(true);
	  }
    
  });
};

function myFunction3() {
  var name = $("#txtFeatureName").val();
  
  if (name == "") {
	  alert("Please give this feature a valid name");
	  return false;
  } 
  if (name.indexOf("/") != -1) {
	  alert("The slash character(/) is not allowed in a feature name.");
	  return false;
  }
   if (name.indexOf("^") != -1) {
	  alert("The caret character(^) is not allowed in a feature name.");
	  return false;
  }
  
  var ckEditorData1 = CKEDITOR.instances.editor4.getData();
  var ckEditorData2 = CKEDITOR.instances.txtFeatureCnotes.getData();
  var ckEditorData3 = CKEDITOR.instances.txtFeatureAnotes.getData();
  
  /*
  for (j = 0; j < allPortfolioObjects.length; j++) {
    if (name == allPortfolioObjects[j].name) {
      alert("This is already taken as Portfolio name!!");
      return false;
    }

  }
  for (j = 0; j < allPlatformObjects.length; j++) {
    if (name == allPlatformObjects[j].name) {
      alert("This is already taken as Platform name!!");
      return false;
    }

  }
  for (j = 0; j < allReleaseObjects.length; j++) {
    if (name == allReleaseObjects[j].name) {
      alert("This is already taken as Release name!!");
      return false;
    }

  }

  for (j = 0; j < allFeatureObjects.length; j++) {
    if (name == allFeatureObjects[j].name) {
      alert("This is already taken as Feature name!!");
      return false;
    }

  }
  */
  branch.createNode({
    "name": $("#txtFeatureName").val(),
    "videoIds": $("#txtVideoIds4").val(),
    "primaryContact": $("#FeatureprimaryContact").val(),
    "customerNotes": ckEditorData2,
    "aonInternalNotes": ckEditorData3,
    "description": ckEditorData1,
    "_type": "custom:feature0", 
    "type": "feature", 
    "parent": $("#txtRelease").val(),
    "parentId": activeParentIdForFeature,
    "content": "true",
    "date": $("#featuredate").val(),
  }).then(function() {
	  if ($("#uploadFilename3").val()!=="") {
		  newCommentId = this.getId();
    var formData = new FormData($("#frmSubmitForm3")[0]);

    var authorizationHeader = platform.getDriver().getHttpHeaders()["Authorization"];
    var form = $("#frmSubmitForm3");
    CKEDITOR.instances.editor4.setReadOnly(true);
    CKEDITOR.instances.txtFeatureCnotes.setReadOnly(true);
    CKEDITOR.instances.txtFeatureAnotes.setReadOnly(true);
	$(".loadingClass").css('display','block');
    var lastScrollTop = 0;
    $("#addFeature").scroll(function(event) {
      var st = $(this).scrollTop();
      if (st > lastScrollTop) {
        $('.loading-image-modal').animate({
          top: '+=10'
        }, 10);
      } else {
        $('.loading-image-modal').animate({
          top: '-=10'
        }, 10);
      }
      lastScrollTop = st;
    });
    $.ajax({
      type: "POST",
      url: "https://api.cloudcms.com/repositories/" + repositoryId + "/branches/" + branchId + "/nodes/" + newCommentId + "/attachments/" + ($("#uploadFilename3").val()).replace(" ", "_") + "/",
      data: formData,
      contentType: false,
      processData: false,
      headers: {
        authorization: authorizationHeader
      }
    }).done(function() {
      $('#loading-image-modal').css("display", "none");
	  $(".loadingClass").css('display','none')
      location.reload(true);
    }).fail(function() {
      alert("Your media has NOT been successfully uploaded. Please try again.");
    })
	   } else {
		  alert("Your feature has been created.");
      $("#txtName").val("");
      $("#primaryContact").val("");
      $("#txtCnotes").val("");
      $("#txtAnotes").val("");
      location.reload(true);
	  }
	  
    
  });
};

function populateDropDown(callback) {
  var rows = "";
  for (j = 0; j < allPortfolioObjects.length; j++) {
    rows += "<tr><td>" + allPortfolioObjects[j].name + "</td><td>" + allPortfolioObjects[j].description + "</td>\
                           <td><a class='btn btn-info btn-lg' data-toggle='modal' data-target='#viewPortfolio' onclick='javascript:viewportfolio(\"" + allPortfolioObjects[j].name + "\");' href='javascript:void(0)' class='btn btn-info btn-lg'>View</a>&nbsp;&nbsp;<a class='btn btn-info btn-lg' id='myBtn' data-toggle='modal' data-target='#editPortfolio' onclick='javascript:editportfolio(\"" + allPortfolioObjects[j].name + "\");' href='javascript:void(0)'>Edit</a>&nbsp;&nbsp;<a  class='btn btn-info btn-lg' data-toggle='modal' data-target='#myModal'>Delete</a>&nbsp;&nbsp;<a onclick='javascript:nextStep(\"" + allPortfolioObjects[j].name + "\");' href='javascript:void(0)' class='btn btn-info btn-lg'>Platform</a> \</tr>";

  }
  $(rows).appendTo("#example tbody");
  if (rows != "") {
    $('#example').DataTable();
    $('#loading-image').css("display", "none");
    $('#main-container').css("display", "block");
    $("#example_paginate").hide();
  }
  callback && callback();
}

$(function() {
  $("#wizard").steps({
    headerTag: "h2",
    bodyTag: "section",
    transitionEffect: "slideLeft"
  });
});

$(".infoButton").on( "click", function(){
//alert('http://link.brightcove.com/services/player/bcpid4138676921001?bckey=AQ~~,AAAAAFn1oBc~,ccA6_zv_NerqWDGBUOeKCl54Yd4UTTKD&bctid=' + <span style="background-color:yellow">' + '4628078512001' + '</span>');
var f = $(".moreinfo").css("display");
if (f=='inline-block') {
$(".moreinfo").css("display","none")
} else {
$(".moreinfo").css("display","inline-block")
}



})
