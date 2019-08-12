<template>
  <footer class="footer">
    <div class="container-fluid d-flex flex-wrap justify-content-between">
      <nav>
        <ul>
          <li>
            <router-link :to="{path:'/admin'}">EMT app</router-link>
          </li>
        </ul>
      </nav>
      <div class="copyright d-flex flex-wrap">
        &copy; Developed by
        <a href="https://github.com/SergioGF" target="_blank"> &nbsp; Sergio Gonzalez.</a>&nbsp;
      </div>
    </div>
  </footer>
</template>
<script>
export default {};
</script>
<style>
</style>
