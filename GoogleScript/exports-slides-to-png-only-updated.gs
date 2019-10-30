var modules = [{
    name: "module3",
    presentations: [
      "1GKGhwIH90DktWz18X2BvbkzgbhMVUHcRnvMxwmIU2Oc"
    ]
  }
];

function downloadPresentation(name, id) {
  var slides = getSlideIds(id); var fileName = '';

  for (var i = 0, slide; slide = slides[i]; i++) {
    
    fileName = name + '-' + slide.name;
    
    downloadSlide(name, fileName, id, slide.id);
  }
}

function getRequestOptions () {
    return {
      headers: {
        Authorization: 'Bearer ' + ScriptApp.getOAuthToken()
      }
    };
}


function downloadSlide(folderName, name, presentationId, slideId) {
  var url = 'https://docs.google.com/presentation/d/' + presentationId + '/export/png?id=' + presentationId + '&pageid=' + slideId; 
  
  var options = getRequestOptions();
  var response = UrlFetchApp.fetch(url, options);
  var image = response.getAs(MimeType.PNG);
  image.setName(name);
  var folder;
  
  try { 
    folder = DriveApp.getFoldersByName(folderName).next(); 
  } catch (e) { 
    folder = DriveApp.createFolder(folderName);
  }
  
  folder.createFile(image);
}

function getSlideIds(presentationId) {
  var url = 'https://slides.googleapis.com/v1/presentations/' + presentationId;
  
  var options = getRequestOptions();
  
  var response = UrlFetchApp.fetch(url, options);

  var slideData = JSON.parse(response);
  
  var slides = slideData.slides.map(function(slide) {
    
    var notesPage = slide.slideProperties.notesPage;
    var speakerNotesId = notesPage.notesProperties.speakerNotesObjectId;
    
    var elements = notesPage.pageElements.filter(function (pe) {
      return pe.objectId == speakerNotesId;
    });
    
    var element = elements[0].shape.text.textElements[1].textRun.content;

    element = element.trim().split('\n')[0]; 
    element = element.replace(/:/gi, '-');
    
    return { 
      id: slide.objectId,
      name: element
    };
  });
  
  return slides.filter(function(slide) {
    var a = slide.name.substring(0, 1);
    var b = a == 'w' || a == 'd';
    
    return b;
  });
}

function start() {
  
  for(var i = 0, module; module = modules[i]; i++) {
    
    for(var j = 0, pres; pres = module.presentations[j]; j++) {
      downloadPresentation(module.name, pres);
    }
  }
}
