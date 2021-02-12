function listFolderContents() 
{
  var rootFolder = 'Poznaj Docker';
  var slidesFolder = 'slajdy';
  var folderlisting = 'listing of folder ' + rootFolder+'/'+slidesFolder;
  
  var folders = DriveApp.getFoldersByName(rootFolder)
  var folder = folders.next().getFoldersByName(slidesFolder).next();
  var modules = folder.getFolders();
  var allModules = [];
  while(modules.hasNext()){
    var moduleFolder = modules.next();
    var module = moduleFolder.getName();
    var contents = moduleFolder.getFiles();

    var file;
    var name;
    var link;
    var moduleData=[];
    while(contents.hasNext()) {
      file = contents.next();

      name = file.getName()+".";
      name = name.replace(/^0/g, '');
      //module = name.split('.')[0];

      link = file.getUrl();
      id = link.replace('https://docs.google.com/presentation/d/', '').replace('/edit?usp=drivesdk', '');

      entry = '"'+id+'", //'+name;

      moduleData.push({name:name, id:id});
    }
    moduleData.sort((a,b)=>a.name.localeCompare(b.name))
    allModules.push({name: module, presentations: moduleData});
  }
  allModules.sort((a,b)=>a.name.localeCompare(b.name));
  console.log(JSON.stringify(allModules, null, 2));
}

