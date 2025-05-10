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

  
// Chart 44
var options = {
    series: [
      {
        name: 'Unpaid',
        data: [60, 60, 80, 30, 52, 58]
      }, 
      {
        name: 'Paid',
        data: [80, 70, 55, 95, 70, 15]
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
        columnWidth: '50%',
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
    colors: ['#5ECFFF', '#38E25D'],
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
      categories: ['January', 'February', 'March', 'April', 'May', 'June'],
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
          return val + " Invoices"
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
  
  var chart_fourtyfour = new ApexCharts(document.querySelector("#chart-44"), options);
  chart_fourtyfour.render();
  
  
  // CHart 45
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
  
  
  // Chart 47 
  // var options = {
  //   series: [{
  //   name: 'Employee',
  //   data: [10, 40, 45, 10, 75, 12, 60, 50, 20, 60]
  // }],
  // chart: {
  //     height: 250,
  //     type: 'line',
    
  //     toolbar: {
  //       show: false
  //     },
  // },
  // stroke: {
  //   width: 2,
  //   // curve: 'smooth',
  //   curve: 'straight',
  //   dashArray: 8,
  // },
  // colors: ['#A5A5A5'],
  // markers: {
  //   size: 10,
  //   colors: '#924AEF',
  //   strokeColors: '#fff',
  //   strokeWidth: 0,
  //   strokeOpacity: 0.9,
  //   strokeDashArray: 0,
  //   fillOpacity: 1,
  //   shape: "circle",
  //   radius: 50,
  //   hover: {
  //     size: 12,
  //     sizeOffset: 3
  //   }
  // },
  // grid: {
  //   show: true,
  //   borderColor: '#F5F5F5',
  // },
  // xaxis: {
  //   show: false,
  //   lines: {
  //     show: false
  //   },
  //   labels: {
  //     show: false
  //   },
  //   axisBorder: {
  //     show: false
  //   },
  //   axisTicks: {
  //     show: false
  //   }
  // },
  // yaxis: {
  //   show: true,
  //   lines: {
  //     show: false
  //   },
  //   labels: {
  //     show: false
  //   },
  //   axisBorder: {
  //     show: false
  //   },
  //   axisTicks: {
  //     show: false
  //   }
  // },
  // responsive: [
  //   {
  //     breakpoint: 767,
  //     options: {        
  //       legend: {
  //         position: 'bottom',
  //         horizontalAlign: 'center'
  //       }
  //     }
  //   }
  // ]
  // };
  
  // var chart_fourtyseven = new ApexCharts(document.querySelector("#chart-47"), options);
  // chart_fourtyseven.render();
  
  
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