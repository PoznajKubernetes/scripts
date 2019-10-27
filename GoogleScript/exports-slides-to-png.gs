var modules = [
    {
      name: 'module4',
      presentations: [
        '1gGeFeDYKGBmFPP0TFUIFHF3oK6diRiLmglMudTK8tOk',
        '155x3zdUMY2LRI-z7BdVokWmaaNaWFWJptMl2ayaRue8',
        '187etOIMuI8-cfTgIRLNrIhF8pkv2d1WB75HLz_eBgVA',
        '1gI_LNUiAh0MLu8Ath83hB8mhyrTnxpLMGand6s2vziQ'
      ]
    }
  ];
  
  var global_count = 0;
  
  function downloadPresentation(name, id) {
    var slides = getSlideIds(id); var count = '';
  
    for (var i = 0, slide; slide = slides[i]; i++, global_count++) {
      
      if(global_count < 10) {
        count = '-0' + global_count.toString();
      } else {
        count  = '-' + global_count.toString();
      }
      
      downloadSlide(name, slide.name + count, id, slide.id);
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
    
    for(var i = 0, module; module = modules[i]; i++) {
      
      for(var j = 0, pres; pres = module.presentations[j]; j++) {
        downloadPresentation(module.name, pres);
      }
      
      global_count = 0;
    }
  }