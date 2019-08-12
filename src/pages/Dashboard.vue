<template>
  <div id="app">
    <!--Charts-->
    <div class="row">
      <div class="col-md-6 col-12">
        <chart-card title="User Statistics"
                    sub-title="Last month performance"
                    :chart-data="preferencesChart.data"
                    chart-type="Pie">
          <span slot="footer">
            <i class="ti-timer"></i> Updated 1 day ago</span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Active
            <i class="fa fa-circle text-warning"></i> Inactive
            <i class="fa fa-circle text-danger"></i> Banned
          </div>
        </chart-card>
      </div>
    </div>
    <!--Stats cards-->
    <div class="row">
      <div class="col-md-6 col-xl-3" v-for="stats in statsCards" :key="stats.title">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
            <i :class="stats.icon2"></i>
            <i :class="stats.icon3"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{stats.footerText}}
          </div>
        </stats-card>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-12">
        <card>
        <div class="section" @click="clickImage">
        <Carousel :cards="cards" />
        </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import { StatsCard, ChartCard } from "@/components/index";
import Chartist from 'chartist';
import BootstrapVue from 'bootstrap-vue'
import Carousel from "@/components/Carousel";
export default {
  components: {
    StatsCard,
    ChartCard,
    Carousel
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      slide: 0,
      sliding: null,
      statsCards: [
        {
          type: "info",
          icon: "ti-facebook",
          icon2: "ti-instagram",
          title: "More than",
          value: "10K Followers",
          footerText: "Join us in social media!",
          footerIcon: "ti-volume"
        }
      ],
      cards: [
        {
          headline: "Build your own website",
          text:
            "Try the free version now!",
          imgName: "setting.svg"
        },
        {
          headline: "Save your data on Google Storage",
          text:
            "Easy way to keep your data safe",
          imgName: "cloud.svg"
        },
        {
          headline: "Watch free matches on Movistar",
          text:
            "Click on the advertisement!",
          imgName: "antenna.svg"
        }
      ],
      preferencesChart: {
        data: {
          labels: ["72%", "22%", "4%"],
          series: [72, 32, 4]
        },
        options: {}
      }
    };
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
    clickImage(){
      this.$http.post('http://www.google-analytics.com/collect?v=1&t=pageview&tid=UA-140020631-2&cid=555&dp=%2FAdvDashboard')
    }
  }
};
</script>
<style src="@/assets/styles/App.css"/>
