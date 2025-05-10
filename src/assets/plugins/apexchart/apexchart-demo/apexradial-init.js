// Chart 1 
var options = {
    series: [70],
    chart: {
        height: 350,
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
        hollow: {
            size: '70%',
        }
        },
    },
    labels: ['Cricket'],
};
var basic_radial = new ApexCharts(document.querySelector("#basic-radial"), options);
basic_radial.render();


// Chart 2
var options = {
    series: [44, 55, 67, 83],
    chart: {
        height: 350,
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
        dataLabels: {
            name: {
            fontSize: '22px',
            },
            value: {
            fontSize: '16px',
            },
            total: {
            show: true,
            label: 'Total',
            formatter: function (w) {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return 249
            }
            }
        }
        }
    },
    labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
};
var multiple_radial = new ApexCharts(document.querySelector("#multiple-radial"), options);
multiple_radial.render();


// Chart 3
var options = {
    series: [67, 61, 90],
    chart: {
        height: 290,
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
            margin: 5,
            size: '30%',
            background: 'transparent',
            image: undefined,
        },
        dataLabels: {
            name: {
            show: false,
            },
            value: {
            show: false,
            }
        }
        }
    },
    colors: ['#0084ff', '#39539E', '#0077B5'],
    labels: ['Messenger', 'Facebook', 'LinkedIn'],
    legend: {
        show: true,
        floating: true,
        fontSize: '16px',
        position: 'bottom',
        offsetX: 0,
        offsetY: 10,
        labels: {
        useSeriesColors: true,
        },
        markers: {
            size: 0
        },
        formatter: function(seriesName, opts) {
        return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
        },
        itemMargin: {
            vertical: 5
        }
    },
    responsive: [{
        breakpoint: 480,
        options: {
        legend: {
            show: false
        }
        }
    }]
};
var custom_radial = new ApexCharts(document.querySelector("#custom-radial"), options);
custom_radial.render();


// Chart 4
var options = {
    series: [76],
    chart: {
        type: 'radialBar',
        height: 390,
        offsetY: -20,
        sparkline: {
        enabled: true
        }
    },
    plotOptions: {
        radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
            background: "#e7e7e7",
            strokeWidth: '57%',
            margin: 5, // margin is in pixels
            dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: '#999',
            opacity: 1,
            blur: 2
            }
        },
        dataLabels: {
            name: {
            show: false
            },
            value: {
            offsetY: -2,
            fontSize: '22px'
            }
        }
        }
    },
    grid: {
        padding: {
        top: -10
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
        shade: 'light',
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91]
        },
    },
    labels: ['Average Results'],
};

var semi_circle_radial = new ApexCharts(document.querySelector("#semi-circle-radial"), options);
semi_circle_radial.render();