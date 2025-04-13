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