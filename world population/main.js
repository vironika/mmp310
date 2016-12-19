//Vironika Chhugani
//MMP310
//11 / 19 / 2016


//screen size
var w = window.innerWidth;
var h = window.innerHeight;

//set global total population number
var allpop = 0;

//create pie chart with continents population data
var pie = new d3pie("pieChart", {
    "header": {
        "title": {
            "text": "World 1 Population by Continent"
            , "fontSize": 30
            , "font": "open sans"
            ,"color": "#1B5A82"
        }
       
        , "titleSubtitlePadding": 10
    }
    , "size": {
        "canvasWidth": w/2
        , "pieOuterRadius": "80%"
    }
    , "data": {
        "sortOrder": "value-desc"
        , "content": [
            {
                "label": "Asia"
                , "value": 4157300000
                , "color": "#2484c1"
			}
            , {
                "label": "Europe"
                , "value": 738600000
                , "color": "#4daa4b"
			}
            , {
                "label": "North America"
                , "value": 461114000
                , "color": "#90c469"
			}
            , {
                "label": "South America"
                , "value": 390700000
                , "color": "#daca61"
			}
            , {
                "label": "Australia"
                , "value": 36700000
                , "color": "#e4a14b"
			}
		]
    }
    , "labels": {
        "outer": {
            "pieDistance": 8
        }
        , "mainLabel": {
            "fontSize": 14
        }
        , "percentage": {
            "color": "#ffffff"
            , "decimalPlaces": 3,
            "fontSize": 17
        }
        , "value": {
            "color": "#afafaf"
            , "fontSize": 17
        }
        , "lines": {
            "enabled": true
        }
        , "truncation": {
            "enabled": true
        }
    }
    , "effects": {
        "pullOutSegmentOnClick": {
            "effect": "linear"
            , "speed": 800
            , "size": 14
        }
    }
    , "misc": {
        "gradient": {
            "enabled": true
            , "percentage": 100
        }
    }
});

//create search by  
function popSearch() {
    
     location.href = "#results";
    var searchName = document.getElementById("searchName").value
    var searchYear = document.getElementById("searchYear").value
    var searchAge = document.getElementById("searchAge").value
        //display results
    document.getElementById("results").innerHTML = "";
    //remove bar chart from previous search
    d3.select("svg").remove();
    
        //get json
    $.ajax({
        url: 'http://api.population.io/1.0/population/' + searchYear + '/' + searchName + '/' + searchAge + '/'
        , dataType: "json"
        , success: function (data) {
               
               for (var i = 0; i < data.length; i++) {
                        var newData = data[i]

                        document.getElementById('results').innerHTML +=

                            "<h1>Population of " + searchName + " for " + searchAge + " years old: " + newData.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</h1>" +

                            "<h2> Males: " + newData.males.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " </h2>" +
                            "<h2> Females: " + newData.females.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " </h2>" + "<hr>"



                    }
            //
            //get input values
            
            // set the dimensions of the canvas
            var margin = {
                    top: 20
                    , right: 20
                    , bottom: 70
                    , left: 100
                }
                , width = w - margin.left - margin.right
                , height = h - margin.top - margin.bottom;
            // set the ranges
            var x = d3.scale.ordinal().rangeRoundBands([0, width], .2);
            var y = d3.scale.linear().range([height, 0]);
            // define the axis
            var xAxis = d3.svg.axis().scale(x).orient("bottom")
            var yAxis = d3.svg.axis().scale(y).orient("left").ticks(20);
            // add the SVG element
            var svg = d3.select("body").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            //get json
            $.ajax({
                url: 'http://api.population.io/1.0/population/' + searchYear + '/' + searchName + '/'
                , dataType: "json"
                , success: function (data) {
                    
                    allpop = 0;
                    data.forEach(function (d) {
                        d.age = d.age;
                        d.total = +d.total;
                        allpop = allpop + d.total;
                    });
                    
                    console.log("allpop os " + allpop.toString());   
                    document.getElementById("results2").innerHTML = "";
                    console.log("hello");
                    document.getElementById('results2').innerHTML = "<h1>Total population of " + searchName + " by age 1 to 100: " +
                    allpop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</h1>"
                        // scale the range of the data
                    x.domain(data.map(function (d) {
                        return d.age;
                    }));
                    y.domain([0, d3.max(data, function (d) {
                        return d.total;
                    })]);
                    // add axis
                    svg.append("g").attr("class", "x axis")
                        .attr("transform", "translate(0," + height + ")")
                        .call(xAxis).selectAll("text")
                        .style("text-anchor", "end")
                        .attr("dx", "-.8em")
                        .attr("dy", "1em")
                        .attr("transform");
                    
                        
                    svg.append("g")
                        .attr("class", "y axis")
                        .call(yAxis)
                        .append("text")
                        .attr("transform", "rotate(0)")
                        .attr("y", "-.8em")
                        .attr("dy", "1em")
                        .style("text-anchor", "end")
                        .text("Population");
                    // Add bar chart
                    svg.selectAll("bar")
                        .data(data)
                        .enter().append("rect").attr("class", "bar").attr("x", function (d) {
                        return x(d.age);
                    })
                        .attr("width", x.rangeBand()).attr("y", function (d) {
                        return y(d.total);
                    })
                        .attr("height", function (d) {
                        return height - y(d.total);
                    });

                }
            });
             location.href = "#results";
        }
        , type: "GET"
    })
    x = document.getElementById("searchYear").value
    z = document.getElementById("searchName").value
    if (isNaN(x)) {
        alert("Please put in a number")
        return;
    }
    if ((z) === (z).toLowerCase() || (z) === (z).toUpperCase()) {
        alert("Please make sure the first country  only is capitalized")
        return;
    }
    
}
var x = document.getElementById("calculate")
x.addEventListener("click", popSearch, false)

$('.container-fluid').addClass('animated zoomIn'); 
