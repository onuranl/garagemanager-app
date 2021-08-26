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
