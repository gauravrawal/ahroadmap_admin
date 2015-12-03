
var nodeToUpdate;

 CKEDITOR.replace( 'editor2' );
				 CKEDITOR.replace( 'editor1' );
				  CKEDITOR.replace( 'editor3' );
				  CKEDITOR.replace( 'editor4' );
				  CKEDITOR.replace( 'txteditoredit1' ); 

$(document).ready(function () {
	populateDropDown();	
	$(".actions").css("visibility", "hidden");
	$("#wizard-t-0").click(function(){
		$('li:eq(1)').removeClass("done").addClass("disabled");
		$('li:eq(2)').removeClass("done").addClass("disabled");
		$('li:eq(3)').removeClass("done").addClass("disabled");
	});
	$("#wizard-t-1").click(function(){
		$('li:eq(2)').removeClass("done").addClass("disabled");
		$('li:eq(3)').removeClass("done").addClass("disabled");
	});
	$("#wizard-t-2").click(function(){
		$('li:eq(3)').removeClass("done").addClass("disabled");
	});
});

function nextStep(m){
	populatePlatform(m);
	$(".actions li a[href='#next']").click();
}
function nextStep1(m){
	populateRelease(m);
	$(".actions li a[href='#next']").click();
}
function nextStep2(m){
	populateFeature(m);
	$(".actions li a[href='#next']").click();
}

function viewportfolio(portfolio){
viewPortfolioData(portfolio);
}
 $("#frmSubmitForm").submit(function (event) {
		event.preventDefault(); // Prevent the form from submitting via the browser.
			
			myFunction();

    });   

 $("#frmSubmitForm1").submit(function (event) {
		event.preventDefault(); // Prevent the form from submitting via the browser.
			
			myFunction1();

    });   

 $("#frmSubmitForm2").submit(function (event) {
		event.preventDefault(); // Prevent the form from submitting via the browser.
			
			myFunction2();

    });  
	 $("#frmSubmitForm3").submit(function (event) {
		event.preventDefault(); // Prevent the form from submitting via the browser.
			
			myFunction3();

    });
	  $("#frmeditSubmitForm").submit(function (event) {
		event.preventDefault(); // Prevent the form from submitting via the browser.
			
			editportfoliodata();

    });
	


