<template>
  <div id="app">
    <rwv-header></rwv-header>
    <nav class="navbar navbar-expand navbar-dark bg-success text-white">
      <router-link to="/" class="navbar-brand">GestioStock Home Page</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/products" class="nav-link">Products</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/inventories" class="nav-link">Locations</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view/>
    </div>
    <rwv-footer></rwv-footer>
  </div>
</template>

<script>
import RwvHeader from './components/Header'
import RwvFooter from './components/Footer'

export default {
  name: 'App',
  components: {
    RwvHeader,
    RwvFooter
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
