import { Router } from "express";
import axios from 'axios'
var router = Router();
var url = require('url');
var ExifImage = require('exif').ExifImage;
import each from 'async/each';


function fullUrl(req) {
    return url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: req.originalUrl
    });
}

function findLatitude (coordinates, direction){
    var hour = coordinates[0] || 0;
    var min = coordinates[1] || 0;
    var sec = coordinates[2] || 0;
    var lat = hour + min/60.0 + sec/3600.0 + 0.000;
    lat = direction == 'N'? lat : lat*-1.0;
    return lat;
}

function findLongitude (coordinates, direction){
    var hour = coordinates[0] || 0;
    var min = coordinates[1] || 0;
    var sec = coordinates[2] || 0;
    var lat = hour + min/60.0 + sec/3600.0 + 0.000;
    lat = direction == 'E'? lat : lat*-1.0;
    return lat;
}

router.post('/', function (req, res, next) {
    var hostUrl = fullUrl(req)
    var images = req.body;
    var output = []

    each(images, function(img, callback) {
        try {
            new ExifImage({ image : img.path }, function (error, exifData) {
                if (error) {
                    console.log('Error: ' + error.message);
                    callback(error.message)
                }
                else {
                    var lat = findLatitude(exifData.gps["GPSLatitude"], exifData.gps["GPSLatitudeRef"]);
                    var lon = findLongitude(exifData.gps["GPSLongitude"], exifData.gps["GPSLongitudeRef"]);
                    console.log(lat, lon); // Do something with your data!
                    img.location = {
                        lat: lat,
                        long: lon
                    }
                    callback();
                }
            });
        } catch (error) {
            console.log('Error: ' + error.message);
        }

    }, function(err) {
        // if any of the file processing produced an error, err would equal that error
        if( err ) {
            // One of the iterations produced an error.
            // All processing will now stop.
            console.log('A file failed to process');
            res.send("Error!")
        } else {
            console.log('All files have been processed successfully');
            images.forEach((img, i)=>{
                output[i] = img.location
            })
            res.send(JSON.stringify(output));
        }
    });
});

export default router;
