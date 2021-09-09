<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <form @submit.prevent="login" class="box">
              <div class="field">
                <label for="" class="label">E-posta</label>
                <div class="control">
                  <input
                    type="email"
                    placeholder="e.g. bobsmith@gmail.com"
                    class="input"
                    required
                    v-model="form.email"
                  />
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Şifre</label>
                <div class="control">
                  <input
                    type="password"
                    placeholder="*******"
                    class="input"
                    required
                    v-model="form.password"
                  />
                </div>
              </div>

              <div class="field">
                <button class="button is-success">
                  Giriş Yap
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'empty',
  //   created() {
  //     if (this.$auth.loggedIn) {
  //       this.$router.push('/')
  //     }
  //   },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async login() {
      try {
        let result = await this.$auth.loginWith('local', { data: this.form })
        console.log(result)
      } catch (error) {
        this.$buefy.snackbar.open({
          message: error.response.data.error,
          queue: false,
          type: 'is-danger',
        })
      }
    },
  },
}
</script>

<style></style>
