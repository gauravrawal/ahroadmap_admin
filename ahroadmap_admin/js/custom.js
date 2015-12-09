 var nodeToUpdate;
 CKEDITOR.replace( 'editor2' );
 CKEDITOR.replace( 'editor1' );
CKEDITOR.replace( 'editor3' );
CKEDITOR.replace( 'editor4' );
 CKEDITOR.replace( 'txteditoredit1' ); 
 var editor = CKEDITOR.replace( 'EdittxtCnotes' );
 CKEDITOR.replace( 'EdittxtAnotes' );
 CKEDITOR.replace( 'txtCnotes' );
 CKEDITOR.replace( 'txtAnotes' );
  CKEDITOR.replace( 'txtFeatureCnotes' );
   CKEDITOR.replace( 'txtFeatureAnotes' );
 CKEDITOR.replace( 'txtPlatformCnotes' );
 CKEDITOR.replace( 'txtPlatformAnotes' );
 CKEDITOR.replace( 'txtReleaseCnotes' );
 CKEDITOR.replace( 'txtReleaseAnotes' );
CKEDITOR.replace( 'PlatformEdittxtCnotes');
 CKEDITOR.replace( 'PlatformEdittxtAnotes');
 CKEDITOR.replace( 'PlatformtxteditorDescription');
 CKEDITOR.replace( 'ReleaseEdittxtCnotes');
 CKEDITOR.replace( 'ReleaseEdittxtAnotes');
 CKEDITOR.replace( 'ReleasetxteditorDescription');
 CKEDITOR.replace( 'FeatureEdittxtCnotes');
 CKEDITOR.replace( 'FeatureEdittxtAnotes');
 CKEDITOR.replace( 'FeaturetxteditorDescription');

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
	  $("#frmeditSubmitForm4").submit(function (event) {
		event.preventDefault(); // Prevent the form from submitting via the browser.
			
			editportfoliodata();

    });
	
$("#frmeditSubmitForm5").submit(function (event) {
		event.preventDefault(); // Prevent the form from submitting via the browser.
			
			editplatformdata();

    });

$("#frmeditSubmitForm6").submit(function (event) {
		event.preventDefault(); // Prevent the form from submitting via the browser.
			
			editreleasedata();

    });

$("#frmeditSubmitForm7").submit(function (event) {
		event.preventDefault(); // Prevent the form from submitting via the browser.
			
			editfeaturedata();

    });
$("#frmeditSubmitForm8").submit(function (event) {
		event.preventDefault(); // Prevent the form from submitting via the browser.
			
			deletedata();

    });
$("#frmeditSubmitForm9").submit(function (event) {
		event.preventDefault(); // Prevent the form from submitting via the browser.
			
			deleteplatformdata();

    });
$("#frmeditSubmitForm10").submit(function (event) {
		event.preventDefault(); // Prevent the form from submitting via the browser.
			
			deletereleasedata();

    });
$("#frmeditSubmitForm11").submit(function (event) {
		event.preventDefault(); // Prevent the form from submitting via the browser.
			
			deletefeaturedata();

    });
$("#frmeditSubmitForm12").submit(function (event) {
		event.preventDefault(); // Prevent the form from submitting via the browser.
			
			reload();

    });
$("#frmeditSubmitForm13").submit(function (event) {
		event.preventDefault(); // Prevent the form from submitting via the browser.
			
			reload();

    });
$("#frmeditSubmitForm14").submit(function (event) {
		event.preventDefault(); // Prevent the form from submitting via the browser.
			
			reload();

    });
$("#frmeditSubmitForm15").submit(function (event) {
		event.preventDefault(); // Prevent the form from submitting via the browser.
			
			reload();

    });
