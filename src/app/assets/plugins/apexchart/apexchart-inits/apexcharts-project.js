// Chart 17
var options = {
  series: [
    {
      name: 'Completed',
      data: [80, 60, 80, 30, 52, 58, 33]
    }, 
    {
      name: 'Ongoing',
      data: [95, 70, 55, 50, 70, 95, 71]
    }, 
    {
      name: 'Unfinished',
      data: [55, 40, 55, 60, 55, 48, 82]
    },
  ],
    chart: {
      type: 'bar',
      height: 460, 
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
      borderRadius: 5
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
  colors: ['#924AEF', '#5ECFFF', '#E328AF', '#FF9325'],
  
  // title: {
  //   text: 'Leave Statistic',
  //   align: 'left'
  // },
  legend: {
    show: true,
    position: 'top',
    horizontalAlign: 'left',
    fontSize: '14px',
    fontFamily: "'Open Sans' Sans-serif",
    fontWeight: 400,
    offsetY: 5,
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
    width: 4,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " leave"
      }
    }
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

var chart_seventeen = new ApexCharts(document.querySelector("#chart-17"), options);
chart_seventeen.render();


// Chart 19
var options = {
  series: [65, 35],
  labels: ['Completed', 'Ongoing'],
  chart: {
    type: 'donut',
    width: '300',
  },
  colors: ['#924AEF', '#E328AF'],
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 90,
      offsetY: 0
    }
  },
  grid: {
    padding: {
      bottom: -100
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
  legend: {
    show: false,
    position: 'bottom',
    fontSize: '14px',
    fontFamily: "'Open Sans' Sans-serif",
    fontWeight: 400,
    offsetY: 0,
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
  // responsive: [{
  //   breakpoint: 300,
  //   options: {
  //     chart: {
  //       width: 200
  //     },
  //     legend: {
  //       position: 'bottom'
  //     }
  //   }
  // }]
};

var chart_nineteen = new ApexCharts(document.querySelector("#chart-19"), options);
chart_nineteen.render();


// Chart 20
var options = {
  series: [
    {
      name: 'series1',
      data: [2, 8, 5, 7, 5, 8, 5, 10]
    }
  ],
  chart: {
    height: 200,
    type: 'area',    
    toolbar: {
      show: false
    },
  },
  colors: ['#924AEF'],
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  
  grid: {
    show: true,
    position: 'back',
    borderColor: '#C2C2C2',
    strokeDashArray: 5,
    xaxis: {
        lines: {
            show: false
        }
    },   
    yaxis: {
        lines: {
            show: true
        }
    }, 
  },
  xaxis: {
    categories: ['', '', '', '', '', '', '', ''],
  },
  yaxis: {
      title: {
        text: 'AM'
      }
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

var chart_twenty = new ApexCharts(document.querySelector("#chart-20"), options);
chart_twenty.render();