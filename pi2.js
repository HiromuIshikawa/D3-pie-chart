
var man = [1,12];
var woman = [7,4];
var all = [8, 16];

var text = [{"text":"男性", "p":1, "id":"man"}, {"text":"女性", "p":2, "id":"woman"}, {"text":"全体", "p":0, "id":"all"}];


var rectdata = [{"x":0,"y":0,"ans":"Yes"},{"x":0,"y":25,"ans":"No"}];

var width = 700;
var height = 600;

var radius = Math.min(width, height) / 2 - 10;

var outerRadius = radius - 10;
var innerRadius = radius - 200;

var color = d3.scale.linear()
.domain([0,1])
.range(["#007bbb","#b94047"]);

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
.attr("stroke", "white")
.attr("stroke-width", 5)
.attr("d", arc)
.each(function(d) {
  this._current = d;
});

g.append("text")
.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
.attr("font-size", "30")
.attr("fill","white")
.style("text-anchor", "middle")
.text(function(d) {return a_scale(d.data) + "%"; })
.each(function(d) {
  this._current = d;
});

var c_text = svg
.append("g")
.attr("class","c-text")
.attr("transform","translate(" + width/2 + "," + height/2 + ")");

c_text.selectAll("text")
.data(text).enter()
.append("text")
.attr("id", function(d){return d["id"];})
.attr("text-anchor","middle")
.attr("font-size", function(d) {
  if(d["p"] == 0){
    return 40;
  }
  return 25;
})
.attr("x", function(d) {
  if(d["p"] == 0){
    return 0;
  } else if(d["p"] == 1) {
    return -50;
  }
  return 50;
})
.attr("y", function(d) {
  if(d["p"] == 0){
    return -30;
  }
  return 30;
})
.attr("fill", function(d) {
  if(d["p"] == 0){
    return "rgba(0,0,0,1)";
  }
  return "rgba(0,0,0,0.5)";
})
.text(function(d){return d["text"];});

d3.select("#man").on("click",function (){
  arcAnime(man, 0);
  if(text[0]["p"]==1){
    cycleRight("#man");
  } else if(text[0]["p"]==2) {
    cycleLeft("#man");
  }
} , false);
d3.select("#woman").on("click",function (){
  arcAnime(woman, 1);
  if(text[1]["p"]==1){
    cycleRight("#woman");
  } else if(text[1]["p"]==2) {
    cycleLeft("#woman");
  }
} , false);
d3.select("#all").on("click",function (){
  arcAnime(all, 2);
  if(text[2]["p"]==1){
    cycleRight("#all");
  } else if(text[2]["p"]==2) {
    cycleLeft("#all");
  }
} , false);


var rectg = svg.append("g")
.attr("class","rect")
.attr("transform","translate(600,500)");



var tag = rectg.selectAll("rect")
.data(rectdata).enter()
.append("rect")
.attr({
  "x":function(d) { return d["x"];},
  "y":function(d) { return d["y"];},
  "width":"30",
  "height":"20",
  "fill":function(d, i){ return color(i);}
});

var tagtext = rectg.selectAll("text")
.data(rectdata).enter()
.append("text")
.attr({
  "x":function(d) {return d["x"]+31; },
  "y":function(d) {return d["y"]+20; },
  "font-size":20
})
.text(function(d){ return d["ans"];});


function cycleRight(type){
  svg.select(type)
  .transition()
  .duration(1000)
  .attr({
    "x": 0,
    "y": -30,
    "font-size": 40,
    "fill": "rgba(0,0,0,1)"
  });

  if(type=="#man") {
    svg.select("#woman")
    .transition()
    .duration(1000)
    .attr({
      "x": -50,
      "y": 30,
      "font-size": 25,
      "fill": "rgba(0,0,0,0.5)"
    });

    svg.select("#all")
    .transition()
    .duration(1000)
    .attr({
      "x": 50,
      "y": 30,
      "font-size": 25,
      "fill": "rgba(0,0,0,0.5)"
    });
    text[0]["p"]=0;
    text[1]["p"]=1;
    text[2]["p"]=2;
  }else if(type=="#woman") {
    svg.select("#all")
    .transition()
    .duration(1000)
    .attr({
      "x": -50,
      "y": 30,
      "font-size": 25,
      "fill": "rgba(0,0,0,0.5)"
    });

    svg.select("#man")
    .transition()
    .duration(1000)
    .attr({
      "x": 50,
      "y": 30,
      "font-size": 25,
      "fill": "rgba(0,0,0,0.5)"
    });
    text[0]["p"]=2;
    text[1]["p"]=0;
    text[2]["p"]=1;
  } else {
    svg.select("#man")
    .transition()
    .duration(1000)
    .attr({
      "x": -50,
      "y": 30,
      "font-size": 25,
      "fill": "rgba(0,0,0,0.5)"
    });

    svg.select("#woman")
    .transition()
    .duration(1000)
    .attr({
      "x": 50,
      "y": 30,
      "font-size": 25,
      "fill": "rgba(0,0,0,0.5)"
    });
    text[0]["p"]=1;
    text[1]["p"]=2;
    text[2]["p"]=0;
  }
}


function cycleLeft(type){
  svg.select(type)
  .transition()
  .duration(1000)
  .attr({
    "x": 0,
    "y": -30,
    "font-size": 40,
    "fill": "rgba(0,0,0,1)"
  });

  if(type=="#man") {
    svg.select("#woman")
    .transition()
    .duration(1000)
    .attr({
      "x": -50,
      "y": 30,
      "font-size": 25,
      "fill": "rgba(0,0,0,0.5)"
    });

    svg.select("#all")
    .transition()
    .duration(1000)
    .attr({
      "x": 50,
      "y": 30,
      "font-size": 25,
      "fill": "rgba(0,0,0,0.5)"
    });
    text[0]["p"]=0;
    text[1]["p"]=1;
    text[2]["p"]=2;
  }else if(type=="#woman") {
    svg.select("#all")
    .transition()
    .duration(1000)
    .attr({
      "x": -50,
      "y": 30,
      "font-size": 25,
      "fill": "rgba(0,0,0,0.5)"
    });

    svg.select("#man")
    .transition()
    .duration(1000)
    .attr({
      "x": 50,
      "y": 30,
      "font-size": 25,
      "fill": "rgba(0,0,0,0.5)"
    });
    text[0]["p"]=2;
    text[1]["p"]=0;
    text[2]["p"]=1;
  } else {
    svg.select("#man")
    .transition()
    .duration(1000)
    .attr({
      "x": -50,
      "y": 30,
      "font-size": 25,
      "fill": "rgba(0,0,0,0.5)"
    });

    svg.select("#woman")
    .transition()
    .duration(1000)
    .attr({
      "x": 50,
      "y": 30,
      "font-size": 25,
      "fill": "rgba(0,0,0,0.5)"
    });
    text[0]["p"]=1;
    text[1]["p"]=2;
    text[2]["p"]=0;
  }
}


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



  svg.selectAll("text")
  .data(pie(newdata))
  .text(function(d) {
    if(flag == 0) {
      return m_scale(d.data) + "%";
    } else if(flag == 1) {
      return w_scale(d.data) + "%";
    }
    return a_scale(d.data) + "%";
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
