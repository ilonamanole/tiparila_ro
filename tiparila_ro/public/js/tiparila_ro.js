function addUrlParam(url, key, value) {
    var newParam = key+"="+value;
    var result = url.replace(new RegExp("(&|\\?)"+key+"=[^\&|#]*"), '$1' + newParam);
    if (result === url) {
        result = (url.indexOf("?") != -1 ? url.split("?")[0]+"?"+newParam+"&"+url.split("?")[1]
           : (url.indexOf("#") != -1 ? url.split("#")[0]+"?"+newParam+"#"+ url.split("#")[1]
              : url+'?'+newParam));
    }
    return result;
}

$(document).ready(function(){
    //current page behavior on selecting lang
    $(".navbar-lang").find("a").each(function(){
        $(this).click(function(e){
            e.preventDefault();
            var curr_lang = $(this).text();
            var curr_url = window.location.href;
            if (curr_url.indexOf('_lang='+curr_lang) <0) {
                localStorage.setItem("_lang", curr_lang);
                curr_url = addUrlParam(curr_url,'_lang', curr_lang);
                window.location.href = curr_url;
            }
        });
    });

    var curr_lang = localStorage.getItem('_lang');

    //add active class to the lang navbar
    $(".navbar-lang a").removeClass('active');
    $(".lang-" + curr_lang).addClass('active');

    //append _lang param to all links in page
    var $links = $('a');
    if (curr_lang) {
        $.each($links, function(index, item){
            var url = $(this).attr('href');
            var final_url = addUrlParam(url,'_lang', curr_lang);
            $(this).attr('href', final_url);
        })
    }
})