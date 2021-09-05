<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Tedarikçi Ekle</p>
        <button type="button" class="delete" @click="close" />
      </header>
      <section class="modal-card-body">
        <card-component>
          <form @submit.prevent="addSupplier">
            <div class="columns is-variable">
              <div class="column">
                <b-field style="margin-bottom: 10px;" label="İsim" horizontal>
                  <b-input v-model="form.name" name="name" required />
                </b-field>
                <b-field label="Açıklama" message="Maksimum 2000 karakter">
                  <b-input
                    v-model="form.description"
                    type="textarea"
                    placeholder="Explain how we can help you"
                    maxlength="255"
                  />
                </b-field>
              </div>
              <div class="column">
                <b-field style="margin-bottom: 10px;" label="Tel No" horizontal>
                  <b-input type="number" v-model="form.phone" name="name" />
                </b-field>
                <b-field
                  style="margin-bottom: 10px;"
                  label="Yetkili Kişi"
                  horizontal
                >
                  <b-input v-model="form.manager" name="name" />
                </b-field>
              </div>
            </div>
            <footer class="modal-card-foot">
              <b-button label="Ekle" native-type="submit" type="is-primary" />
            </footer>
          </form>
        </card-component>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        description: '',
        phone: '',
        manager: '',
        companyID: '',
      },
    }
  },
  methods: {
    close() {
      this.$emit('isntActive')
    },
    async addSupplier() {
      this.form.companyID = this.$auth.user.companyID._id
      try {
        let supplier = await this.$services.supplier.create(this.form)

        if (supplier) {
          this.$buefy.snackbar.open({
            message: 'Tedarikçi başarıyla eklendi',
            queue: false,
            type: 'is-success',
          })
          this.$emit('refreshSupplier')
          this.$emit('isntActive')
        }
      } catch (error) {
        this.$buefy.snackbar.open({
          message: 'Bir hata meydana geldi !',
          queue: false,
          type: 'is-danger',
        })
        console.log(error)
      }
    },
  },
}
</script>

<style></style>
