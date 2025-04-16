// Chart 1 
var options = {
    series: [{
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }],
        chart: {
        height: 350,
        type: 'line',
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
    grid: {
        row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
        },
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    }
};
var basic_line = new ApexCharts(document.querySelector("#basic-line"), options);
basic_line.render();


// Chart 2
var options = {
    series: [
        {
        name: "High - 2013",
        data: [28, 29, 33, 36, 32, 32, 33]
        },
        {
        name: "Low - 2013",
        data: [12, 11, 14, 18, 17, 13, 13]
        }
    ],
        chart: {
        height: 350,
        type: 'line',
        dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
        },
        toolbar: {
        show: false
        }
    },
    colors: ['#77B6EA', '#545454'],
    dataLabels: {
        enabled: true,
    },
    stroke: {
        curve: 'smooth'
    },
    grid: {
        borderColor: '#e7e7e7',
        row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
        },
    },
    markers: {
        size: 1
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        title: {
        text: 'Month'
        }
    },
    yaxis: {
        title: {
        text: 'Temperature'
        },
        min: 5,
        max: 40
    },
    legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
    }
};

var data_line = new ApexCharts(document.querySelector("#data-line"), options);
data_line.render();


// Chart 3
var options = {
    series: [{
        name: 'XYZ MOTORS',
        data: [{
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
        ],
    }, ],
    chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
        },
        toolbar: {
        autoSelected: 'zoom'
        }
    },
    dataLabels: {
        enabled: false
    },
    markers: {
        size: 0,
    },
    fill: {
        type: 'gradient',
        gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
        },
    },
    yaxis: {
        labels: {
        formatter: function (val) {
            return (val / 1000000).toFixed(0);
        },
        },
        title: {
        text: 'Price'
        },
    },
    xaxis: {
        type: 'datetime',
    },
    tooltip: {
        shared: false,
        y: {
        formatter: function (val) {
            return (val / 1000000).toFixed(0)
        }
        }
    }
};

var zoom_line = new ApexCharts(document.querySelector("#zoom-line"), options);
zoom_line.render();


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
