/*javascript code*/

/*loading page, SVG file appearing effect*/
var num = 1900;
var t = setInterval(function(){
	num++;
	var span1 = document.getElementById("span1");
	span1.innerText = 'LOADING YEAR: '+num;
		if(num==2018){
			clearInterval(t);
			span1.innerText = 'CLICK ICON';
		}
},72);

/*main page, typewritter style text appearing effect*/
window.onload=function(){
    var story = document.getElementById('word');
    var s = document.getElementById('show');
    var i = 0;
    timer=setInterval(function(){
        s.innerHTML=story.innerHTML.substring(0,i);
        i++;
        if(s.innerHTML==story.innerHTML){
            clearInterval(timer);
        }
    },50);
}

/*bridge pages, change images*/
function changeImg(src){
    $('.featured-img img').attr('src', src);
}