function populateDropDown() 
	{
	 	var rows="";
		for (j=0; j < allPortfolioObjects.length; j++) {
 	  	rows += "<tr><td>" + allPortfolioObjects[j].name + "</td><td>" + allPortfolioObjects[j].description + "</td>\
                           <td><a class='btn btn-primary btn-xs' data-toggle='modal' data-target='#viewPortfolio' onclick='javascript:viewportfolio(\""+allPortfolioObjects[j].name+"\");' href='javascript:void(0)' class='btn btn-primary btn-xs'>View</a>&nbsp;&nbsp;<a class='btn btn-primary btn-xs' id='myBtn' data-toggle='modal' data-target='#editPortfolio' onclick='javascript:editportfolio(\""+allPortfolioObjects[j].name+"\");' href='javascript:void(0)'>Edit</a>&nbsp;&nbsp;<a  class='btn btn-primary btn-xs' data-toggle='modal' data-target='#DeletePortfolio' onclick='javascript:deleteportfolio(\""+allPortfolioObjects[j].name+"\");' href='javascript:void(0)'>Delete</a>&nbsp;&nbsp;<a onclick='javascript:nextStep(\""+allPortfolioObjects[j]._doc+"\");' href='javascript:void(0)' class='btn btn-primary btn-xs'>Platform</a> \</tr>";
	
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
                           <td><a class='btn btn-primary btn-xs' data-toggle='modal' data-target='#viewPlatform' onclick='javascript:viewplatform(\""+allPortfolioObjects[j].platforms[k].name+"\");' href='javascript:void(0)' class='btn btn-primary btn-xs'>View</a>&nbsp;&nbsp;<a class='btn btn-primary btn-xs' id='myBtn' data-toggle='modal' data-target='#editPlatform' onclick='javascript:editplatform(\""+allPortfolioObjects[j].platforms[k].name+"\");' href='javascript:void(0)'>Edit</a>&nbsp;&nbsp;<a  class='btn btn-primary btn-xs' data-toggle='modal' data-target='#DeletePlatform' onclick='javascript:deleteplatform(\""+allPortfolioObjects[j].platforms[k].name+"\");' href='javascript:void(0)'>Delete</a>&nbsp;&nbsp;<a onclick='javascript:nextStep1(\""+allPortfolioObjects[j].platforms[k]._doc+"\");' href='javascript:void(0)' class='btn btn-primary btn-xs'>Release</a> \</tr>";
				
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
                           <td><a class='btn btn-primary btn-xs' data-toggle='modal' data-target='#viewRelease' onclick='javascript:viewrelease(\""+allPlatformObjects[j].releases[k].name+"\");'>View</a>&nbsp;&nbsp;<a class='btn btn-primary btn-xs' id='myBtn' data-toggle='modal' data-target='#editRelease'  onclick='javascript:editrelease(\""+allPlatformObjects[j].releases[k].name+"\");' href='javascript:void(0)'>Edit</a>&nbsp;&nbsp;<a  class='btn btn-primary btn-xs' data-toggle='modal' data-target='#DeleteRelease' onclick='javascript:deleterelease(\""+allPlatformObjects[j].releases[k].name+"\");' href='javascript:void(0)'>Delete</a>&nbsp;&nbsp;<a onclick='javascript:nextStep2(\""+allPlatformObjects[j].releases[k]._doc+"\");' href='javascript:void(0)' class='btn btn-primary btn-xs'>Feature</a> \</tr>";
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
                           <td><a class='btn btn-primary btn-xs' data-toggle='modal'  data-target='#viewFeature' onclick='javascript:viewfeature(\""+allReleaseObjects[j].features[k].name+"\");'>View</a>&nbsp;&nbsp;<a class='btn btn-primary btn-xs' id='myBtn' data-toggle='modal' data-target='#editFeature' onclick='javascript:editfeature(\""+allReleaseObjects[j].features[k].name+"\");' href='javascript:void(0)'>Edit</a>&nbsp;&nbsp;<a  class='btn btn-primary btn-xs' data-toggle='modal' data-target='#DeleteFeature' onclick='javascript:deletefeature(\""+allReleaseObjects[j].features[k].name+"\");' href='javascript:void(0)'>Delete</a>\</tr>";
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
		//alert(htmlentities(allPortfolioObjects[j].customerNotes));
		CKEDITOR.instances.EdittxtCnotes.setData( allPortfolioObjects[j].customerNotes );
		//var value = editor.getData();
		//alert(value);
		//$("#EdittxtCnotes").val((allPortfolioObjects[j].customerNotes));
		CKEDITOR.instances.EdittxtAnotes.setData( allPortfolioObjects[j].aonInternalNotes );
		
		CKEDITOR.instances.txteditoredit1.setData( allPortfolioObjects[j].description );
		
		//CKEDITOR.instances.EdittxtCnotes.updateElement();
		var portid = allPortfolioObjects[j]._doc;
		var portname= allPortfolioObjects[j].name;
		var portcontact = allPortfolioObjects[j].primaryContact;
		var portcnotes = allPortfolioObjects[j].customerNotes;
		var portanotes = allPortfolioObjects[j].aonInternalNotes;
		var porteditor1 = allPortfolioObjects[j].description;
		//editportfoliodata();
		//alert(porteditor1);
		nodeToUpdate = allPortfolioObjects[j];
		
		}
}
}
function editplatform(platform){

for (j=0; j < allPlatformObjects.length; j++) {
		if(platform == allPlatformObjects[j].name){
		$("#txtPlatformEditName").val(allPlatformObjects[j].name);
		$("#PlatformEditprimaryContact").val(allPlatformObjects[j].primaryContact);
		CKEDITOR.instances.PlatformEdittxtCnotes.setData( allPlatformObjects[j].customerNotes );
		CKEDITOR.instances.PlatformEdittxtAnotes.setData( allPlatformObjects[j].aonInternalNotes );
		CKEDITOR.instances.PlatformtxteditorDescription.setData( allPlatformObjects[j].description );

		var Platformid = allPlatformObjects[j]._doc;
		var Platformname= allPlatformObjects[j].name;
		var Platformtcontact = allPlatformObjects[j].primaryContact;
		var Platformtcnotes = allPlatformObjects[j].customerNotes;
		var Platformanotes = allPlatformObjects[j].aonInternalNotes;
		var Platformeditor1 = allPlatformObjects[j].description;

		//editportfoliodata();
		//alert(portid);
		nodeToUpdate = allPlatformObjects[j];
		
		}
}
}
function editrelease(release){

for (j=0; j < allReleaseObjects.length; j++) {
		if(release == allReleaseObjects[j].name){
		$("#txtReleaseEditName").val(allReleaseObjects[j].name);
		$("#ReleaseEditprimaryContact").val(allReleaseObjects[j].primaryContact);
		CKEDITOR.instances.ReleaseEdittxtCnotes.setData( allReleaseObjects[j].customerNotes );
		CKEDITOR.instances.ReleaseEdittxtAnotes.setData( allReleaseObjects[j].aonInternalNotes );
		CKEDITOR.instances.ReleasetxteditorDescription.setData( allReleaseObjects[j].description );
	
		var Releaseid = allReleaseObjects[j]._doc;
		var Releasename= allReleaseObjects[j].name;
		var Releasecontact = allReleaseObjects[j].primaryContact;
		var Releasecnotes = allReleaseObjects[j].customerNotes;
		var Releaseanotes = allReleaseObjects[j].aonInternalNotes;
		var Releaseeditor1 = allReleaseObjects[j].description;

		//editportfoliodata();
		//alert(portid);
		nodeToUpdate = allReleaseObjects[j];
		
		}
}
}

