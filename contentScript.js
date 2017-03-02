/**
 * Created by SHAI-LAPTOP on 3/2/2017.
 */

window.onload = function (e) {
    var exploreButtons = $("button > span:contains('Explore this location')").parent();
    // console.log(exploreButtons);
    // Make copies of found buttons
    // Insert at bottom of parent div
    // Make action on click - communicate with extension data (storage, localStorage..)

    var favoriteButtons = [];
    var fullHeart = '\u2665 ';
    var emptyHeart = '\u2661 ';
    var span_empty = $("<span>" + emptyHeart + "Favorite this location" + "</span>");
    var span_full = $("<span>" + fullHeart + "Favorite this location" + "</span>");
    var urlList = [];
    for (var i = 0; i < exploreButtons.length; i++){
        (function(i){
            var button = $(exploreButtons[i]);
            var parent = button.parent();
            var newButton = button.clone();
            favoriteButtons.push(newButton);

            var url = button.parent().parent().parent().attr('href');
            urlList.push(url);

            newButton.html(span_empty.clone());
            newButton.css({ 'margin-top': '20px' });
            newButton.click(function (e) {
                e.preventDefault();
                var target = $(e.target);

                // var targetUrl = target.parentNode.parentNode.parentNode.href;
                var targetUrl = target.parent().parent().parent().attr('href');
                var parts = targetUrl.split("/")[2].split("--");
                var locationName = parts[0];
                var cityName = parts[1];

                console.log("targetUrl: ", targetUrl);
                console.log("locationName: ", locationName);
                console.log("cityName: ", cityName);

                chrome.storage.sync.get(targetUrl, function (items) {
                   if (!$.isEmptyObject(items)){
                       chrome.storage.sync.remove(targetUrl, function(){
                           console.log("Location Removed.");
                           newButton.html(span_empty.clone());
                       });
                   } else {
                       items[targetUrl] = {
                           "locationName": locationName,
                           "cityName": cityName
                       };
                       chrome.storage.sync.set(items, function(){
                           console.log("Location Added.");
                           newButton.html(span_full.clone());
                       });
                   }
                });
            });

            parent.append(newButton);
        }(i));
    }
    chrome.storage.sync.get(urlList, function (items) {
       if (!$.isEmptyObject(items)){
           var allKeys = Object.keys(items);
           favoriteButtons.forEach(function (button) {
               var href = button.parent().parent().parent().attr('href');
               if (allKeys.indexOf(href) > -1){
                   button.html(span_full.clone());
               }
           });
       }
    });
};