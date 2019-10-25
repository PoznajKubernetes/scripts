main();

/*
Simple script that:
- imports all images file into PP CC
- creates bin (folder) in project explorer and moves
  all image files (imported in step one) to that bin
- creates a sequence that is used to manage list of
  images
- puts images onto timeline based on image name:
  HH-mm-ss -> values are converted to seconds
- calculates duration between images based on
  current and next image
- adds fade in/out to images
- optionaly: adds animation of scaling

This script should be used per module or per lesson
base, depending on how we do structure our raw material.

To use it, we need Extendscript Toolkit CC
https://helpx.adobe.com/download-install/kb/creative-cloud-apps-download.html
*/
function main () {
    var i = 0;
    var importFolder = new Folder;
    importFolder = Folder.selectDialog("Open a folder");
    
    if(importFolder == null) {
        alert("No folder selected", "Please run it again!");
        return false;
    }

    var files = importFolder.getFiles();
    
    if(files.length < 1) {
        alert("No files detected", "Select folder with files dude!");
        main(); // LOVE it :)
    } 

    var imageFiles = getImagePaths(files);
    
    if(imageFiles.length < 1) {
        alert("No image files in this folder", "Dude, use folder with images, doh!");
        main();
    }

    var project = app.project;
    var projectItem = project.rootItem;
    
    project.importFiles(imageFiles);
    
    var moduleName = prompt("Set module name", "module01", "");
    
    var imageFolder = projectItem.createBin(moduleName);
    
    var slideshowSequence = project.createNewSequence(moduleName + " Sequence", "id");
    
    // we need now images from project...
    var importedImages = getImageProjectItems(projectItem);
    
    var videoTracks = slideshowSequence.videoTracks;

    var trackNoString = prompt("Video Track No? (like in VB from 1)", "1", "");
    var trackNo = parseInt(trackNoString, 10) - 1;
    
    var videoTrackOne = videoTracks[trackNo];
    
    var time = new Time();
    // how many ticks is one frame
    time.ticks = slideshowSequence.timebase.toString();
    
    // convert ticks to seconds
    var frameLength = time.seconds;
    
    var startTime = 0;
    
    var thisTime = new Time();
    var seconds = 5;
    thisTime.seconds = seconds;
    
    startTime = insertImagesToTimeline(importedImages, imageFolder, startTime, videoTrackOne, frameLength);
}

function animateScale(param, length, image, scale, seconds) {    
    param.setTimeVarying(true);

    // add a keyframe at the beginning, and end of the image (for scale)
    param.addKey(image.inPoint.seconds);
    param.addKey(image.inPoint.seconds+seconds);
    
    // change those keyframes to be the original value, and original value  + 10%
    param.setValueAtKey(image.inPoint.seconds, scale);
    param.setValueAtKey(image.inPoint.seconds+seconds, scale*1.1);
}

function fadeOpacity(param, length, image, seconds) {

    param.setTimeVarying(true);
    
    // add keyframes at beginning and end of the image layer (for opacity)
    param.addKey(image.inPoint.seconds);
    param.addKey(image.inPoint.seconds+length);
    param.addKey(image.inPoint.seconds+seconds-length);
    param.addKey(image.inPoint.seconds+seconds);
    
    // change the keyframes to be 0 and 100
    param.setValueAtKey(image.inPoint.seconds, 0);
    param.setValueAtKey(image.inPoint.seconds+length, 100);
    param.setValueAtKey(image.inPoint.seconds+seconds-length, 100);
    param.setValueAtKey(image.inPoint.seconds+seconds, 0);
}

