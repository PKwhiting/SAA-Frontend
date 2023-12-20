<template>
  <div class="contact-us">
    <h1>Contact Us</h1>
    <p>For any inquiries, please fill out the form below or contact us directly at:</p>
    <p>Email: pwhiting@simpli-cars.com</p>

    <form @submit.prevent="submitForm">
      <label for="name">Name:</label>
      <input id="name" v-model="name" type="text" style="height: 10px" required>

      <label for="email">Email:</label>
      <input id="email" v-model="email" type="email" style="height: 10px" required>

      <label for="message">Message:</label>
      <textarea id="message" v-model="message" required></textarea>

      <button class="btn-primary" type="submit" style="margin-top: 30px">Submit</button>
    </form>
  </div>
</template>

<script>
import api from "../../axios";
import store from "../store";

export default {
  data() {
    return {
      name: '',
      email: '',
      message: '',
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await api.post('/contact', {
          name: this.name,
          email: this.email,
          message: this.message,
        });
        const icon = require("@/assets/green-checkmark.svg");
        this.$root.showNotificationBar('Message sent successfully!', 'green', 3000, icon);
      } catch (error) {
        console.error(error);
        const icon = require("@/assets/paper-clip-svg.svg");
        this.$root.showNotificationBar('An error occurred while sending the message.', 'red', 3000, icon);
      }
    },
  },
};
</script>

<style scoped>
.contact-us {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
}

.contact-us h1 {
  text-align: center;
  color: #333;
}

.contact-us form {
  display: flex;
  flex-direction: column;
}

.contact-us label {
  margin-top: 10px;
}

.contact-us input, .contact-us textarea {
  padding: 10px;
  margin-top: 5px;
  width: 100%;
  height: 100px;
  resize: none;
}

/* .contact-us button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
} */
</style>