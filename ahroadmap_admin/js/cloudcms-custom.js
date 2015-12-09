var clientKey = "ff4da8c2-bc2d-44d3-9cd7-4d748e22b611";
var clientSecret = "eZkuPFS0/cJLy4BnFmzozmmR46yGAoevHYxxgA+Uru5OJIp/JSmnftDaRAY8/jhZbhfdR55AhamcqXhMkt3ydCIcZ+/Sp7K12ymoVFRA2B8=";
var username = "4a4bc608-cc4e-45c7-abaf-925502230a4f";
var password = "63FOdNVwd4TpbGDLvIY6pa73ZMrVZ+Wb6FaYHPiAfkpmkrQG2a63fsBGznMKV9QnpLrwn0QB4qRXMji19oO7tYGuiia0p+hT1pDyGLxmKUs=";
var applicationId = "1a24bd197a4f85392969";

roadmap:
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

platform = Gitana.connect({
	"clientKey": clientKey,
	"clientSecret": clientSecret,
	"username": username,
	"password": password,
	"baseURL": "https://api.cloudcms.com"
}).then(function () {

    repository = platform.readRepository(repositoryId).then(function () { 

        branch = repository.readBranch(branchId).then(function () { 
			//////////////////////////////////////
			//find only nodes that have content set to 'true' : these are guarenteed to be Portfolio, platform, release or feature nodes					
			var query = {
				"content": 'true'
            };
            var pagination = {
                	//"limit": 100,
                    "sort": {
                    "date": 1
                }
            };
			allObjects = branch.queryNodes(query, pagination).each(function () {
				//console.log(this.name);
				//build arrays of similar type objects. this will be used in 'populateuniversaliobject()'
				nodes[counter] = this;
				if (nodes[counter].type == 'portfolio') {
					allPortfolioObjects.push(this);
					//add a property array to each object to hold its children. 
					allPortfolioObjects[(allPortfolioObjects.length - 1)].platforms = [];//give the portfolio object a property called platforms which is an array to hold its child platforms
					allPortfolioObjects[(allPortfolioObjects.length - 1)].idName = allPortfolioObjects[(allPortfolioObjects.length - 1)].name.replace(/\s+/g, '');
				} else if (nodes[counter].type == 'platform'){
					allPlatformObjects.push(this);
					allPlatformObjects[(allPlatformObjects.length - 1)].releases = [];
					allPlatformObjects[(allPlatformObjects.length - 1)].idName = allPlatformObjects[(allPlatformObjects.length - 1)].name.replace(/\s+/g, '');
				} else if (nodes[counter].type == 'release') {
					allReleaseObjects.push(this);
					allReleaseObjects[(allReleaseObjects.length - 1)].features = [];
					allReleaseObjects[(allReleaseObjects.length - 1)].idName=allReleaseObjects[(allReleaseObjects.length - 1)].name.replace(/\s+/g, '');
				} else if (nodes[counter].type == 'feature') {
					allFeatureObjects.push(this);
					allFeatureObjects[(allFeatureObjects.length - 1)].idName = allFeatureObjects[(allFeatureObjects.length - 1)].name.replace(/\s+/g, '');
				
				};//} else if (nodes[counter].type == 'feature') {
				counter = counter+1;				
				})//allObjects = branch.queryNodes(query, pagination).each(function () {
				.then(function(){
					//populateUniversalObject(function(){buildPage(function(){$( "#myPortfolio1" ).on( "click", function() {alert("hello");});	});});
					populateUniversalObject(function(){
						//use te universal object to build the page structure
						populateDropDown(function(){
							//show the first portfolio by default
							//$( "#" + allPortfolioObjects[0].idName ).trigger( "click" );
						})
					})
					//buildPage()
					
					//buildPage();
			});//}).then(function(){		
        });
			
			//////////////////////////////////////
        
    });
});;

function populateUniversalObject(callback){	
var rows="";
// now build the tree structure for the objects.
//add features to their parent releases
	for (j=0; j < allReleaseObjects.length; j++) {
		for (i=0; i < allFeatureObjects.length; i++) {
			if (allFeatureObjects[i].parent == allReleaseObjects[j].name) {			
				allReleaseObjects[j].features.push(allFeatureObjects[i]);			
			};
		};
	};
	//add releases to their parent platforms
	for (j=0; j < allPlatformObjects.length; j++) {
		for (i=0; i < allReleaseObjects.length; i++) {
			if (allReleaseObjects[i].parent == allPlatformObjects[j].name) {
				allPlatformObjects[j].releases.push(allReleaseObjects[i]);				
			};
		};
	};
	//add platforms to their parent portfolios
	for (j=0; j < allPortfolioObjects.length; j++) {
			for (i=0; i < allPlatformObjects.length; i++) {
			if (allPlatformObjects[i].parent == allPortfolioObjects[j].name) {
				allPortfolioObjects[j].platforms.push(allPlatformObjects[i]);
				
				//This object array holds the entire site structure now. It is used as a utility object throughout the application		
			};
		};
	};
	
	callback && callback();
};

