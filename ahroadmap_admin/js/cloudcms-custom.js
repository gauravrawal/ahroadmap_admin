
var username;
var password;
//var username = "fecfaef7-01a6-4ca4-b786-91315a3d2fe2";
//var password = "FV4CSsu78NUmpfzO7xpNvh4GbKVjaeBiilatYkBETQoKiHCbOx81gjbbtuIGyQXwVYJ35Y5B0b8qBlA4pOMiAAQMXvs1fIptaVYmW/EEMvM=";
var clientKey = "9a44be0f-c2f8-4454-8bd1-fd68503a5a9d";
var clientSecret = "O85O6EPbBuxrkmyrriQfw0eHAkS5je6PHwvT967+T8mWTB9z1eonabtgM3MovhywFas0FNWGhWqW1FE2vtfT0C/M97OqfTf87poOM5IvsLc=";


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

//Use this block for code hosted on NON-CloudCMS servers



//on page load the page will run this function. If a cookie is found it will use it.
function checkCookie() {
    var user = getCookie("username");
	var pswd = getCookie("password");
    if (user != "" && pswd != "") {
        console.log("Welcome again " + user);
		username = user;
		password = pswd;
		begin();
    } else {
        
		$( ".selector" ).dialog( "open" );
		//$("#dialog").css("display","block");
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

		

		
			
//Use this code block for code hosted on CloudCMS servers			
		/*platform = Gitana.connect({
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
			}).then(function() {*/
			
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
				  //console.log(this.name);
				  //build arrays of similar type objects. this will be used in 'populateuniversaliobject()'
				  nodes[counter] = this;
				  if (nodes[counter].type == 'portfolio') {
					allPortfolioObjects.push(this);
					//add a property array to each object to hold its children. 
					allPortfolioObjects[(allPortfolioObjects.length - 1)].platforms = []; //give the portfolio object a property called platforms which is an array to hold its child platforms
					allPortfolioObjects[(allPortfolioObjects.length - 1)].idName = allPortfolioObjects[(allPortfolioObjects.length - 1)].name.replace(/\s+/g, '');
				  } else if (nodes[counter].type == 'platform') {
					allPlatformObjects.push(this);
					allPlatformObjects[(allPlatformObjects.length - 1)].releases = [];
					allPlatformObjects[(allPlatformObjects.length - 1)].idName = allPlatformObjects[(allPlatformObjects.length - 1)].name.replace(/\s+/g, '');
				  } else if (nodes[counter].type == 'release') {
					allReleaseObjects.push(this);
					allReleaseObjects[(allReleaseObjects.length - 1)].features = [];
					allReleaseObjects[(allReleaseObjects.length - 1)].idName = allReleaseObjects[(allReleaseObjects.length - 1)].name.replace(/\s+/g, '');
				  } else if (nodes[counter].type == 'feature') {
					allFeatureObjects.push(this);
					allFeatureObjects[(allFeatureObjects.length - 1)].idName = allFeatureObjects[(allFeatureObjects.length - 1)].name.replace(/\s+/g, '');
		
				  }; //} else if (nodes[counter].type == 'feature') {
				  counter = counter + 1;
				}) //allObjects = branch.queryNodes(query, pagination).each(function () {
				.then(function() {
				  //populateUniversalObject(function(){buildPage(function(){$( "#myPortfolio1" ).on( "click", function() {alert("hello");});	});});
				  populateUniversalObject(function() {
					  //use te universal object to build the page structure
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
  // now build the tree structure for the objects.
  //add features to their parent releases
  for (j = 0; j < allReleaseObjects.length; j++) {
    for (i = 0; i < allFeatureObjects.length; i++) {
      if (allFeatureObjects[i].parent == allReleaseObjects[j].name) {
        allReleaseObjects[j].features.push(allFeatureObjects[i]);
      };
    };
  };
  //add releases to their parent platforms
  for (j = 0; j < allPlatformObjects.length; j++) {
    for (i = 0; i < allReleaseObjects.length; i++) {
      if (allReleaseObjects[i].parent == allPlatformObjects[j].name) {
        allPlatformObjects[j].releases.push(allReleaseObjects[i]);
      };
    };
  };
  //add platforms to their parent portfolios
  for (j = 0; j < allPortfolioObjects.length; j++) {
    for (i = 0; i < allPlatformObjects.length; i++) {
      if (allPlatformObjects[i].parent == allPortfolioObjects[j].name) {
        allPortfolioObjects[j].platforms.push(allPlatformObjects[i]);

        //This object array holds the entire site structure now. It is used as a utility object throughout the application		
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
  //$.encoder.encodeForHTML($("#commentTextArea").val()),
  
  var ckEditorData1 = CKEDITOR.instances.editor1.getData();
  var ckEditorData2 = CKEDITOR.instances.txtCnotes.getData();
  var ckEditorData3 = CKEDITOR.instances.txtAnotes.getData();

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
  branch.createNode({

    //"name": $("#txtName").val(),
	 "name": $("#txtName").val(),
	
    "videoIds": $("#txtVideoIds1").val(),
    //"_doc": $("#txtName").val(),
    "primaryContact": $("#primaryContact").val(),
    "customerNotes": ckEditorData2,
    "aonInternalNotes": ckEditorData3,
    //"description": $("#txtDescription").val(),
    "description": ckEditorData1,
    "_type": "custom:portfolio0", //change as needed
    "type": "portfolio", //chnage this as needed
    //"parent": "my upoint release",//change as needed
    "parent": "Application",
    "content": "true",
    //"date": "12/10/2015",
    //"date": moment().format('L')
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
			//form.html('<img src="images/loading.gif"  alt="loading..." id="load1" class="loading-image-modal"/> ');
    
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
			//var myFilenameArray = ($("#myFileUpload").val()).split("\\");
			//var myFilename = myFilenameArray[myFilenameArray.length-1];
			$.ajax({
			  type: "POST",
			  url: "https://api.cloudcms.com/repositories/" + repositoryId + "/branches/" + branchId + "/nodes/" + newCommentId + "/attachments/" + ($("#uploadFilename").val()).replace(" ", "_") + "/",
			  //url: "https://api.cloudcms.com/repositories/" + repositoryId + "/branches/" + branchId + "/nodes/" + newCommentId + "/attachments/" + myFilename + "/",
			  
			  data: formData,
			  contentType: false,
			  processData: false,
			  headers: {
				authorization: authorizationHeader
			  }
			}).done(function() {
			  $('#loading-image-modal').css("display", "none");
			  $(".loadingClass").css('display','none');
			  //alert("Your media has been successfully uploaded");
			  $("#txtName").val("");
			  $("#primaryContact").val("");
			  $("#txtCnotes").val("");
			  $("#txtAnotes").val("");
			  location.reload(true);
			}).fail(function() {
			  alert("Your media has NOT been successfully uploaded. Please try again.");
			})
	  } else {
		  alert("Your media has been successfully uploaded");
      $("#txtName").val("");
      $("#primaryContact").val("");
      $("#txtCnotes").val("");
      $("#txtAnotes").val(""); 
      location.reload(true);
	  }
	  
	  });
  //})
};

function myFunction1() {
  var name = $("#txtPlatformName").val();
  
  if (name == "") {
	  alert("Please give this platform a valid name");
	  return false;
  }
  
  var ckEditorData1 = CKEDITOR.instances.editor2.getData();
  var ckEditorData2 = CKEDITOR.instances.txtPlatformCnotes.getData();
  var ckEditorData3 = CKEDITOR.instances.txtPlatformAnotes.getData();
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

  branch.createNode({
    "name": $("#txtPlatformName").val(),
    "videoIds": $("#txtVideoIds2").val(),
    "primaryContact": $("#txtPlatformprimaryContact").val(),
    "customerNotes": ckEditorData2,
    "aonInternalNotes": ckEditorData3,
    "description": ckEditorData1,
    "_type": "custom:platform0", //change as needed
    "type": "platform", //chnage this as needed
    "parent": $("#txtPnName").val(),
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
    //form.html('<img src="images/loading.gif"  alt="loading..." id="load1" class="loading-image-modal"/> ');
    var lastScrollTop = 0;
    $("#addPlatform").scroll(function(event) {
      var st = $(this).scrollTop();
      //alert(st);
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
      //alert("Your media has been successfully uploaded");
      location.reload(true);
    }).fail(function() {
      alert("Your media has NOT been successfully uploaded. Please try again.");
    })
	
	  } else {
		  alert("Your media has been successfully uploaded");
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
  
  
  var ckEditorData1 = CKEDITOR.instances.editor3.getData();
  var ckEditorData2 = CKEDITOR.instances.txtReleaseCnotes.getData();
  var ckEditorData3 = CKEDITOR.instances.txtReleaseAnotes.getData();
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
  branch.createNode({
    "name": $("#txtReleaseName").val(),
    "videoIds": $("#txtVideoIds3").val(),
    //"_doc": $("#txtReleaseName").val(),
    "primaryContact": $("#ReleaseprimaryContact").val(),
    "customerNotes": ckEditorData2,
    "aonInternalNotes": ckEditorData3,
    //"description": $("#txtDescription").val(),
    "description": ckEditorData1,
    "_type": "custom:release0", //change as needed
    "type": "release", //chnage this as needed
    //"parent": "my upoint release",//change as needed
    "parent": $("#txtPlatform").val(),
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
    //form.html('<img src="images/loading.gif"  alt="loading..." id="load1" class="loading-image-modal"/> ');
    var lastScrollTop = 0;
    $("#addRelease").scroll(function(event) {
      var st = $(this).scrollTop();
      //alert(st);
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
      //alert("Your media has been successfully uploaded");
      location.reload(true);
    }).fail(function() {
      alert("Your media has NOT been successfully uploaded. Please try again.");
    })
	   } else {
		  //console.log("Attachment NOT present");
		  alert("Your media has been successfully uploaded");
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
  
  
  var ckEditorData1 = CKEDITOR.instances.editor4.getData();
  var ckEditorData2 = CKEDITOR.instances.txtFeatureCnotes.getData();
  var ckEditorData3 = CKEDITOR.instances.txtFeatureAnotes.getData();
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
    //form.html('<img src="images/loading.gif"  alt="loading..." id="load1" class="loading-image-modal"/> ');
    var lastScrollTop = 0;
    $("#addFeature").scroll(function(event) {
      var st = $(this).scrollTop();
      //alert(st);
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
      //alert("Your media has been successfully uploaded");
      location.reload(true);
    }).fail(function() {
      alert("Your media has NOT been successfully uploaded. Please try again.");
    })
	   } else {
		  alert("Your media has been successfully uploaded");
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
  //alert(rows);
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