var modules = [
  {
    "name": "01 - Podstawy",
    "presentations": [
      {
        "name": "1.00 - Mechanika szkolenia.",
        "id": "1NVgGWxn4-e_ZfH9fQEJwK02bT_ySqb4-CfsZKga6ZTk"
      },
      {
        "name": "1.01 - Maszyny wirtualne vs kontenery.",
        "id": "1HUI57484qY4C75bo_5OHTbdJZMS3_O-6XcUkhB7v_9w"
      },
      {
        "name": "1.02 - 12 factor.",
        "id": "15dztPxreQgEheCYGdCBR2Zsk4xa8epYADBJwo3rM3Yg"
      },
      {
        "name": "1.03 - historia konteneryzacji.",
        "id": "1MgqpDLc7hG12X04KbYIiAILxCKJ5hOGa-6-21ICf9os"
      },
      {
        "name": "1.04 - Jakie są dostępne systemy konteneryzacji?.",
        "id": "10bVZzsJQH5JA0HXyulYXrJJh1p9x46li1MoO_2dKFxY"
      },
      {
        "name": "1.05 - Z czego zbudowany jest Docker?.",
        "id": "1BhtMKswjdqi5k569XE_CSy5c7A1ueYwrVMdz5Fc-gsA"
      },
      {
        "name": "1.07 - Kontenery Windows.",
        "id": "1hSzkzUJgiiwgaayUq-f164NBxJfMgD_8_GtX9XPl9Xk"
      },
      {
        "name": "1.09 - uruchomienie pierwszego kontenera.",
        "id": "1rddhRdLpqYDqNBMYPD-2dQXNhTgscwtl3HXF3EXI0x0"
      }
    ]
  },
  {
    "name": "02 - Obrazy",
    "presentations": [
      {
        "name": "2.01 - Wstęp.",
        "id": "1g7YJRFy7Vh1WjZ08hoBj2zj4hliDh1GU9Z4vAMEbhp8"
      },
      {
        "name": "2.02 - Czym jest obraz?.",
        "id": "1v7wJa8pSnDJFxqFHBdpkJv3ylJzgMOAqwYB_C5-DBrs"
      },
      {
        "name": "2.03 - Co zawiera lub powinien zawierać obraz?.",
        "id": "1rhGQT9b0OW3PYcwIFfwI12OF40tQAt4CEu-ZVJtlii8"
      },
      {
        "name": "2.04 - Jak sprawdzić jakie obrazy posiadamy, jak je usunąć i pobierać.",
        "id": "1uiDREDsY1wk1hoRlRXNKSb3ZtK_vDL8JyFc9pJYur_k"
      },
      {
        "name": "2.05 - Obrazy i warstwy.",
        "id": "1ACD6-XNzW3SlmDekC8eEq5hIBAfKnwkrvVJSaHlaUdc"
      },
      {
        "name": "2.06 - Podsumowanie.",
        "id": "1n4b2GGhy7KmOlK9MLGJk0_BVpWCgcuDG2639o2sVA0E"
      }
    ]
  },
  {
    "name": "03  - Uruchamianie kontenerów",
    "presentations": [
      {
        "name": "3.01 - wstęp.",
        "id": "10KrFTtWfvluqBzcRoXpFdXX9iSm5rx0U-hG_SxeUOIQ"
      },
      {
        "name": "3.03 - podstawy uruchamiania.",
        "id": "14krtL-2BRPSjGDwUsvu232nLC4g7dclO-Efte7taQVU"
      },
      {
        "name": "3.04 - udostępnianie portów.",
        "id": "1MOrMchheZdnNscIIU_DLIlGh0dAeKowNdLyUh4dhMVg"
      },
      {
        "name": "3.05 - efemeryczność.",
        "id": "13661gN3PripyoZ-V1lbVdWovOJ8bTpreVOMwwN0pisM"
      },
      {
        "name": "3.06 - zmienne.",
        "id": "11lI9ptb6IZ5WYB-24ByqDVPERLPCwW32oJWtgYH4tas"
      },
      {
        "name": "3.08 - zasoby.",
        "id": "1WGQdbUu5V0unlDf5kqL2bXB26w8pMjc-SUYb5BytHeU"
      },
      {
        "name": "3.99 stany i podsumowanie.",
        "id": "1M-HulIxK6WNdc1CBU0rbCdh8ddv2_2m1Etswv46XsWk"
      }
    ]
  },
  {
    "name": "04 - Budowania Obrazów",
    "presentations": [
      {
        "name": "4.00 - Budowanie obrazow.",
        "id": "1DvNyO9804jxqYJlLkPv0PwOlIcoH2rJbIIdj9IltyZ0"
      },
      {
        "name": "4.01 - Budowanie pierwszego obrazu.",
        "id": "19ELNqc1OEhcZG-DkxthhB3HO-t8WQymKWYNcY5EhwNo"
      },
      {
        "name": "4.02 - Definicja obrazu oraz podstawy budowania.",
        "id": "17cV_KTUBQjpk0g0Uu8rGoRgcZHJo56sJnxPzmMY8GZE"
      },
      {
        "name": "4.05 - Multi-stage build (budowanie wieloetapowe).",
        "id": "18Ugr6N4E6M5JOG2WZU08RJGFD2q0GVokBU6xUjs32iQ"
      },
      {
        "name": "4.07 - Przekazywanie sekretów i cache.",
        "id": "1dM35sgP_kzfjtXKrJKlE4AyG2ldFVNpseC9Kw7racu0"
      },
      {
        "name": "4.08 - Distroless.",
        "id": "1eKqPNTQpSfPmUiXetkuknrDy6_HT-Zkuq6Cz3ToQVAI"
      },
      {
        "name": "4.09 - Best Practices.",
        "id": "1nGzfDW9n9RkNNgplI56_ipiQoVHfiK6-gElHXrcYpyA"
      },
      {
        "name": "4.10 - Podsumowanie.",
        "id": "1qjaJUHVT2MEXsrJXdalbt5tEcV8xBoE4f1KSfrlF2qY"
      },
    ]
  },
  {
    "name": "05 - Rejestry ",
    "presentations": [
      {
        "name": "5.01 - wstęp.",
        "id": "18oczdg86u5Y-YY5jtWwq65jt18vN_B7s-asv-umXiH0"
      },
      {
        "name": "5.02 - publiczne i prywatne rejestry.",
        "id": "1hDrlJgJGeWgKl2r48_xGIQZNbzbzQKl2stRSsl3PetU"
      },
      {
        "name": "5.03 - inne metody dystrybucji.",
        "id": "1iodWRtRWqr75KxcaOS8jA-KCXBkTsMzldH9jQPvdvhM"
      },
      {
        "name": "5.99 - podsumowanie.",
        "id": "14vdlh2JOyoFw1wEFIHKX1c7YATgT6Ga3fMnTJjklrgk"
      }
    ]
  },
  /*{
    "name": "B05 - helm kustomize ",
    "presentations": [
      {
        "name": "B05 - helm vs kustomize.",
        "id": "1i1O-PzzlqPAqwYkia-J0IXVoEQ60APp7fTOjghkaNak"
      },
    ]
  }*/
];
function downloadPresentation(moduleName, presentationName, id) {
    var slides = getSlideIds(id); var count = '';
    
    for (var i = 0, slide; slide = slides[i]; i++) {

        var slideName = i.toString().padStart(3,"0");
        if(slide.name!=undefined){
          slideName+= "_" + slide.name;
        }
        
        downloadSlide(moduleName, presentationName, slideName, id, slide.id);
    }
}


