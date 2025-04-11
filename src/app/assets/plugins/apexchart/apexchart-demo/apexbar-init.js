// Chart 1 
var options = {
    series: [{
        name: 'Net Profit',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    }],
    chart: {
        type: 'bar',
        height: 350
    },
    plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    fill: {
        opacity: 1
    },
    tooltip: {
        y: {
        formatter: function (val) {
            return "$ " + val + " thousands"
        }
        }
    }
};
var basic_bar = new ApexCharts(document.querySelector("#basic-bar"), options);
basic_bar.render();


// Chart 2
var options = {
    series: [{
        data: [44, 55, 41, 64, 22, 43, 21]
    }, {
        data: [53, 32, 33, 52, 13, 44, 32]
    }],
        chart: {
        type: 'bar',
        height: 430
    },
    plotOptions: {
        bar: {
        horizontal: true,
        dataLabels: {
            position: 'top',
        },
        }
    },
    dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
        fontSize: '12px',
        colors: ['#fff']
        }
    },
    stroke: {
        show: true,
        width: 1,
        colors: ['#fff']
    },
    tooltip: {
        shared: true,
        intersect: false
    },
    xaxis: {
        categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
    },
};

var grouped_bar = new ApexCharts(document.querySelector("#grouped-bar"), options);
grouped_bar.render();


// Chart 3
var options = {
    series: [{
        name: 'Marine Sprite',
        data: [44, 55, 41, 37, 22, 43, 21]
    }, {
        name: 'Striking Calf',
        data: [53, 32, 33, 52, 13, 43, 32]
    }, {
        name: 'Tank Picture',
        data: [12, 17, 11, 9, 15, 11, 20]
    }, {
        name: 'Bucket Slope',
        data: [9, 7, 5, 8, 6, 9, 4]
    }, {
        name: 'Reborn Kid',
        data: [25, 12, 19, 32, 25, 24, 10]
    }],
    chart: {
        type: 'bar',
        height: 350,
        stacked: true,
    },
    plotOptions: {
        bar: {
        horizontal: true,
        dataLabels: {
            total: {
            enabled: true,
            offsetX: 0,
            style: {
                fontSize: '13px',
                fontWeight: 900
            }
            }
        }
        },
    },
    stroke: {
        width: 1,
        colors: ['#fff']
    },
    xaxis: {
        categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
        labels: {
        formatter: function (val) {
            return val + "K"
        }
        }
    },
    yaxis: {
        title: {
        text: undefined
        },
    },
    tooltip: {
        y: {
        formatter: function (val) {
            return val + "K"
        }
        }
    },
    fill: {
        opacity: 1
    },
    legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
    }
};

var stacked_bar = new ApexCharts(document.querySelector("#stacked-bar"), options);
stacked_bar.render();


// Chart 4
var options = {
    series: [
        {
          name: 'Q1 Budget',
          group: 'budget',
          data: [44000, 55000, 41000, 67000, 22000]
        },
        {
          name: 'Q1 Actual',
          group: 'actual',
          data: [48000, 50000, 40000, 65000, 25000]
        },
        {
          name: 'Q2 Budget',
          group: 'budget',
          data: [13000, 36000, 20000, 8000, 13000]
        },
        {
          name: 'Q2 Actual',
          group: 'actual',
          data: [20000, 40000, 25000, 10000, 12000]
        }
    ],
    chart: {
        type: 'bar',
        height: 350,
        stacked: true,
    },
    stroke: {
        width: 1,
        colors: ['#fff']
    },
    dataLabels: {
        formatter: (val) => {
        return val / 1000 + 'K'
        }
    },
    plotOptions: {
        bar: {
        horizontal: true
        }
    },
    xaxis: {
        categories: [
        'Online advertising',
        'Sales Training',
        'Print advertising',
        'Catalogs',
        'Meetings'
        ],
        labels: {
        formatter: (val) => {
            return val / 1000 + 'K'
        }
        }
    },
    fill: {
        opacity: 1,
    },
    colors: ['#80c7fd', '#008FFB', '#80f1cb', '#00E396'],
    legend: {
        position: 'top',
        horizontalAlign: 'left'
    }
};

var grouped_stacked_bar = new ApexCharts(document.querySelector("#grouped-stacked-bar"), options);
grouped_stacked_bar.render();