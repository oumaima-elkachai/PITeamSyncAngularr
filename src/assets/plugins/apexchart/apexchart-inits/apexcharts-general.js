// Chart 34
var options = {
    series: [62],
    chart: {
      width: 130,
      height: 200,
      type: 'radialBar',
    },
    colors: ['#E328AF'],
    plotOptions: {
      radialBar: {
        hollow: {
          size: '45%',
          margin: 0,
          background: undefined,
        },
        track: {
          background: "#FFCFF2",
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
  
  var chart_thirtyfour = new ApexCharts(document.querySelector("#chart-34"), options);
  chart_thirtyfour.render();
  
  // Chart 35
  var options = {
    series: [38],
    chart: {
      width: 130,
      height: 200,
      type: 'radialBar',
    },
    colors: ['#5ECFFF'],
    plotOptions: {
      radialBar: {
        hollow: {
          size: '45%',
          margin: 0,
          background: undefined,
        },
        track: {
          background: "#DFEDF2",
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
  
  var chart_thirtyfive = new ApexCharts(document.querySelector("#chart-35"), options);
  chart_thirtyfive.render();
  
  
  // Chart 36
  var options = {
    series: [
      {
        name: 'Spam',
        data: [50]
      }, 
      {
        name: 'Promotional',
        data: [95]
      }, 
    ],
      chart: {
        type: 'bar',
        width: 130,
        height: 150, 
        toolbar: {
          show: false,
        },
      },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '100%',
        borderRadius: 15
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
    colors: ['#DFEDF2', '#5ECFFF'],
    
    // title: {
    //   text: 'Leave Statistic',
    //   align: 'left'
    // },
    legend: {
      show: false,
      position: 'right',
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
      width: 15,
      colors: ['transparent']
    },
  
    xaxis: {
      show: false,
      categories: ['X-Axis'],
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
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " Emails"
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
  
  var chart_thirtysix = new ApexCharts(document.querySelector("#chart-36"), options);
  chart_thirtysix.render();
  
  
  // Chart 37
  var options = {
    series: [
      {
        name: "Emails",
        data: [0, 50, 40, 90, 30, 50, 5]
      },
    ],
    chart: {
      height: 150,
      type: 'line',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false,
      },
    },
    colors: ['#924AEF', '#E328AF'],
   
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      show: false,
      categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      lines: {
        show: false
      },
      labels: {
        show: true
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
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      }
    },
    legend: {
      show: false,
      position: 'top',
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
  
  var chart_thirtyseven = new ApexCharts(document.querySelector("#chart-37"), options);
  chart_thirtyseven.render();
  
  
  // Chart 38
  var options = {
    chart: {
      type: 'donut',
      width: 300
    },
    series: [20, 16, 16, 12, 25, 10],
    labels: ['Primary', 'Promotion', 'Forum', 'Socials', 'Spam', 'Other'],
    fill: {
      colors: ['#924AEF', '#5ECFFF', '#E328AF', '#FF9325', '#FF4A55', '#DFEDF2']
    },
    plotOptions: {
      pie: {
        donut: {
          size: '50%',
        },
      },
    },
    legend: {
      show: false,
      position: 'right',
      fontSize: '14px',
      fontFamily: "'Open Sans' Sans-serif",
      fontWeight: 400,
      offsetY: 5,
      labels: {
          colors: '#A5A5A5',
          useSeriesColors: true
      },
      markers: {
          width: 20,
          height: 20,
          offsetX: -5,
          offsetY: 6,
      },
      itemMargin: {
        horizontal: 0,
        vertical: 8
      },
      onItemClick: {
          toggleDataSeries: true
      },
      onItemHover: {
          highlightDataSeries: true
      },
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };
  
  var chart_thirtyeight = new ApexCharts(document.querySelector("#chart-38"), options);
  chart_thirtyeight.render();