<template>
  <div>
    <section>
      <card-component title="Randevu Detaylarını Güncelle..." icon="ballot">
        <form @submit.prevent="updateDate">
          <div class="columns">
            <div class="column">
              <b-field label="Müşteri İsmi" horizontal>
                <b-select
                  v-model="data.customerID"
                  placeholder="Müşteriyi seç"
                  required
                >
                  <option
                    v-for="(customer, index) in customers"
                    :key="index"
                    :value="customer._id"
                  >
                    {{ customer.name }} {{ customer.surname }}
                  </option>
                </b-select>
                <b-button @click="isActive = true">
                  Müşteri Ekle
                </b-button>
                <add-customer
                  v-if="isActive"
                  @isntActive="isActive = false"
                  @refreshCustomer="getCustomer"
                />
              </b-field>
              <b-field label="Araç İsmi" horizontal>
                <b-select
                  v-model="data.vehicleID"
                  placeholder="Müşterinin aracını seç"
                  required
                >
                  <option
                    v-for="(vehicle, index) in vehicles"
                    :key="index"
                    :value="vehicle._id"
                  >
                    {{ vehicle.brand }}
                  </option>
                </b-select>
                <b-button @click="isActive2 = true">
                  Araç Ekle
                </b-button>
                <add-vehicle v-if="isActive2" @isntActive="isActive2 = false" />
              </b-field>
              <b-field
                label="Açıklama"
                message="Maksimum 2000 karakter"
                horizontal
              >
                <b-input
                  v-model="data.description"
                  type="textarea"
                  placeholder="Explain how we can help you"
                  maxlength="255"
                  required
                />
              </b-field>
            </div>
            <div class="column">
              <b-field label="İş Bölümü" horizontal>
                <b-select
                  v-model="data.jobTypeID"
                  placeholder="Select a department"
                  required
                >
                  <option
                    v-for="(jobtype, index) in jobtypes"
                    :key="index"
                    :value="jobtype._id"
                  >
                    {{ jobtype.name }}
                  </option>
                </b-select>
                <b-button @click="isActive3 = true">
                  İş Bölümü Ekle
                </b-button>
                <add-job-type
                  v-if="isActive3"
                  @isntActive="isActive3 = false"
                  @refreshJobTypes="getJobTypes"
                />
              </b-field>
              <b-field label="Tarih" style="width: 55%;">
                <b-datepicker
                  :first-day-of-week="1"
                  placeholder="Click to select..."
                />
              </b-field>
              <!-- <b-field horizontal>
                <file-picker v-model="form.file" />
              </b-field> -->
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
</template>

<script>
import mapValues from 'lodash/mapValues'
import TitleBar from '@/components/TitleBar'
import CardComponent from '@/components/CardComponent'
import CheckboxPicker from '@/components/CheckboxPicker'
import RadioPicker from '@/components/RadioPicker'
import FilePicker from '@/components/FilePicker'
import HeroBar from '@/components/HeroBar'
import AddCustomer from '@/components/AddCustomer.vue'
import AddVehicle from '@/components/AddVehicle.vue'
import AddJobType from '@/components/AddJobType.vue'

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
      customers: [],
      vehicles: [],
      jobtypes: [],
      isLoading: false,
      isActive: false,
      isActive2: false,
      isActive3: false,
      data: [],
    }
  },
  watch: {
    'data.customerID': async function (val) {
      try {
        let vehicles = await this.$services.vehicle.get(val)
        this.vehicles = vehicles.data
      } catch (error) {
        console.log(error)
      }
    },
  },
  async fetch() {
    try {
      let dates = await this.$services.date.getByID(this.$route.params.id)

      this.data = dates.data
    } catch (error) {
      console.log(error)
    }
  },
  async created() {
    try {
      let customers = await this.$services.customer.getCustomer(
        this.$auth.user.companyID._id
      )
      let jobtypes = await this.$services.jobtypes.get()

      if (customers) {
        this.customers = customers.data
      }
      if (jobtypes) {
        this.jobtypes = jobtypes.data
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async updateDate() {
      try {
        let update = await this.$services.date.update(
          this.$route.params.id,
          this.data
        )

        if (update) {
          this.$buefy.snackbar.open({
            message: 'Randevu başarıyla güncellendi',
            queue: false,
            type: 'is-success',
          })
          this.$router.push('/date')
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
    async getCustomer() {
      try {
        let customers = await this.$services.customer.getCustomer(
          this.$auth.user.companyID._id
        )

        if (customers) {
          this.customers = customers.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getJobTypes() {
      try {
        let jobtypes = await this.$services.jobtypes.get()

        if (jobtypes) {
          this.jobtypes = jobtypes.data
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style></style>
