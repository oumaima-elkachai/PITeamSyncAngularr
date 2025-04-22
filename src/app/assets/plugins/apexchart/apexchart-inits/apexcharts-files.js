// Chart 31
var options = {
  chart: {
    type: 'donut',
    width: 300
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

var chart_thirtyone = new ApexCharts(document.querySelector("#chart-31"), options);
chart_thirtyone.render();