function editportfoliodata(){
	var ckPortfolioEditorData1 = CKEDITOR.instances.txteditoredit1.getData();
	var ckPortfolioEditorData2 = CKEDITOR.instances.EdittxtCnotes.getData();
	var ckPortfolioEditorData3 = CKEDITOR.instances.EdittxtAnotes.getData();
	var newNodePortfolioName = $("#txtEditName").val();
	var newNodePortfolioContact = $("#EditprimaryContact").val();
	nodeToUpdate.name = newNodePortfolioName;
	nodeToUpdate.description = ckPortfolioEditorData1;
	nodeToUpdate.primaryContact = newNodePortfolioContact;
	nodeToUpdate.aonInternalNotes = ckPortfolioEditorData2;
	nodeToUpdate.customerNotes = ckPortfolioEditorData3;
	nodeToUpdate.update().then(function(){
		alert("portfolio node updatred");
		newCommentId = nodeToUpdate.getId();
		var formData = new FormData($("#frmeditSubmitForm4")[0]);
			
			var authorizationHeader = platform.getDriver().getHttpHeaders()["Authorization"];
            var form = $("#frmeditSubmitForm4");
			
			$.ajax({
                    type: "POST",
                    url: "https://api.cloudcms.com/repositories/" + repositoryId + "/branches/" + branchId + "/nodes/" + newCommentId + "/attachments/" + $("#uploadFilenameEdit").val() + "/",
                    data: formData,
                    contentType: false,
                    processData: false,
                    headers: {
                        authorization: authorizationHeader
                    }
                })
		
		
		
		
		
		});
	$('#Confirmation').modal('show'); 
	
		
}


