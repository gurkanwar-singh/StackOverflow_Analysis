
var width = document.getElementById('vis')
    .clientWidth;
var height = document.getElementById('vis')
    .clientHeight;

var margin = {
    top: 10,
    bottom: 70,
    left: 70,
    right: 20
}

var svg = d3.select('#vis')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.right + ')');

width = width - margin.left - margin.right;
height = height - margin.top - margin.bottom;

var data = {};

 var data3 = d3.range(0, 9).map(function (d) { return new Date(2010 + d, 10, 3); });

  var slider3 = d3.sliderHorizontal()
    .min(d3.min(data3))
    .max(d3.max(data3))
    .step(1000 * 60 * 60 * 24 * 365)
    .width(400)
    .tickFormat(d3.timeFormat('%Y'))
    .tickValues(data3)
    .on('onchange', val => {
        year = d3.timeFormat('%Y')(val);
        //alert(year)
        draw(year)
    });

  var group3 = d3.select("svg")
    .append("g")
    .attr("transform", "translate(100,30)");

  group3.call(slider3);

var x_scale = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1);

var y_scale = d3.scaleLinear()
    .range([height, 0]);

var colour_scale = d3.scaleQuantile()
    .range(["#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"]);

var y_axis = d3.axisLeft(y_scale);
var x_axis = d3.axisBottom(x_scale);

svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')');

svg.append('g')
    .attr('class', 'y axis');

data["2018"] = [['ggplot2', 5463], ['dataframe', 3380], ['statistics', 588], ['plot', 1313], ['python', 650], ['vector', 408], ['time-series', 659], ['sweave', 25], ['list', 801], ['loops', 916]]
data["2017"] = [['ggplot2', 5012], ['dataframe', 3589], ['statistics', 549], ['plot', 1838], ['python', 627], ['vector', 495], ['time-series', 659], ['sweave', 29], ['list', 821], ['loops', 951]]
data["2016"] = [['ggplot2', 4137], ['dataframe', 2937], ['statistics', 448], ['plot', 1850], ['python', 495], ['vector', 394], ['time-series', 648], ['sweave', 40], ['list', 719], ['loops', 818]]
data["2015"] = [['ggplot2', 3529], ['dataframe', 2266], ['statistics', 499], ['plot', 1778], ['python', 390], ['vector', 434], ['time-series', 528], ['sweave', 58], ['list', 565], ['loops', 622]]
data["2014"] = [['ggplot2', 2512], ['dataframe', 1900], ['statistics', 471], ['plot', 1586], ['python', 342], ['vector', 372], ['time-series', 422], ['sweave', 71], ['list', 503], ['loops', 525]]
data["2013"] = [['ggplot2', 2162], ['dataframe', 1342], ['statistics', 361], ['plot', 1222], ['python', 244], ['vector', 269], ['time-series', 304], ['sweave', 61], ['list', 376], ['loops', 357]]
data["2012"] = [['ggplot2', 1277], ['dataframe', 767], ['statistics', 235], ['plot', 575], ['python', 147], ['vector', 128], ['time-series', 209], ['sweave', 63], ['list', 181], ['loops', 182]]
data["2011"] = [['ggplot2', 547], ['dataframe', 410], ['statistics', 140], ['plot', 311], ['python', 84], ['vector', 48], ['time-series', 120], ['sweave', 78], ['list', 84], ['loops', 86]]
data["2010"] = [['ggplot2', 243], ['dataframe', 129], ['statistics', 122], ['plot', 109], ['python', 51], ['vector', 46], ['time-series', 45], ['sweave', 45], ['list', 41], ['loops', 38]]

draw("2010")

function draw(year) {
    //alert("in draw")
    var csv_data = data[year];
    var t = d3.transition()
        .duration(2000);

    var months = csv_data.map(function(d) {
        return d[0];
    });

    x_scale.domain(months);

    var max_value = d3.max(csv_data, function(d) {
        return +d[1];
    });

    y_scale.domain([0, max_value]);
    colour_scale.domain([0, max_value]);

    var bars = svg.selectAll('.bar')
        .data(csv_data)

    bars
        .exit()
        .remove();

    var new_bars = bars
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', function(d) {
            return x_scale(d[0]);
        })
        .attr('width', x_scale.bandwidth())
        .attr('y', height)
        .attr('height', 0)

    new_bars.merge(bars)
        .transition(t)
        .attr('y', function(d) {
            return y_scale(+d[1]);
        })
        .attr('height', function(d) {
            return height - y_scale(+d[1])
        })
        .attr('fill', function(d) {
            return colour_scale(+d[1]);
        })

    svg.select('.x.axis')
        .call(x_axis);

    svg.select('.y.axis')
        .transition(t)
        .call(y_axis);

}

/*d3.queue()
    .defer(d3.csv, 'monthly_data_2014.csv')
    .defer(d3.csv, 'monthly_data_2013.csv')
    .defer(d3.csv, 'monthly_data_2012.csv')
    .defer(d3.csv, 'monthly_data_2011.csv')
    .defer(d3.csv, 'monthly_data_2010.csv')
    .defer(d3.csv, 'monthly_data_2009.csv')
    .await(function(error, d2014, d2013, d2012, d2011, d2010, d2009) {

        data['2009'] = d2009;
        data['2010'] = d2010;
        data['2011'] = d2011;
        data['2012'] = d2012;
        data['2013'] = d2013;
        data['2014'] = d2014;
        draw('2014');
    });
*/
//replace this with maybe sliderHorizontal
var slider = d3.select('#year');
slider.on('change', function() {
    draw(this.value);
});
