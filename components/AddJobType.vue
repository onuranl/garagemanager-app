<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card" style="width: auto;">
      <header class="modal-card-head">
        <p class="modal-card-title">İş Bölümü Ekle</p>
        <button type="button" class="delete" @click="close" />
      </header>
      <section class="modal-card-body py-3">
        <card-component>
          <form @submit.prevent="addJobType">
            <div class="columns is-variable">
              <div class="column">
                <b-field style="margin-bottom: 10px;" label="İsim" horizontal>
                  <b-input v-model="form.name" required />
                </b-field>
                <b-field style="margin-bottom: 10px;" label="Süre" horizontal>
                  <b-input v-model="form.time" required />
                </b-field>
                <b-field label="Açıklama">
                  <b-input
                    v-model="form.description"
                    type="textarea"
                    maxlength="255"
                  />
                </b-field>
              </div>
              <div class="column">
                <b-field style="margin-bottom: 10px;" label="Ücret" horizontal>
                  <b-input type="number" v-model="form.price" required />
                </b-field>
                <b-field label="Not">
                  <b-input
                    v-model="form.note"
                    type="textarea"
                    maxlength="255"
                  />
                </b-field>
              </div>
            </div>
            <footer class="modal-card-foot">
              <b-button
                label="Ekle"
                native-type="submit"
                :disabled="disable"
                type="is-primary"
              />
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
        time: '',
        description: '',
        price: '',
        note: '',
      },
      disable: false,
    }
  },
  methods: {
    close() {
      this.$emit('isntActive')
    },
    async addJobType() {
      this.disable = true
      try {
        let jobtype = await this.$services.jobtypes.create(this.form)

        if (jobtype) {
          this.$buefy.snackbar.open({
            message: 'İş bölümü başarıyla eklendi',
            queue: false,
            type: 'is-success',
          })
          this.$emit('refreshJobTypes')
          this.$emit('isntActive')
          this.disable = false
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