function myFunction(){
	var name = $("#txtName").val();
	for (j=0; j < allPortfolioObjects.length; j++) {
		if(name == allPortfolioObjects[j].name)
		{
			alert("Name Already exist");
			return false;
		}
		
	}
	
	var ckEditorData1 = CKEDITOR.instances.editor2.getData();
	var ckEditorData2 = CKEDITOR.instances.txtCnotes.getData();
	var ckEditorData3 = CKEDITOR.instances.txtAnotes.getData();
	branch.createNode({
        	"name": $("#txtName").val(),
			"_doc": $("#txtName").val(),
			"primaryContact": $("#primaryContact").val(),
			"customerNotes" : ckEditorData2,
			"aonInternalNotes" : ckEditorData3,
            //"description": $("#txtDescription").val(),
			"description": ckEditorData1,
            "_type": "custom:portfolio0",//change as needed
			"type": "portfolio",//chnage this as needed
			//"parent": "my upoint release",//change as needed
			"parent": "Application",
			"content": "true",
			"date": "12/10/2015",
	}).then(function(){
			newCommentId = this.getId();
			var formData = new FormData($("#frmSubmitForm")[0]);
			
			var authorizationHeader = platform.getDriver().getHttpHeaders()["Authorization"];
            var form = $("#frmSubmitForm");
			
			$.ajax({
                    type: "POST",
                    url: "https://api.cloudcms.com/repositories/" + repositoryId + "/branches/" + branchId + "/nodes/" + newCommentId + "/attachments/" + uploadFilename.value + "/",
                    data: formData,
                    contentType: false,
                    processData: false,
                    headers: {
                        authorization: authorizationHeader
                    }
                }).done(function () {
					
					alert("Your media has been successfully uploaded");
					$("#txtName").val("");
					$("#primaryContact").val("");
					$("#txtCnotes").val("");
					$("#txtAnotes").val("");
					location.reload(true);
					}).fail(function(){
						alert("Your media has NOT been successfully uploaded. Please try again.");
						})			
		});
	
};

function myFunction1(){
var name = $("#txtName").val();
	for (j=0; j < allPortfolioObjects.length; j++) {
		if(name == allPortfolioObjects[j].name)
		{
			alert("Name Already exist");
			return false;
		}
		
	}	
	var ckEditorData1 = CKEDITOR.instances.editor1.getData();
	var ckEditorData2 = CKEDITOR.instances.txtPlatformCnotes.getData();
	var ckEditorData3 = CKEDITOR.instances.txtPlatformAnotes.getData();
	branch.createNode({
        	"name": $("#txtPlatformName").val(),
			"_doc": $("#txtPlatformName").val(),
			"primaryContact": $("#txtPlatformprimaryContact").val(),
			"customerNotes" : ckEditorData2,
			"aonInternalNotes" : ckEditorData3,
            //"description": $("#txtDescription").val(),
			"description": ckEditorData1,
            "_type": "custom:platform0",//change as needed
			"type": "platform",//chnage this as needed
			//"parent": "my upoint release",//change as needed
			"parent": $("#txtPnName").val(),
			"content": "true",
			"date": "12/10/2015",
	}).then(function(){
			newCommentId = this.getId();
			var formData = new FormData($("#frmSubmitForm")[0]);
			
			var authorizationHeader = platform.getDriver().getHttpHeaders()["Authorization"];
            var form = $("#frmSubmitForm");
			
			$.ajax({
                    type: "POST",
                    url: "https://api.cloudcms.com/repositories/" + repositoryId + "/branches/" + branchId + "/nodes/" + newCommentId + "/attachments/default/",
                    data: formData,
                    contentType: false,
                    processData: false,
                    headers: {
                        authorization: authorizationHeader
                    }
                }).done(function () {
					
					alert("Your media has been successfully uploaded");
					location.reload(true);
					}).fail(function(){
						alert("Your media has NOT been successfully uploaded. Please try again.");
						})			
		});
};

