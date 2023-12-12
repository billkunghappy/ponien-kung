function render_news(news) {
    var all_icons = ["bullhorn", "paper", "code", "star"];
    var class_prefix="example-recent-news-";
    if (all_icons.includes(news.icon)){
        var class_name = class_prefix+news.icon;
        var news_item=$("."+class_name).clone().removeClass(class_name);
        news_item.children("h4").children(".recent-news-title").html(news.title);
        news_item.children(".recent-news-date").html(news.date);
        news_item.attr("href", news.link);
        news_item.show();
        $("#recent-news-list").append(news_item);
    } 
    else{
        console.log("Error, icon not exist: " + news.icon)
    }
}
$(document).ready(function(){
    var MaxNews=3;
    $.getJSON("content/recent-news.json", function(data){
        console.log(Math.min(data.length, 5));
        for (let index = 1; index < Math.min(data.length, MaxNews+1); index++) {
            render_news(data[index]);
        }
        // console.log(data[0]); // Prints: 14
    }).fail(function(){
        console.log("An error has occurred.");
    });
});