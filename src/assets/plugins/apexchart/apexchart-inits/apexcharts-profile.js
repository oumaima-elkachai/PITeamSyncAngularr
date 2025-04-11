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
  
  
  // Chart 30
  var options = {
    series: [
      {
        name: "0",
        data: [30, 0, 70, 30, 50, 20, 60]
      },
      {
        name: "25",
        data: [25, 20, 30, 10, 50, 70, 5]
      },
      {
        name: "50",
        data: [30, 0, 70, 30, 50, 20, 60]
      },
      {
        name: "75",
        data: [25, 20, 30, 10, 50, 70, 5]
      },
      {
        name: "100",
        data: [25, 20, 30, 10, 50, 70, 5]
      }
    ],
    xaxis: {
      categories: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:0', '16:00'],
    },
    chart: {
      height: 250,
      type: 'heatmap',    
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      heatmap: {
        colorScale: {
          ranges: [{
              from: 0,
              to: 25,
              color: '#D8C5F0',
              name: '0-25',
            },
            {
              from: 26,
              to: 50,
              color: '#B18BE1',
              name: '26-50',
            },
            {
              from: 51,
              to: 75,
              color: '#8B52D2',
              name: '51-75',
            },          
            {
              from: 76,
              to: 100,
              color: '#924AEF',
              name: '76-100',
            }
          ]
        }
      }
    },
    
    legend: {
      show: true,
      position: 'bottom',
      fontSize: '16px',
      fontFamily: "'Open Sans' Sans-serif",
      fontWeight: 400,
      labels: {
          // colors: '#ff0000',
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
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 3
    },
    // colors: ["#924AEF"],
    
  };
  
  var chart_thirty = new ApexCharts(document.querySelector("#chart-30"), options);
  chart_thirty.render();