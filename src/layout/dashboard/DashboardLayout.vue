<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/dashboard" name="Dashboard" icon="ti-panel"/>
        <sidebar-link to="/schedule" name="Schedule" icon="ti-view-list-alt"/>
        <sidebar-link to="/crowded" name="Is Crowded" icon="ti-pencil-alt2"/>
        <sidebar-link to="/closestops" name="Close Stops" icon="ti-map"/>
        <sidebar-link to="/help" name="Help" icon="ti-help"/>

      </template>
      <mobile-menu>
        <li @click="redirectUserProfile()" class="nav-item">
          <a class="nav-link">
            <i class="ti-user"></i>
            <p>User Profile</p>
          </a>
        </li>
        <drop-down class="nav-item"
            title="2 Notifications"
            title-classes="nav-link"
            icon="ti-bell" show>
          <a class="dropdown-item">Line 4 bus incident</a>
          <a class="dropdown-item">Line 52 is not working</a>
        </drop-down>
        <li @click="redirectUserLogIn()" class="nav-item">
          <a class="nav-link">
            <i class="ti-lock"></i>
            <p>Log out</p>
          </a>
        </li>
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  data(){
    return{
    }
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    redirectUserProfile(){
      this.$router.replace('stats')
      this.$sidebar.displaySidebar(false);
    },
    redirectUserLogIn(){
      this.$router.replace('login')
      this.$sidebar.displaySidebar(false);
    }
  }
};
</script>
