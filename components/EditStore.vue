<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card" style="width: auto;">
      <header class="modal-card-head">
        <p class="modal-card-title">Depoyu Güncelle</p>
        <button type="button" class="delete" @click="close" />
      </header>
      <section class="modal-card-body py-3" style="overflow-x: hidden;">
        <card-component icon="ballot">
          <form @submit.prevent="editStore">
            <div class="columns">
              <div class="column">
                <b-field label="Depo İsmi" horizontal>
                  <b-input v-model="form.name" maxlength="255" required />
                </b-field>
                <b-field label="Depo Adresi" horizontal>
                  <b-input
                    v-model="form.address"
                    type="textarea"
                    maxlength="255"
                    required
                  />
                </b-field>
              </div>
              <div class="column">
                <b-field label="Açıklama" horizontal>
                  <b-input
                    v-model="form.description"
                    type="textarea"
                    maxlength="255"
                    required
                  />
                </b-field>
              </div>
            </div>
            <hr />
            <b-field>
              <b-field grouped>
                <div class="control">
                  <b-button native-type="submit" type="is-primary"
                    >Güncelle</b-button
                  >
                </div>
              </b-field>
            </b-field>
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
        address: '',
        description: '',
        companyID: '',
      },
    }
  },
  props: {
    info: {
      type: Array,
    },
  },
  created() {
    const { name, address, description, companyID } = this.info

    const payload = {
      name,
      address,
      description,
      companyID,
    }

    this.form = payload
  },
  methods: {
    close() {
      this.$emit('isntActive')
    },
    async editStore() {
      try {
        let edit = await this.$services.store.update(this.info._id, this.form)
        if (edit) {
          this.$buefy.snackbar.open({
            message: 'Depo bilgileri değiştirildi !',
            queue: false,
            type: 'is-success',
          })
        }
        this.$emit('refreshStore')
        this.$emit('isntActive')
      } catch (error) {
        this.$buefy.snackbar.open({
          message: 'Bir hata meydana geldi !',
          queue: false,
          type: 'is-danger',
        })
      }
    },
  },
}
</script>

<style></style>
