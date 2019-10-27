var presentation_global_id = '1gGeFeDYKGBmFPP0TFUIFHF3oK6diRiLmglMudTK8tOk';
var presentation_module_name = 'module4';

function downloadPresentation(id) {
  var slides = getSlideIds(id); 
  var count = '';

  for (var i = 0, slide; slide = slides[i]; i++) {
    
    if(i < 10) {
      count = '-0' + i.toString();
    } else {
      count  = '-' + i.toString();
    }
    
    downloadSlide(slide.name + count, id, slide.id);
  }
}

function getRequestOptions () {
    return {
      headers: {
        Authorization: 'Bearer ' + ScriptApp.getOAuthToken()
      }
    };
}

function downloadSlide(name, presentationId, slideId) {
  var url = 'https://docs.google.com/presentation/d/' + presentationId + '/export/png?id=' + presentationId + '&pageid=' + slideId; 

  var options = getRequestOptions();

  var response = UrlFetchApp.fetch(url, options);
  var image = response.getAs(MimeType.PNG);
  image.setName(name);
  var folder;
  
  try { 
    folder = DriveApp.getFoldersByName(presentation_module_name).next(); 
  } catch (e) { 
    folder = DriveApp.createFolder(presentation_module_name);
  }
  
  folder.createFile(image);
}

function getSlideIds(presentationId) {
  var url = 'https://slides.googleapis.com/v1/presentations/' + presentationId;
  
  var options = getRequestOptions();
  var response = UrlFetchApp.fetch(url, options);

  var slideData = JSON.parse(response);
  return slideData.slides.map(function(slide) {
    
    var notesPage = slide.slideProperties.notesPage;
    var speakerNotesId = notesPage.notesProperties.speakerNotesObjectId;
    
    var elements = notesPage.pageElements.filter(function (pe) {
      return pe.objectId == speakerNotesId;
    });
    
    var element = elements[0].shape.text.textElements[1].textRun.content;

    element = element.trim().split('\n')[0];    
    
    return { 
      id: slide.objectId,
      name: element
    };
  });
}

function start() {
  downloadPresentation(presentation_global_id)
}