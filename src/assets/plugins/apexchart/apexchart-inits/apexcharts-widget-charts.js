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

// Chart 4
var options = {
    series: [{
      name: 'This Week',
      data: [44, 35, 51, 37, 22, 33, 21]
    }, {
      name: 'Last Week',
      data: []
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
        distributed: true,
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 6,
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
  
  var chart_four = new ApexCharts(document.querySelector("#chart-4"), options);
  chart_four.render();


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


  // Chart 29
var options = {
    series: [
      {
        name: "Last Week",
        data: [10, 70, 30, 40, 15, 90, 45, 55]
      },
      {
        name: "This Week",
        data: [15, 30, 75, 30, 98, 10, 45, 75]
      }
    ],
    chart: {
      height: 250,
      type: 'line',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false,
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
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '16px',
      fontFamily: "'Open Sans' Sans-serif",
      fontWeight: 400,
      offsetY: 8,
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
  
  var chart_twentynine = new ApexCharts(document.querySelector("#chart-29"), options);
  chart_twentynine.render();


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


  // Chart 41 
var options = {
    series: [
      {
        name: 'Projects',
        data: [5, 50, 40, 90, 80]
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
    colors: ['#924AEF'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 6,
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
  
  var chart_fourtyone = new ApexCharts(document.querySelector("#chart-41"), options);
  chart_fourtyone.render();
  
  
  // Chart 42 
  var options = {
    series: [
      {
        name: 'Clients',
        data: [50, 50, 80, 30, 40]
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
    colors: ['#924AEF'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 6,
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
  
  var chart_fourtytwo = new ApexCharts(document.querySelector("#chart-42"), options);
  chart_fourtytwo.render();


  // Chart 47 
var options = {
    series: [{
    name: 'Employee',
    data: [10, 40, 45, 10, 75, 12, 60, 50, 20, 60]
  }],
  chart: {
      height: 250,
      type: 'line',
    
      toolbar: {
        show: false
      },
  },
  stroke: {
    width: 2,
    // curve: 'smooth',
    curve: 'straight',
    dashArray: 8,
  },
  colors: ['#A5A5A5'],
  markers: {
    size: 10,
    colors: '#924AEF',
    strokeColors: '#fff',
    strokeWidth: 0,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    shape: "circle",
    radius: 50,
    hover: {
      size: 12,
      sizeOffset: 3
    }
  },
  grid: {
    show: true,
    borderColor: '#F5F5F5',
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
    show: true,
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
  
  var chart_fourtyseven = new ApexCharts(document.querySelector("#chart-47"), options);
  chart_fourtyseven.render();
  
  
  // Chart 48
  var options = {
    series: [81],
    chart: {
      width: 170,
      height: 280,
      type: 'radialBar',
    },
    colors: ['#924AEF'],
    
    plotOptions: {
      radialBar: {
        hollow: {
          size: '30%',
          margin: 5,
          background: 'transparent',
        },
        track: {
          background: "#F6EEFF",
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            offsetY: 5,
            fontFamily: "'Cairo' Sans-serif",
            fontSize: '20px',
            fontWeight: 700,
          }
        }
      },
    },
    
    labels: [''],
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
  
  var chart_fourtyeight = new ApexCharts(document.querySelector("#chart-48"), options);
  chart_fourtyeight.render();
  
  
  // Chart 49
  var options = {
    series: [22],
    chart: {
      width: 170,
      height: 280,
      type: 'radialBar',
    },
    colors: ['#E328AF'],
    
    plotOptions: {
      radialBar: {
        hollow: {
          size: '30%',
          margin: 5,
          background: 'transparent',
        },
        track: {
          background: "#F6EEFF",
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            offsetY: 5,
            fontFamily: "'Cairo' Sans-serif",
            fontSize: '20px',
            fontWeight: 700,
          }
        }
      },
    },
  
    labels: [''],
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
  
  var chart_fourtynine = new ApexCharts(document.querySelector("#chart-49"), options);
  chart_fourtynine.render();
  
  
  // Chart 50
  var options = {
    series: [62],
    chart: {
      width: 170,
      height: 280,
      type: 'radialBar',
    },
    colors: ['#5ECFFF'],
    
    plotOptions: {
      radialBar: {
        hollow: {
          size: '30%',
          margin: 5,
          background: 'transparent',
        },
        track: {
          background: "#F6EEFF",
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            offsetY: 5,
            fontFamily: "'Cairo' Sans-serif",
            fontSize: '20px',
            fontWeight: 700,
          }
        }
      },
    },
  
    labels: [''],
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
  
  var chart_fifty = new ApexCharts(document.querySelector("#chart-50"), options);
  chart_fifty.render();