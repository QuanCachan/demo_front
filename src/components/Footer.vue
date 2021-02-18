<template>
  <footer>
    <div class="container">
      <router-link class="logo-font"
                   :to="{ name: 'home', params: {} }">
        GestioStock
      </router-link>
      <span class="attribution">
        An interactive learning project from
        <a target="blank" href="https://www.google.com/">Google</a>. Code &amp; design licensed under MIT.
      </span>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'rwvFooter'
  // data () {
  //   return {
  //     msg: 'Welcome to Your Vue.js App'
  //   }
  // }
}
</script>