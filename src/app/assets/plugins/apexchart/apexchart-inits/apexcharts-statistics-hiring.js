// Chart 22
var options = {
    series: [
      {
        name: 'Week 1',
        data: [80, 60, 80, 30, 52, 58, 33, 65, 74, 33, 43, 33]
      }, 
      {
        name: 'Week 2',
        data: [95, 70, 55, 50, 70, 95, 71, 55, 66, 45, 54, 63]
      }, 
      {
        name: 'Week 3',
        data: [55, 40, 55, 60, 55, 48, 82, 42, 76, 98, 34, 67]
      },
    ],
      chart: {
        type: 'bar',
        height: 270,
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
    colors: ['#924AEF', '#5ECFFF', '#E328AF'],
    
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
  
  var chart_twentytwo = new ApexCharts(document.querySelector("#chart-22"), options);
  chart_twentytwo.render();
  
  
  // Chart 23 
  var options = {
    series: [
      {
        name: 'series1',
        data: [5, 45, 20, 40, 10, 60, 5, 75]
      }
    ],
    chart: {
      height: 150,
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
    markers: {
        size: 7,
        colors: undefined,
        strokeColors: '#fff',
        strokeWidth: 4,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        shape: "circle",
        radius: 50,
        hover: {
          size: 8,
          sizeOffset: 3
        }
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
  
  var chart_twentythree = new ApexCharts(document.querySelector("#chart-23"), options);
  chart_twentythree.render();
  
  
  // Chart 24
  var options = {
    series: [
      {
        name: 'This Week',
        data: [80, 95, 60, 70, 70, 55]
      }, 
    ],
      chart: {
        type: 'bar',
        height: 135,
        // stacked: true,
        toolbar: {
          show: false,
        },
      },
    plotOptions: {
      bar: {
        distributed: true,
        horizontal: false,
        columnWidth: '70%',
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
    colors: ['#924AEF', '#E328AF'],
    
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
          return val + " interview"
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
  
  var chart_twentyfour = new ApexCharts(document.querySelector("#chart-24"), options);
  chart_twentyfour.render();
  
  
  // Chart 25 
  var options = {
    series: [
      {
        name: 'series1',
        data: [5, 45, 20, 40, 10, 60, 5, 75]
      }
    ],
    chart: {
      height: 150,
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
    markers: {
        size: 0,
        colors: undefined,
        strokeColors: '#fff',
        strokeWidth: 4,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        shape: "circle",
        radius: 50,
        hover: {
          size: 8,
          sizeOffset: 3
        }
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
  
  var chart_twentyfive = new ApexCharts(document.querySelector("#chart-25"), options);
  chart_twentyfive.render();
  
  
  // Chart 26 
  var options = {
    series: [
      {
        name: 'series1',
        data: [5, 45, 20, 40, 25, 55]
      }
    ],
    chart: {
      height: 150,
      type: 'line',    
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      },
    },
    colors: ['#E328AF'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    markers: {
        size: 7,
        colors: undefined,
        strokeColors: '#fff',
        strokeWidth: 4,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        shape: "circle",
        radius: 50,
        hover: {
          size: 8,
          sizeOffset: 3
        }
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
  
  var chart_twentysix = new ApexCharts(document.querySelector("#chart-26"), options);
  chart_twentysix.render();
  
  
  // Chart 27
  var options = {
    chart: {
      type: 'donut',
      width: 400
    },
    series: [20, 16, 16, 12, 25, 10],
    labels: ['UI Designer', 'Front-End Developer', 'Back-End Developer', 'UX Researcher', 'Project Manager', 'Other'],
    fill: {
      colors: ['#924AEF', '#5ECFFF', '#E328AF', '#FF9325', '#FF4A55', '#DFEDF2']
    },
    plotOptions: {
      pie: {
        // size: 200,
        donut: {
          size: '50%',
          // labels: {
          //   show: true,
          //   name: {
          //     show: true,
          //   },
          //   value: {
          //     show: true,
          //     fontSize: '34px',
          //     fontFamily: "'Cairo' Sans-serif",
          //     fontWeight: 700,
          //   },
          //   total: {
          //     show: true,
          //     showAlways: true,
          //     label: "Total",
          //     fontSize: '14px',
          //     fontFamily: "'Open Sans' Sans-serif",
          //     fontWeight: 400,
          //     color: '#a5a5a5',
          //   },
          // },
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
  
  var chart_twentyseven = new ApexCharts(document.querySelector("#chart-27"), options);
  chart_twentyseven.render();
  
  
  // Chart 28
  var options = {
    series: [{
      name: 'Score',
      data: [10, 35, 28, 20, 7, 19, 7]
    }, ],
    chart: {
      type: 'bar',
      height: 350,
      // stacked: true,
      stackType: '100%',
      toolbar: {
        show: false
      },
    },
  
    plotOptions: {
      bar: {
        distributed: true, // this line is mandatory
        horizontal: true,
        barHeight: '90%',
        borderRadius: 6
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
    colors: ['#FF4A55', '#38E25D', '#38E25D', '#FF9325', '#FF4A55', '#FF9325', '#FF4A55'],
  
    // title: {
    //   text: 'Attendance Performance',
    //   align: 'left'
    // },
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'right',
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
      width: 15,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['1PM', '12AM', '10AM', '8AM', '6AM', '4AM', '2PM'],
    },
    grid: {
      show: false,
    },
  };
  
  var chart_twentyeight = new ApexCharts(document.querySelector("#chart-28"), options);
  chart_twentyeight.render();