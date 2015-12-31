var clientKey = "9a44be0f-c2f8-4454-8bd1-fd68503a5a9d";
var clientSecret = "O85O6EPbBuxrkmyrriQfw0eHAkS5je6PHwvT967+T8mWTB9z1eonabtgM3MovhywFas0FNWGhWqW1FE2vtfT0C/M97OqfTf87poOM5IvsLc=";
var username = "fecfaef7-01a6-4ca4-b786-91315a3d2fe2";
var password = "FV4CSsu78NUmpfzO7xpNvh4GbKVjaeBiilatYkBETQoKiHCbOx81gjbbtuIGyQXwVYJ35Y5B0b8qBlA4pOMiAAQMXvs1fIptaVYmW/EEMvM=";

/*
//roadmapAdmin2:
var clientKey = "1c358827-d778-4265-a890-2f582f00cd0c";
var clientSecret = "ze/d/wMuNCP7SO0xVj+ZPqGA1aPoRE2kKl8HF48/dpR28lzZNwjbr08WCksQwDJmoAoNMkWEKmY1IVzTjRQF65KIjcv8zlNkOTnJVqnLaoc=";
var username = "dd8947af-e38b-4d9a-8d7d-87de0c1133cb";
var password = "EhQYGFkkwWgRuh7Bl5Mvp8fGpQ5alVj4NTXN29xWf1gKvd3qGPvAK+ok5I9jwOKvKmkYDUQZXnuPW3OqX75DUnn4K4NP7TMGrFnFBjDgPpI=";
*/



//roadmap:
  //var repositoryId = '08a6d0b854cca496951b';
  //var branchId = 'ddf67faa6edc8e3074bb';


  //ahroadmap admin
  var repositoryId = '254893db0c304ba3295d';
var branchId = '1c6332c3a1eeafbfb3a2';






var repository;
var branch;
var newCommentId;
var counter = 0;
var nodes = [];
var allPortfolioObjects = [];
var allPlatformObjects = [];
var allReleaseObjects = [];
var allFeatureObjects = [];
var version;

