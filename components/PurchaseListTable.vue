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
        <b-table-column label="Tedarikçi İsmi" field="supplierID.name" sortable>
          {{ props.row.supplierID.name }}
        </b-table-column>
        <b-table-column label="Ürün Adeti" field="products" sortable>
          {{ props.row.products.length }}
        </b-table-column>
        <b-table-column label="Tarih" field="date" sortable>
          {{ props.row.date }}
        </b-table-column>
        <b-table-column label="Toplam Fiyat" field="totalPrice" sortable>
          {{ props.row.totalPrice }}
        </b-table-column>
        <b-table-column custom-key="actions" class="is-actions-cell">
          <div class="buttons is-right">
            <button
              :disabled="props.row.status == true"
              class="button is-small is-info"
              type="button"
              @click="confirmPay(props.row.supplierID.name, props.row._id)"
            >
              <b-icon icon="shield-check" size="is-small" />
            </button>
            <nuxt-link
              :disabled="props.row.status == true"
              :to="`/purchase/${props.row._id}`"
              class="button is-small is-primary"
            >
              <b-icon icon="account-edit" size="is-small" />
            </nuxt-link>
            <button
              :disabled="props.row.status == true"
              class="button is-small is-danger"
              type="button"
              @click="confirmDelete(props.row.supplierID.name, props.row._id)"
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
export default {
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
    }
  },
  methods: {
    confirmDelete(name, id) {
      this.$buefy.dialog.confirm({
        title: 'Deleting purchase',
        message: `'<b>${name}</b>' isimli tedarikçinin '<b>${id}</b>' numaralı alış faturasını silmek istediğinden emin misin ?`,
        confirmText: 'Delete Account',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.remove(id),
      })
    },
    confirmPay(name, id) {
      this.$buefy.dialog.confirm({
        title: 'Pay',
        message: `'<b>${name}</b>' isimli tedarikçinin '<b>${id}</b>' numaralı alış faturasını ödemek istediğinden emin misin ?`,
        confirmText: 'Ödeme yap',
        type: 'is-success',
        hasIcon: true,
        onConfirm: () => this.pay(id),
      })
    },
    async remove(id) {
      try {
        let remove = await this.$services.purchase.remove(id)

        if (remove) {
          this.$buefy.toast.open('Fatura Kaldırıldı !')
          this.$emit('refreshPurchases')
        }
      } catch (error) {
        this.$buefy.toast.open('Bir hata meydana geldi !')
        console.log(error)
      }
    },
    async pay(id) {
      try {
        let pay = await this.$services.purchase.pay(id)

        if (pay.status) {
          this.$buefy.toast.open('Fatura ödendi !')
          this.$emit('refreshPurchases')
        }
      } catch (error) {
        this.$buefy.toast.open('Bir hata meydana geldi !')
        console.log(error)
      }
    },
  },
}
</script>