function editfeature(feature){

for (j=0; j < allFeatureObjects.length; j++) {
		if(feature == allFeatureObjects[j].name){
		$("#txtFeatureEditName").val(allFeatureObjects[j].name);
		$("#FeatureEditprimaryContact").val(allFeatureObjects[j].primaryContact);	
		CKEDITOR.instances.FeatureEdittxtCnotes.setData( allFeatureObjects[j].customerNotes );
		CKEDITOR.instances.FeatureEdittxtAnotes.setData( allFeatureObjects[j].aonInternalNotes );
		CKEDITOR.instances.FeaturetxteditorDescription.setData( allFeatureObjects[j].description );
		var Featureid = allFeatureObjects[j]._doc;
		var Featurename= allFeatureObjects[j].name;
		var Featurecontact = allFeatureObjects[j].primaryContact;
		var Featurecnotes = allFeatureObjects[j].customerNotes;
		var Featureanotes = allFeatureObjects[j].aonInternalNotes;
		var Featureeditor1 = allFeatureObjects[j].description;

		//editportfoliodata();
		//alert(portid);
		nodeToUpdate = allFeatureObjects[j];
		
		}
}
}

function editplatformdata(){
	var ckPlatformEditorEditorData2 = CKEDITOR.instances.PlatformtxteditorDescription.getData();
	var ckPlatformEditorData2 = CKEDITOR.instances.PlatformEdittxtCnotes.getData();
	var ckPlatformEditorData3 = CKEDITOR.instances.PlatformEdittxtAnotes.getData();
	var newNodePlatformName = $("#txtPlatformEditName").val();
	var newNodePlatformContact = $("#PlatformEditprimaryContact").val();

	nodeToUpdate.name = newNodePlatformName;
	nodeToUpdate.description = ckPlatformEditorEditorData2;
	nodeToUpdate.primaryContact = newNodePlatformContact;
	nodeToUpdate.aonInternalNotes = ckPlatformEditorData3;
	nodeToUpdate.customerNotes = ckPlatformEditorData2;
	nodeToUpdate.update();
	//alert("Platform Data Updated");
	$('#Confirmation1').modal('show'); 
	
}

function editreleasedata(){
	var ckReleaseEditorEditorData = CKEDITOR.instances.ReleasetxteditorDescription.getData();
	var ckReleaseEditorData2 = CKEDITOR.instances.ReleaseEdittxtCnotes.getData();
	var ckReleaseEditorData3 = CKEDITOR.instances.ReleaseEdittxtAnotes.getData();
	var newNodeReleaseName = $("#txtReleaseEditName").val();
	var newNodeReleaseContact = $("#ReleaseEditprimaryContact").val();

	nodeToUpdate.name = newNodeReleaseName;
	nodeToUpdate.description = ckReleaseEditorEditorData;
	nodeToUpdate.primaryContact = newNodeReleaseContact;
	nodeToUpdate.aonInternalNotes = ckReleaseEditorData3;
	nodeToUpdate.customerNotes = ckReleaseEditorData2;
	nodeToUpdate.update();
	$('#Confirmation2').modal('show'); 
	//location.reload(true);
	
}
function editfeaturedata(){
	var ckFeatureEditorEditorData = CKEDITOR.instances.FeaturetxteditorDescription.getData();
	var ckFeatureEditorData2 = CKEDITOR.instances.FeatureEdittxtCnotes.getData();
	var ckFeatureEditorData3 = CKEDITOR.instances.FeatureEdittxtAnotes.getData();
	var newNodeFeatureName = $("#txtFeatureEditName").val();
	var newNodeFeatureContact = $("#FeatureEditprimaryContact").val();

	nodeToUpdate.name = newNodeFeatureName;
	nodeToUpdate.description = ckFeatureEditorEditorData;
	nodeToUpdate.primaryContact = newNodeFeatureContact;
	nodeToUpdate.aonInternalNotes = ckFeatureEditorData3;
	nodeToUpdate.customerNotes = ckFeatureEditorData2;
	nodeToUpdate.update();
	$('#Confirmation3').modal('show'); 
	
}

