<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card" style="width: auto;">
      <header class="modal-card-head">
        <p class="modal-card-title">Depoyu Güncelle</p>
        <button type="button" class="delete" @click="close" />
      </header>
      <section class="modal-card-body py-3" style="overflow-x: hidden;">
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
                      {{ vehicle.brand }}
                    </option>
                  </b-select>
                  <b-button @click="isActive2 = true">
                    Araç Ekle
                  </b-button>
                  <add-vehicle
                    v-if="isActive2"
                    @isntActive="isActive2 = false"
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
                  <file-picker v-model="form.file" />
                </b-field>
              </div>
            </div>
            <hr />
            <b-field>
              <b-field grouped>
                <div class="control">
                  <b-button native-type="submit" type="is-primary"
                    >Ekle</b-button
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
      customers: [],
      vehicles: [],
      jobtypes: [],
      form: {
        customerID: '',
        jobTypeID: '',
        vehicleID: '',
        date: new Date(),
        description: '',
        file: [],
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
    const {
      customerID,
      vehicleID,
      photo,
      description,
      jobTypeID,
      companyID,
    } = this.info
    const payload = {
      customerID,
      vehicleID,
      photo,
      description,
      jobTypeID,
      companyID,
    }
    this.form = payload
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
  async fetch() {},
  methods: {
    async addJob() {
      this.form.companyID = this.$auth.user.companyID._id
      try {
        let create = await this.$services.job.create(this.form)

        if (create) {
          this.$buefy.snackbar.open({
            message: 'Servis başarıyla eklendi',
            queue: false,
            type: 'is-success',
          })
          this.$emit('refreshJobs')
        }
      } catch (error) {
        this.$buefy.snackbar.open({
          message: 'Bir hata meydana geldi !',
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
  },
}
</script>

<style></style>
