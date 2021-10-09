<template>
  <div>
    <section>
      <card-component title="Satış Faturası Detaylarını Ekle..." icon="ballot">
        <form>
          <div class="columns">
            <div class="column">
              <b-field label="Müşteri İsmi" horizontal>
                <b-select
                  v-model="customerID"
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
            </div>
            <div class="column">
              <b-field label="Tarih" style="width: 55%;" horizontal>
                <b-datepicker
                  v-model="date"
                  :first-day-of-week="1"
                  placeholder="Click to select..."
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
                  :data="filteredData || products"
                  field="name"
                  @typing="filteredDataArray(props.index)"
                  @select="
                    (option) => {
                      columns[props.index].productID =
                        option != null ? option._id : ''
                      columns[props.index].price =
                        option != null ? option.price : 0
                    }
                  "
                >
                  <template #empty>No results for {{ name }}</template>
                </b-autocomplete>
              </b-table-column>
              <b-table-column label="Miktar">
                <b-input
                  type="number"
                  v-model="columns[props.index].quantity"
                />
              </b-table-column>
              <b-table-column label="Birim Fiyat" class="is-flex">
                <p class="control">
                  <span class="select">
                    <select v-model="currency" disabled>
                      <option>₺</option>
                      <option>$</option>
                      <option>£</option>
                      <option>€</option>
                    </select>
                  </span>
                </p>
                <b-input type="number" v-model="columns[props.index].price" />
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
                    <select v-model="currency" disabled>
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
            <b-button :disabled="disable" @click="addSell">Kaydet</b-button>
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
import AddSupplier from './AddSupplier.vue'

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
    AddSupplier,
  },
  data() {
    return {
      name: '',
      selected: null,
      selectOutside: false,
      customerID: '',
      invoiceNo: '12321321',
      date: new Date(),
      address: 'asdasdasdsaa',
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
      disable: false,
      kdvOptions: [0, 8, 18],
      currency: '₺',
      products: [],
      customers: [],
      isActive: false,
      filteredData: null,
    }
  },
  computed: {
    getDate() {
      let date = this.date.toISOString()
      return date.slice(0, 10)
    },
  },
  // watch: {
  //   'form.customerID': async function (val) {
  //     try {
  //       let vehicles = await this.$services.vehicle.get(val)
  //       this.vehicles = vehicles.data
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   },
  // },
  async created() {
    try {
      let products = await this.$services.product.getAll(
        this.$auth.user.companyID._id
      )

      let customers = await this.$services.customer.getCustomer(
        this.$auth.user.companyID._id
      )

      if (products) {
        this.products = products.data
      }

      if (customers) {
        this.customers = customers.data
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async addSell() {
      this.disable = true
      this.columns.forEach((element) => {
        element.total =
          element.quantity * element.price +
          element.quantity * element.price * (element.kdv / 100)
      })
      var form = {
        customerID: this.customerID,
        invoiceNo: this.invoiceNo,
        date: this.getDate,
        address: this.address,
        products: this.columns,
        companyID: this.$auth.user.companyID._id,
      }
      try {
        let sell = await this.$services.sell.create(form)

        if (sell) {
          this.$buefy.snackbar.open({
            message: 'Satış Faturası başarıyla eklendi',
            queue: false,
            type: 'is-success',
          })
          this.$emit('refreshSells')
          this.disable = false
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
    filteredDataArray(index) {
      let name = this.columns[index].name
      this.filteredData = this.products.filter((option) => {
        return (
          option.name.toString().toLowerCase().indexOf(name.toLowerCase()) >= 0
        )
      })
    },
  },
}
</script>

<style></style>
