"use strict";
exports.__esModule = true; 
exports.getData = void 0; 
var request = require("request"); // let 
var cheerio = require("cheerio");
var getData = function () {
    return new Promise(function (resolve, reject) {
        request("https://www.w3schools.com/", function (err, res, html) {
            if (!err && res.statusCode === 200) {
                var $_1 = cheerio.load(html);
                var title = $_1('title').text();
                var imgUrls_1 = []; 
                var data = [];
                var description = $_1('meta[property="og:description"]').attr('content'); 
                console.log(description);
                $_1("img").each(function (index, imageElement) {
                    var imgUrl = $_1(imageElement).attr("src");
                    imgUrls_1.push(imgUrl);
                });
                console.log(imgUrls_1);
                data.push({ "title": title, "description": description, "imageUrls": imgUrls_1 });
                console.log(data);
                resolve(data);
            }
        });
    });
};
exports.getData = getData;
