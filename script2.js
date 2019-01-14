
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

data["2018"] = [['ggplot2', 5463], ['dplyr', 3944], ['shiny', 3511], ['dataframe', 3380], ['data.table', 1501], ['plot', 1313], ['r-markdown', 946], ['loops', 916], ['for-loop', 891], ['rstudio', 868]]
data["2017"] = [['ggplot2', 5012], ['dplyr', 3304], ['shiny', 3160], ['dataframe', 3589], ['data.table', 1623], ['plot', 1838], ['r-markdown', 966], ['loops', 951], ['for-loop', 939], ['rstudio', 952]]
data["2016"] = [['ggplot2', 4137], ['dplyr', 1969], ['shiny', 2528], ['dataframe', 2937], ['data.table', 1412], ['plot', 1850], ['r-markdown', 692], ['loops', 818], ['for-loop', 643], ['rstudio', 663]]
data["2015"] = [['ggplot2', 3529], ['dplyr', 1498], ['shiny', 1806], ['dataframe', 2266], ['data.table', 1448], ['plot', 1778], ['r-markdown', 523], ['loops', 622], ['for-loop', 666], ['rstudio', 788]]
data["2014"] = [['ggplot2', 2512], ['dplyr', 540], ['shiny', 923], ['dataframe', 1900], ['data.table', 1013], ['plot', 1586], ['r-markdown', 218], ['loops', 525], ['for-loop', 549], ['rstudio', 567]]
data["2013"] = [['ggplot2', 2162], ['dplyr', 2], ['shiny', 275], ['dataframe', 1342], ['data.table', 659], ['plot', 1222], ['r-markdown', 67], ['loops', 357], ['for-loop', 304], ['rstudio', 194]]
data["2012"] = [['ggplot2', 1277], ['dplyr', 3], ['shiny', 12], ['dataframe', 767], ['data.table', 280], ['plot', 575], ['r-markdown', 11], ['loops', 182], ['for-loop', 149], ['rstudio', 80]]
data["2011"] = [['ggplot2', 547],  ['dplyr', 0], ['shiny', 0],['dataframe', 410], ['data.table', 50], ['plot', 311], ['r-markdown', 0],['loops', 86], ['for-loop', 54], ['rstudio',10]]
data["2010"] = [['ggplot2', 243],  ['dplyr', 0], ['shiny', 0],['dataframe', 129], ['data.table', 5], ['plot', 109], ['r-markdown', 0], ['loops', 38], ['for-loop', 15], ['rstudio', 0]]

draw("2018")

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
