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
      default-sort="name"
      :data="clients"
    >
      <template slot-scope="props">
        <b-table-column label="ID" field="_id" sortable>
          {{ props.row._id }}
        </b-table-column>
        <b-table-column label="İsim" field="customerID.name" sortable>
          {{ props.row.customerID.name }}
        </b-table-column>
        <b-table-column label="Soyisim" field="customerID.surname" sortable>
          {{ props.row.customerID.surname }}
        </b-table-column>
        <b-table-column label="Tarih">
          <small>{{ props.row.date }}</small>
        </b-table-column>
        <b-table-column custom-key="actions" class="is-actions-cell">
          <div class="buttons is-right">
            <button
              class="button is-small is-info"
              type="button"
              @click.prevent="trashModal(props.row)"
            >
              <b-icon icon="shield-check" size="is-small" />
            </button>
            <nuxt-link
              :to="{ name: 'client-id', params: { id: props.row.id } }"
              class="button is-small is-primary"
            >
              <b-icon icon="account-edit" size="is-small" />
            </nuxt-link>
            <button
              class="button is-small is-danger"
              type="button"
              @click.prevent="trashModal(props.row)"
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
}
</script>
