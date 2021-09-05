<template>
  <div>
    <section>
      <card-component title="Alış Faturası Detaylarını Ekle..." icon="ballot">
        <form>
          <div class="columns">
            <div class="column">
              <b-field label="Tedarikçi İsmi" horizontal>
                <b-select
                  v-model="supplierID"
                  placeholder="Müşteriyi seç"
                  required
                >
                  <option
                    v-for="(supplier, index) in suppliers"
                    :key="index"
                    :value="supplier._id"
                  >
                    {{ supplier.name }}
                  </option>
                </b-select>
                <b-button @click="isActive = true">
                  Tedarikçi Ekle
                </b-button>
                <add-supplier
                  v-if="isActive"
                  @isntActive="isActive = false"
                  @refreshSupplier="getSupplier"
                />
              </b-field>
            </div>
            <div class="column">
              <b-field label="Tarih" style="width: 55%;" horizontal>
                <b-datepicker
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
            <b-button @click="addPurchase">Kaydet</b-button>
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
      supplierID: '',
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
      kdvOptions: [0, 8, 18],
      currency: '₺',
      products: [],
      suppliers: [],
      isActive: false,
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

      let suppliers = await this.$services.supplier.get(
        this.$auth.user.companyID._id
      )

      if (products) {
        this.products = products.data
      }

      if (suppliers) {
        this.suppliers = suppliers.data
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async addPurchase() {
      this.columns.forEach((element) => {
        element.total =
          element.quantity * element.price +
          element.quantity * element.price * (element.kdv / 100)
      })
      var form = {
        supplierID: this.supplierID,
        invoiceNo: this.invoiceNo,
        date: this.date,
        address: this.address,
        products: this.columns,
        companyID: this.$auth.user.companyID._id,
      }
      try {
        let purchase = await this.$services.purchase.create(form)

        if (purchase) {
          this.$buefy.snackbar.open({
            message: 'Alış Faturası başarıyla eklendi',
            queue: false,
            type: 'is-success',
          })
          this.$emit('refreshPurchases')
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
    async getSupplier() {
      try {
        let suppliers = await this.$services.supplier.get(
          this.$auth.user.companyID._id
        )

        if (suppliers) {
          this.suppliers = suppliers.data
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
  head() {
    return {
      title: 'Forms — Admin One Nuxt.js',
    }
  },
}
</script>

<style></style>
