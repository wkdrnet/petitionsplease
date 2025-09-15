<script lang="ts">
  import Router from "svelte-spa-router";
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
  import Normal from "./pages/Normal.svelte";
  import Daily from "./pages/Daily.svelte";
  import Profile from "./components/Profile.svelte";

  const routes = {
    "/": Normal,
    "/petition": Normal,
    "/daily": Daily
  }
</script>

<Header/>
<Router {routes}/>
<Footer/>

<style></style>
