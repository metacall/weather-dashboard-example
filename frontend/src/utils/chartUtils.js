import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export class WeatherChart {
  constructor(canvas) {
    this.canvas = canvas
    this.chart = null
  }

  createChart(forecastData) {
    if (!this.canvas || !forecastData.length) return

    // Destroy existing chart if it exists
    if (this.chart) {
      this.chart.destroy()
    }

    // Extract data from forecastData
    const dates = forecastData.map(item => item.date)
    const dayTemperatures = forecastData.map(item => Number(item.max_temp))

    // Get 2D context from the canvas
    const ctx = this.canvas.getContext('2d')

    // Create gradient for the line
    const gradient = ctx.createLinearGradient(0, 0, 0, 400)
    gradient.addColorStop(0, 'rgba(64, 169, 255, 0.2)')
    gradient.addColorStop(1, 'rgba(64, 169, 255, 0)')

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Temperature',
            data: dayTemperatures,
            borderColor: '#40A9FF',
            backgroundColor: gradient,
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#40A9FF',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#40A9FF',
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#40A9FF',
            borderWidth: 1,
            padding: 10,
            displayColors: false,
            callbacks: {
              label: function(context) {
                return `Temperature: ${context.parsed.y}°C`
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false
            },
            ticks: {
              color: '#666',
              font: {
                size: 12,
                family: "'Inter', sans-serif"
              },
              callback: function (value) {
                const dateStr = this.getLabelForValue(value)
                const dateObj = new Date(dateStr)
                const day = dateObj.getDate()
                const month = dateObj.toLocaleString('en-US', { month: 'short' })
                return `${day} ${month}`
              }
            }
          },
          y: {
            beginAtZero: false,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
              drawBorder: false
            },
            ticks: {
              color: '#666',
              font: {
                size: 12,
                family: "'Inter', sans-serif"
              },
              callback: function (value) {
                return value + '°'
              },
              padding: 10
            },
            title: {
              display: true,
              text: 'Temperature (°C)',
              color: '#666',
              font: {
                size: 14,
                family: "'Inter', sans-serif",
                weight: '500'
              },
              padding: { top: 10, bottom: 10 }
            }
          }
        },
        elements: {
          line: {
            tension: 0.4
          },
          point: {
            radius: 4,
            hitRadius: 10,
            hoverRadius: 6
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart'
        }
      }
    })
  }

  destroy() {
    if (this.chart) {
      this.chart.destroy()
      this.chart = null
    }
  }
} 