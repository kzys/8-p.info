(function (){
    var here = location.href;
    var nav = document.getElementsByTagName('nav')[0];
    var anchors = nav.getElementsByTagName('a');
    for (var i = 0; i < anchors.length; i++) {
        if (anchors[i].href === here) {
            anchors[i].className = 'here';
        }
    }
})()