var modules = [
    {
        name: 'module6',
        presentations: [
        '', // 06.00
        '', // 06.01
        '', // 06.02
        '15DWbFxwbaF5J2GHEpt0cAit3dueBTY_G1C6CESHQh4M', // 06.03
        '', // 06.04
        '1kabewvWFins5TerMdbwTmnURHf7BpXM5EGaPHxEr9T0', // 06.05
        '' // 06.99
        ]
    }, {
        name: 'module5',
        presentations: [
            '', // 05.00
            '', // 05.01
            '', // 05.02
            '', // 05.03
            '1ubQcai9qD0jjU07FrXZXVEHC8W3hUGwovo4Z17a9iAg', // 05.04
            '13v4hiJVJxsdt9OxZ6-cPvk3wzYbBo1dm6fMFBfE-xVg', // 05.05
            '' // 05.99
        ]
    }, {
        name: 'module4',
        presentations: [
            '1gGeFeDYKGBmFPP0TFUIFHF3oK6diRiLmglMudTK8tOk', // 04.00
            '155x3zdUMY2LRI-z7BdVokWmaaNaWFWJptMl2ayaRue8', // 04.01
            '187etOIMuI8-cfTgIRLNrIhF8pkv2d1WB75HLz_eBgVA', // 04.02
            '1gI_LNUiAh0MLu8Ath83hB8mhyrTnxpLMGand6s2vziQ' // 04.99
        ]
    }, {
        name: 'module3',
        presentations: [
            '', // 03.00
            '', // 03.01
            '1GKGhwIH90DktWz18X2BvbkzgbhMVUHcRnvMxwmIU2Oc', // 03.02
            '', // 03.03
            '', // 03.99
        ]
    }, {
        name: 'module2',
        presentations: [
            '', // 02.00
            '', // 02.01
            '', // 02.02
            '1jPLHyIwl4HvRbbP6DLz9tW3A8kZlt6voQ0W6sz2GBn4', // 02.03
            '', // 02.04
            '', // 02.99
        ]
    }, {
        name: 'module1',
        presentations: [
            '1BewBbF3OzL1KzE_MpU5vqEXh4LZL85iQxio8ify6E0I', // 01.00
            '1l5W_FdT-jUH_Ay0h1neZg8fJQ-feDvZOeICsooFlSCE', // 01.01
            '', // 01.02
            '', // 01.03
            '', // 01.04
            '1xvLrnExxTeLDs6jwS7d9kcVTR1jRt3yVA6AI4C__USQ', // 01.05
            '', // 01.06
            '1cK-z9vmzMjis8mjk3-hxEZz8EnMQqtiDINSx9_oYg7M', // 01.99
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