<template>
  <div>
    <section>
      <card-component title="Depo Detaylarını Ekle..." icon="ballot">
        <form @submit.prevent="addStore">
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
              <b-field label="Açıklama" horizontal>
                <b-input
                  v-model="form.description"
                  type="textarea"
                  maxlength="255"
                  required
                />
              </b-field>
            </div>
            <div class="column"></div>
          </div>
          <hr />
          <b-field>
            <b-field grouped>
              <div class="control">
                <b-button
                  native-type="submit"
                  :disabled="disable"
                  type="is-primary"
                  >Ekle</b-button
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
import mapValues from 'lodash/mapValues'
import TitleBar from '@/components/TitleBar'
import CardComponent from '@/components/CardComponent'
import CheckboxPicker from '@/components/CheckboxPicker'
import RadioPicker from '@/components/RadioPicker'
import FilePicker from '@/components/FilePicker'
import HeroBar from '@/components/HeroBar'
import AddCustomer from './AddCustomer.vue'
import AddVehicle from './AddVehicle.vue'
import AddJobType from './AddJobType.vue'

export default {
  name: 'Forms',
  components: {
    HeroBar,
    FilePicker,
    RadioPicker,
    CheckboxPicker,
    CardComponent,
    TitleBar,
    AddCustomer,
    AddVehicle,
    AddJobType,
  },
  data() {
    return {
      isLoading: false,
      form: {
        name: '',
        address: '',
        description: '',
        companyID: '',
      },
    }
  },
  methods: {
    async addStore() {
      this.form.companyID = this.$auth.user.companyID._id
      try {
        let create = await this.$services.store.create(this.form)

        if (create) {
          this.$buefy.snackbar.open({
            message: 'Depo başarıyla eklendi',
            queue: false,
            type: 'is-success',
          })
          this.$emit('refreshStores')
        }
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
