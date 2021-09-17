<template>
  <div>
    <section>
      <card-component title="Servis Detaylarını Ekle..." icon="ballot">
        <form @submit.prevent="addJob">
          <div class="columns">
            <div class="column">
              <b-field label="Müşteri İsmi" horizontal>
                <b-select
                  v-model="form.customerID"
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
                  v-model="form.vehicleID"
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
                <b-button
                  :disabled="!form.customerID"
                  @click="isActive2 = true"
                >
                  Araç Ekle
                </b-button>
                <add-vehicle
                  :customerID="form.customerID"
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
                  v-model="form.description"
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
                  v-model="form.jobTypeID"
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
                  v-model="form.date"
                  :first-day-of-week="1"
                  placeholder="Click to select..."
                />
              </b-field>
              <b-field horizontal>
                <input
                  type="file"
                  id="file"
                  ref="file"
                  v-on:change="handleFileUpload()"
                />
              </b-field>
            </div>
          </div>
          <hr />
          <b-table :data="columns">
            <template slot-scope="props">
              <b-table-column label="Hizmet / Ürün">
                <b-autocomplete
                  v-model="columns[props.index].name"
                  :data="filteredDataArray"
                  placeholder="fruit"
                  field="name"
                  @select="
                    (option) => (columns[props.index].productID = option._id)
                  "
                >
                  <template #empty>No results for {{ name }}</template>
                </b-autocomplete>
              </b-table-column>
              <b-table-column label="Miktar">
                <b-input v-model="columns[props.index].quantity" />
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
                <b-input v-model="columns[props.index].price" />
              </b-table-column>
              <b-table-column label="Vergi / KDV">
                <b-select v-model="columns[props.index].kdv">
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
                    columns[props.index].quantity * columns[props.index].price +
                    columns[props.index].quantity *
                      columns[props.index].price *
                      (columns[props.index].kdv / 100)
                  "
                />
              </b-table-column>
              <b-table-column custom-key="actions" class="is-actions-cell">
                <div class="buttons is-right">
                  <button
                    class="button is-small is-danger"
                    style="margin-top: 5px;"
                    type="button"
                    @click="columns.splice(props.index, 1)"
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
              columns.push({
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
            <b-button @click="addJob">Kaydet</b-button>
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
      customers: [],
      vehicles: [],
      jobtypes: [],
      products: [],
      name: '',
      kdvOptions: [0, 8, 18],
      currency: '₺',
      isLoading: false,
      isActive: false,
      isActive2: false,
      isActive3: false,
      file: '',
      form: {
        customerID: '',
        jobTypeID: '',
        vehicleID: '',
        date: new Date(),
        description: '',
        companyID: '',
      },
      columns: [
        {
          name: '',
          productID: '',
          quantity: 0,
          price: 0,
          kdv: 18,
          total: 0,
        },
      ],
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
  },
  watch: {
    'form.customerID': async function (val) {
      try {
        let vehicles = await this.$services.vehicle.get(val)
        this.vehicles = vehicles.data
      } catch (error) {
        console.log(error)
      }
    },
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
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async addJob() {
      this.columns.forEach((element) => {
        element.total =
          element.quantity * element.price +
          element.quantity * element.price * (element.kdv / 100)
      })
      var form = {
        customerID: this.form.customerID,
        jobTypeID: this.form.jobTypeID,
        vehicleID: this.form.vehicleID,
        date: this.form.date,
        description: this.form.description,
        products: this.columns,
        photo: '',
        companyID: this.$auth.user.companyID._id,
      }
      try {
        let create = await this.$services.job.create(form)

        if (create) {
          this.$buefy.snackbar.open({
            message: 'Servis başarıyla eklendi',
            queue: false,
            type: 'is-success',
          })
          this.$emit('refreshJobs')
          if (this.file) {
            this.upload(create.data._id)
          }
        }
      } catch (error) {
        this.$buefy.snackbar.open({
          message: 'Bir hata meydana geldi !',
          queue: false,
          type: 'is-danger',
        })
      }
    },
    async upload(jobID) {
      let formData = new FormData()
      formData.append('file', this.file)
      this.$axios
        .put(`/job/upload/${jobID}`, formData)
        .then(function () {
          console.log('SUCCESS!!')
        })
        .catch(function () {
          console.log('FAILURE!!')
        })
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
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
    },
  },
}
</script>

<style></style>
