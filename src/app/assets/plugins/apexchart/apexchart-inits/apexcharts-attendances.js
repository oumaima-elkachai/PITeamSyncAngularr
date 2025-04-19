// Chart 7
var options = {
    series: [
    {
        name: "This Week",
        data: [160, 74, 60, 127]
    }, 
    {
        name: "Last Week",
        data: [190, 99, 123, 145]
    }
    ],
    chart: {
    type: 'bar',
    height: 400,
    toolbar: {
        show: true,
        tools: {
        download: '<i class="bi bi-three-dots-vertical fs-24 text-gray"></i>',
        }
    },
    },
    plotOptions: {
    bar: {
        horizontal: true,
        barHeight: '30%',
        dataLabels: {
        position: 'top',
        },
    }
    },
    dataLabels: {
    enabled: false,
    offsetX: -6,
    style: {
        fontSize: '12px',
        colors: ['#fff']
    }
    },
    colors: ['#5ECFFF', '#E328AF'],
    
    // title: {
    //   text: 'Attendance Overview',
    //   align: 'left'
    // },
    legend: {
    show: true,
    position: 'top',
    horizontalAlign: 'left',
    fontSize: '14px',
    fontFamily: "'Open Sans' Sans-serif",
    fontWeight: 400,
    labels: {
        colors: '#A5A5A5',
        useSeriesColors: false
    },
    markers: {
        width: 13,
        height: 13,
        offsetX: -10,
        offsetY: 0
    },
    itemMargin: {
        horizontal: 25,
        vertical: 0
    },
    onItemClick: {
        toggleDataSeries: true
    },
    onItemHover: {
        highlightDataSeries: true
    },
    },
    stroke: {
    show: false,
    width: 1,
    colors: ['#fff']
    },
    tooltip: {
    shared: true,
    intersect: false
    },
    xaxis: {
    categories: ['W4', 'W3', 'W2', 'W1'],
    },
    yaxis: {
        min: 0,
        max: 275,
    },
    grid: {
    show: true,
    borderColor: '#C2C2C2',
    strokeDashArray: 7,
    position: 'back',
    xaxis: {
        lines: {
            show: true
        }
    },   
    yaxis: {
        lines: {
            show: false
        }
    },  
    row: {
        colors: undefined,
        opacity: 0.5
    },  
    column: {
        colors: undefined,
        opacity: 0.5
    },  
    padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },  
    },
    responsive: [
    {
        breakpoint: 767,
        options: {        
        legend: {
            position: 'bottom',
            horizontalAlign: 'center'
        }
        }
    }
    ]
};

var chart_seven = new ApexCharts(document.querySelector("#chart-7"), options);
chart_seven.render();


// Chart 9
var options = {
    series: [{
    name: 'Yesterday',
    data: [44, 35, 21, 37, 22, 33, 21, 29, 15, 21, 14, 15]
    }, {
    name: 'Today',
    data: [13, 23, 20, 18, 13, 27, 33, 12, 41, 27, 22, 43]
    }, {
    name: 'Weekly',
    data: [11, 17, 15, 15, 21, 14, 15, 13, 13, 17, 33, 12]
    }],
    chart: {
    type: 'bar',
    height: 350,
    stacked: true,
    toolbar: {
        show: true,
        tools: {
        download: '<i class="bi bi-three-dots-vertical fs-24 text-gray"></i>',
        }
    },
    },
    plotOptions: {
    bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 7
    },
    },
    
    dataLabels: {
    enabled: false,
    offsetX: -6,
    style: {
        fontSize: '12px',
        colors: ['#fff']
    }
    },
    colors: ['#924AEF', '#5ECFFF', '#E328AF'],
    // title: {
    //   text: 'Attendance Performance',
    //   align: 'left'
    // },
    legend: {
    show: true,
    position: 'top',
    horizontalAlign: 'left',
    fontSize: '14px',
    fontFamily: "'Open Sans' Sans-serif",
    fontWeight: 400,
    labels: {
        colors: '#A5A5A5',
        useSeriesColors: false
    },
    markers: {
        width: 13,
        height: 13,
        offsetX: -10,
        offsetY: 0
    },
    itemMargin: {
        horizontal: 25,
        vertical: 0
    },
    onItemClick: {
        toggleDataSeries: true
    },
    onItemHover: {
        highlightDataSeries: true
    },
    },
    stroke: {
    show: true,
    width: 6,
    colors: ['#fff']
    },
    xaxis: {
    categories: ['14.10', '14.20', '14.30', '14.40', '14.50', '14.60', '15.00', '15.10', '15.20', '15.30', '15.40', '15.50'],
    },
    fill: {
    opacity: 1
    },
    grid: {
    show: true,
    borderColor: '#c2c2c2',
    strokeDashArray: 0,
    position: 'back',
    xaxis: {
        lines: {
            show: true
        }
    },   
    yaxis: {
        lines: {
            show: true
        }
    },  
    row: {
        colors: undefined,
        opacity: 0.5
    },  
    column: {
        colors: undefined,
        opacity: 0.5
    },  
    padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },  
    },
    responsive: [
    {
        breakpoint: 600,
        options: {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
            show: false
            },
        },
        plotOptions: {
            bar: {
            horizontal: true,
            columnWidth: '100%',
            borderRadius: 0
            },
        },
        
        legend: {
            position: 'bottom',
            horizontalAlign: 'left'
        }
        }
    }
    ]
};

