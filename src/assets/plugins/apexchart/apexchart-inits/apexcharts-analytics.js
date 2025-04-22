// Chart 39
var options = {
    series: [
      {
        name: 'Ongoing',
        data: [60, 60, 80, 30, 52, 58, 33]
      }, 
      {
        name: 'Unfinished',
        data: [80, 70, 55, 95, 70, 15, 71]
      }, 
    ],
    chart: {
      type: 'bar',
      height: 350, 
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%',
        borderRadius: 7
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
    colors: ['#5ECFFF', '#E328AF'],
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
      width: 4,
      colors: ['transparent']
    },
    xaxis: {
    },
    xaxis: {
      categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      labels: {
        show: true,
        rotate: -45,
        rotateAlways: false,
        hideOverlappingLabels: true,
        showDuplicates: false,
        trim: false,
        minHeight: undefined,
        maxHeight: 120,
        style: {
            colors: ['#A5A5A5'],
            fontSize: '14px',
            fontFamily: "'Public Sans' Sans-serif",
            fontWeight: 600,
            cssClass: 'apexcharts-xaxis-label',
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        // rotate: -45,
        rotateAlways: false,
        hideOverlappingLabels: true,
        showDuplicates: false,
        trim: false,
        minHeight: undefined,
        maxHeight: 120,
        style: {
            colors: ['#A5A5A5'],
            fontSize: '14px',
            fontFamily: "'Public Sans' Sans-serif",
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-label',
        },
      },
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " Projects"
        }
      }
    },
    responsive: [
      {
        breakpoint: 991,
        options: {        
          plotOptions: {
            bar: {
              horizontal: true,
              columnWidth: '100%',
              borderRadius: 5
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
  
  var chart_thirtynine = new ApexCharts(document.querySelector("#chart-39"), options);
  chart_thirtynine.render();
  
  
  // Chart 40
  var options = {
    series: [62],
    chart: {
      width: 70,
      height: 120,
      type: 'radialBar',
    },
    colors: ['#924AEF'],
    plotOptions: {
      radialBar: {
        hollow: {
          size: '45%',
          margin: 0,
          background: undefined,
        },
        track: {
          background: "#F5F5F5",
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            show: false,
            offsetY: 10,
            fontFamily: "'Cairo' Sans-serif",
            fontSize: '18px',
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
  
  var chart_fourty = new ApexCharts(document.querySelector("#chart-40"), options);
  chart_fourty.render();
  
  
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
  
  
  // Chart 43
  var options = {
    series: [
      {
        name: "Projects",
        data: [10, 25, 22, 42, 40, 60, 35, 42, 30, 54, 55, 45, 47]
      },
    ],
    chart: {
      height: 250,
      type: 'area',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false,
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
    
    
    xaxis: {
      categories: ['S', '', 'M', '', 'T', '', 'W', '', 'T', '', 'F', '', 'S'],
      labels: {
        show: true,
        rotate: -45,
        rotateAlways: false,
        hideOverlappingLabels: true,
        showDuplicates: false,
        trim: false,
        minHeight: undefined,
        maxHeight: 120,
        style: {
            colors: ['#A5A5A5'],
            fontSize: '14px',
            fontFamily: "'Public Sans' Sans-serif",
            fontWeight: 600,
            cssClass: 'apexcharts-xaxis-label',
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        // rotate: -45,
        rotateAlways: false,
        hideOverlappingLabels: true,
        showDuplicates: false,
        trim: false,
        minHeight: undefined,
        maxHeight: 120,
        style: {
            colors: ['#A5A5A5'],
            fontSize: '14px',
            fontFamily: "'Public Sans' Sans-serif",
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-label',
        },
      },
    },
    grid: {
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
    legend: {
      show: true,
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
    annotations: {
      points: [{
        x: 'T',
        y: 42,
        marker: {
          size: 14,
          strokeColor: '#ffffff',
          fillColor: '#924AEF',
          strokeWidth: 6,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          shape: "circle",
          radius: 50,
        },
        // label: {
        //   borderColor: '#924AEF',
        //   offsetY: 0,
        //   style: {
        //     color: '#fff',
        //     background: '#924AEF',
        //   },
        //   text: 'Marker Here'
        // }
      }]
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
  
  var chart_fourtythree = new ApexCharts(document.querySelector("#chart-43"), options);
  chart_fourtythree.render();