<template>
  <div>
    <b-table
      :checked-rows.sync="checkedRows"
      :checkable="checkable"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      :data="clients"
    >
      <template slot-scope="props">
        <b-table-column label="ID" field="_id" sortable>
          {{ props.row._id }}
        </b-table-column>
        <b-table-column label="Müşteri İsmi" field="customerID.name" sortable>
          {{ props.row.customerID.name }}
        </b-table-column>
        <b-table-column
          label="Müşteri Soyismi"
          field="customerID.surname"
          sortable
        >
          {{ props.row.customerID.surname }}
        </b-table-column>
        <b-table-column label="Ürün Adeti" field="products" sortable>
          {{ props.row.products.length }}
        </b-table-column>
        <b-table-column label="Tarih" field="date" sortable>
          {{ props.row.date }}
        </b-table-column>
        <b-table-column label="Toplam Fiyat" field="totalPrice" sortable>
          {{ props.row.totalPrice.toFixed(2) }}
        </b-table-column>
        <b-table-column custom-key="actions" class="is-actions-cell">
          <div class="buttons is-right">
            <button
              :disabled="props.row.status == true"
              class="button is-small is-info"
              type="button"
              @click="
                confirmCollect(
                  props.row._id,
                  props.row.customerID.name,
                  props.row.customerID.surname
                )
              "
            >
              <b-icon icon="shield-check" size="is-small" />
            </button>
            <nuxt-link
              :disabled="props.row.status == true"
              :to="`/sell/${props.row._id}`"
              class="button is-small is-primary"
            >
              <b-icon icon="account-edit" size="is-small" />
            </nuxt-link>
            <button
              :disabled="props.row.status == true"
              @click="
                confirmDelete(
                  props.row._id,
                  props.row.customerID.name,
                  props.row.customerID.surname
                )
              "
              class="button is-small is-danger"
              type="button"
            >
              <b-icon icon="trash-can" size="is-small" />
            </button>
          </div>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
import EditSell from './EditSell.vue'
export default {
  components: { EditSell },
  props: {
    clients: [],
  },
  data() {
    return {
      isModalActive: false,
      trashObject: null,
      // clients: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: [],
      products: [],
      customers: [],
    }
  },
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
    getSells() {
      this.$emit('refreshSells')
    },
    confirmDelete(id, name, surname) {
      this.$buefy.dialog.confirm({
        title: 'Satış Faturasını kaldır',
        message: `'<b>${name}${surname}</b>'nin '<b>${id}</b>' numaralı faturasını silmek istediğinden emin misin ?`,
        confirmText: 'Sil',
        cancelText: 'İptal Et',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.remove(id),
      })
    },
    confirmCollect(id, name, surname) {
      this.$buefy.dialog.confirm({
        title: 'Satış Faturasını tahsil et',
        message: `'<b>${name}${surname}</b>'nin '<b>${id}</b>'  numaralı faturasını tahsil etmek istediğinden emin misin ?`,
        confirmText: 'Tahsil et',
        cancelText: 'İptal Et',
        type: 'is-success',
        hasIcon: true,
        onConfirm: () => this.collect(id),
      })
    },
    async remove(id) {
      try {
        let remove = await this.$services.sell.remove(id)

        if (remove) {
          this.$buefy.toast.open('Satış Faturası Kaldırıldı !')
          this.getSells()
        }
      } catch (error) {
        this.$buefy.toast.open('Bir hata meydana geldi !')
        console.log(error)
      }
    },
    async collect(id) {
      try {
        let collect = await this.$services.sell.collect(id)

        if (collect.status) {
          this.$buefy.toast.open('Fatura tahsil edildi !')
          this.getSells()
        }
      } catch (error) {
        this.$buefy.toast.open('Bir hata meydana geldi !')
        console.log(error)
      }
    },
  },
}
</script>
