/* LCTV online status badge - initial custom prototype

  to use this badge on your website:

  1. add this A and IMG tag to your HTML
       <a href="#">
         <img class="lctv-badge-img" data-channel="MY_LCTV_CHANNEL" />
       </a>
  2. include this SCRIPT tag
       <script type="text/javascript" src="https://bill-auger.github.io/lctv-badges/js/online-status/online-status.js"></script>
*/
console.log("online-status.js:IN") ;

var LCTV_URL         = "https://www.livecoding.tv/" ;
var LCTV_API_URL     = "https://www.livecoding.tv/livestreams/" ;
var XHR_STATUS_READY = 4 ;

var badges = document.getElementsByClassName("lctv-badge-img");
var channelName = getAttribute("data-channel");

function getStatuses()
{
    for (i = 0; i < badges.length; i++) {
        badge = badges[i];
        channelName = badge.getAttribute("data-channel");
        
        if (!badge.href) {
            badge.href = LCTV_URL + channelName;
        }
        
        console.log("Checking status of: " + channelName);
        
        xhr = new XMLHttpRequest();
        
        xhr.open("GET" , LCTV_API_URL , true);
        xhr.setRequestHeader("Content-type" , "application/json");
        xhr.onreadystatechange = function() { 
            parseJSON(xhr, badge, channelName); 
        };
        xhr.send();
    }
}
    
// var stats_url = LCTV_API_URL + ChannelName + "/stats.json" ;
// e.g. {"views_live": 4, "item_class": "livestream", "views_overall": 6958}

function parseJSON(xhr, badge, channelName)
{
    if (xhr.readyState != XHR_STATUS_READY) 
        return;

    var isOnline = !!(~xhr.responseText.indexOf("/video/livestream/" + channelName + "/thumbnail")) ;

    createBadge(isOnline, badge, channelName) ;
}

function createBadge(isOnline, badge, channelName)
{
    statusImageFileName = (isOnline) ? "lctv-online.png" : "lctv-offline.png" ;
    
    badge.src = "../img/" + statusImageFileName;

    console.log("online-status.js:OUT");
}


window.onload = function() { 
    getStatus();
};
