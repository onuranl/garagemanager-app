<template>
  <div>
    <b-tabs v-model="activeSubTab">
      <b-tab-item label="Depo Listesi">
        <card-component class="has-table has-mobile-sort-spaced">
          <store-list-table :clients="stores" />
        </card-component>
      </b-tab-item>
      <b-tab-item label="Depo Ekle">
        <add-store @refreshStores="getStores" />
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import CardComponent from '@/components/CardComponent'
import ClientsTableSample from '@/components/ClientsTableSample'
import AddService from '~/components/AddService.vue'
import StoreListTable from '~/components/StoreListTable.vue'
import AddStore from '~/components/AddStore.vue'
export default {
  components: {
    ClientsTableSample,
    CardComponent,
    AddService,
    StoreListTable,
    AddStore,
  },
  data() {
    return {
      stores: [],
    }
  },
  async created() {
    try {
      let stores = await this.$services.store.get(this.$auth.user.companyID._id)

      this.stores = stores.data
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async getStores() {
      try {
        let stores = await this.$services.store.get(
          this.$auth.user.companyID._id
        )

        this.stores = stores.data
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style></style>
