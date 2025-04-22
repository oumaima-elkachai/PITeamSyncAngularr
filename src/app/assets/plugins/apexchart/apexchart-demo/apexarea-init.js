// Chart 1 
var options = {
    series: [{
        name: "STOCK ABC",
        data: [
            {
                x: "08-10-2022 GMT",
                y: 40,
            },
            {
                x: "08-11-2022 GMT",
                y: 55,
            },
            {
                x: "08-12-2022 GMT",
                y: 36,
            },
            {
                x: "08-13-2022 GMT",
                y: 48,
            },
            {
                x: "08-14-2022 GMT",
                y: 27,
            },
            {
                x: "08-15-2022 GMT",
                y: 45,
            },
            {
                x: "08-16-2022 GMT",
                y: 40,
            },
            {
                x: "08-17-2022 GMT",
                y: 55,
            },
            {
                x: "08-18-2022 GMT",
                y: 36,
            },
            {
                x: "08-19-2022 GMT",
                y: 58,
            },
            {
                x: "08-20-2022 GMT",
                y: 45,
            },
            {
                x: "08-21-2022 GMT",
                y: 65,
            },
            {
                x: "08-22-2022 GMT",
                y: 60,
            },
            {
                x: "08-23-2022 GMT",
                y: 35,
            },
            {
                x: "08-24-2022 GMT",
                y: 66,
            },
            {
                x: "08-25-2022 GMT",
                y: 52,
            },
            {
                x: "08-26-2022 GMT",
                y: 57,
            },
            {
                x: "08-27-2022 GMT",
                y: 45,
            },
            {
                x: "08-28-2022 GMT",
                y: 40,
            },
            {
                x: "08-29-2022 GMT",
                y: 55,
            },
            {
                x: "08-30-2022 GMT",
                y: 55,
            },
            {
                x: "09-01-2022 GMT",
                y: 48,
            },
            {
                x: "09-02-2022 GMT",
                y: 62,
            },
            {
                x: "09-03-2022 GMT",
                y: 45,
            },
        ],
    }],
    chart: {
        type: 'area',
        height: 350,
        zoom: {
        enabled: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'straight'
    },
    xaxis: {
        type: 'datetime',
    },
    yaxis: {
        opposite: true
    },
    legend: {
        horizontalAlign: 'left'
    }
};
var basic_area = new ApexCharts(document.querySelector("#basic-area"), options);
basic_area.render();


// Chart 2
var options = {
    series: [{
        name: 'series1',
        data: [31, 40, 28, 51, 42, 109, 100]
    }, {
        name: 'series2',
        data: [11, 32, 45, 32, 34, 52, 41]
    }],
    chart: {
        height: 350,
        type: 'area'
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },
    xaxis: {
        type: 'datetime',
        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
    },
    tooltip: {
        x: {
        format: 'dd/MM/yy HH:mm'
        },
    },
};

var spline_area = new ApexCharts(document.querySelector("#spline-area"), options);
spline_area.render();


// Chart 3
var options = {
    series: [{
        name: 'series1',
        data: [31, 40, 28, 51, 42, 11, 32, 45, 32, 34, 52, 41, 109, 100]
    }, {
        name: 'series2',
        data: [11, 32, 45, 32, 34, 52, 41, 51, 42, 11, 32, 45, 32, 34,]
    }, {
        name: 'series3',
        data: [45, 32, 34, 52, 41, 109, 100, 40, 28, 51, 11, 32, 45, 32]
    }],
    chart: {
        type: 'area',
        height: 350,
        stacked: true,
    },
    colors: ['#008FFB', '#00E396', '#CED4DC'],
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },
    fill: {
        type: 'gradient',
        gradient: {
        opacityFrom: 0.6,
        opacityTo: 0.8,
        }
    },
    legend: {
        position: 'top',
        horizontalAlign: 'left'
    },
    xaxis: {
        // type: 'datetime'
    },
};

var stacked_area = new ApexCharts(document.querySelector("#stacked-area"), options);
stacked_area.render();


// Chart 4
var options = {
    series: [{
        data: [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58]
    }],
    chart: {
        type: 'line',
        height: 350
    },
    stroke: {
        curve: 'stepline',
    },
    dataLabels: {
        enabled: false
    },
    markers: {
        hover: {
        sizeOffset: 4
        }
    }
};

var step_line = new ApexCharts(document.querySelector("#step-line"), options);
step_line.render();


// Chart 5
var options = {
    series: [{
        name: 'Sales',
        data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
    }],
    chart: {
        height: 350,
        type: 'line',
    },
    forecastDataPoints: {
        count: 7
    },
    stroke: {
        width: 5,
        curve: 'smooth'
    },
    xaxis: {
        type: 'datetime',
        categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001','4/11/2001' ,'5/11/2001' ,'6/11/2001'],
        tickAmount: 10,
        labels: {
        formatter: function(value, timestamp, opts) {
            return opts.dateFormatter(new Date(timestamp), 'dd MMM')
        }
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
        shade: 'dark',
        gradientToColors: [ '#FDD835'],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100]
        },
    },
    yaxis: {
        min: -10,
        max: 40
    }
};

var gradient_line = new ApexCharts(document.querySelector("#gradient-line"), options);
gradient_line.render();