var chart_nine = new ApexCharts(document.querySelector("#chart-9"), options);
chart_nine.render();

// CHart 14
var options = {
    series: [75],
    chart: {
    width: 64,
    height: 120,
    type: 'radialBar',
    },
    colors: ['#924AEF'],
    plotOptions: {
    radialBar: {
        hollow: {
        size: '50%',
        margin: 0,
        background: undefined,
        },
        track: {
        background: "#F6EEFF",
        },
        dataLabels: {
        name: {
            show: false
        },
        value: {
            offsetY: 10,
            fontFamily: "'Cairo' Sans-serif",
            fontSize: '18px',
            fontWeight: 700,
        }
        }
    },
    },
    stroke: {
    lineCap: "round",
    },
    labels: ['Hired Candidates'],
    responsive: [
    {
        breakpoint: 767,
        options: {        
        legend: {
            position: 'bottom',
            horizontalAlign: 'center'
        }
        }
    }
    ]
};

var chart_fourteen = new ApexCharts(document.querySelector("#chart-14"), options);
chart_fourteen.render();


// CHart 15
var options = {
    series: [50],
    chart: {
    width: 64,
    height: 120,
    type: 'radialBar',
    },
    colors: ['#E328AF'],
    plotOptions: {
    radialBar: {
        hollow: {
        size: '50%',
        margin: 0,
        background: undefined,
        },
        track: {
        background: "#F6EEFF",
        },
        dataLabels: {
        name: {
            show: false
        },
        value: {
            offsetY: 10,
            fontFamily: "'Cairo' Sans-serif",
            fontSize: '18px',
            fontWeight: 700,
        }
        }
    },
    },
    stroke: {
    lineCap: "round",
    },
    labels: ['Hired Candidates'],
    responsive: [
    {
        breakpoint: 767,
        options: {        
        legend: {
            position: 'bottom',
            horizontalAlign: 'center'
        }
        }
    }
    ]
};

var chart_fifteen = new ApexCharts(document.querySelector("#chart-15"), options);
chart_fifteen.render();


// CHart 16
var options = {
    series: [25],
    chart: {
    width: 64,
    height: 120,
    type: 'radialBar',
    },
    colors: ['#5ECFFF'],
    plotOptions: {
    radialBar: {
        hollow: {
        size: '50%',
        margin: 0,
        background: undefined,
        },
        track: {
        background: "#F6EEFF",
        },
        dataLabels: {
        name: {
            show: false
        },
        value: {
            offsetY: 10,
            fontFamily: "'Cairo' Sans-serif",
            fontSize: '18px',
            fontWeight: 700,
        }
        }
    },
    },
    stroke: {
    lineCap: "round",
    },
    labels: ['Hired Candidates'],
    responsive: [
    {
        breakpoint: 767,
        options: {        
        legend: {
            position: 'bottom',
            horizontalAlign: 'center'
        }
        }
    }
    ]
};

var chart_sixteen = new ApexCharts(document.querySelector("#chart-16"), options);
chart_sixteen.render();