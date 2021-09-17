<template>
  <div>
    <section>
      <card-component title="Servis Detaylarını Güncelle..." icon="ballot">
        <form @submit.prevent="updateJob">
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
                    {{ vehicle.brand }} - {{ vehicle.model }}
                  </option>
                </b-select>
                <b-button @click="isActive2 = true">
                  Araç Ekle
                </b-button>
                <add-vehicle
                  :customerID="data.customerID"
                  v-if="isActive2"
                  @isntActive="isActive2 = false"
                  @getVehicles="getVehicles"
                />
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
              <b-field label="Servis Dosyası" horizontal>
                <img
                  style="width: 100px; height: 100px;"
                  :src="`${data.photo}`"
                />
                <a :href="`${data.photo}`" download="download">PDF</a>
              </b-field>
            </div>
          </div>
          <hr />
          <b-table :data="data.products">
            <template slot-scope="props">
              <b-table-column label="Hizmet / Ürün">
                <b-autocomplete
                  v-model="data.products[props.index].name"
                  :placeholder="data.products[props.index].name"
                  :data="filteredDataArray"
                  field="name"
                  @select="
                    (option) =>
                      (data.products[props.index].productID = option._id)
                  "
                >
                  <template #empty>No results for {{ name }}</template>
                </b-autocomplete>
              </b-table-column>
              <b-table-column label="Miktar">
                <b-input v-model="data.products[props.index].quantity" />
              </b-table-column>
              <b-table-column label="Birim Fiyat" class="is-flex">
                <p class="control">
                  <span class="select">
                    <select v-model="currency">
                      <option>₺</option>
                      <option>$</option>
                      <option>£</option>
                      <option>€</option>
                    </select>
                  </span>
                </p>
                <b-input v-model="data.products[props.index].price" />
              </b-table-column>
              <b-table-column label="Vergi / KDV">
                <b-select v-model="data.products[props.index].kdv">
                  <option
                    v-for="value in kdvOptions"
                    :key="value"
                    :value="value"
                  >
                    % {{ value }}
                  </option>
                </b-select>
              </b-table-column>
              <b-table-column label="Toplam" class="is-flex">
                <p class="control">
                  <span class="select">
                    <select v-model="currency">
                      <option>₺</option>
                      <option>$</option>
                      <option>£</option>
                      <option>€</option>
                    </select>
                  </span>
                </p>
                <b-input
                  disabled
                  :value="
                    data.products[props.index].quantity *
                      data.products[props.index].price +
                    data.products[props.index].quantity *
                      data.products[props.index].price *
                      (data.products[props.index].kdv / 100)
                  "
                />
              </b-table-column>
              <b-table-column custom-key="actions" class="is-actions-cell">
                <div class="buttons is-right">
                  <button
                    class="button is-small is-danger"
                    style="margin-top: 5px;"
                    type="button"
                    @click="remove(props.index)"
                  >
                    <b-icon icon="trash-can" size="is-small" />
                  </button>
                </div>
              </b-table-column>
            </template>
          </b-table>
          <hr />
          <b-button
            @click="
              data.products.push({
                name: '',
                productID: '',
                quantity: 0.0,
                price: 0.0,
                kdv: 18,
                total: 0.0,
              })
            "
            label="Yeni Satır Ekle"
          >
          </b-button>
          <div style="float: right; margin-right: 30px;">
            <b-button @click="updateJob">Güncelle</b-button>
          </div>
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
      name: '',
      kdvOptions: [0, 8, 18],
      currency: '₺',
      products: [],
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
      let service = await this.$services.job.getByID(this.$route.params.id)

      this.data = service.data
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

      let products = await this.$services.product.getAll(
        this.$auth.user.companyID._id
      )

      if (customers) {
        this.customers = customers.data
      }
      if (jobtypes) {
        this.jobtypes = jobtypes.data
      }

      if (products) {
        this.products = products.data
      }

      console.log(this.$route.params.id)
    } catch (error) {
      console.log(error)
    }
  },
  computed: {
    filteredDataArray() {
      return this.products.filter((option) => {
        return (
          option.name
            .toString()
            .toLowerCase()
            .indexOf(this.name.toLowerCase()) >= 0
        )
      })
    },
    // photo() {
    //   let result = this.data.photo.toString()
    //   if (result.slice(-3) == 'pdf') {
    //     return false
    //   } else {
    //     return true
    //   }
    // },
  },
  methods: {
    async updateJob() {
      this.data.products.forEach((element) => {
        element.total =
          element.quantity * element.price +
          element.quantity * element.price * (element.kdv / 100)
      })
      try {
        let update = await this.$services.job.update(
          this.$route.params.id,
          this.data
        )

        if (update) {
          this.$buefy.snackbar.open({
            message: 'Servis başarıyla güncellendi',
            queue: false,
            type: 'is-success',
          })
          this.$emit('refreshJobs')
          this.$router.push('/service')
        }
      } catch (error) {
        this.$buefy.snackbar.open({
          message: error.response.data.error,
          queue: false,
          type: 'is-danger',
        })
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
    async getVehicles(customerID) {
      try {
        let vehicles = await this.$services.vehicle.get(customerID)
        this.vehicles = vehicles.data
        console.log('emit denemes.')
      } catch (error) {
        console.log(error)
      }
    },
    remove(index) {
      this.data.products.splice(index, 1)
    },
  },
}
</script>

<style></style>
