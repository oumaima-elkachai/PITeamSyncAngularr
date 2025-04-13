// Chart 45
var options = {
  series: [75],
  chart: {
    height: 160,
    width: 160,
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

var chart_fourtyfive = new ApexCharts(document.querySelector("#chart-45"), options);
chart_fourtyfive.render();

// Chart 46
var options = {
  series: [
    {
      name: 'This Week',
      data: [80, 95, 60, 70]
    }, 
  ],
    chart: {
      type: 'bar',
      width: 150,
      height: 100,
      // stacked: true,
      toolbar: {
        show: false,
      },
    },
  plotOptions: {
    bar: {
      distributed: true,
      horizontal: false,
      columnWidth: '100%',
      borderRadius: 5,
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
  colors: ['#924AEF', '#924AEF', '#924AEF', '#924AEF'],
  
  // title: {
  //   text: 'Leave Statistic',
  //   align: 'left'
  // },
  legend: {
    show: false,
    position: 'top',
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
        offsetY: 0,
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
    width: 10,
    colors: ['transparent']
  },
  xaxis: {
    categories: [''],
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
  grid: {
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
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " clients"
      }
    }
  },
  responsive: [
    {
      breakpoint: 1200,
      options: {        
        legend: {
          position: 'bottom',
          horizontalAlign: 'center'
        },
      }
    }
  ]
};

var chart_fourtysix = new ApexCharts(document.querySelector("#chart-46"), options);
chart_fourtysix.render();