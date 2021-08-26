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
          <div class="columns is-variable">
            <div class="column">
              <b-field style="margin-bottom: 10px;" label="İsim" horizontal>
                <b-input v-model="form.name" />
              </b-field>
              <b-field style="margin-bottom: 10px;" label="Süre" horizontal>
                <b-input v-model="form.time" />
              </b-field>
              <b-field label="Açıklama" message="Maksimum 2000 karakter">
                <b-input
                  v-model="form.description"
                  type="textarea"
                  placeholder="Explain how we can help you"
                  maxlength="255"
                  required
                />
              </b-field>
            </div>
            <div class="column">
              <b-field style="margin-bottom: 10px;" label="Ücret" horizontal>
                <b-input v-model="form.price" />
              </b-field>

              <b-field label="Not" message="Maksimum 2000 karakter">
                <b-input
                  v-model="form.note"
                  type="textarea"
                  placeholder="Explain how we can help you"
                  maxlength="255"
                  required
                />
              </b-field>
            </div>
          </div>
        </card-component>
      </section>
      <footer class="modal-card-foot">
        <b-button @click="addJobType" label="Ekle" type="is-primary" />
      </footer>
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
    }
  },
  methods: {
    close() {
      this.$emit('isntActive')
    },
    async addJobType() {
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
