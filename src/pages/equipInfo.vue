<template>
  <q-page class="bg-color-primary">
    <!-- content -->
    <q-btn
      class="bg-color-secondary fg-color-accent"
      icon="arrow_back"
      round
      style="top:16px; left:16px;"
      @input="back()"
    ></q-btn>
    <div class="row q-pt-md">
      <div class="column">

      </div>
      <!-- end column -->

      <div class="q-px-xs"></div>

      <div class="column items-center justify center q-pa-xs">
        <q-card class="custom-card-chart-stream q-pa-sm ">
          <q-card-section>
            <div class="col tx-color-w">
              <canvas
                class="q-pa-xs"
                id="stream-chart"
                :width="500"
                :height="300"
              ></canvas>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <!-- end column -->

    </div>
    <!-- end row -->
  </q-page>
</template>

<script>
import Chart from 'chart.js'

export default {
  // name: 'PageName',
  data () {
    return {

    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    stream () {
      console.log('entrou na função teste')
      const streamChart = {
        type: 'line',
        data: {
          labels: ['beginning'],
          datasets: [{
            label: 'Random Dataset',
            backgroundColor: 'rgba(249, 185, 44, 1)',
            borderColor: 'rgb(249, 62, 62)',
            data: [0],
            fill: false
          }]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Creating Real-Time Charts with Flask'
          },
          tooltips: {
            mode: 'index',
            intersect: false
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Time'
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Value'
              }
            }]
          }

        }
      }

      const ctx = document.getElementById('stream-chart')
      let numberOfCalls = 0
      const source = new EventSource('http://10.0.0.100:34939/chart-data')
      source.onmessage = function (event) {
        const data = JSON.parse(event.data)
        if (numberOfCalls >= 9) {
          streamChart.data.labels.shift()
          streamChart.data.datasets[0].data.shift()
        }
        streamChart.data.labels.push(data.time)
        streamChart.data.datasets[0].data.push(data.value)
        if (chart !== null) {
          chart.update()
        }
        numberOfCalls++
      }
      const chart = new Chart(ctx, streamChart)
      if (chart !== null) {
        console.log('Stream chart created')
      }
    }
  },
  mounted () {
    this.stream()
  }
}
</script>
