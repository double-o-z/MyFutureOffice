chrome.storage.sync.get(null, function(items) {
    var allKeys = Object.keys(items);
    // console.log(allKeys);
    allKeys.forEach(function (key) {
        // var weWorkDomain = "https://www.wework.com";
        $("#locationsList").append(
            '<li><a target="_blank" href="'+key+'">' +
            '<span>'+items[key]["cityName"]+ ': '+items[key]["locationName"]+'' +
            '</span></a>'
        );
    });
    // Re-OrderList
    var list = $("ol#locationsList");
    var desc = false;
    list.append(list.children().get().sort(function(a, b) {
        var aProp = $(a).find("span").text(),
            bProp = $(b).find("span").text();
        return (aProp > bProp ? 1 : aProp < bProp ? -1 : 0) * (desc ? -1 : 1);
    }));
});