platform = Gitana.connect({
  "clientKey": clientKey,
  "clientSecret": clientSecret,
  "username": username,
  "password": password,
  "baseURL": "https://api.cloudcms.com"
}).then(function() {

  repository = platform.readRepository(repositoryId).then(function() {

    branch = repository.readBranch(branchId).then(function() {
		branch.readNode("1a2f75f3cfb52e97b794").then(function(){
		version = this;
		//console.log("Admin retrieved version " + this.number);
		
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
              })
            })

        });
		});
    });
  });
});

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
  //$.encoder.encodeForHTML($("#commentTextArea").val()),
  
  var ckEditorData1 = CKEDITOR.instances.editor1.getData();
  var ckEditorData2 = CKEDITOR.instances.txtCnotes.getData();
  var ckEditorData3 = CKEDITOR.instances.txtAnotes.getData();

  for (j = 0; j < allPortfolioObjects.length; j++) {
    if (name == allPortfolioObjects[j].name) {
      alert("This is already taken as Portfolio name!!");
      return false;
    } else if (name.indexOf("$") != -1) {
		alert("Dissallowed characer  in name - $");
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
	  		//console.log("Admin creating new portfolio. Version number was " + version.number);
		  version.number = version.number + 1;
		  //console.log("Admin creating new portfolio. Version number is now " + version.number);
		  //console.log("Admin will now update the version on cloudcms...");
		  version.update().then(function(){
			  //console.log("version updated on cloudCMS");
			  //console.log("setting new version number " + version.number + "into localStorage");
			  //localStorage.setItem('version', version.number);
			  //console.log("new version set in local storage. This concluded creating the object.");
		  

	  if ($("#uploadFilename").val()!=="") {
		  //console.log("Attachment present uploading...");
		  newCommentId = this.getId();
			var formData = new FormData($("#frmSubmitForm")[0]);
		
			var authorizationHeader = platform.getDriver().getHttpHeaders()["Authorization"];
			var form = $("#frmSubmitForm");
			$('#addPortfolio input').attr('disabled', true);
			CKEDITOR.instances.editor1.setReadOnly(true);
			CKEDITOR.instances.txtCnotes.setReadOnly(true);
			CKEDITOR.instances.txtAnotes.setReadOnly(true);
			//$("#johnsModal.html").html('<img src="images/loading.gif"  alt="loading..." id="load1" class="loading-image-modal"/> ');
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
			  url: "https://api.cloudcms.com/repositories/" + repositoryId + "/branches/" + branchId + "/nodes/" + newCommentId + "/attachments/" + $("#uploadFilename").val() + "/",
			  data: formData,
			  contentType: false,
			  processData: false,
			  headers: {
				authorization: authorizationHeader
			  }
			}).done(function() {
			  $('#loading-image-modal').css("display", "none");
			  alert("Your media has been successfully uploaded");
			  $("#txtName").val("");
			  $("#primaryContact").val("");
			  $("#txtCnotes").val("");
			  $("#txtAnotes").val("");
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
  })
};

function myFunction1() {
  var name = $("#txtPlatformName").val();
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
    //"_doc": $("#txtPlatformName").val(),
    "primaryContact": $("#txtPlatformprimaryContact").val(),
    "customerNotes": ckEditorData2,
    "aonInternalNotes": ckEditorData3,
    //"description": $("#txtDescription").val(),
    "description": ckEditorData1,
    "_type": "custom:platform0", //change as needed
    "type": "platform", //chnage this as needed
    //"parent": "my upoint release",//change as needed
    "parent": $("#txtPnName").val(),
    "content": "true",
    //"date": "12/10/2015",
    "date": $("#platformdate").val(),
  }).then(function() {
	   if ($("#uploadFilename1").val()!=="") {
		  //console.log("Attachment present uploading...");
		   newCommentId = this.getId();
    var formData = new FormData($("#frmSubmitForm1")[0]);

    var authorizationHeader = platform.getDriver().getHttpHeaders()["Authorization"];
    var form = $("#frmSubmitForm1");
    CKEDITOR.instances.editor2.setReadOnly(true);
    CKEDITOR.instances.txtPlatformCnotes.setReadOnly(true);
    CKEDITOR.instances.txtPlatformAnotes.setReadOnly(true);
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
      url: "https://api.cloudcms.com/repositories/" + repositoryId + "/branches/" + branchId + "/nodes/" + newCommentId + "/attachments/" + $("#uploadFilename1").val() + "/",
      data: formData,
      contentType: false,
      processData: false,
      headers: {
        authorization: authorizationHeader
      }
    }).done(function() {
      $('#loading-image-modal').css("display", "none");
      alert("Your media has been successfully uploaded");
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

function myFunction2() {
  var name = $("#txtReleaseName").val();
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
		  //console.log("Attachment present uploading...");
		  newCommentId = this.getId();
    var formData = new FormData($("#frmSubmitForm2")[0]);

    var authorizationHeader = platform.getDriver().getHttpHeaders()["Authorization"];
    var form = $("#frmSubmitForm2");
    CKEDITOR.instances.editor3.setReadOnly(true);
    CKEDITOR.instances.txtReleaseCnotes.setReadOnly(true);
    CKEDITOR.instances.txtReleaseAnotes.setReadOnly(true);
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
      url: "https://api.cloudcms.com/repositories/" + repositoryId + "/branches/" + branchId + "/nodes/" + newCommentId + "/attachments/" + $("#uploadFilename2").val() + "/",
      data: formData,
      contentType: false,
      processData: false,
      headers: {
        authorization: authorizationHeader
      }
    }).done(function() {
      $('#loading-image-modal').css("display", "none");
      alert("Your media has been successfully uploaded");
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
    //"_doc": $("#txtFeatureName").val(),
    "videoIds": $("#txtVideoIds4").val(),
    "primaryContact": $("#FeatureprimaryContact").val(),
    "customerNotes": ckEditorData2,
    "aonInternalNotes": ckEditorData3,
    //"description": $("#txtDescription").val(),
    "description": ckEditorData1,
    "_type": "custom:feature0", //change as needed
    "type": "feature", //chnage this as needed
    //"parent": "my upoint release",//change as needed
    "parent": $("#txtRelease").val(),
    "content": "true",
    //"date": "12/10/2015",
    "date": $("#featuredate").val(),
  }).then(function() {
	  if ($("#uploadFilename3").val()!=="") {
		  //console.log("Attachment present uploading...");
		  newCommentId = this.getId();
    var formData = new FormData($("#frmSubmitForm3")[0]);

    var authorizationHeader = platform.getDriver().getHttpHeaders()["Authorization"];
    var form = $("#frmSubmitForm3");
    CKEDITOR.instances.editor4.setReadOnly(true);
    CKEDITOR.instances.txtFeatureCnotes.setReadOnly(true);
    CKEDITOR.instances.txtFeatureAnotes.setReadOnly(true);
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
      url: "https://api.cloudcms.com/repositories/" + repositoryId + "/branches/" + branchId + "/nodes/" + newCommentId + "/attachments/" + $("#uploadFilename3").val() + "/",
      data: formData,
      contentType: false,
      processData: false,
      headers: {
        authorization: authorizationHeader
      }
    }).done(function() {
      $('#loading-image-modal').css("display", "none");
      alert("Your media has been successfully uploaded");
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
