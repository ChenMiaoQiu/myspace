<template>
  <NavBar />
  <router-view />
</template>

<script>
import NavBar from './components/NavBar.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';


export default {
  name: "App",
  components: {
    NavBar,
  }
}

</script>

<style></style>