function populateDropDown() 
	{
	 	var rows="";
		for (j=0; j < allPortfolioObjects.length; j++) {
 	  	rows += "<tr><td>" + allPortfolioObjects[j].name + "</td><td>" + allPortfolioObjects[j].description + "</td>\
                           <td><a class='btn btn-primary btn-xs' data-toggle='modal' data-target='#viewPortfolio' onclick='javascript:viewportfolio(\""+allPortfolioObjects[j].name+"\");' href='javascript:void(0)' class='btn btn-primary btn-xs'>View</a>&nbsp;&nbsp;<a class='btn btn-primary btn-xs' id='myBtn' data-toggle='modal' data-target='#editPortfolio' onclick='javascript:editportfolio(\""+allPortfolioObjects[j].name+"\");' href='javascript:void(0)'>Edit</a>&nbsp;&nbsp;<a  class='btn btn-primary btn-xs' data-toggle='modal' data-target='#myModal'>Delete</a>&nbsp;&nbsp;<a onclick='javascript:nextStep(\""+allPortfolioObjects[j]._doc+"\");' href='javascript:void(0)' class='btn btn-primary btn-xs'>Platform</a> \</tr>";
	
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
function populatePlatform(m){
	var rows="";
	for (j=0; j < allPortfolioObjects.length; j++) {
		if(allPortfolioObjects[j]._doc === m){
		$("#txtPnName").val(allPortfolioObjects[j].name);
			for (k=0; k < allPortfolioObjects[j].platforms.length; k++) {
				rows += "<tr><td>" + allPortfolioObjects[j].platforms[k].name + "</td><td>" + allPortfolioObjects[j].platforms[k].description + "</td>\
                           <td><a class='btn btn-primary btn-xs' data-toggle='modal' data-target='#viewPlatform' onclick='javascript:viewplatform(\""+allPortfolioObjects[j].platforms[k].name+"\");' href='javascript:void(0)' class='btn btn-primary btn-xs'>View</a>&nbsp;&nbsp;<a class='btn btn-primary btn-xs' id='myBtn' data-toggle='modal' data-target='#myModal'>Edit</a>&nbsp;&nbsp;<a  class='btn btn-primary btn-xs' data-toggle='modal' data-target='#myModal'>Delete</a>&nbsp;&nbsp;<a onclick='javascript:nextStep1(\""+allPortfolioObjects[j].platforms[k]._doc+"\");' href='javascript:void(0)' class='btn btn-primary btn-xs'>Release</a> \</tr>";
				
				//alert("allPortfolioObjects[j].name" + allPortfolioObjects[j].name)		   
			}
		}
	}
		//$("#txtPnName").val('');
		$("#platformTable tbody").html("");
		
		$( rows ).appendTo("#platformTable tbody");
		//alert(rows);
		if(rows != ""){
			$('#platformTable').DataTable();
			$("#platformTable_paginate").hide();			
		}
}
function populateRelease(m){
	var rows="";
	for (j=0; j < allPlatformObjects.length; j++) {
		if(allPlatformObjects[j]._doc === m){
		//inatalert(allPlatformObjects[j].name);
			$("#txtPlatform").val(allPlatformObjects[j].name);
			for (k=0; k < allPlatformObjects[j].releases.length; k++) {
				rows += "<tr><td>" + allPlatformObjects[j].releases[k].name + "</td><td>" + allPlatformObjects[j].releases[k].description + "</td>\
                           <td><a class='btn btn-primary btn-xs' data-toggle='modal' data-target='#viewRelease' onclick='javascript:viewrelease(\""+allPlatformObjects[j].releases[k].name+"\");'>View</a>&nbsp;&nbsp;<a class='btn btn-primary btn-xs' id='myBtn' data-toggle='modal' data-target='#myModal'>Edit</a>&nbsp;&nbsp;<a  class='btn btn-primary btn-xs' data-toggle='modal' data-target='#myModal'>Delete</a>&nbsp;&nbsp;<a onclick='javascript:nextStep2(\""+allPlatformObjects[j].releases[k]._doc+"\");' href='javascript:void(0)' class='btn btn-primary btn-xs'>Feature</a> \</tr>";
			}
		}
	}
		$("#ReleaseTable tbody").html("");
		$( rows ).appendTo("#ReleaseTable tbody");
		//alert(rows);
		if(rows != ""){
			$('#ReleaseTable').DataTable();	
			$("#ReleaseTable_paginate").hide();		
		}
}

function populateFeature(m){
	var rows="";
	for (j=0; j < allReleaseObjects.length; j++) {
		if(allReleaseObjects[j]._doc === m){
		//alert(allReleaseObjects[j].name);
		$("#txtRelease").val(allReleaseObjects[j].name);
			for (k=0; k < allReleaseObjects[j].features.length; k++) {
				rows += "<tr><td>" + allReleaseObjects[j].features[k].name + "</td><td>" + allReleaseObjects[j].features[k].description + "</td>\
                           <td><a class='btn btn-primary btn-xs' data-toggle='modal'  data-target='#viewFeature' onclick='javascript:viewfeature(\""+allReleaseObjects[j].features[k].name+"\");'>View</a>&nbsp;&nbsp;<a class='btn btn-primary btn-xs' id='myBtn' data-toggle='modal' data-target='#myModal'>Edit</a>&nbsp;&nbsp;<a  class='btn btn-primary btn-xs' data-toggle='modal' data-target='#myModal'>Delete</a>\</tr>";
			}
		}
	}
		$("#featureTable tbody").html("");
		$( rows ).appendTo("#featureTable tbody");
		//alert(rows);
		if(rows != ""){
			$('#featureTable').DataTable();	
			$("#featureTable_paginate").hide()		
		}
}

// View function

// View function

function viewPortfolioData(portfolio){
		for (j=0; j < allPortfolioObjects.length; j++) {
		if(portfolio == allPortfolioObjects[j].name){
		$("#txtViewName").html(allPortfolioObjects[j].name);
		$("#viewprimaryContact").html(allPortfolioObjects[j].primaryContact);
		$("#viewtxtCnotes").html(allPortfolioObjects[j].customerNotes);
		$("#viewtxtAnotes").html(allPortfolioObjects[j].aonInternalNotes);
		$("#editor5").html(allPortfolioObjects[j].description);
		}
 	  	
	
	}

}
function viewplatform(platform){
		for (j=0; j < allPlatformObjects.length; j++) {
		if(platform == allPlatformObjects[j].name){
		$("#txtPlatformViewName").html(allPlatformObjects[j].name);
		$("#viewPlatformprimaryContact").html(allPlatformObjects[j].primaryContact);
		$("#viewPlatformtxtCnotes").html(allPlatformObjects[j].customerNotes);
		$("#viewPlatformtxtAnotes").html(allPlatformObjects[j].aonInternalNotes);
		$("#editor6").html(allPlatformObjects[j].description);
		}
 	  	
	
	}

}



function viewrelease(release){
		for (j=0; j < allReleaseObjects.length; j++) {
		if(release == allReleaseObjects[j].name){
		$("#txtReleaseViewName").html(allReleaseObjects[j].name);
		$("#viewReleaseprimaryContact").html(allReleaseObjects[j].primaryContact);
		$("#viewReleasetxtCnotes").html(allReleaseObjects[j].customerNotes);
		$("#viewReleasetxtAnotes").html(allReleaseObjects[j].aonInternalNotes);
		$("#editor7").html(allReleaseObjects[j].description);
		}
 	  	
	
	}

}


function viewfeature(feature){
		for (j=0; j < allFeatureObjects.length; j++) {
		if(feature == allFeatureObjects[j].name){
		$("#txtFeatureName").html(allFeatureObjects[j].name);
		$("#viewFeatureContact").html(allFeatureObjects[j].primaryContact);
		$("#viewFeatureCnotes").html(allFeatureObjects[j].customerNotes);
		$("#viewFeatureAnotes").html(allFeatureObjects[j].aonInternalNotes);
		$("#editor8").html(allFeatureObjects[j].description);
		}
 	  	
	
	}

}



// edit 
function editportfolio(portfolio){

for (j=0; j < allPortfolioObjects.length; j++) {
		if(portfolio == allPortfolioObjects[j].name){
		$("#txtEditName").val(allPortfolioObjects[j].name);
		$("#EditprimaryContact").val(allPortfolioObjects[j].primaryContact);
		$("#EdittxtCnotes").val(allPortfolioObjects[j].customerNotes);
		$("#EdittxtAnotes").val(allPortfolioObjects[j].aonInternalNotes);
		$("#txteditoredit1").val(allPortfolioObjects[j].description);
		//var portid = allPortfolioObjects[j]._doc;
		var portid = allPortfolioObjects[j]._doc;
		var portname= allPortfolioObjects[j].name;
		var portcontact = allPortfolioObjects[j].primaryContact;
		var portcnotes = allPortfolioObjects[j].customerNotes;
		var portanotes = allPortfolioObjects[j].aonInternalNotes;
		var porteditor1 = allPortfolioObjects[j].description;
		
		nodeToUpdate = allPortfolioObjects[j];
		//editportfoliodata();
		//alert(portid);
		}
}
}
function editportfoliodata(){
	var ckEditorData = CKEDITOR.instances.txteditoredit1.getData();
	var newNodeName = $("#txtEditName").val();
	var newPrimaryContact = $("#EditprimaryContact").val();;
	var newCNotes = $("#EdittxtCnotes").val();;
	var newANotes = $("#EdittxtAnotes").val();
	
	
	nodeToUpdate.name = newNodeName;
	nodeToUpdate.description = ckEditorData;
	nodeToUpdate.primaryContact = newPrimaryContact;
	nodeToUpdate.customerNotes = newCNotes;
	nodeToUpdate.aonInternalNotes = newANotes;
	
	nodeToUpdate.update()


	branch.queryNodes({
        	"name":  $("#txtEditName").val(),
			"primaryContact": $("#EditprimaryContact").val(),
			"customerNotes" :$("#EdittxtCnotes").val(),
			"aonInternalNotes" : $("#EdittxtAnotes").val(),
            //"description": $("#txtDescription").val(),
			"description": ckEditorData,
            "_type": "custom:portfolio0",//change as needed
			"type": "portfolio",//chnage this as needed
			//"parent": "my upoint release",//change as needed
	}).then(function(){
			//newCommentId = this.getId();
			var formData = new FormData($("#frmSubmitForm")[0]);
			
			var authorizationHeader = platform.getDriver().getHttpHeaders()["Authorization"];
            var form = $("#frmSubmitForm");
			
			$.ajax({
                    type: "POST",
                    url: "https://api.cloudcms.com/repositories/" + repositoryId + "/branches/" + branchId + "/nodes/",
                    data: formData,
                    contentType: false,
                    processData: false,
                    headers: {
                        authorization: authorizationHeader
                    }
                }).done(function () {
					//alert("hi");
					//branch.set("name", 123);
					//branch.update();
					alert("Your media has been successfully uploaded");
					//location.reload(true);
					}).fail(function(){
						alert("Your media has NOT been successfully uploaded. Please try again.");
						})			
		});
		;
};
