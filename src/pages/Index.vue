<template>
  <q-page class="bg-color-primary">

    <div class="row justify-center">
      <q-img
        class="home-img"
        src="../assets/room.png"
      ></q-img>

      <div class="q-pa-xl"></div>

      <div class="column items-end">
        <div class="col q-pr-xl tx-container tx-color-w">
          <h4 class="tx-color-w"><strong> O que é ROAU? </strong></h4>
          <p>
            ROAU é um projeto de automação de um cômodo.
            Idealizado e realizado por Ana Carolina Galende e
            Felipe Calderaro.
          </p>
          <p>
            Tem como intuito aplicar os conhecimentos adquiridos
            ao decorrer do curso de engenharia de computação em um quarto
            afim de deixa-lo autonomo e controlado de forma simplificada à distância
          </p>
          <p>
            <strong>
              Com ele você pode:
            </strong>
          </p>
          <ol style="text-align: start">
            <li>Monitorar e regular o consumo dos equipamentos.</li>
            <li>Configurar temporizadores de execução.</li>
            <li>Determinar modos de operação.</li>
          </ol>
          <p>e mais</p>
        </div>

      </div>
      <!-- end column -->
    </div>
    <!-- end row -->
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {

    }
  }
}

</script>