function myFunction2(){
	
	var ckEditorData1 = CKEDITOR.instances.editor3.getData();
	var ckEditorData2 = CKEDITOR.instances.txtReleaseCnotes.getData();
	var ckEditorData3 = CKEDITOR.instances.txtReleaseAnotes.getData();
	branch.createNode({
        	"name": $("#txtReleaseName").val(),
			"_doc": $("#txtReleaseName").val(),
			"primaryContact": $("#ReleaseprimaryContact").val(),
			"customerNotes" : ckEditorData2,
			"aonInternalNotes" : ckEditorData3,
            //"description": $("#txtDescription").val(),
			"description": ckEditorData1,
            "_type": "custom:release0",//change as needed
			"type": "release",//chnage this as needed
			//"parent": "my upoint release",//change as needed
			"parent": $("#txtPlatform").val(),
			"content": "true",
			"date": $("#releasedate").val(),
	}).then(function(){
			newCommentId = this.getId();
			var formData = new FormData($("#frmSubmitForm")[0]);
			
			var authorizationHeader = platform.getDriver().getHttpHeaders()["Authorization"];
            var form = $("#frmSubmitForm");
			
			$.ajax({
                    type: "POST",
                    url: "https://api.cloudcms.com/repositories/" + repositoryId + "/branches/" + branchId + "/nodes/" + newCommentId + "/attachments/default/",
                    data: formData,
                    contentType: false,
                    processData: false,
                    headers: {
                        authorization: authorizationHeader
                    }
                }).done(function () {
					
					alert("Your media has been successfully uploaded");
					location.reload(true);
					}).fail(function(){
						alert("Your media has NOT been successfully uploaded. Please try again.");
						})			
		});
};

function myFunction3(){
	
	var ckEditorData1 = CKEDITOR.instances.editor4.getData();
	var ckEditorData2 = CKEDITOR.instances.txtFeatureCnotes.getData();
	var ckEditorData3 = CKEDITOR.instances.txtFeatureAnotes.getData();
	branch.createNode({
        	"name": $("#txtFeatureName").val(),
			"_doc": $("#txtFeatureName").val(),
			
			"primaryContact": $("#FeatureprimaryContact").val(),
			"customerNotes" : ckEditorData2,
			"aonInternalNotes" : ckEditorData3,
            //"description": $("#txtDescription").val(),
			"description": ckEditorData1,
            "_type": "custom:feature0",//change as needed
			"type": "feature",//chnage this as needed
			//"parent": "my upoint release",//change as needed
			"parent": $("#txtRelease").val(),
			"content": "true",
			"date": "12/10/2015",
	}).then(function(){
			newCommentId = this.getId();
			var formData = new FormData($("#frmSubmitForm")[0]);
			
			var authorizationHeader = platform.getDriver().getHttpHeaders()["Authorization"];
            var form = $("#frmSubmitForm");
			
			$.ajax({
                    type: "POST",
                    url: "https://api.cloudcms.com/repositories/" + repositoryId + "/branches/" + branchId + "/nodes/" + newCommentId + "/attachments/default/",
                    data: formData,
                    contentType: false,
                    processData: false,
                    headers: {
                        authorization: authorizationHeader
                    }
                }).done(function () {
					
					alert("Your media has been successfully uploaded");
					location.reload(true);
					}).fail(function(){
						alert("Your media has NOT been successfully uploaded. Please try again.");
						})			
		});
};
function populateDropDown() 
	{
	 	var rows="";
		for (j=0; j < allPortfolioObjects.length; j++) {
 	  	rows += "<tr><td>" + allPortfolioObjects[j].name + "</td><td>" + allPortfolioObjects[j].description + "</td>\
                           <td><a class='btn btn-info btn-lg' data-toggle='modal' data-target='#viewPortfolio' onclick='javascript:viewportfolio(\""+allPortfolioObjects[j].name+"\");' href='javascript:void(0)' class='btn btn-info btn-lg'>View</a>&nbsp;&nbsp;<a class='btn btn-info btn-lg' id='myBtn' data-toggle='modal' data-target='#editPortfolio' onclick='javascript:editportfolio(\""+allPortfolioObjects[j].name+"\");' href='javascript:void(0)'>Edit</a>&nbsp;&nbsp;<a  class='btn btn-info btn-lg' data-toggle='modal' data-target='#myModal'>Delete</a>&nbsp;&nbsp;<a onclick='javascript:nextStep(\""+allPortfolioObjects[j]._doc+"\");' href='javascript:void(0)' class='btn btn-info btn-lg'>Platform</a> \</tr>";
	
	}
		$( rows ).appendTo("#example tbody");
		//alert(rows);
		if(rows != ""){
			$('#example').DataTable();
			$('#loading-image').css("display", "none");
			$('#main-container').css("display", "block");
			$("#example_paginate").hide();
		}
}

$(function (){
	$("#wizard").steps({
		headerTag: "h2",
		bodyTag: "section",
		transitionEffect: "slideLeft"
	});
});