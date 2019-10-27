function listFolderContents() 
{
  var foldername = 'Poznaj Kubernetes';
  var folderlisting = 'listing of folder ' + foldername;
  
  var folders = DriveApp.getFoldersByName(foldername)
  var folder = folders.next();
  var contents = folder.getFiles();
  
  var ss = SpreadsheetApp.create(folderlisting);
  var sheet = ss.getActiveSheet();
  sheet.appendRow( ['name', 'link'] );
  
  var file;
  var name;
  var link;
  var row;
  while(contents.hasNext()) {
    file = contents.next();
    
    name = file.getName()+".";
    name = name.replace(/^0/g, '');
    module = name.split('.')[0];
    
    link = file.getUrl();
    id = link.replace('https://docs.google.com/presentation/d/', '').replace('/edit?usp=drivesdk', '');
    
    entry = '"'+id+'", //'+name;
    
    sheet.appendRow( [module, name, id, entry] );     
  }  
};
