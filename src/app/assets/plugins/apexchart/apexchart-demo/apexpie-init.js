// Chart 1 
var options = {
    series: [44, 55, 13, 43, 22],
    chart: {
        width: 380,
        type: 'pie',
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
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
var simple_pie = new ApexCharts(document.querySelector("#simple-pie"), options);
simple_pie.render();


// Chart 2
var options = {
    series: [44, 55, 41, 17, 15],
    chart: {
        width: 380,
        type: 'donut',
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

var simple_donut = new ApexCharts(document.querySelector("#simple-donut"), options);
simple_donut.render();


// Chart 3
var options = {
    series: [44, 55, 41, 17, 15],
    chart: {
        width: 380,
        type: 'donut',
    },
    plotOptions: {
        pie: {
        startAngle: -90,
        endAngle: 270
        }
    },
    dataLabels: {
        enabled: false
    },
    fill: {
        type: 'gradient',
    },
    legend: {
        formatter: function(val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex]
        }
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

var gradient_donut = new ApexCharts(document.querySelector("#gradient-donut"), options);
gradient_donut.render();


// Chart 4
var options = {
    series: [44, 33, 54, 45],
    chart: {
    width: 380,
    type: 'pie',
  },
  colors: ['#93C3EE', '#E5C6A0', '#669DB5', '#94A74A'],
  fill: {
    type: 'image',
    opacity: 0.85,
    image: {
       src: ['assets/img/clients/1.jpg', 'assets/img/clients/2.jpg', 'assets/img/clients/3.jpg', 'assets/img/clients/4.jpg'],
      width: 25,
      imagedHeight: 25
    },
  },
  stroke: {
    width: 4
  },
  dataLabels: {
    enabled: true,
    style: {
      colors: ['#111']
    },
    background: {
      enabled: true,
      foreColor: '#fff',
      borderWidth: 0
    }
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

var image_pie = new ApexCharts(document.querySelector("#image-pie"), options);
image_pie.render();