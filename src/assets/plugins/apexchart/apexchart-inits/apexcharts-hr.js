// Chart 1 
var options = {
  series: [{
  name: 'Employee',
  data: [10, 90, 45, 65, 55, 70, 40, 120]
}],
chart: {
    height: 70,
    // type: 'line',
  
    toolbar: {
      show: false
    },
},
stroke: {
  width: 5,
  curve: 'smooth'
},
grid: {
  show: false,
},
xaxis: {
  show: false,
  lines: {
    show: false
  },
  labels: {
    show: false
  },
  axisBorder: {
    show: false
  },
  axisTicks: {
    show: false
  }
},
yaxis: {
  show: false,
  lines: {
    show: false
  },
  labels: {
    show: false
  },
  axisBorder: {
    show: false
  },
  axisTicks: {
    show: false
  }
},
fill: {
  type: 'gradient',
  gradient: {
    shade: 'dark',
    gradientToColors: [ '#924AEF'],
    shadeIntensity: 1,
    type: 'horizontal',
    opacityFrom: 1,
    opacityTo: 1,
    stops: [0, 100, 100, 100]
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

var chart_one = new ApexCharts(document.querySelector("#chart-1"), options);
chart_one.render();


// Chart 2
var options = {
series: [{
  name: 'Employee',
  data: [100, 40, 65, 45, 55, 40, 70, 10]
}],
  chart: {
    height: 70,
    // type: 'line',
  
    toolbar: {
      show: false
    },
},
stroke: {
  width: 5,
  curve: 'smooth'
},
grid: {
  show: false,
},
xaxis: {
  show: false,
  lines: {
    show: false
  },
  labels: {
    show: false
  },
  axisBorder: {
    show: false
  },
  axisTicks: {
    show: false
  }
},
yaxis: {
  show: false,
  lines: {
    show: false
  },
  labels: {
    show: false
  },
  axisBorder: {
    show: false
  },
  axisTicks: {
    show: false
  }
},
fill: {
  type: 'gradient',
  gradient: {
    shade: 'dark',
    gradientToColors: [ '#5ECFFF'],
    shadeIntensity: 1,
    type: 'horizontal',
    opacityFrom: 1,
    opacityTo: 1,
    stops: [0, 100, 100, 100]
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

var chart_two = new ApexCharts(document.querySelector("#chart-2"), options);
chart_two.render();


// Chart 3
var options = {
series: [{
  name: 'Employee',
  data: [10, 90, 45, 65, 55, 70, 40, 120]
}],
  chart: {
    height: 70,
    // type: 'line',
  
    toolbar: {
      show: false
    },
},
stroke: {
  width: 5,
  curve: 'smooth'
},
grid: {
  show: false,
},
xaxis: {
  show: false,
  lines: {
    show: false
  },
  labels: {
    show: false
  },
  axisBorder: {
    show: false
  },
  axisTicks: {
    show: false
  }
},
yaxis: {
  show: false,
  lines: {
    show: false
  },
  labels: {
    show: false
  },
  axisBorder: {
    show: false
  },
  axisTicks: {
    show: false
  }
},
fill: {
  type: 'gradient',
  gradient: {
    shade: 'dark',
    gradientFromColors: [ '#E328AF'],
    gradientToColors: [ '#E328AF'],
    shadeIntensity: 1,
    type: 'horizontal',
    opacityFrom: 1,
    opacityTo: 1,
    stops: [0, 100, 100, 100]
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

var chart_three = new ApexCharts(document.querySelector("#chart-3"), options);
chart_three.render();

// Chart 5
var options = {
series: [
  {
    name: "Approved",
    data: [0, 62, 57, 78, 64, 70, 38, 77, 38, 61, 50]
  },
  {
    name: "Pending",
    data: [50, 12, 22, 19, 49, 19, 18, 10, 82, 41, 60]
  }
],
chart: {
  height: 350,
  type: 'line',
  zoom: {
    enabled: false
  },
  toolbar: {
    show: true,
    tools: {
      download: '<i class="bi bi-three-dots-vertical fs-24 text-gray"></i>',
    }
  },
},
colors: ['#924AEF', '#E328AF'],

stroke: {
  curve: 'smooth'
},
xaxis: {
  categories: ['Sunday', '', 'Monday', '', 'Tuesday', '', 'Thursday', '', 'Friday', '', 'Saturday'],
},
legend: {
  show: true,
  position: 'top',
  horizontalAlign: 'left',
  fontSize: '16px',
  fontFamily: "'Open Sans' Sans-serif",
  fontWeight: 400,
  labels: {
      colors: '#ff0000',
      useSeriesColors: true
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

var chart_five = new ApexCharts(document.querySelector("#chart-5"), options);
chart_five.render();


// Chart 6 
var options = {
series: [75],
chart: {
  height: 450,
  type: 'radialBar',
},
colors: ['#924AEF'],
plotOptions: {
  radialBar: {
    startAngle: -180,
    endAngle: 180,
    hollow: {
      size: '30%',
      background: 'transparent',
    },
    track: {
      background: "#F5F5F5",
    },
    dataLabels: {
      name: {
        show: true,
        offsetY: 30,
        fontFamily: "'Open Sans' Sans-serif",
        fontSize: '16px',
        fontWeight: 400,
        color: '#a5a5a5',
      },
      value: {
        offsetY: -10,
        fontFamily: "'Cairo' Sans-serif",
        fontSize: '34px',
        fontWeight: 700,
      }
    }
  },
},
labels: ['of Employee'],
responsive: [
  {
    breakpoint: 1199,
    options: {
        chart: {
          height: 350,
        },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '30%',
            background: 'transparent',
          },
          track: {
            background: "#F5F5F5",
          },
          dataLabels: {
            name: {
              show: true,
              offsetY: 30,
              fontFamily: "'Open Sans' Sans-serif",
              fontSize: '12px',
              fontWeight: 400,
              color: '#a5a5a5',
            },
            value: {
              offsetY: -10,
              fontFamily: "'Cairo' Sans-serif",
              fontSize: '24px',
              fontWeight: 700,
            }
          }
        },
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center'
      }
    },
  }
]
};

var chart_six = new ApexCharts(document.querySelector("#chart-6"), options);
chart_six.render();