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
        <b-table-column label="Ürün İsmi" field="name" sortable>
          {{ props.row.name }}
        </b-table-column>
        <b-table-column label="Ürün Fiyatı" field="price" sortable>
          {{ props.row.price }}
        </b-table-column>
        <b-table-column label="Ürün Miktarı" field="quantity" sortable>
          {{ props.row.quantity }}
        </b-table-column>
        <b-table-column custom-key="actions" class="is-actions-cell">
          <div class="buttons is-right">
            <button @click="isActive = true" class="button is-small is-primary">
              <b-icon icon="account-edit" size="is-small" />
            </button>
            <edit-product
              :productID="props.row._id"
              v-if="isActive"
              @isntActive="isActive = false"
              @refreshProduct="getProduct"
            />
            <button
              class="button is-small is-danger"
              type="button"
              @click="confirmDelete(props.row.name, props.row._id)"
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
import EditProduct from './EditProduct.vue'
export default {
  components: { EditProduct },
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
      isActive: false,
    }
  },
  methods: {
    confirmDelete(name, id) {
      this.$buefy.dialog.confirm({
        title: 'Deleting account',
        message: `'<b>${id}</b>' numaralı '<b>${name}</b>' isimli ürünü silmek istediğinden emin misin ?`,
        confirmText: 'Delete Account',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.removeProduct(id),
      })
    },
    async removeProduct(id) {
      try {
        let remove = await this.$services.product.remove(id)

        if (remove) {
          this.$buefy.toast.open('Ürün Kaldırıldı !')
          this.$emit('refreshProduct')
        }
      } catch (error) {
        this.$buefy.toast.open('Bir hata meydana geldi !')
        console.log(error)
      }
    },
    getProduct() {
      this.$emit('refreshProduct')
    },
  },
}
</script>
