<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card" style="width: auto;">
      <header class="modal-card-head">
        <p class="modal-card-title">Araç Ekle</p>
        <button type="button" class="delete" @click="close" />
      </header>
      <form @submit.prevent="addVehicle">
        <section class="modal-card-body py-3">
          <card-component>
            <div class="columns is-variable">
              <div class="column">
                <b-field style="margin-bottom: 10px;" label="Marka" horizontal>
                  <b-select v-model="form.brand" required>
                    <option
                      v-for="(brand, index) in brands"
                      :key="index"
                      :value="brand"
                    >
                      {{ brand }}
                    </option>
                  </b-select>
                </b-field>
                <b-field style="margin-bottom: 10px;" label="Model" horizontal>
                  <b-select v-model="form.model" required>
                    <option
                      v-for="(model, index) in models"
                      :key="index"
                      :value="model"
                    >
                      {{ model }}
                    </option>
                  </b-select>
                </b-field>
                <b-field style="margin-bottom: 10px;" label="Yıl" horizontal>
                  <b-input type="number" v-model="form.year" />
                </b-field>
                <b-field style="margin-bottom: 10px;" label="Km" horizontal>
                  <b-input type="number" v-model="form.km" />
                </b-field>
                <b-field style="margin-bottom: 10px;" label="Hp" horizontal>
                  <b-input type="number" v-model="form.hp" />
                </b-field>
                <b-field label="Renk" horizontal>
                  <b-input type="text" v-model="form.color" />
                </b-field>
              </div>
              <div class="column">
                <b-field
                  style="margin-bottom: 10px;"
                  label="Motor No"
                  horizontal
                >
                  <b-input type="text" v-model="form.engineNo" required />
                </b-field>
                <b-field
                  style="margin-bottom: 10px;"
                  label="Şasi No"
                  horizontal
                >
                  <b-input type="text" v-model="form.chassisNo" required />
                </b-field>
                <b-field
                  style="margin-bottom: 10px;"
                  label="Vites Tipi"
                  horizontal
                >
                  <b-select v-model="form.gearType" required>
                    <option
                      v-for="(gear, index) in gears"
                      :key="index"
                      :value="gear"
                    >
                      {{ gear }}
                    </option>
                  </b-select>
                </b-field>
                <b-field
                  style="margin-bottom: 10px;"
                  label="Yakıt Tipi"
                  horizontal
                >
                  <b-select v-model="form.fuelType" required>
                    <option
                      v-for="(fuel, index) in fuels"
                      :key="index"
                      :value="fuel"
                    >
                      {{ fuel }}
                    </option>
                  </b-select>
                </b-field>
                <b-field
                  style="margin-bottom: 10px;"
                  label="Kasa Tipi"
                  horizontal
                >
                  <b-select v-model="form.caseType" required>
                    <option
                      v-for="(till, index) in tills"
                      :key="index"
                      :value="till"
                    >
                      {{ till }}
                    </option>
                  </b-select>
                </b-field>
              </div>
            </div>
          </card-component>
        </section>
        <footer class="modal-card-foot">
          <b-button
            native-type="submit"
            :disabled="disable"
            label="Ekle"
            type="is-primary"
          />
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        brand: '',
        model: '',
        year: Number,
        km: Number,
        hp: Number,
        color: '',
        engineNo: '',
        chassisNo: '',
        gearType: '',
        fuelType: '',
        caseType: '',
      },
      data: [],
      brands: [],
      models: [],
      tills: [
        'Sedan',
        'Hatchback',
        'Station wagon',
        'Cabrio',
        'Pick up',
        'SUV',
      ],
      fuels: ['Dizel', 'Benzin', 'Lpg', 'Elektrik'],
      gears: ['Düz', 'Otomatik', 'Yarı Otomatik'],
      disable: false,
    }
  },
  props: {
    customerID: {
      type: String,
    },
  },
  watch: {
    'form.brand': async function (val) {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].brand == val) {
          this.models = this.data[i].models
        }
      }
    },
  },
  async created() {
    await fetch('/data-sources/clients.json')
      .then((response) => response.json())
      .then((data) => {
        this.data = data
        data.forEach((element) => {
          this.brands.push(element.brand)
        })
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  },
  methods: {
    close() {
      this.$emit('isntActive')
    },
    async addVehicle() {
      this.disable = true
      try {
        this.form.customerID = this.customerID
        let create = await this.$services.vehicle.create(this.form)

        if (create) {
          this.$buefy.snackbar.open({
            message: 'Araç başarıyla eklendi',
            queue: false,
            type: 'is-success',
          })
          this.$emit('getVehicles', this.customerID)
          this.disable = false
          this.close()
        }
      } catch (error) {
        this.$buefy.snackbar.open({
          message: 'Bir hata meydana geldi !',
          queue: false,
          type: 'is-danger',
        }),
          console.log(error)
      }
    },
  },
}
</script>

<style></style>
