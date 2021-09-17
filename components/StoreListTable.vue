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
        <b-table-column label="ID" field="_id">
          {{ props.row._id }}
        </b-table-column>
        <b-table-column label="İsim" field="name">
          {{ props.row.name }}
        </b-table-column>
        <b-table-column label="Adres" field="address">
          {{ props.row.address }}
        </b-table-column>
        <b-table-column custom-key="actions" class="is-actions-cell">
          <div class="buttons is-right">
            <nuxt-link
              :to="`/store/${props.row._id}`"
              class="button is-small is-info"
              type="button"
            >
              <b-icon icon="plus-thick" size="is-small" />
            </nuxt-link>
            <button @click="isActive = true" class="button is-small is-primary">
              <b-icon icon="account-edit" size="is-small" />
            </button>
            <edit-store
              v-if="isActive"
              @isntActive="isActive = false"
              @refreshStore="getStores"
              :info="props.row"
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
import EditStore from './EditStore.vue'
export default {
  components: { EditStore },
  props: {
    clients: {
      type: Array,
    },
  },
  data() {
    return {
      isModalActive: false,
      trashObject: null,
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: [],
      storeID: '',
      isActive: false,
    }
  },
  methods: {
    confirmDelete(name, id) {
      this.$buefy.dialog.confirm({
        title: 'Depoyu Kaldır',
        message: `'<b>${name}</b>' isimli, '<b>${id}</b>' numaralı depoyu silmek istediğinden emin misin ?`,
        confirmText: 'Sil',
        cancelText: 'İptal Et',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.removeStore(id),
      })
    },
    async removeStore(id) {
      try {
        let remove = await this.$services.store.remove(id)

        if (remove) {
          this.$buefy.toast.open('Depo Kaldırıldı !')
          this.$emit('refreshStores')
        }
      } catch (error) {
        this.$buefy.toast.open('Bir hata meydana geldi !')
        console.log(error)
      }
    },
    getStores() {
      this.$emit('refreshStores')
    },
  },
}
</script>
