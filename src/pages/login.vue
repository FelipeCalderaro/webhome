<template>
  <q-page padding>
    <!-- content -->
    <div class="flex flex-center">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-input
          filled
          type="text"
          v-model="login"
          label="Seu login"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
          filled
          type="password"
          v-model="password"
          label="Sua senha"
          lazy-rules
          :rules="[
          val => val !== null && val !== '' || 'Please type your age',
        ]"
        />

        <div>
          <q-btn
            label="Submit"
            type="submit"
            color="primary"
          />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>

      <q-ajax-bar
        ref="bar"
        position="bottom"
        color="primary"
        size="8px"
        skip-hijack
      />

    </div>
  </q-page>
</template>

<script>
import Axios from 'axios'
export default {
  // name: 'PageName',
  data () {
    return {
      login: null,
      password: null
    }
  },

  methods: {

    cripto () {
      console.log(this.password)
    },
    onSubmit (event) {
      const bar = this.$refs.bar
      // bottom ajax loading
      bar.start()

      Axios({
        method: 'post',
        url: 'https://felipecalderaroapis.herokuapp.com/room/login',
        data: {
          login: this.login,
          pwd: this.password
        },
        headers: {
          'Content-Type': 'Application/json'
        }
      }).then((response) => {
        this.$refs.bar.stop()
        if (response.status === 200) {
          if (response.data.status === 202) { this.$router.push({ name: 'lg-home' }) } else {
            console.log('não foi autorizado, login ou senha incorretos')
          }
        } else {
          event.target.reset()
        }
      })
      // .catch((err) => {
      //   this.$refs.bar.stop()
      //   event.target.reset()
      //   console.log(err)
      // })
    },

    onReset () {
      this.name = null
      this.age = null
      this.accept = false
    }
  }
}
</script>
