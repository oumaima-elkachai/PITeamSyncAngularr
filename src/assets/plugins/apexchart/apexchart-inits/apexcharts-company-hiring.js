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

// Chart 21
var options = {
    series: [
      {
        name: 'series1',
        data: [10, 5, 40, 20, 25, 0, 35, 45, 0]
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
      position: 'back'
    },
  
    xaxis: {
      show: false,
      lines: {
        show: true
      },
      labels: {
        show: true
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      categories: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
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
  
  var chart_twentyone = new ApexCharts(document.querySelector("#chart-21"), options);
  chart_twentyone.render();