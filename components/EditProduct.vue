<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card" style="width: auto;">
      <header class="modal-card-head">
        <p class="modal-card-title">Ürün Güncelle</p>
        <button type="button" class="delete" @click="close" />
      </header>
      <section class="modal-card-body py-3">
        <card-component>
          <form @submit.prevent="updateProduct">
            <div class="columns is-variable">
              <div class="column">
                <b-field style="margin-bottom: 10px;" label="İsim" horizontal>
                  <b-input v-model="data.name" name="name" required />
                </b-field>
                <b-field
                  style="margin-bottom: 15px;"
                  label="Stok No"
                  horizontal
                >
                  <b-input v-model="data.stockNo" name="name" required />
                </b-field>
                <b-field
                  style="margin-bottom: 15px;"
                  label="Barkod No"
                  horizontal
                >
                  <b-input v-model="data.barcodeNo" name="name" required />
                </b-field>
                <b-field
                  style="margin-bottom: 15px;"
                  label="Ürün miktarı"
                  horizontal
                >
                  <b-input v-model="data.quantity" name="name" required />
                </b-field>
                <b-field label="Kategori" horizontal>
                  <b-select
                    v-model="data.categoryID"
                    placeholder="Müşteriyi seç"
                    required
                  >
                    <option
                      v-for="(category, index) in categories"
                      :key="index"
                      :value="category._id"
                    >
                      {{ category.name }}
                    </option>
                  </b-select>
                  <b-button @click="isActive = true">
                    Kategori Ekle
                  </b-button>
                  <div v-if="isActive" class="modal is-active">
                    <div class="modal-background"></div>
                    <div class="modal-card">
                      <header class="modal-card-head">
                        <p class="modal-card-title">Kategori Ekle</p>
                        <button
                          type="button"
                          class="delete"
                          @click="isActive = false"
                        />
                      </header>
                      <section class="modal-card-body">
                        <b-field
                          style="margin-bottom: 10px;"
                          label="Kategori İsmi"
                          horizontal
                        >
                          <b-input
                            v-model="categoryName"
                            name="name"
                            required
                          />
                        </b-field>
                      </section>
                      <footer class="modal-card-foot">
                        <b-button
                          @click="addCategory"
                          label="Ekle"
                          type="is-primary"
                        />
                      </footer>
                    </div>
                  </div>
                </b-field>
              </div>
              <div class="column">
                <b-field style="margin-bottom: 10px;" label="Fiyat" horizontal>
                  <p class="control">
                    <span class="select">
                      <select v-model="currency" disabled>
                        <option>₺</option>
                        <option>$</option>
                        <option>£</option>
                        <option>€</option>
                      </select>
                    </span>
                  </p>
                  <p class="control">
                    <input v-model="data.price" class="input" type="number" />
                  </p>
                </b-field>

                <b-field
                  style="margin-bottom: 10px;"
                  label="Kdv Oranı"
                  horizontal
                >
                  <b-input v-model="data.kdv" name="name" />
                </b-field>
                <b-field
                  style="margin-bottom: 15px;"
                  label="KDV"
                  class="has-check"
                  horizontal
                >
                  <div class="block">
                    <b-radio
                      v-model="data.kdv_is_included"
                      name="name"
                      native-value="true"
                    >
                      Dahil
                    </b-radio>
                    <b-radio
                      v-model="data.kdv_is_included"
                      name="name"
                      native-value="false"
                    >
                      Dahil değil
                    </b-radio>
                  </div>
                </b-field>
                <b-field
                  style="margin-bottom: 10px;"
                  label="İndirimli fiyat"
                  horizontal
                >
                  <b-input v-model="data.discountedPrice" />
                </b-field>
                <b-field label="Ürünün Resmi" horizontal>
                  <img
                    style="width: 100px; height: 100px;"
                    :src="`${data.photo}`"
                  />
                </b-field>
              </div>
            </div>
            <footer class="modal-card-foot">
              <b-button
                label="Güncelle"
                native-type="submit"
                type="is-primary"
              />
            </footer>
          </form>
        </card-component>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryName: '',
      categories: [],
      isActive: false,
      data: [],
      currency: '₺',
    }
  },
  props: {
    productID: {
      type: String,
    },
  },
  async created() {
    try {
      let product = await this.$services.product.getOne(this.productID)

      let categories = await this.$services.product.getCategory(
        this.$auth.user.companyID._id
      )
      if (categories) {
        this.categories = categories.data
      }
      if (product) {
        this.data = product.data
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async updateProduct() {
      try {
        let product = await this.$services.product.update(
          this.productID,
          this.data
        )

        if (product) {
          this.$buefy.snackbar.open({
            message: 'Ürün başarıyla güncellendi',
            queue: false,
            type: 'is-success',
          })
          this.$emit('refreshProduct')
          this.$emit('isntActive')
        }
      } catch (error) {
        this.$buefy.snackbar.open({
          message: 'Bir hata meydana geldi !',
          queue: false,
          type: 'is-danger',
        })
        console.log(error)
      }
    },
    async addCategory() {
      try {
        var form = {
          name: this.categoryName,
          companyID: this.$auth.user.companyID._id,
        }
        let category = await this.$services.product.createCategory(form)

        if (category) {
          this.$buefy.snackbar.open({
            message: 'Kategori başarıyla eklendi',
            queue: false,
            type: 'is-success',
          })
          this.getCategory()
          this.isActive = false
        }
      } catch (error) {
        this.$buefy.snackbar.open({
          message: 'Bir hata meydana geldi !',
          queue: false,
          type: 'is-danger',
        })
        console.log(error)
      }
    },
    async getCategory() {
      try {
        let categories = await this.$services.product.getCategory(
          this.$auth.user.companyID._id
        )

        this.categories = categories.data
      } catch (error) {
        console.log(error)
      }
    },
    close() {
      this.$emit('isntActive')
    },
  },
}
</script>

<style></style>