function getComponentObjs(components) {
    var opacityComponent;
    var motionComponent;
    var motionObj = { };
    var i;
    
    for(i = 0; i < components.numItems; i++) {
        
        if(components[i].displayName == "Opacity") {
            opacityComponent = components[i];
        }
    
        if(components[i].displayName == "Motion") {
            motionComponent = components[i];
        }
    }

    var opacityObj = {
        opacity: opacityComponent.properties[0]
    };
    
    // once the opacity and motion components are found, we need to get the other values (like position, scale, rotation, etc.)
    for(i = 0; i < motionComponent.properties.numItems; i++) {
        switch(motionComponent.properties[i].displayName) {
            case "Position":
                motionObj.position = motionComponent.properties[i];
            break;
            case "Scale":
                motionObj.scale = motionComponent.properties[i];
            break;
            case "Scale Width":
                motionObj.scaleWidth = motionComponent.properties[i];
                motionObj.scaleCheck = motionComponent.properties[i+1];
            break;
            case "Rotation":
                motionObj.rotation = motionComponent.properties[i];
            break;
            case "Anchor Point":
                motionObj.anchorPoint = motionComponent.properties[i];
            break;
        }
    }
    
    motionObj.scaleCheck.setValue(true, true);
    
    return [motionObj, opacityObj];
}

function insertImagesToTimeline(images, folder, startTime, track, frameLength) {
    var image;

    var fileName;
    var nextFileName;
    
    var i;
    var clip;
    var components, videoComponentObjs, opacityParam, positionValue, scaleHeight, scaleWidth,anchorPointValue;
    
    for(i = 0; i < images.length; i++) {
        image = images[i];
        fileName = image.name;

        if(i + 1 < images.length) {
            nextFileName = images[i + 1].name;
        } else {
            nextFileName = null;
        }
        
        // 0 - duration, 1 - start time
        var fileProp = getFileProps(fileName, nextFileName, frameLength);
        
        image.moveBin(folder);        
        image.setScaleToFrameSize();
        
        track.insertClip(image, fileProp[1]);
        clip = track.clips[track.clips.numItems - 1];
        
        
        // change the end pont of the current image
        clip.end = clip.start.seconds + fileProp[0];
        
        components = clip.components;

        // [motionObj, opacityObj]
        videoComponentObjs = getComponentObjs(components);

        // adjust opacity (add keys too)
        opacityParam = videoComponentObjs[1].opacity;
        fadeOpacity(opacityParam, 1, clip, fileProp[0]);

        /* 
        // this code is creating scale animation that _zooms_ into
        // picture 
        
        get scale, position, and anchor point values
        positionValue = videoComponentObjs[0].position.getValue();
        scaleHeight = videoComponentObjs[0].scale.getValue();
        scaleWidth = videoComponentObjs[0].scaleWidth.getValue();
        anchorPointValue = videoComponentObjs[0].anchorPoint.getValue();

        // animate the scale of the current image (with keyframes)
        animateScale(videoComponentObjs[0].scale, 1, clip, scaleHeight, fileProp[0]);*/
    }

    return startTime;
}

function getFileProps(name, next, frameLength) {
    var prop = [2, 0];
    var startTimeNext;

    var time = name.split("-");

    // start
    prop[1] = parseInt(time[0], 10)*60*60 + parseInt(time[1], 10)*60 + parseInt(time[2], 10) + frameLength;
    
    if(!next) {        
        return prop;
    }
    
    var timeNext = next.split("-");
    startTimeNext = parseInt(timeNext[0], 10)*60*60 + parseInt(timeNext[1], 10)*60 + parseInt(timeNext[2], 10) + frameLength;
    prop[0] = startTimeNext - prop[1];
    
    return prop;
}

function getTrackClips(videoTrack) {
    var clips = [];
    
    for(var i = 0; i < videoTrack.clips.numItems; i++) {
        clips.push(videoTrack.clips[i]);
    }
    
    return clips;
}

function getImageProjectItems(projectItem) {
    var projectImages = [];
    var name;
    var ext;
    var i;
    
    for(i = 0; i < projectItem.children.numItems; i++) {
        name = projectItem.children[i].name;
        
        // this is JavaScript and its not, we can't extend it, we do not have
        // all methods like endsWith...
        ext = name.substring(name.length - 3, name.length).toLowerCase();

        if(ext == "png" || ext == "jpg") {
            projectImages.push(projectItem.children[i]);
        }
    }
    
    return projectImages;
}

function getImagePaths(files) {
    var paths = [];
    
    for(var i = 0; i < files.length; i++) {
        
        // Geronimo fuck validation, assume all files are jpg or png
        // if we need validation, use files[i].name for file name.
        
        paths.push(files[i].fsName)
    }

    return paths;
}