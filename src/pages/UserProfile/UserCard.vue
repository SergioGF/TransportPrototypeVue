<template>
  <card class="card-user">
    <div slot="image">
      <img src="@/assets/img/background.jpg" alt="...">
    </div>
    <div>
      <div class="author">
        <img class="avatar border-white" src="@/assets/img/faces/face-1.jpg" alt="...">
        <h4 class="title">User EMT
          <br>
          <a href="#">
            <small>@sergiogf</small>
          </a>
        </h4>
      </div>
    </div>
    <hr>
    <div class="text-center">
          <h5>Registered 1 month ago
          </h5>
    </div>
    <div class="section" @click="clickImage">
    <img src="@/assets/img/adv2.jpg">
  </div>
  </card>
</template>
<script>
export default {
  data() {
    return {

    };
  },
  methods: {
    getClasses(index) {
      var remainder = index % 3;
      if (remainder === 0) {
        return "col-lg-3 offset-lg-1";
      } else if (remainder === 2) {
        return "col-lg-4";
      } else {
        return "col-lg-3";
      }
    },
    clickImage(){
      this.$http.post('http://www.google-analytics.com/collect?v=1&t=pageview&tid=UA-140020631-2&cid=555&dp=%2FAdvUserProfile')
    }
  }
};
</script>
<style>
</style>
