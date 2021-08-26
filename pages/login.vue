<template>
  <div>
    <input v-model="form.email" type="email" placeholder="email">
    <input v-model="form.password" type="password" placeholder="password">
    <button @click="login">Login</button>
  </div>
</template>

<script>
export default {
    layout: 'empty',
    data() {
        return {
            form: {
                email: "",
                password: ""
            }
        }
    },
    methods: {
        async login() {
            try {
                let result = await this.$auth.loginWith("local", {data: this.form});
                console.log(result);
            } catch (error) {
                console.log(error)
            }
        },
    },
}
</script>

<style>

</style>