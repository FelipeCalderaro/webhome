<template>
  <q-page
    padding
    class="bg-color-primary tx-color-w"
  >

    <div class="row">

      <q-tabs
        v-model="tab"
        class="bg-color-primary"
        dense
        active-color="white"
        indicator-color="negative"
        align="justify"
        narrow-indicator
      >
        <q-tab
          name="overview"
          label="Overview"
        />
        <q-tab
          name="account"
          label="Account"
        />
        <q-tab
          name="services"
          label="Services"
        />
      </q-tabs>

    </div>

    <!-- end row -->
    <q-tab-panels
      v-model="tab"
      animated
    >
      <q-tab-panel
        name="overview"
        class="bg-color-primary"
      >
        <div class="column">
          <div class="row">
            <div class="column">
              <!-- Card 1 -->
              <q-card class="custom-card">
                <q-card-section>
                  <div class="column">
                    <div class="row q-pa-sm">
                      <q-avatar color="accent">
                        <q-img
                          src="../assets/electric-meter.png"
                          contain
                          style="max-width:35px"
                        ></q-img>
                      </q-avatar>
                      <div class="column self-end q-pa-xs q-pl-sm">
                        <p class="tx-medium"><strong>{{ (127 * (20 * Math.random())).toFixed(3) + ' W' }}</strong></p>
                        <p class="tx-small info-style-title font-timeless">
                          <strong> Consumo </strong>
                        </p>
                      </div>
                      <!-- end column -->
                    </div>
                    <!-- end row -->

                    <div class="row q-pa-sm">
                      <q-avatar color="negative">
                        <q-img
                          src="../assets/wire.png"
                          contain
                          style="max-width:35px"
                        ></q-img>
                      </q-avatar>
                      <div class="column self-end q-pa-xs q-pl-sm">
                        <p class="tx-medium"><strong>{{ (20 * Math.random()).toFixed(3) + ' A' }}</strong></p>
                        <p class="tx-small info-style-title font-timeless">
                          <strong> Corrente </strong>
                        </p>
                      </div>
                      <!-- end column -->
                    </div>
                    <!-- end row -->

                  </div>
                  <!-- end card column -->
                </q-card-section>
              </q-card>
              <!-- end Card 1 -->

              <div class="q-py-sm"></div>

              <!-- Card 2 -->
              <q-card class="custom-card">
                <q-card-section>
                  <div class="column q-pa-xs">
                    <p class="info-style-title font-timeless">Conta atual</p>
                    <p class="info-style-description">
                      <Strong>{{ 'R$ ' + (currentPayment === null ? 0: currentPayment * 1000).toFixed(2) }}</Strong>
                    </p>
                    <q-linear-progress
                      rounded
                      size="6px"
                      :value="currentPayment"
                      class="fg-color-accent bg-color-primary"
                    ></q-linear-progress>
                  </div>
                </q-card-section>
              </q-card>
              <!-- end Card 2 -->
            </div>
            <!-- end Column -->
            <div class="q-px-sm"></div>

            <q-card class="custom-card-chart q-pa-sm ">
              <q-card-section>
                <div class="col tx-color-w">
                  <canvas
                    class="q-pa-xs"
                    id="day-consume-chart"
                    :width="600"
                    :height="300"
                  ></canvas>
                </div>
              </q-card-section>
            </q-card>

          </div>
          <!-- end row -->

          <div class="q-py-sm"></div>

          <div class="row">
            <q-card class="custom-card-big">
              <q-card-section>
                <div class="column">
                  <p class="tx-small info-style-title font-timeless"><strong>Maior consumo</strong></p>
                  <div class="q-pa-sm"></div>
                  <div class="row">
                    <q-img
                      src="../assets/geladeira.png"
                      style="width:100px"
                    ></q-img>
                    <div class="column q-pa-sm">
                      <p class="tx-medium font-bebas">GELADEIRA 127 V</p>
                      <p class="tx-small font-coolvetica">Usando atualmente: {{ Math.random().toFixed(3) + ' A' }}</p>
                      <p class="tx-small font-coolvetica">Periodo ativo: {{ Math.random().toFixed(1) + ' m' }}</p>
                    </div>
                    <!-- end column -->
                    <div class="column">
                      <q-toggle
                        v-model="active"
                        @input="changeState()"
                        label="Ligado"
                        keep-color
                        color="negative"
                        checked-icon="power_settings_new"
                        unchecked-icon="power_off"
                      ></q-toggle>
                    </div>
                    <!-- end column -->
                  </div>
                  <!-- end row -->
                </div>
                <!-- end column -->
              </q-card-section>
            </q-card>
          </div>
          <!-- end row -->
        </div>
        <!-- end column -->
      </q-tab-panel>

      <q-tab-panel
        name="account"
        class="bg-color-primary tx-color-white"
      >
        <div class="text-h6">Alarms</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>

      <q-tab-panel
        name="services"
        class="bg-color-primary"
      >
        <div class="text-h6">Movies</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>

  </q-page>
</template>

<script>
import Axios from 'axios'
import Chart from 'chart.js'
export default {
  // name: 'PageName',
  data () {
    return {
      currentPayment: null,
      active: true,
      tab: 'overview',
      infos: null,
      dailyConsume: {
        type: 'scatter',
        data: {
          labels: 'Energia',
          datasets: []
        },
        options: {
          responsive: true,
          lineTension: 1,
          title: {
            display: true,
            text: 'Consumo do dia.'
          },
          scales: {
            xAxes: [{
              type: 'linear',
              position: 'bottom'
            }],
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
    changeState () {
      Axios({
        method: 'post',
        url: 'http://191.178.162.189:8080/room/changeState',
        data: {
          state: this.active
        }
      }).then((response) => {
        if (response.status !== 200) {
          this.active = !this.active
        }
        return true
      })
    },
    getInfo () {
      Axios.get('http://10.0.0.100:34939/room/info').then((response) => {
        this.infos = response.data.info

        this.dailyConsume.data.datasets = response.data.info.datasets
        this.currentPayment = response.data.info.payment.bill / 1000
        setTimeout(() => {
          this.createChart(this.dailyConsume)
        }, 500)
      })
    },
    createChart (chartData) {
      const ctx = document.getElementById('day-consume-chart')
      var chart = new Chart(ctx, { type: chartData.type, data: chartData.data, options: chartData.options })
      if (chart !== null) {
        console.log('Chart created')
      }
    }
  },
  mounted () {
    // http://191.178.162.189:8080/allow
    this.getInfo()
  }
}
</script>
