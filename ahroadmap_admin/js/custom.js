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
     $("#wizard-t-0").click(function () {
        
         $('li:eq(1)').removeClass("done").addClass("disabled");
         $('li:eq(2)').removeClass("done").addClass("disabled");
         $('li:eq(3)').removeClass("done").addClass("disabled");
     });
     $("#wizard-t-1").click(function () {
         
         $('li:eq(2)').removeClass("done").addClass("disabled");
         $('li:eq(3)').removeClass("done").addClass("disabled");
     });
     $("#wizard-t-2").click(function () {
        
         $('li:eq(3)').removeClass("done").addClass("disabled");
     });


 });

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function setCookie1(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function nextStep(m){
	setCookie('portfolioId',m,2);
	populatePlatform(m);
	$(".actions li a[href='#next']").click();
}
function nextStep1(m){
	setCookie('platformId',m,2);
	populateRelease(m);
	$(".actions li a[href='#next']").click();
}
function nextStep2(m){
	setCookie('releaseId',m,2);
	populateFeature(m);
	$(".actions li a[href='#next']").click();
}

function viewportfolio(portfolio){
viewPortfolioData(portfolio);
}

 $("#frmSubmitForm").submit(function (event) {
		 
		event.preventDefault(); // Prevent the form from submitting via the browser.

		$(".moreinfo").css("display", "none") //hide the Brightcove info popup in case it is displayed
			myFunction();

    });   

 $("#frmSubmitForm1").submit(function (event) {
		event.preventDefault(); // Prevent the form from submitting via the browser.

		$(".moreinfo").css("display", "none") //hide the Brightcove info popup in case it is displayed
			myFunction1();

    });   

 $("#frmSubmitForm2").submit(function (event) {
		event.preventDefault(); // Prevent the form from submitting via the browser.

		$(".moreinfo").css("display", "none") //hide the Brightcove info popup in case it is displayed
			myFunction2();

    });  
	 $("#frmSubmitForm3").submit(function (event) {
		event.preventDefault(); // Prevent the form from submitting via the browser.

		$(".moreinfo").css("display", "none") //hide the Brightcove info popup in case it is displayed
			myFunction3();

    });
	  $("#frmeditSubmitForm4").submit(function (event) {
		event.preventDefault(); // Prevent the form from submitting via the browser.

		$(".moreinfo").css("display", "none") //hide the Brightcove info popup in case it is displayed
			editportfoliodata();

    });
	
$("#frmeditSubmitForm5").submit(function (event) {
		event.preventDefault(); // Prevent the form from submitting via the browser.

		$(".moreinfo").css("display", "none") //hide the Brightcove info popup in case it is displayed
			editplatformdata();

    });

$("#frmeditSubmitForm6").submit(function (event) {
		event.preventDefault(); // Prevent the form from submitting via the browser.

		$(".moreinfo").css("display", "none") //hide the Brightcove info popup in case it is displayed
			editreleasedata();

    });

$("#frmeditSubmitForm7").submit(function (event) {
		event.preventDefault(); // Prevent the form from submitting via the browser.

		$(".moreinfo").css("display", "none") //hide the Brightcove info popup in case it is displayed
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
			
			pagereload();

    });
$("#frmeditSubmitForm13").submit(function (event) {
		event.preventDefault(); // Prevent the form from submitting via the browser.
			
			pagereload();

    });
$("#frmeditSubmitForm14").submit(function (event) {
		event.preventDefault(); // Prevent the form from submitting via the browser.
			
			pagereload();

    });
$("#frmeditSubmitForm15").submit(function (event) {
		event.preventDefault(); // Prevent the form from submitting via the browser.
			
			pagereload();

    });
function populateDropDown(callback) {

    console.log('custom populate dropdown executed');
	    activeParentId = "application";
	 	var rows="";
		for (j=0; j < allPortfolioObjects.length; j++) {
 	  	rows += "<tr><td>" + allPortfolioObjects[j].name + "</td><td>" + allPortfolioObjects[j].description + "</td>\
                           <td><a class='btn btn-primary btn-xs' data-toggle='modal' data-target='#viewPortfolio' onclick='javascript:viewportfolio(\""+allPortfolioObjects[j].name+"\");' href='javascript:void(0)' class='btn btn-primary btn-xs'>View</a>&nbsp;&nbsp;<a class='btn btn-primary btn-xs' id='myBtn' data-toggle='modal' data-target='#editPortfolio' onclick='javascript:editportfolio(\""+allPortfolioObjects[j].name+"\");' href='javascript:void(0)'>Edit</a>&nbsp;&nbsp;<a  class='btn btn-primary btn-xs' data-toggle='modal' data-target='#DeletePortfolio' onclick='javascript:deleteportfolio(\""+allPortfolioObjects[j].name+"\");' href='javascript:void(0)'>Delete</a>&nbsp;&nbsp;<a onclick='javascript:nextStep(\""+allPortfolioObjects[j].idName+"\");' href='javascript:void(0)' class='btn btn-primary btn-xs'>Platform</a> \</tr>";
	
	}
		$( rows ).appendTo("#example tbody");
		//alert(rows);
		if(rows != ""){
			$('#example').DataTable();
			$('#loading-image').css("display", "none");
			$('#main-container').css("display", "block");
			$("#example_paginate").hide();
			
			var platformlast = getCookie("platformFinal");
			var releaselast = getCookie("releaseFinal");
			var last = getCookie("submitFinal");
			var deletePlatform = getCookie("deletePlatform");
			var deleteRelease = getCookie("deleteRelease");
			var deleteFeature = getCookie("deleteFeature");
			var editPlatformCookie = getCookie("editPlatformCookie");
			var editReleaseCookie = getCookie("editReleaseCookie");
			var editFeatureCookie = getCookie("editFeatureCookie");
			/*--------Cookies for Add Functionality--------*/
			if(platformlast == 'platformFinal' || deletePlatform == 'deletePlatform' || editPlatformCookie == 'editPlatformCookie'){
				var portfolioIdValue = getCookie("portfolioId");
				if(portfolioIdValue != ''){
					nextStep(portfolioIdValue);
				}
			}
			if(releaselast == 'releaseFinal' || deleteRelease == 'deleteRelease' || editReleaseCookie == 'editReleaseCookie'){
				var portfolioIdValue = getCookie("portfolioId");
				var platformIdValue = getCookie("platformId");
				if(portfolioIdValue != '' && platformIdValue != ''){
					nextStep(portfolioIdValue);
					nextStep1(platformIdValue);
				}
			}
			if(last == 'submitFinal' || deleteFeature == 'deleteFeature' || editFeatureCookie == 'editFeatureCookie'){
				var portfolioIdValue = getCookie("portfolioId");
				var platformIdValue = getCookie("platformId");
				var releaseIdValue = getCookie("releaseId");
				if(portfolioIdValue != '' && platformIdValue != '' && releaseIdValue != ''){
					nextStep(portfolioIdValue);
					nextStep1(platformIdValue);
					nextStep2(releaseIdValue);	
				}
			}
			/*--------End of Cookies for Add Functionality--------*/
			
			/*--------Cookies for Delete Functionality--------*/
			/*if(){
				var portfolioIdValue = getCookie("portfolioId");
				var platformIdValue = getCookie("platformId");
				var releaseIdValue = getCookie("releaseId");
				if(portfolioIdValue != '' && platformIdValue != '' && releaseIdValue != ''){
					nextStep(portfolioIdValue);
					nextStep1(platformIdValue);
					nextStep2(releaseIdValue);	
				}
			}*/
			/*--------End of Cookies for Delete Functionality--------*/
}

callback && callback();
}
function populatePlatform(m){
	var rows="";
	for (j=0; j < allPortfolioObjects.length; j++) {
		if(allPortfolioObjects[j].idName === m){
		    $("#txtPnName").val(allPortfolioObjects[j].name);

		    //for creating the new parentId property
		    activeParentIdForPlatform = allPortfolioObjects[j]._doc;


			for (k=0; k < allPortfolioObjects[j].platforms.length; k++) {
				rows += "<tr><td>" + allPortfolioObjects[j].platforms[k].name + "</td><td>" + allPortfolioObjects[j].platforms[k].description + "</td>\
                           <td><a class='btn btn-primary btn-xs' data-toggle='modal' data-target='#viewPlatform' onclick='javascript:viewplatform(\""+allPortfolioObjects[j].platforms[k].name+"\");' href='javascript:void(0)' class='btn btn-primary btn-xs'>View</a>&nbsp;&nbsp;<a class='btn btn-primary btn-xs' id='myBtn' data-toggle='modal' data-target='#editPlatform' onclick='javascript:editplatform(\""+allPortfolioObjects[j].platforms[k].name+"\");' href='javascript:void(0)'>Edit</a>&nbsp;&nbsp;<a  class='btn btn-primary btn-xs' data-toggle='modal' data-target='#DeletePlatform' onclick='javascript:deleteplatform(\""+allPortfolioObjects[j].platforms[k].name+"\");' href='javascript:void(0)'>Delete</a>&nbsp;&nbsp;<a onclick='javascript:nextStep1(\""+allPortfolioObjects[j].platforms[k].idName+"\");' href='javascript:void(0)' class='btn btn-primary btn-xs'>Release</a> \</tr>";
				
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
		if(allPlatformObjects[j].idName === m){
		//inatalert(allPlatformObjects[j].name);
		    $("#txtPlatform").val(allPlatformObjects[j].name);


		    //for creating the new parentId property
		    activeParentIdForRelease = allPlatformObjects[j]._doc;


			for (k=0; k < allPlatformObjects[j].releases.length; k++) {
				rows += "<tr><td>" + allPlatformObjects[j].releases[k].name + "</td><td>" + allPlatformObjects[j].releases[k].description + "</td>\
                           <td><a class='btn btn-primary btn-xs' data-toggle='modal' data-target='#viewRelease' onclick='javascript:viewrelease(\""+allPlatformObjects[j].releases[k].name+"\");'>View</a>&nbsp;&nbsp;<a class='btn btn-primary btn-xs' id='myBtn' data-toggle='modal' data-target='#editRelease'  onclick='javascript:editrelease(\""+allPlatformObjects[j].releases[k].name+"\");' href='javascript:void(0)'>Edit</a>&nbsp;&nbsp;<a  class='btn btn-primary btn-xs' data-toggle='modal' data-target='#DeleteRelease' onclick='javascript:deleterelease(\""+allPlatformObjects[j].releases[k].name+"\");' href='javascript:void(0)'>Delete</a>&nbsp;&nbsp;<a onclick='javascript:nextStep2(\""+allPlatformObjects[j].releases[k].idName+"\");' href='javascript:void(0)' class='btn btn-primary btn-xs'>Feature</a> \</tr>";
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
		if(allReleaseObjects[j].idName === m){
		//alert(allReleaseObjects[j].name);
		    $("#txtRelease").val(allReleaseObjects[j].name);

            //for creating the new parentId property
		    activeParentIdForFeature = allReleaseObjects[j]._doc;

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



function viewPortfolioData(portfolio){
		for (j=0; j < allPortfolioObjects.length; j++) {
		if(portfolio == allPortfolioObjects[j].name){
		$("#txtViewName").html(allPortfolioObjects[j].name);
		$("#viewprimaryContact").html(allPortfolioObjects[j].primaryContact);
		
		$("#viewDate").html(allPortfolioObjects[j].date);
		
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
		$("#viewPlatformDate").html(allPlatformObjects[j].date);
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
		$("#viewReleaseDate").html(allReleaseObjects[j].date);
		$("#viewReleasetxtCnotes").html(allReleaseObjects[j].customerNotes);
		$("#viewReleasetxtAnotes").html(allReleaseObjects[j].aonInternalNotes);
		$("#editor7").html(allReleaseObjects[j].description);
		}
 	  	
	
	}

}


function viewfeature(feature){
		for (j=0; j < allFeatureObjects.length; j++) {
		if(feature == allFeatureObjects[j].name){
		$("#txtFeatureViewName").html(allFeatureObjects[j].name);
		$("#viewFeatureprimaryContact").html(allFeatureObjects[j].primaryContact);
		$("#viewFeatureDate").html(allFeatureObjects[j].date);
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
		//$("#EditDate").val(allPortfolioObjects[j].date);
		$("#editportfoliodate").val(allPortfolioObjects[j].date);
		//alert(htmlentities(allPortfolioObjects[j].customerNotes));
		CKEDITOR.instances.EdittxtCnotes.setData( allPortfolioObjects[j].customerNotes );
		//var value = editor.getData();
		//alert(value);
		//$("#EdittxtCnotes").val((allPortfolioObjects[j].customerNotes));
		CKEDITOR.instances.EdittxtAnotes.setData( allPortfolioObjects[j].aonInternalNotes );
		
		CKEDITOR.instances.txteditoredit1.setData( allPortfolioObjects[j].description );
		$("#txtEditVideoIds1").val(allPortfolioObjects[j].videoIds);
		//CKEDITOR.instances.EdittxtCnotes.updateElement();
		var portid = allPortfolioObjects[j].name;
		var portname= allPortfolioObjects[j].name;
		var portcontact = allPortfolioObjects[j].primaryContact;
		var portdate = allPortfolioObjects[j].date;
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
		
		//$("#EditPlatformDate").val(allPlatformObjects[j].date);
		$("#editplatformdate").val(allPlatformObjects[j].date);
		
		CKEDITOR.instances.PlatformEdittxtCnotes.setData( allPlatformObjects[j].customerNotes );
		CKEDITOR.instances.PlatformEdittxtAnotes.setData( allPlatformObjects[j].aonInternalNotes );
		CKEDITOR.instances.PlatformtxteditorDescription.setData( allPlatformObjects[j].description );
		$("#txtEditVideoIds2").val(allPlatformObjects[j].videoIds);
		var Platformid = allPlatformObjects[j].name;
		var Platformname= allPlatformObjects[j].name;
		var Platformtcontact = allPlatformObjects[j].primaryContact;
		var Platformdate = allPlatformObjects[j].date;
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
		
		//$("#EditReleaseDate").val(allReleaseObjects[j].date);
		$("#editreleasedate").val(allReleaseObjects[j].date);

		CKEDITOR.instances.ReleaseEdittxtCnotes.setData( allReleaseObjects[j].customerNotes );
		CKEDITOR.instances.ReleaseEdittxtAnotes.setData( allReleaseObjects[j].aonInternalNotes );
		CKEDITOR.instances.ReleasetxteditorDescription.setData( allReleaseObjects[j].description );
		$("#txtEditVideoIds3").val(allReleaseObjects[j].videoIds);
		var Releaseid = allReleaseObjects[j].name;
		var Releasename= allReleaseObjects[j].name;
		var Releasecontact = allReleaseObjects[j].primaryContact;
		var Releasedate = allReleaseObjects[j].date;
		
		var Releasecnotes = allReleaseObjects[j].customerNotes;
		var Releaseanotes = allReleaseObjects[j].aonInternalNotes;
		var Releaseeditor1 = allReleaseObjects[j].description;

		//editportfoliodata();
		//alert(portid);
		nodeToUpdate = allReleaseObjects[j];
		
		}
}
}



function editfeature(feature){

for (j=0; j < allFeatureObjects.length; j++) {
		if(feature == allFeatureObjects[j].name){
		$("#txtFeatureEditName").val(allFeatureObjects[j].name);
		$("#FeatureEditprimaryContact").val(allFeatureObjects[j].primaryContact);
		
		//$("#EditFeatureDate").val(allFeatureObjects[j].date);
		$("#editfeaturedate").val(allFeatureObjects[j].date);
			
		CKEDITOR.instances.FeatureEdittxtCnotes.setData( allFeatureObjects[j].customerNotes );
		CKEDITOR.instances.FeatureEdittxtAnotes.setData( allFeatureObjects[j].aonInternalNotes );
		CKEDITOR.instances.FeaturetxteditorDescription.setData( allFeatureObjects[j].description );
		$("#txtEditVideoIds4").val(allFeatureObjects[j].videoIds);
		var Featureid = allFeatureObjects[j].name;
		var Featurename= allFeatureObjects[j].name;
		var Featurecontact = allFeatureObjects[j].primaryContact;
		var Featuredate = allFeatureObjects[j].date;
		
		var Featurecnotes = allFeatureObjects[j].customerNotes;
		var Featureanotes = allFeatureObjects[j].aonInternalNotes;
		var Featureeditor1 = allFeatureObjects[j].description;

		//editportfoliodata();
		//alert(portid);
		nodeToUpdate = allFeatureObjects[j];
		
		}
}
}

function editportfoliodata() {
    $(".loadingClass").css('display', 'block');
	var ckPortfolioEditorData1 = CKEDITOR.instances.txteditoredit1.getData();
	var ckPortfolioEditorData2 = CKEDITOR.instances.EdittxtCnotes.getData();
	var ckPortfolioEditorData3 = CKEDITOR.instances.EdittxtAnotes.getData();
    /////
    var oldNodePortfolioName = nodeToUpdate.name;
    /////
    var newNodePortfolioName = $("#txtEditName").val();



    ///Check to see if the name is changed and if it is taken
    //////////////////////////
    if (oldNodePortfolioName != newNodePortfolioName) {
        if (newNodePortfolioName == "") {
            alert("Please give this object a valid name");
            $(".loadingClass").css('display', 'none');
            return false;
        }
        if (newNodePortfolioName.indexOf("/") != -1) {
            alert("The slash character(/) is not allowed in a name.");
            $(".loadingClass").css('display', 'none');
            return false;
        }


        //Do not allow two portfolios with the same name
        for (j = 0; j < allPortfolioObjects.length; j++) {
            if (newNodePortfolioName == allPortfolioObjects[j].name) {
                alert("This is already taken as Portfolio name.");
                $(".loadingClass").css('display', 'none');
                return false;
            }

        }

        /*
        for (j = 0; j < allPlatformObjects.length; j++) {
            if (newNodePortfolioName == allPlatformObjects[j].name) {
                alert("This is already taken as Platform name.");
                $(".loadingClass").css('display', 'none');
                return false;
            }

        }
        for (j = 0; j < allReleaseObjects.length; j++) {
            if (newNodePortfolioName == allReleaseObjects[j].name) {
                alert("This is already taken as Release name.");
                $(".loadingClass").css('display', 'none');
                return false;
            }

        }

        for (j = 0; j < allFeatureObjects.length; j++) {
            if (newNodePortfolioName == allFeatureObjects[j].name) {
                alert("This is already taken as Feature name.");
                $(".loadingClass").css('display', 'none');
                return false;
            }

        }

        */

    }

   





	var newNodePortfolioContact = $("#EditprimaryContact").val();
	
	var newNodePortfolioDate = $("#editportfoliodate").val();
	
	var VideoIds1 = $("#txtEditVideoIds1").val();
	nodeToUpdate.name = newNodePortfolioName;
	nodeToUpdate.description = ckPortfolioEditorData1;
	nodeToUpdate.primaryContact = newNodePortfolioContact;
	
	nodeToUpdate.date = newNodePortfolioDate;
	
	nodeToUpdate.customerNotes = ckPortfolioEditorData2;
	nodeToUpdate.aonInternalNotes = ckPortfolioEditorData3;
	nodeToUpdate.videoIds = VideoIds1;
	nodeToUpdate.update().then(function () {
	    /////////Test for name change
	    if (oldNodePortfolioName != newNodePortfolioName) {
	        console.log("portfolio name has been changed");
	        updateParentsOfPortfolioChildren(oldNodePortfolioName, newNodePortfolioName);

	    } else {
	        console.log("portfolio name has NOT been changed");
	    }

	    ///////////////






	    /////////////conditional uploading of attachments
	    if ($("#uploadFilenameEdit4").val() !== "") {

	        newCommentId = nodeToUpdate.getId();
	        console.log("File Upload routine is being processed. Put process should have completed by now");
	        var formData = new FormData($("#frmeditSubmitForm4")[0]);

	        var authorizationHeader = platform.getDriver().getHttpHeaders()["Authorization"];
	        var form = $("#frmeditSubmitForm4");

	        $.ajax({
	            type: "POST",
	            url: "https://api.cloudcms.com/repositories/" + repositoryId + "/branches/" + branchId + "/nodes/" + newCommentId + "/attachments/" + ($("#uploadFilenameEdit4").val()).replace(" ", "_") + "/",
	            data: formData,
	            contentType: false,
	            processData: false,
	            headers: {
	                authorization: authorizationHeader
	            }

	        });

	    }
	    ///////////////   
	});
//$('#Confirmation').modal('show');
    
	pagereload();
	
		
}



function editplatformdata() {
    $(".loadingClass").css('display', 'block');
	var ckPlatformEditorEditorData2 = CKEDITOR.instances.PlatformtxteditorDescription.getData();
	var ckPlatformEditorData2 = CKEDITOR.instances.PlatformEdittxtCnotes.getData();
	var ckPlatformEditorData3 = CKEDITOR.instances.PlatformEdittxtAnotes.getData();
	/////
	var oldNodePlatformName = nodeToUpdate.name;
	/////
	var newNodePlatformName = $("#txtPlatformEditName").val();

	///Check to see if the name is changed and if it is taken

	if (oldNodePlatformName != newNodePlatformName) {
	    
        
        if (newNodePlatformName == "") {
	        alert("Please give this object a valid name");
	        $(".loadingClass").css('display', 'none');
	        return false;
	    }
	    if (newNodePlatformName.indexOf("/") != -1) {
	        alert("The slash character(/) is not allowed in a name.");
	        $(".loadingClass").css('display', 'none');
	        return false;
	    }

        /*
	    for (j = 0; j < allPortfolioObjects.length; j++) {
	        if (newNodePlatformName == allPortfolioObjects[j].name) {
	            alert("This is already taken as Portfolio name.");
	            $(".loadingClass").css('display', 'none');
	            return false;
	        }

	    }

	    for (j = 0; j < allPlatformObjects.length; j++) {
	        if (newNodePlatformName == allPlatformObjects[j].name) {
	            alert("This is already taken as Platform name.");
	            $(".loadingClass").css('display', 'none');
	            return false;
	        }

	    }
	    for (j = 0; j < allReleaseObjects.length; j++) {
	        if (newNodePlatformName == allReleaseObjects[j].name) {
	            alert("This is already taken as Release name.");
	            $(".loadingClass").css('display', 'none');
	            return false;
	        }

	    }

	    for (j = 0; j < allFeatureObjects.length; j++) {
	        if (newNodePlatformName == allFeatureObjects[j].name) {
	            alert("This is already taken as Feature name.");
	            $(".loadingClass").css('display', 'none');
	            return false;
	        }

	    }
        */

	}

	


	var newNodePlatformContact = $("#PlatformEditprimaryContact").val();
	
	var newNodePlatformDate = $("#editplatformdate").val();
	
	var VideoIds2 = $("#txtEditVideoIds2").val();
	nodeToUpdate.name = newNodePlatformName;
	nodeToUpdate.description = ckPlatformEditorEditorData2;
	nodeToUpdate.primaryContact = newNodePlatformContact;
	
	nodeToUpdate.date = newNodePlatformDate;
	
	nodeToUpdate.aonInternalNotes = ckPlatformEditorData3;
	nodeToUpdate.customerNotes = ckPlatformEditorData2;
	nodeToUpdate.videoIds = VideoIds2;
	nodeToUpdate.update().then(function () {
	    /////////Test for name change
	    if (oldNodePlatformName != newNodePlatformName) {
	        console.log("platform name has been changed");
	        updateParentsOfPlatformChildren(oldNodePlatformName, newNodePlatformName);

	    } else {
	        console.log("platform name has NOT been changed");
	    }

	    ///////////////

	    if ($("#uploadFilenameEdit5").val() !== "") {

	        newCommentId = nodeToUpdate.getId();
	        var formData = new FormData($("#frmeditSubmitForm5")[0]);

	        var authorizationHeader = platform.getDriver().getHttpHeaders()["Authorization"];
	        var form = $("#frmeditSubmitForm5");

	        $.ajax({
	            type: "POST",
	            url: "https://api.cloudcms.com/repositories/" + repositoryId + "/branches/" + branchId + "/nodes/" + newCommentId + "/attachments/" + ($("#uploadFilenameEdit5").val()).replace(" ", "_") + "/",
	            data: formData,
	            contentType: false,
	            processData: false,
	            headers: {
	                authorization: authorizationHeader
	            }
	        });
	    }
	});
	//$('#Confirmation1').modal('show');
	setCookie1('editPlatformCookie','editPlatformCookie',30);
	pagereload();
}

function editreleasedata() {
    $(".loadingClass").css('display', 'block');
	var ckReleaseEditorEditorData = CKEDITOR.instances.ReleasetxteditorDescription.getData();
	var ckReleaseEditorData2 = CKEDITOR.instances.ReleaseEdittxtCnotes.getData();
	var ckReleaseEditorData3 = CKEDITOR.instances.ReleaseEdittxtAnotes.getData();

	/////
	var oldNodeReleaseName = nodeToUpdate.name;
	/////

	var newNodeReleaseName = $("#txtReleaseEditName").val();

	///Check to see if the name is changed and if it is taken
	//////////////////////////
	if (oldNodeReleaseName != newNodeReleaseName) {
	    if (newNodeReleaseName == "") {
	        alert("Please give this object a valid name");
	        $(".loadingClass").css('display', 'none');
	        return false;
	    }
	    if (newNodeReleaseName.indexOf("/") != -1) {
	        alert("The slash character(/) is not allowed in a name.");
	        $(".loadingClass").css('display', 'none');
	        return false;
	    }


        /*
	    for (j = 0; j < allPortfolioObjects.length; j++) {
	        if (newNodeReleaseName == allPortfolioObjects[j].name) {
	            alert("This is already taken as Portfolio name.");
	            $(".loadingClass").css('display', 'none');
	            return false;
	        }

	    }
	    for (j = 0; j < allPlatformObjects.length; j++) {
	        if (newNodeReleaseName == allPlatformObjects[j].name) {
	            alert("This is already taken as Platform name.");
	            $(".loadingClass").css('display', 'none');
	            return false;
	        }

	    }
	    for (j = 0; j < allReleaseObjects.length; j++) {
	        if (newNodeReleaseName == allReleaseObjects[j].name) {
	            alert("This is already taken as Release name.");
	            $(".loadingClass").css('display', 'none');
	            return false;
	        }

	    }

	    for (j = 0; j < allFeatureObjects.length; j++) {
	        if (newNodeReleaseName == allFeatureObjects[j].name) {
	            alert("This is already taken as Feature name.");
	            $(".loadingClass").css('display', 'none');
	            return false;
	        }

	    }
        */

	}

	//////////////////////////////////


	var newNodeReleaseContact = $("#ReleaseEditprimaryContact").val();
	
	var newNodeReleaseDate = $("#editreleasedate").val();
	
	var VideoIds3 = $("#txtEditVideoIds3").val();
	nodeToUpdate.name = newNodeReleaseName;
	nodeToUpdate.description = ckReleaseEditorEditorData;
	nodeToUpdate.primaryContact = newNodeReleaseContact;
	
	nodeToUpdate.date = newNodeReleaseDate;
	
	nodeToUpdate.aonInternalNotes = ckReleaseEditorData3;
	nodeToUpdate.customerNotes = ckReleaseEditorData2;
	nodeToUpdate.videoIds = VideoIds3;
	nodeToUpdate.update().then(function () {
	  

	    /////////Test for name change
	    if (oldNodeReleaseName != newNodeReleaseName) {
	        console.log("release name has been changed");
	        updateParentsOfReleaseChildren(oldNodeReleaseName, newNodeReleaseName);

	    } else {
	        console.log("release name has NOT been changed");
	    }

	    ///////////////



	    if ($("#uploadFilenameEdit6").val() !== "") {
	        newCommentId = nodeToUpdate.getId();
	        var formData = new FormData($("#frmeditSubmitForm6")[0]);

	        var authorizationHeader = platform.getDriver().getHttpHeaders()["Authorization"];
	        var form = $("#frmeditSubmitForm6");

	        $.ajax({
	            type: "POST",
	            url: "https://api.cloudcms.com/repositories/" + repositoryId + "/branches/" + branchId + "/nodes/" + newCommentId + "/attachments/" + ($("#uploadFilenameEdit6").val()).replace(" ", "_") + "/",
	            data: formData,
	            contentType: false,
	            processData: false,
	            headers: {
	                authorization: authorizationHeader
	            }
	        });
	    }
	});
	//$('#Confirmation2').modal('show');
	setCookie1('editReleaseCookie','editReleaseCookie',30);
	pagereload();
	
}
function editfeaturedata() {
    $(".loadingClass").css('display', 'block');
	var ckFeatureEditorEditorData = CKEDITOR.instances.FeaturetxteditorDescription.getData();
	var ckFeatureEditorData2 = CKEDITOR.instances.FeatureEdittxtCnotes.getData();
	var ckFeatureEditorData3 = CKEDITOR.instances.FeatureEdittxtAnotes.getData();


	/////
	var oldNodeFeatureName = nodeToUpdate.name;
	/////
	var newNodeFeatureName = $("#txtFeatureEditName").val();

	///Check to see if the name is changed and if it is taken
	//////////////////////////
	if (oldNodeFeatureName != newNodeFeatureName) {
	    if (newNodeFeatureName == "") {
	        alert("Please give this object a valid name");
	        $(".loadingClass").css('display', 'none');
	        return false;
	    }
	    if (newNodeFeatureName.indexOf("/") != -1) {
	        alert("The slash character(/) is not allowed in a name.");
	        $(".loadingClass").css('display', 'none');
	        return false;
	    }


        /*
	    for (j = 0; j < allPortfolioObjects.length; j++) {
	        if (newNodeFeatureName == allPortfolioObjects[j].name) {
	            alert("This is already taken as Portfolio name.");
	            $(".loadingClass").css('display', 'none');
	            return false;
	        }

	    }
	    for (j = 0; j < allPlatformObjects.length; j++) {
	        if (newNodeFeatureName == allPlatformObjects[j].name) {
	            alert("This is already taken as Platform name.");
	            $(".loadingClass").css('display', 'none');
	            return false;
	        }

	    }
	    for (j = 0; j < allReleaseObjects.length; j++) {
	        if (newNodeFeatureName == allReleaseObjects[j].name) {
	            alert("This is already taken as Release name.");
	            $(".loadingClass").css('display', 'none');
	            return false;
	        }

	    }

	    for (j = 0; j < allFeatureObjects.length; j++) {
	        if (newNodeFeatureName == allFeatureObjects[j].name) {
	            alert("This is already taken as Feature name.");
	            $(".loadingClass").css('display', 'none');
	            return false;
	        }

	    }
        */

	}




	var newNodeFeatureContact = $("#FeatureEditprimaryContact").val();
	
	var newNodeFeatureDate = $("#editfeaturedate").val();
	
		var VideoIds4 = $("#txtEditVideoIds4").val();
	nodeToUpdate.name = newNodeFeatureName;
	nodeToUpdate.description = ckFeatureEditorEditorData;
	nodeToUpdate.primaryContact = newNodeFeatureContact;
	
	nodeToUpdate.date = newNodeFeatureDate;
	
	nodeToUpdate.aonInternalNotes = ckFeatureEditorData3;
	nodeToUpdate.customerNotes = ckFeatureEditorData2;
	nodeToUpdate.videoIds = VideoIds4;
	nodeToUpdate.update().then(function () {


	    if ($("#uploadFilenameEdit7").val() !== "") {
	        newCommentId = nodeToUpdate.getId();
	        var formData = new FormData($("#frmeditSubmitForm7")[0]);

	        var authorizationHeader = platform.getDriver().getHttpHeaders()["Authorization"];
	        var form = $("#frmeditSubmitForm7");

	        $.ajax({
	            type: "POST",
	            url: "https://api.cloudcms.com/repositories/" + repositoryId + "/branches/" + branchId + "/nodes/" + newCommentId + "/attachments/" + ($("#uploadFilenameEdit7").val()).replace(" ", "_") + "/",
	            data: formData,
	            contentType: false,
	            processData: false,
	            headers: {
	                authorization: authorizationHeader
	            }
	        });
	    }
	});
	setCookie1('editFeatureCookie','editFeatureCookie',30);
	//$('#Confirmation3').modal('show'); 
            pagereload();
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
		pagereload();
	}
}

function deleteplatformdata(){
	var NewStatus = $("#platformtxtdelstatus").val();
	//alert(NewStatus);
	if(NewStatus == "true"){
		setCookie1('deletePlatform','deletePlatform',30);
		var cstatus="false";
		nodeToUpdate.content = cstatus;
		nodeToUpdate.update();
		$('#DeleteRelease').modal('hide'); 
		pagereload();
	}
}

function deletereleasedata(){
	var NewStatus = $("#releasetxtdelstatus").val();
	//alert(NewStatus);
	if(NewStatus == "true"){
		setCookie1('deleteRelease','deleteRelease',30);
		var cstatus="false";
		nodeToUpdate.content = cstatus;
		nodeToUpdate.update();
		$('#DeleteFeature').modal('hide'); 
		pagereload();
	}
}

function deletefeaturedata(){
	var NewStatus = $("#featuretxtdelstatus").val();
	if(NewStatus == "true"){
		setCookie1('deleteFeature','deleteFeature',30);
		var cstatus="false";
		nodeToUpdate.content = cstatus;
		nodeToUpdate.update();
		pagereload();
	}
}
function pagereload(){
	setTimeout(function () { location.reload(true); }, 2000);

}


function updateParentsOfReleaseChildren(oldNodeReleaseName, newNodeReleaseName){
    for (j = 0; j < allFeatureObjects.length; j++) {
        if (allFeatureObjects[j].parent == oldNodeReleaseName) {
            console.log(allFeatureObjects[j].name + " has a parent of " + allFeatureObjects[j].parent + " and needs to be changed to " + newNodeReleaseName);
            allFeatureObjects[j].parent = newNodeReleaseName;
            allFeatureObjects[j].update();
        }
    }
}
function updateParentsOfPlatformChildren(oldNodePlatformName, newNodePlatformName) {
    for (j = 0; j < allReleaseObjects.length; j++) {
        if (allReleaseObjects[j].parent == oldNodePlatformName) {
            console.log(allReleaseObjects[j].name + " has a parent of " + allReleaseObjects[j].parent + " and needs to be changed to " + newNodePlatformName);
            allReleaseObjects[j].parent = newNodePlatformName;
            allReleaseObjects[j].update();
        }
    }

}
function updateParentsOfPortfolioChildren(oldNodePortfolioName, newNodePortfolioName) {
    for (j = 0; j < allPlatformObjects.length; j++) {
        if (allPlatformObjects[j].parent == oldNodePortfolioName) {
            console.log(allPlatformObjects[j].name + " has a parent of " + allPlatformObjects[j].parent + " and needs to be changed to " + newNodePortfolioName);
            allPlatformObjects[j].parent = newNodePortfolioName;
            allPlatformObjects[j].update();
        }
    }
}