<template>
  <div>
    <b-tabs v-model="activeSubTab">
      <b-tab-item label="Satış Faturası Listesi">
        <card-component class="has-table has-mobile-sort-spaced">
          <sell-list-table @refreshSells="getSells" :clients="sells" />
        </card-component>
      </b-tab-item>
      <b-tab-item label="Satış Faturası Ekle">
        <add-sell @refreshSells="getSells" />
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import CardComponent from '@/components/CardComponent'
import ClientsTableSample from '@/components/ClientsTableSample'

import AddService from '~/components/AddService.vue'
import SellListTable from '~/components/SellListTable.vue'
import AddSell from '~/components/AddSell.vue'
export default {
  components: {
    ClientsTableSample,
    CardComponent,
    AddService,
    SellListTable,
    AddSell,
  },
  data() {
    return {
      sells: [],
    }
  },
  async created() {
    try {
      let sells = await this.$services.sell.get(this.$auth.user.companyID._id)

      this.sells = sells.data
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async getSells() {
      try {
        let sells = await this.$services.sell.get(this.$auth.user.companyID._id)

        this.sells = sells.data
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style></style>
