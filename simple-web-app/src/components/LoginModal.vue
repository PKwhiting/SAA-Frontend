<template>
  <div class="modal-wrapper" style="display: block">
    <div
      class="grid-1-columns"
      style="display: flex; justify-content: center; align-items: center"
    >
      <div
        id="w-node-a99c1661-31b6-9ad4-73d2-7f6491da01b0-91da01b0"
        class="inner-container _370px"
        style="width: 400px; margin-top: 200px"
      >
        <div class="position-relative---z-index-1">
          <div class="card pd-24px---18px text-center">
            <div
              data-w-id="a99e63b97f63d68810f02f6_error-message-icon-dashflow-webflow-template.svg"
              loading="eager"
              alt=""
              class="max-w-12px"
            />
            <div
              class="close-icon-wrapper floating-icon-top-right"
              @click="closeLoginModal()"
            >
              <div class="close-icon-line first"></div>
              <div class="close-icon-line second"></div>
            </div>
            <h3 class="text-200 bold">{{ isLogin ? "Login" : "Register" }}</h3>
            <form id="login-form" @submit.prevent="submitForm">
              <div>
                <div style="margin-top: 24px">
                  <input
                    type="text"
                    class="input w-input"
                    maxlength="256"
                    name="username"
                    data-name="Name"
                    placeholder="Username"
                    id="username"
                    v-model="username"
                  />
                  <div class="error-message small" v-show="usernameError">
                    <div class="flex align-center gap-column-4px">
                      <img
                        src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646e463b97f63d68810f02f6_error-message-icon-dashflow-webflow-template.svg"
                        loading="eager"
                        alt=""
                        class="max-w-12px"
                      />
                      <div class="text-50 medium">{{ usernameError }}</div>
                    </div>
                  </div>
                </div>
                <div style="margin-top: 24px">
                  <input
                    type="password"
                    class="input w-input"
                    maxlength="256"
                    name="password"
                    data-name="Name"
                    placeholder="Password"
                    id="password"
                    v-model="password"
                  />
                  <div class="error-message small" v-show="passwordError">
                    <div class="flex align-center gap-column-4px">
                      <img
                        src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646e463b97f63d68810f02f6_error-message-icon-dashflow-webflow-template.svg"
                        loading="eager"
                        alt=""
                        class="max-w-12px"
                      />
                      <div class="text-50 medium">{{ passwordError }}</div>
                    </div>
                  </div>
                </div>
                <!-- Registration fields -->
                <div v-if="!isLogin">
                  <div style="margin-top: 24px">
                    <input
                      type="text"
                      class="input w-input"
                      maxlength="256"
                      name="firstName"
                      data-name="First Name"
                      placeholder="First Name"
                      id="firstName"
                      v-model="firstName"
                    />
                    <div class="error-message small" v-show="firstNameError">
                      <div class="flex align-center gap-column-4px">
                        <img
                          src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646e463b97f63d68810f02f6_error-message-icon-dashflow-webflow-template.svg"
                          loading="eager"
                          alt=""
                          class="max-w-12px"
                        />
                        <div class="text-50 medium">{{ firstNameError }}</div>
                      </div>
                    </div>
                  </div>
                  <div style="margin-top: 24px">
                    <input
                      type="text"
                      class="input w-input"
                      maxlength="256"
                      name="lastName"
                      data-name="Last Name"
                      placeholder="Last Name"
                      id="lastName"
                      v-model="lastName"
                    />
                    <div class="error-message small" v-show="lastNameError">
                      <div class="flex align-center gap-column-4px">
                        <img
                          src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646e463b97f63d68810f02f6_error-message-icon-dashflow-webflow-template.svg"
                          loading="eager"
                          alt=""
                          class="max-w-12px"
                        />
                        <div class="text-50 medium">{{ lastNameError }}</div>
                      </div>
                    </div>
                  </div>
                  <div style="margin-top: 24px">
                    <input
                      type="email"
                      class="input w-input"
                      maxlength="256"
                      name="email"
                      data-name="Email"
                      placeholder="Email"
                      id="email"
                      v-model="email"
                    />
                    <div class="error-message small" v-show="emailError">
                      <div class="flex align-center gap-column-4px">
                        <img
                          src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646e463b97f63d68810f02f6_error-message-icon-dashflow-webflow-template.svg"
                          loading="eager"
                          alt=""
                          class="max-w-12px"
                        />
                        <div class="text-50 medium">{{ emailError }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="buttons-row center gap-column-12px"
                style="margin-top: 24px"
              >
                <div data-w-id="a99c1661-31b6-9ad4-73d2-7f6491da01bd">
                  <button
                    type="button"
                    @click="toggleForm"
                    class="btn-secondary w-inline-block"
                  >
                    <div class="flex-horizontal gap-column-4px">
                      <div>{{ isLogin ? "Register" : "Login" }}</div>
                    </div>
                  </button>
                </div>
                <button type="submit" class="btn-primary w-inline-block">
                  <div class="flex-horizontal gap-column-4px">
                    <div>{{ isLogin ? "Login" : "Register" }}</div>
                    <img
                      src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646cdd3a1fe350c45874c7ce_primary-button-icon-right-dashflow-webflow-template.svg"
                      loading="eager"
                      alt=""
                      class="link-icon arrow-right"
                      style="
                        transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                          rotateX(0deg) rotateY(0deg) rotateZ(0deg)
                          skew(0deg, 0deg);
                        transform-style: preserve-3d;
                      "
                    />
                  </div>
                </button>
              </div>
            </form>
            <div class="error-message small" v-show="errorMessage">
              <div class="flex align-center gap-column-4px">
                <img
                  src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646e463b97f63d68810f02f6_error-message-icon-dashflow-webflow-template.svg"
                  loading="eager"
                  alt=""
                  class="max-w-12px"
                />
                <div class="text-50 medium">{{ errorMessage }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../axios";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export default {
  data() {
    return {
      isLogin: true,
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      usernameError: "",
      passwordError: "",
      firstNameError: "",
      lastNameError: "",
      emailError: "",
      errorMessage: "",
      csrfToken: null,
    };
  },
  methods: {
    toggleForm() {
      this.isLogin = !this.isLogin;
    },
    async submitForm() {
      console.log("HEY WORKING")
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/login_or_register/",
          {
            username: this.username,
            password: this.password,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            isLogin: this.isLogin,
          },
          {
            headers: {
              "X-CSRFToken": this.csrfToken,
            },
            withCredentials: true,
          }
        );
        if (response.data.success) {
          // Close the login or registration modal and perform any necessary actions
        } else {
          this.errorMessage = response.data.message;
        }
      } catch (error) {
        this.errorMessage = "An error occurred while processing your request.";
      }
    },
    getCookie(name) {
      const cookies = document.cookie.split("; ");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        if (cookie[0] === name) {
          return decodeURIComponent(cookie[1]);
        }
      }
      return null;
    },
    setCookie(name, value, days) {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + days);
      const cookieValue =
        encodeURIComponent(value) +
        (days ? `; expires=${expirationDate.toUTCString()}` : "");
      document.cookie = `${name}=${cookieValue}; path=/`;
    },
  },
  created() {
    // Fetch the CSRF token
    api
      .get("get_csrf_token/") // Replace with the correct URL
      .then((response) => {
        this.csrfToken = response.data.csrfToken;
        // this.setCookie("csrftoken", this.csrfToken, 7);
        // response.set_cookie('csrftokenss', this.csrfToken, httponly=true, samesite='None', secure=true)
      })
      .catch((error) => {
        console.error("Error fetching CSRF token:", error);
      });
  },
};
</script>