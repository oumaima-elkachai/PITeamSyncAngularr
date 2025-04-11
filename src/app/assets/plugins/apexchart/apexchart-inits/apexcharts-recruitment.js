// Chart 10
var options = {
    series: [{
      name: 'This Week',
      data: [44, 35, 51, 37, 22, 33, 21]
    }, {
      name: 'Last Week',
      data: [13, 23, 30, 18, 43, 27, 33]
    }],
  chart: {
    type: 'bar',
    height: 350,
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
      borderRadius: 10,
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
  colors: ['#E328AF', '#924AEF',],
  // title: {
  //   text: 'Recruitment Progress',
  //   align: 'left'
  // },
  stroke: {
    show: true,
    width: 5,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  },
  fill: {
    opacity: 1
  },

  
  legend: {
    show: true,
    position: 'top',
    horizontalAlign: 'left',
    fontSize: '16px',
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

var chart_ten = new ApexCharts(document.querySelector("#chart-10"), options);
chart_ten.render();


// Chart 11
var options = {
  series: [{
    name: 'Employee',
    data: [0, 58, 39, 59, 38, 71, 75, 70, 82]
  }],
  chart: {
      height: 150,
      type: 'line',
    
      toolbar: {
        show: false
      },
  },

  colors: ['#FFFFFF'],
  stroke: {
    width: 3,
    curve: 'smooth'
  },
  grid: {
    show: true,
    position: 'back',
    xaxis: {
      lines: {
        show: true
      },
    },
  },
  xaxis: {
    show: false,
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
      show: true
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

var chart_eleven = new ApexCharts(document.querySelector("#chart-11"), options);
chart_eleven.render();


// Chart 12
var options = {
  series: [
    {
      name: 'series1',
      data: [10, 5, 40, 20, 25, 0, 35, 45, 0]
    }
  ],
  chart: {
    height: 100,
    type: 'area',    
    toolbar: {
      show: false
    },
    sparkline: {
      enabled: true
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
    show: false,
    position: 'front'
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

var chart_twelve = new ApexCharts(document.querySelector("#chart-12"), options);
chart_twelve.render();


// CHart 13
var options = {
  series: [75],
  chart: {
    height: 200,
    width: 200,
    type: 'radialBar',
  },
  colors: ['#924AEF'],
  plotOptions: {
    radialBar: {
      hollow: {
        size: '65%',
        margin: 15,
        background: '#F5F5F5',
      },
      track: {
        background: "#F5F5F5",
      },
      dataLabels: {
        name: {
          show: false
        },
        value: {
          offsetY: 15,
          fontFamily: "'Cairo' Sans-serif",
          fontSize: '28px',
          fontWeight: 700,
        }
      }
    },
  },
  labels: ['Hired Candidates'],
  responsive: [
    {
      breakpoint: 1399,
      options: {
        plotOptions: {
          radialBar: {
            hollow: {
              size: '70%',
              margin: 10,
              background: '#F5F5F5',
            },
            track: {
              background: "#F5F5F5",
            },
            dataLabels: {
              name: {
                show: false
              },
              value: {
                offsetY: 10,
                fontFamily: "'Cairo' Sans-serif",
                fontSize: '18px',
                fontWeight: 600,
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

var chart_thirteen = new ApexCharts(document.querySelector("#chart-13"), options);
chart_thirteen.render();