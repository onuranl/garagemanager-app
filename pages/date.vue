<template>
  <div>
    <b-tabs>
      <b-tab-item label="Randevu Listesi">
        <card-component class="has-table has-mobile-sort-spaced">
          <date-list-table @refreshDates="getDates" :clients="dates" />
        </card-component>
      </b-tab-item>
      <b-tab-item label="Randevu Ekle">
        <add-date @refreshDates="getDates" />
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import CardComponent from '@/components/CardComponent'
import ClientsTableSample from '@/components/ClientsTableSample'

import AddDate from '~/components/AddDate.vue'
import DateListTable from '~/components/DateListTable.vue'
export default {
  components: {
    ClientsTableSample,
    CardComponent,
    AddDate,
    DateListTable,
  },
  data() {
    return {
      dates: [],
    }
  },
  async created() {
    try {
      let dates = await this.$services.date.get(this.$auth.user.companyID._id)

      this.dates = dates.data
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async getDates() {
      try {
        let dates = await this.$services.date.get(this.$auth.user.companyID._id)

        this.dates = dates.data
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style></style>