function getRequestOptions () {
    return {
        headers: {
            Authorization: 'Bearer ' + ScriptApp.getOAuthToken()
        }
    };
}


function downloadSlide(folderName, presentationName, imageName, presentationId, slideId) {
    var url = 'https://docs.google.com/presentation/d/' + presentationId + '/export/png?id=' + presentationId + '&pageid=' + slideId; 

    var options = getRequestOptions();
    var response = UrlFetchApp.fetch(url, options);
    var image = response.getAs(MimeType.PNG);
    image.setName(imageName);
    var folder;
    var rootOutput = DriveApp.getFoldersByName("Poznaj Docker").next().getFoldersByName("slajdy-images").next();
    try { 
        folder = rootOutput.getFoldersByName(folderName).next(); 
    } catch (e) { 
        folder = rootOutput.createFolder(folderName);
    }
    try { 
        folder = folder.getFoldersByName(presentationName).next(); 
    } catch (e) { 
        folder = folder.createFolder(presentationName);
    }
    if(folder.getFilesByName(imageName).hasNext()){
      console.warn(imageName+ " already exist");
    } else {
      var res = ImgApp.getSize(image);
      // @ts-ignore
      if(!(abs(res.width-1920)<=1 && abs(res.height-1080)<=1)){
        var path = folderName + "/"+ presentationName + "/" + imageName;
        console.error("Bad image size " + path);
        console.error(res);
        throw "Bad image size "+path;
      }
      folder.createFile(image);
    }
}

function abs(value){
  if(value<0)
    return -value;
  return value;
}

function getSlideIds(presentationId) {
  var url = 'https://slides.googleapis.com/v1/presentations/' + presentationId;
  
  var options = getRequestOptions();
  
  var response = UrlFetchApp.fetch(url, options);

  var slideData = JSON.parse(response);

  var slideId = 0;
  
  var slides = slideData.slides.map(function(slide) {
    name = ''+(slideId++);
    name = name.padStart(2);

    var element = undefined;
    try{
      //wyciagniecie notatek
      var notesPage = slide.slideProperties.notesPage;
      var speakerNotesId = notesPage.notesProperties.speakerNotesObjectId;
      
      var elements = notesPage.pageElements.filter(function (pe) {
        return pe.objectId == speakerNotesId;
      });
      
      element = elements[0].shape.text.textElements[1].textRun.content;

      element = element.trim().split('\n')[0]; 
      element = element.replace(/:/gi, '-');
    }
    catch(exp) {

    }

    return { 
      id: slide.objectId,
      name: element
    };
  });
  
  return slides;/*.filter(function(slide) {
    var a = slide.name.substring(0, 1);
    var b = a == 'w' || a == 'd';
    
    return b;
  });*/
}

function start() {

  for(var i = 0, module; module = modules[i]; i++) {
    
    for(var j = 0, pres; pres = module.presentations[j]; j++) {
      console.log("start "+pres.name);
      downloadPresentation(module.name, pres.name, pres.id);
      console.log("finished "+pres.name);
    }
    
    global_count = 0;
  }
}

function createPDF() {
  var rootFolder = DriveApp.getFoldersByName("Poznaj Docker").next();
  try { 
      rootFolder = rootFolder.getFoldersByName("slajdy-pdf").next(); 
  } catch (e) { 
      rootFolder = rootFolder.createFolder("slajdy-pdf");
  }
  
  for(var i = 0, module; module = modules[i]; i++) {
    try { 
      folder = rootFolder.getFoldersByName(module.name).next(); 
    } catch (e) { 
      folder = rootFolder.createFolder(module.name);
    }
    for(var j = 0, pres; pres = module.presentations[j]; j++) {
      console.log("start "+pres.name);
      var url = "https://docs.google.com/presentation/d/"+pres.id+"/export/pdf";
      var options = getRequestOptions();
      var response = UrlFetchApp.fetch(url, options);
      var pdf = response.getAs(MimeType.PDF);  
      var pdfName = pres.name+".pdf";
      pdfName = pdfName.replace("..pdf", ".pdf");
      pdf.setName(pdfName);
      if(folder.getFilesByName(pdfName).hasNext()){
        console.warn(pdfName+ " already exist");
      } else {
        folder.createFile(pdf);
      }
      console.log("finished "+pres.name);
    }
    
    global_count = 0;
  }
}
