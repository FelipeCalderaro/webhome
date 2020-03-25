<template>
  <q-layout view="hHr lpr fff">

    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>

        </q-toolbar-title>
        <q-btn
          flat
          label="Home"
          :to="{name: 'lg-home'}"
        >
        </q-btn>

        <q-btn
          flat
          label="settings"
        >
        </q-btn>
        <div style="width: 200px"></div>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="right = !right"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="right"
      side="right"
      dark
      :width="400"
    >

      <div class="column q-pa-lg items-center">
        <h6 class="tx-color-w">
          Felipe Calderaro
        </h6>

        <div class="row">
          <div class="column items-center q-pr-sm">
            <p
              class="info-style-title font-bebas"
              style="line-height:0"
            >Gasto mês passado</p>
            <p
              class="info-style-description"
              style="line-height:0.2"
            ><strong>{{ Math.random().toFixed(3) +  ' W'}}</strong></p>
          </div>

          <div class="column items-center q-pr-sm">
            <p
              class="info-style-title font-bebas"
              style="line-height:0"
            >Gasto atual</p>
            <p
              class="info-style-description"
              style="line-height:0.2"
            ><strong>{{ Math.random().toFixed(3) +  ' W'}}</strong></p>
          </div>

          <div class="column items-center q-pr-sm">
            <p
              class="info-style-title font-bebas"
              style="line-height:0"
            >Economia atual</p>
            <p
              class="info-style-description"
              style="line-height:0.2"
            ><strong>{{ 'R$' + Math.random().toFixed(3)}}</strong></p>
          </div>

        </div>

        <canvas
          id="consume-history"
          :width="350"
          :height="300"
        ></canvas>

      </div>
      <!-- end column -->

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import Chart from 'chart.js'

export default {
  data () {
    return {
      right: true,
      consumeChart: {
        type: 'bar',
        data: {
          labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
          datasets: [
            {
              label: 'Consumo na semana',
              data: [
                1 * Math.random(),
                3 * Math.random(),
                7 * Math.random(),
                8 * Math.random(),
                1 * Math.random(),
                4 * Math.random(),
                5 * Math.random()
              ],
              backgroundColor: 'rgba(249, 185, 44, 1)'

            }
          ]
        },
        options: {
          responsive: true,
          lineTension: 1,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                padding: 25
              }
            }]
          }
        }
      }
    }
  },
  methods: {
    createChart (chartData) {
      const ctx = document.getElementById('consume-history')
      var chart = new Chart(ctx, { type: chartData.type, data: chartData.data, options: chartData.options })
      if (chart !== null) {
        console.log('Chart created')
      }
    },
    getCurrentWeek () {
      var d = new Date()
      var month = d.getMonth() + 1
      var day = d.getDate()
      var weekNumber = 1
      if (day < 7) {
        weekNumber = 1
      } else if (day > 7 && day < 14) {
        weekNumber = 2
      } else if (day > 14 && day < 21) {
        weekNumber = 3
      } else if (day > 21) {
        weekNumber = 4
      }
      return weekNumber + ' do mês ' + month
    }
  },
  mounted () {
    this.consumeChart.data.datasets[0].label = 'Consumo na semana ' + this.getCurrentWeek()
    this.createChart(this.consumeChart)
  }
}
</script>
