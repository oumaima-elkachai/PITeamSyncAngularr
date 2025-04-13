// Chart 1 
var options = {
    series: [{
        name: 'Net Profit',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    }, {
        name: 'Revenue',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    }, {
        name: 'Free Cash Flow',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
    }],
        chart: {
        type: 'bar',
        height: 350
    },
    plotOptions: {
        bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    yaxis: {
        title: {
        text: '$ (thousands)'
        }
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
var basic_column = new ApexCharts(document.querySelector("#basic-column"), options);
basic_column.render();


// Chart 2
var options = {
    series: [{
        name: 'Inflation',
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
    }],
    chart: {
        height: 350,
        type: 'bar',
    },
    plotOptions: {
        bar: {
        borderRadius: 10,
        dataLabels: {
            position: 'top', // top, center, bottom
        },
        }
    },
    dataLabels: {
        enabled: true,
        formatter: function (val) {
        return val + "%";
        },
        offsetY: -20,
        style: {
        fontSize: '12px',
        colors: ["#304758"]
        }
    },
    
    xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        axisBorder: {
        show: false
        },
        axisTicks: {
        show: false
        },
        crosshairs: {
        fill: {
            type: 'gradient',
            gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
            }
        }
        },
        tooltip: {
        enabled: true,
        }
    },
    yaxis: {
        axisBorder: {
        show: false
        },
        axisTicks: {
        show: false,
        },
        labels: {
        show: false,
        formatter: function (val) {
            return val + "%";
        }
        }
    
    },
};

var data_column = new ApexCharts(document.querySelector("#data-column"), options);
data_column.render();


// Chart 3
var options = {
    series: [{
        name: 'PRODUCT A',
        data: [44, 55, 41, 67, 22, 43]
    }, {
        name: 'PRODUCT B',
        data: [13, 23, 20, 8, 13, 27]
    }, {
        name: 'PRODUCT C',
        data: [11, 17, 15, 15, 21, 14]
    }, {
        name: 'PRODUCT D',
        data: [21, 7, 25, 13, 22, 8]
    }],
    chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
        show: true
        },
        zoom: {
        enabled: true
        }
    },
    responsive: [{
        breakpoint: 480,
        options: {
        legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
        }
        }
    }],
    plotOptions: {
        bar: {
        horizontal: false,
        borderRadius: 10,
        dataLabels: {
            total: {
            enabled: true,
            style: {
                fontSize: '13px',
                fontWeight: 900
            }
            }
        }
        },
    },
    xaxis: {
        type: 'datetime',
        categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
        '01/05/2011 GMT', '01/06/2011 GMT'
        ],
    },
    legend: {
        position: 'top',
        // offsetY: 40
    },
    fill: {
        opacity: 1
    }
};

var stacked_column = new ApexCharts(document.querySelector("#stacked-column"), options);
stacked_column.render();


// Chart 4
var options = {
    series: [
        {
        name: 'Q1 Budget',
        group: 'budget',
        data: [44000, 55000, 41000, 67000, 22000, 43000]
        },
        {
        name: 'Q1 Actual',
        group: 'actual',
        data: [48000, 50000, 40000, 65000, 25000, 40000]
        },
        {
        name: 'Q2 Budget',
        group: 'budget',
        data: [13000, 36000, 20000, 8000, 13000, 27000]
        },
        {
        name: 'Q2 Actual',
        group: 'actual',
        data: [20000, 40000, 25000, 10000, 12000, 28000]
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
        horizontal: false
        }
    },
    xaxis: {
        categories: [
        'Online advertising',
        'Sales Training',
        'Print advertising',
        'Catalogs',
        'Meetings',
        'Public relations'
        ]
    },
    fill: {
        opacity: 1
    },
    colors: ['#80c7fd', '#008FFB', '#80f1cb', '#00E396'],
    yaxis: {
        labels: {
        formatter: (val) => {
            return val / 1000 + 'K'
        }
        }
    },
    legend: {
        position: 'top',
        horizontalAlign: 'left'
    }
};

var grouped_stacked_column = new ApexCharts(document.querySelector("#grouped-stacked-column"), options);
grouped_stacked_column.render();