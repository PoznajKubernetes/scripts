var modules = [
  {
    name: "module1",
    presentations: [
      "1BewBbF3OzL1KzE_MpU5vqEXh4LZL85iQxio8ify6E0I", //01.00 - 02 - Wprowadzenie
      "1l5W_FdT-jUH_Ay0h1neZg8fJQ-feDvZOeICsooFlSCE", //01.01 - Mechanika Szkolenia
      "1lHsGgTEKE5KLYmTcllTOXDNJwoN_G9OH6iOn2vdN9bA", //1.2 - Podstawy architektury systemów rozproszonych
      //"1VjRDNv4cmlplaHqSxSbCz2ihGkwkIM-fn9q9f4NaDak", //1.3
      "1KegYYly6HIaZqJ1myTJwAbBu8QY2rr7iBffjk_f_cIs", //1.4 - Przygotowanie komputera do pracy
      "1xvLrnExxTeLDs6jwS7d9kcVTR1jRt3yVA6AI4C__USQ", //01.05 - Najlepsze praktyki Docker
      //"1UGbUSwXFl5RJao9lUff0cN5UNFYHVmOmFfjHIT6PsY8", //1.6 - Praca deklaratywna i imperatywna
      "1cK-z9vmzMjis8mjk3-hxEZz8EnMQqtiDINSx9_oYg7M", //01.99 - 01 - Wprowadzenie - Podsumowanie
    ]
  },
  {
    name: "module2",
    presentations: [
      "1zm-XqmBoYMJB0YljH-JsGQpysXk3v29xNMO6GbEne6A", //2.0 - Moduł Pod
      "1e2MsU1IwU27rOgrZDYAU-S8ZbrXxCy01tFYZ1B3YfCY", //2.1 - Pod
      //"1ab1eL9iCV6ZPl9kxwlqjI_foZiki6gI6ZOZDa9bjg40", //2.2 - Zarządzanie zasobami (cpu i ram)
      "1jPLHyIwl4HvRbbP6DLz9tW3A8kZlt6voQ0W6sz2GBn4", //02.03 - Co się dzieje w Pod?
      "1gGfZVEFg9t2_oLyN391elgC2OCsTv3D9JUNhykygW7A", //2.4 - Health check
      //"1JmAkDLJsKFMe-dLh2sxF6Qn9aQwQ2Xe4LNZV7GJNZHA", //2.6
      "1-wBCoXwNFSg0wZXE3o9mlL605ZtD0ToQTEMU8Hjdsc0", //2.99 - koniec modłułu
      "1qURaW7jIymjn3xjFeIB0qZCnAAcbt4uTxBfoZRpaq3g", //2.X - pod lifecycle
    ]
  },
  {
    name: "module3",
    presentations: [
      "1flY5eQtcB4h5ReAtRt2NeqTUOlZ43HKG3kHILzwhOik", //3.0 - START - Konfiguracja
      "1G4OwNBiWX6doEKt6g_dIi19b3aAM106al5ULQinz7MQ", //3.1 - Zmienne środowiskowe
      "1GKGhwIH90DktWz18X2BvbkzgbhMVUHcRnvMxwmIU2Oc", //03.02 - ConfigMap
      "1WgGlKg7uJJeLKSaZ-Z3XNIxDTgnJcqPfYSONOJ6lnNc", //3.3 - Secrets
      //"1l-6Oanqm8e_-HMIawkJrDn947g0835kPlj_eZetIc4w", //3.4
      "1p5LoyHw9iz_vusYeD9iVjD6MnuCG9m-XfHmBfhxP5wQ", //3.99 - END - Konfiguracja
    ]
  },
  {
    name: "module4",
    presentations: [
      "1gGeFeDYKGBmFPP0TFUIFHF3oK6diRiLmglMudTK8tOk", //04.00 - Grupowanie i Wybieranie
      "155x3zdUMY2LRI-z7BdVokWmaaNaWFWJptMl2ayaRue8", //04.01 - Etykiety
      "187etOIMuI8-cfTgIRLNrIhF8pkv2d1WB75HLz_eBgVA", //04.02 - Adnotacje
      "1gI_LNUiAh0MLu8Ath83hB8mhyrTnxpLMGand6s2vziQ", //04.99 - Grupowanie i Wybieranie - Podsumowanie
    ]
  },
  {
    name: "module5",
    presentations: [
      "1bzAtQdQBLPg5omQcF-iillN-ifERKtjuC4STPvQGs_E", //5.0 - moduł serwisy i service discovery
      "1TgV09qEY9cbw_UECgyjrfPja_3fiYHLdvGqLK9V8jT0", //5.1 - Czym jest Service Discovery
      //"1DDY2YK8fYDy9p-bsGn7-2hZIwu1Mk-GeL6-joIhL8pg", //5.2
      //"1T5MbfoUpzhzWVIkh94W22UFQYTZpIJMR9zSohwyt-cQ", //5.3
      "1ubQcai9qD0jjU07FrXZXVEHC8W3hUGwovo4Z17a9iAg", //05.04 - Wpływ Health Check na Service
      "13v4hiJVJxsdt9OxZ6-cPvk3wzYbBo1dm6fMFBfE-xVg", //05.05 - ServiceDiscovery jako zmienne środowiskowe
      "1e-VkGjlExYj8fyFbXkm1e0JONuxpZl6bxHd-2BrNvLY", //5.99 - Podsumowanie
    ]
  },
  {
    name: "module6",
    presentations: [
      "1QtlniobmU6aeqJ6NRPuAuijoBKTXqPyQCS_P6yDiQH4", //6.0 - Wstęp
      "1yqa2CGnJCXIQoVXbsMs4d7lpEkcoQjNrCeJCaXU_PMU", //6.1 - ReplicaSet
      "1K4DBHgQ863XkDWhVOjuerCc3XEVLkAYW4Z2K8rZSWeg", //6.2 - deployment.
      "15DWbFxwbaF5J2GHEpt0cAit3dueBTY_G1C6CESHQh4M", //6.03 - Tworzenie, zarządzanie i aktualizacja Deployment.
      //"1TqcPb59z885rE8ZhOTIWyNZj5jMGVDxwmYyQ4qALtQo", //6.4 - Podstawowe strategie wdrożeń: recreate i rolling update
      "1kabewvWFins5TerMdbwTmnURHf7BpXM5EGaPHxEr9T0", //6.05 - Skalowanie Aplikacji.
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
