<template>
  <div>
    <section>
      <card-component title="Çalışanlar için hesap oluştur ..." icon="ballot">
        <form @submit.prevent="createUser">
          <div class="columns">
            <div class="column">
              <b-field label="İsim" horizontal>
                <b-input v-model="form.name" required />
              </b-field>
              <b-field label="Soyisim" horizontal>
                <b-input v-model="form.surname" required />
              </b-field>
              <b-field label="E-posta" horizontal>
                <b-input v-model="form.email" type="email" required />
              </b-field>
              <b-field label="Şifre" horizontal>
                <b-input v-model="form.password" type="password" required />
              </b-field>
              <b-field label="Şifre Tekrar" horizontal>
                <b-input v-model="confirmpassword" type="password" required />
              </b-field>
              <b-field label="Rol" horizontal>
                <b-select
                  v-model="form.roleID"
                  placeholder="Müşteriyi seç"
                  required
                >
                  <option
                    v-for="(role, index) in roles"
                    :key="index"
                    :value="role._id"
                  >
                    {{ role.type }}
                  </option>
                </b-select>
              </b-field>
            </div>
            <div class="column"></div>
          </div>
          <hr />
          <b-field>
            <b-field grouped>
              <div class="control">
                <b-button native-type="submit" type="is-primary"
                  >Hesap Oluştur</b-button
                >
              </div>
            </b-field>
          </b-field>
        </form>
      </card-component>
    </section>
  </div>
</template>

<script>
import CardComponent from '~/components/CardComponent.vue'
export default {
  components: { CardComponent },
  layout: 'default',
  //   created() {
  //     if (this.$auth.loggedIn) {
  //       this.$router.push('/')
  //     }
  //   },
  data() {
    return {
      form: {
        name: '',
        surname: '',
        email: '',
        password: '',
        roleID: '',
        companyID: '',
      },
      roles: [],
      confirmpassword: '',
    }
  },
  async fetch() {
    try {
      let roles = await this.$services.role.get()

      if (roles) this.roles = roles.data
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async createUser() {
      if (this.$auth.user.roleID._id != '61223239eeadc037000374b8') {
        this.$buefy.snackbar.open({
          message: 'Sadece yöneticiler bu işlemi yapabilir !',
          queue: false,
          type: 'is-danger',
        })
      } else {
        if (this.form.password == this.confirmpassword) {
          this.form.companyID = this.$auth.user.companyID._id
          try {
            let create = await this.$axios.post('/auth/register', this.form)

            if (create) {
              this.$buefy.snackbar.open({
                message: 'Hesap başarıyla oluşturuldu',
                queue: false,
                type: 'is-success',
              })
            }
          } catch (error) {
            this.$buefy.snackbar.open({
              message: error.response.data.error || 'Bir hata meydana geldi',
              queue: false,
              type: 'is-danger',
            })
            console.log(error)
          }
        } else {
          this.$buefy.snackbar.open({
            message: 'Şifreler eşleşmiyor !',
            queue: false,
            type: 'is-danger',
          })
        }
      }
    },
  },
}
</script>