function deleteportfolio(portfolio){
	for (j=0; j < allPortfolioObjects.length; j++) {
		if(portfolio == allPortfolioObjects[j].name){
			$("#txtdelstatus").val(allPortfolioObjects[j].content);
			var status = allPortfolioObjects[j].content;
		//nodeToUpdate.name = status;
		//editportfoliodata();
		//alert(portid);
		nodeToUpdate = allPortfolioObjects[j];
		//deletedata(status);
		}
}
}

function deleteplatform(platform){
	for (j=0; j < allPlatformObjects.length; j++) {
		if(platform == allPlatformObjects[j].name){
			$("#platformtxtdelstatus").val(allPlatformObjects[j].content);
			var status = allPlatformObjects[j].content;
		//nodeToUpdate.name = status;
		//editportfoliodata();
		//alert(portid);
		nodeToUpdate = allPlatformObjects[j];
		//deletedata(status);
		}
}
}

function deleterelease(release){
	for (j=0; j < allReleaseObjects.length; j++) {
		if(release == allReleaseObjects[j].name){
			$("#releasetxtdelstatus").val(allReleaseObjects[j].content);
			var status = allReleaseObjects[j].content;
		//nodeToUpdate.name = status;
		//editportfoliodata();
		//alert(portid);
		nodeToUpdate = allReleaseObjects[j];
		//deletedata(status);
		}
}
}

function deletefeature(feature){
	for (j=0; j < allFeatureObjects.length; j++) {
		if(feature == allFeatureObjects[j].name){
			$("#featuretxtdelstatus").val(allFeatureObjects[j].content);
			var status = allFeatureObjects[j].content;
		//nodeToUpdate.name = status;
		//editportfoliodata();
		//alert(portid);
		nodeToUpdate = allFeatureObjects[j];
		//deletedata(status);
		}
}
}
function deletedata(){
	var NewStatus = $("#txtdelstatus").val();
	//alert(NewStatus);
	if(NewStatus == "true"){
		var cstatus="false";
		nodeToUpdate.content = cstatus;
		nodeToUpdate.update();
		$('#DeletePortfolio').modal('hide'); 
		reload();
	}
}

function deleteplatformdata(){
	var NewStatus = $("#platformtxtdelstatus").val();
	//alert(NewStatus);
	if(NewStatus == "true"){
		var cstatus="false";
		nodeToUpdate.content = cstatus;
		nodeToUpdate.update();
		$('#DeleteRelease').modal('hide'); 
		reload();
	}
}

function deletereleasedata(){
	var NewStatus = $("#releasetxtdelstatus").val();
	//alert(NewStatus);
	if(NewStatus == "true"){
		var cstatus="false";
		nodeToUpdate.content = cstatus;
		nodeToUpdate.update();
		$('#DeleteFeature').modal('hide'); 
		reload();
	}
}

function deletefeaturedata(){
	var NewStatus = $("#featuretxtdelstatus").val();
	alert(NewStatus);
	if(NewStatus == "true"){
		var cstatus="false";
		nodeToUpdate.content = cstatus;
		nodeToUpdate.update();
	}
}
function reload(){
	
location.reload(true);
}