
var man = [1,12];
var woman = [7,4];
var all = [8, 16];
var text = ["男性", "女性", "全体"];
var yn = ["Yes", "No"];
var width = 640;
var height = 480;
var radius = Math.min(width, height) / 2 - 10;

var outerRadius = radius - 10;
var innerRadius = radius - 150;
var color = d3.scale.category10();
var pie = d3.layout.pie().value(function(d) {
  return d;
}).sort(null);

var a_scale = d3.scale.linear()
.domain([0, 24])
.rangeRound([0, 100]);
var m_scale = d3.scale.linear()
.domain([0, 13])
.rangeRound([0, 100]);
var w_scale = d3.scale.linear()
.domain([0, 11])
.rangeRound([0, 100]);

var arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);


var svg = d3.select("#pi")
.append("svg")
.attr("width", width).attr("height", height);

var a = svg.append("g")
.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var g = a
.selectAll("path")
.data(pie(all))
.enter()
.append("g");


g.append("path")
.attr("fill", function(d, i) {
  return color(i);
})
.attr("d", arc)
.each(function(d) {
  this._current = d;
});
g.append("text")
.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
.attr("font-size", "30")
.style("text-anchor", "middle")
.text(function(d, i) { return yn[i] + " " + a_scale(d.data) + "%"; })
.each(function(d) {
  this._current = d;
});

var c_text = svg
.append("text")
.attr({
  "class":"center",
  "text-anchor":"middle",
  "transform":"translate(" + width/2 + "," + height/2 + ")"
})
.text(text[2]);


d3.select("#btn1").on("click",function (){arcAnime(man, 0);} , false);
d3.select("#btn2").on("click",function (){arcAnime(woman, 1);} , false);
d3.select("#btn3").on("click",function (){arcAnime(all, 2);} , false);

function arcAnime(newdata, flag) {
  svg.selectAll("path")
  .data(pie(newdata))
  .transition()
  .duration(800)
  .attrTween("d", function(d) {
    var interpolate = d3.interpolate(this._current, d);
    this._current = interpolate(0);
    return function(t) {
      return arc(interpolate(t));
    };
  });

  c_text.text(text[flag]);

  svg.selectAll("text")
  .data(pie(newdata))
  .text(function(d, i) {
    if(flag == 0) {
      return yn[i] + " " +  m_scale(d.data) + "%";
    } else if(flag == 1) {
      return yn[i] + " " +w_scale(d.data) + "%";
    }
    return yn[i] + " " + a_scale(d.data) + "%";
  })
  .transition()
  .duration(800)
  .attrTween("transform", function(d) {
    var interpolate = d3.interpolate(arc.centroid(this._current), arc.centroid(d));
    this._current = d;
    return function(t) {
      return "translate(" + interpolate(t) + ")";
    };
  });

}
