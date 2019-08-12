<template>
  <card title="Help">
    <div class="text-justify">
      <template v-for="line in message.split('\n')">{{line}}<br></template>
    </div><br>
	<div id="contact-form" class="contact-form">
		<div class="separator"></div>
		<form class="form" @submit="onSubmit">
			<textarea name="message" v-model="contact" rows="4" placeholder="Message"></textarea>
		   <button class="button">Send</button>
		</form>
	</div>
  <div class="section" @click="clickImage">
    <img src="@/assets/img/adv1.png">
  </div>
  </card>
</template>

<script>
export default {
  name: 'Help',
  components: {
  },

  data() {
    return {
      message:`In order to help you surfing the application, there are different functionalities on it:
-	Schedule: check the buses that are going to arrive to a stop.
-	Is Crowded: check how many people usually check your stop.
-	Close Stops: the closest stops to your location are shown.

If you have any doubts or suggestions, send us a message!`,
      contact: ""
    }
  },
  methods: {
    clickImage(){
      this.$http.post('http://www.google-analytics.com/collect?v=1&t=pageview&tid=UA-140020631-2&cid=555&dp=%2FAdvHelp')
    }
  }
};
</script>
<style>
body {
	background: #f1f1f1;
	font-family: 'Roboto', sans-serif;
}

.contact-form {
	font-family: 16px;
	margin: 0 auto;
	max-width: 600px;
	width: 100%;
}

.contact-form .separator {
	border-bottom: solid 1px #ccc;
	margin-bottom: 15px;
}

.contact-form .form {
	display: flex;
	flex-direction: column;
	font-size: 16px;
}

.contact-form_title {
	color: #333;
	text-align: left;
	font-size: 28px;
}

.contact-form input[type="email"],
.contact-form input[type="text"],
.contact-form textarea {
	border: solid 1px #e8e8e8;
	font-family: 'Roboto', sans-serif;
	padding: 10px 7px;
	margin-bottom: 15px;
	outline: none;
}

.contact-form textarea {
	resize: none;
}

.contact-form .button {
	background: #f3bb45;
	border: solid 1px #f3bb45;
	color: white;
	cursor: pointer;
	padding: 10px 50px;
	text-align: center;
	text-transform: uppercase;
}

.contact-form .button:hover {
	background: #f3bb45;
	border: solid 1px #f3bb45;
}

.contact-form input[type="email"],
.contact-form input[type="text"],
.contact-form textarea,
.contact-form .button {
	font-size: 15px;
	border-radius: 3px
}
</style>