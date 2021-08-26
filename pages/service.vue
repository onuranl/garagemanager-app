<template>
  <div>
    <b-tabs v-model="activeSubTab">
      <b-tab-item label="Servis Listesi">
        <card-component class="has-table has-mobile-sort-spaced">
          <job-list-table :clients="jobs" />
        </card-component>
      </b-tab-item>
      <b-tab-item label="Servis ekle">
        <add-service @refreshJobs="getJobs" />
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import CardComponent from '@/components/CardComponent'
import ClientsTableSample from '@/components/ClientsTableSample'

import AddService from '~/components/AddService.vue'
import JobListTable from '~/components/JobListTable.vue'
export default {
  components: {
    ClientsTableSample,
    CardComponent,
    AddService,
    JobListTable,
  },
  data() {
    return {
      jobs: [],
    }
  },
  async fetch() {
    try {
      let jobs = await this.$services.job.get()

      this.jobs = jobs.data
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    getJobs() {
      this.$fetch()
    },
  },
}
</script>

<style></style>
