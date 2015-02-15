var prefix = "bkmrk";
var queryField = prefix ? prefix+"_offset" : "offset";

window.addEventListener("scroll", function(e) {
    var offset = window.scrollY;
    var queryArgs = {};
    queryArgs[queryField] = offset;
    window.history.pushState({
        html: "null",
        title: "test"
    }, "", urlWithQueryArgs(window.location.href, queryArgs));
});

function urlWithQueryArgs(url, queryArgs) {
    var currentQuery = getQueryString(url);
    url = getUrlWithoutQuery(url);
    var currentQueryArgs = argsFromString(currentQuery);
    
    Object.keys(queryArgs).forEach(function(key) {
        currentQueryArgs[key] = queryArgs[key];
    });
    
    return getUrlWithQuery(url, currentQueryArgs);
}

function getQueryString(url) {
    var queryStartIndex = url.indexOf("?");
    if(queryStartIndex == -1) return "";
    return url.slice(queryStartIndex + 1);
}

function getUrlWithoutQuery(url) {
    var queryStartIndex = url.indexOf("?");
    if(queryStartIndex == -1) return url;
    return url.slice(0, queryStartIndex);
}

function argsFromString(queryString) {
    if(queryString.length == 0) return {};
    
    var pairStrings = queryString.split("&");
    
    var result = {};
    
    pairStrings.forEach(function(pairString) {
        if(pairString.length == 0) return;
        var splitIndex = pairString.indexOf("=");
        if(splitIndex == -1) {
            result[pairString] = true;
            return;
        }
        var key = pairString.slice(0, splitIndex);
        var value = pairString.slice(splitIndex + 1);
        result[key] = value;
    });
    
    return result;
}


function getUrlWithQuery(url, queryArgs) {
    var result = "?";
    Object.keys(queryArgs).forEach(function(key) {
        if(queryArgs[key] === true) {
            result += key + "&";
            return;
        }
        result += key + "=" + queryArgs[key] + "&";
    });
    return result.slice(0, -1);
}

window.addEventListener("load", function(e) {
    var queryString = getQueryString(window.location.href);
    var queryArgs = argsFromString(queryString);
    if(queryArgs[queryField]) {
        window.scroll(window.scrollX, parseInt(queryArgs[queryField]));
    }
});
