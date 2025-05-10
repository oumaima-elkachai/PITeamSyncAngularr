// Chart 32 
var options = {
    series: [87, 75, 44],
    labels: ['Apps', 'Website', 'Other'],
    chart: {
      height: 250,
      type: 'radialBar',
    },
    colors: ['#924AEF', '#E328AF', '#5ECFFF'],
    plotOptions: {
      radialBar: {
        startAngle: -180,
        endAngle: 180,
        hollow: {
          margin: 0,
          size: '20%',
          background: '#fff',
        },
        track: {
          background: "#F5F5F5",
          margin: 10,
        },
        dataLabels: {
          name: {
            offsetY: 0,
            fontSize: '16px',
          },
          value: {
            offsetY: 0,
            fontSize: '12px',
          },
        }
      }
    },
    
    legend: {
      show: true,
      floating: true,
      position: 'right',
      offsetX: -30,
      offsetY: 50
    },
  };
  
  var chart_thirtytwo = new ApexCharts(document.querySelector("#chart-32"), options);
  chart_thirtytwo.render();
  
  
  // Chart 33
  var options = {
    series: [
      {
        name: "Yesterday",
        data: [30, 0, 70, 30, 50, 20, 60, 5]
      },
      {
        name: "Today",
        data: [25, 20, 30, 10, 50, 70, 5, 25]
      }
    ],
    chart: {
      height: 350,
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
      categories: ['14.10', '14.20', '14.30', '14.40', '14.50', '14.60', '15.00', '15.10', '15.20', '15.30'],
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
  
  var chart_thirtythree = new ApexCharts(document.querySelector("#chart-33"), options);
  chart_thirtythree.render();