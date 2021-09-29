<template>
  <div>
    <section>
      <card-component title="Alış Faturasını Düzenle" icon="ballot">
        <form>
          <div class="columns">
            <div class="column">
              <b-field label="Tedarikçi İsmi" horizontal>
                <b-select
                  v-model="data.supplierID"
                  placeholder="Müşteriyi seç"
                  required
                >
                  <option
                    v-for="(supplier, index) in suppliers"
                    :key="index"
                    :value="supplier._id"
                  >
                    {{ supplier.name }} {{ supplier.surname }}
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
                <input type="date" v-model="data.date" />
              </b-field>
            </div>
          </div>
          <hr />
          <b-table :data="data.products">
            <template slot-scope="props">
              <b-table-column label="Hizmet / Ürün">
                <b-autocomplete
                  v-model="data.products[props.index].name"
                  :data="filteredData || products"
                  field="name"
                  @typing="filteredDataArray(props.index)"
                  @select="
                    (option) => {
                      data.products[props.index].productID =
                        option != null ? option._id : ''
                      data.products[props.index].price =
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
                  v-model="data.products[props.index].quantity"
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
                <b-input
                  type="number"
                  v-model="data.products[props.index].price"
                />
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
            <b-button @click="update">Güncelle</b-button>
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
import AddSupplier from '@/components/AddSupplier.vue'

export default {
  components: {
    HeroBar,
    FilePicker,
    RadioPicker,
    CheckboxPicker,
    CardComponent,
    TitleBar,
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
      kdvOptions: [0, 8, 18],
      currency: '₺',
      products: [],
      suppliers: [],
      isActive: false,
      data: [],
      filteredData: null,
    }
  },
  async fetch() {
    try {
      let purchases = await this.$services.purchase.getByID(
        this.$route.params.id
      )

      this.data = purchases.data
    } catch (error) {
      console.log(error)
    }
  },
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
    async update() {
      this.data.products.forEach((element) => {
        element.total =
          element.quantity * element.price +
          element.quantity * element.price * (element.kdv / 100)
      })
      try {
        let sell = await this.$services.purchase.update(
          this.$route.params.id,
          this.data
        )

        if (sell) {
          this.$buefy.snackbar.open({
            message: 'Alış Faturası başarıyla güncellendi',
            queue: false,
            type: 'is-success',
          })
          this.$emit('refreshPurchases')
          this.$router.push('/purchase')
        }
      } catch (error) {
        this.$buefy.snackbar.open({
          message: error.response.data.error,
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
    remove(index) {
      this.data.products.splice(index, 1)
    },
    filteredDataArray(index) {
      let name = this.data.products[index].name
      this.filteredData = this.products.filter((option) => {
        return (
          option.name.toString().toLowerCase().indexOf(name.toLowerCase()) >= 0
        )
      })
    },
  },
}
</script>
