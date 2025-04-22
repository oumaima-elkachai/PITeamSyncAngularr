// Chart 8
var options = {
    series: [
      {
        name: 'Week 1',
        data: [80, 60, 80, 30, 52, 58, 33, 60, 46, 87, 99, 76]
      }, 
      {
        name: 'Week 2',
        data: [95, 70, 55, 50, 70, 95, 71, 100, 74, 89, 65, 98]
      }, 
      {
        name: 'Week 3',
        data: [55, 40, 55, 60, 55, 48, 82, 53, 61, 76, 56, 34]
      },
      {
        name: 'Week 4',
        data: [95, 55, 70, 95, 70, 48, 52, 73, 41, 89, 45, 39]
      }
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
        columnWidth: '70%',
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
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
  
  var chart_eight = new ApexCharts(document.querySelector("#chart-8"), options);
  chart_eight.render();

  
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