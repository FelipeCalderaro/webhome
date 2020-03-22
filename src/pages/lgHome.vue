<template>
  <q-page
    padding
    class="bg-color-primary tx-color-w"
  >
    <div class="column">
      <div class="row">
        <div class="column">
          <!-- Card 1 -->
          <q-card class="custom-card">
            <q-card-section>
              <div class="column">
                <div class="row q-pa-sm">
                  <q-avatar class="bg-color-tertiary">
                    <q-img src="../assets/energy.png"></q-img>
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
                  <q-avatar class="bg-color-tertiary">
                    <q-img src="../assets/instantaneo.png"></q-img>
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
                  <Strong>{{ 'R$ ' + (currentPayment * 1000).toFixed(2) }}</Strong>
                </p>
                <q-linear-progress
                  rounded
                  size="6px"
                  :value="currentPayment"
                  class="fg-color-tertiary bg-color-primary"
                ></q-linear-progress>
              </div>
            </q-card-section>
          </q-card>
          <!-- end Card 2 -->
        </div>
        <!-- end Column -->
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
                    color="accent"
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

  </q-page>
</template>

<script>
import Axios from 'axios'
export default {
  // name: 'PageName',
  data () {
    return {
      currentPayment: 1 * Math.random(),
      active: true
    }
  },
  methods: {
    changeState () {
      console.log('Send to back-end')
      Axios({
        method: 'post',
        url: 'http://felipecalderaroapis.herokuapp.com//room/changeState',
        data: {
          state: this.active
        }
      }).then((response) => {
        console.log('sended')
        if (response.status !== 200) {
          this.active = !this.active
        }
        console.log(response.data)
      })
    }
  },
  mounted () {
    // http://191.178.162.189:8080/allow
    Axios.get('http://191.178.162.189:8080/allow')
  }
}
</script>
