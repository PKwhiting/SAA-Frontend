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
            <div class="close-icon-wrapper floating-icon-top-right" @click="closeLoginModal()">
              <div class="close-icon-line first"></div>
              <div class="close-icon-line second"></div>
            </div>
            <h3 class="text-200 bold">{{ isLogin ? "Login" : "Register" }}</h3>
            <form id="login-form" @submit="validateForm">
              <div>
                <div style="margin-top: 24px" v-if="isLogin">
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
                <div style="margin-top: 24px" v-if="isLogin">
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
            </form>
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
              <button
                type="submit"
                @click="validateForm"
                class="btn-primary w-inline-block"
              >
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    };
  },
  methods: {
      closeLoginModal(){
            this.$root.flipLoginModalVisibility()
      },
    validateForm() {
      this.usernameError = "";
      this.passwordError = "";
      this.firstNameError = "";
      this.lastNameError = "";
      this.emailError = "";

      if (this.isLogin) {
        if (!this.username.trim()) {
          this.usernameError = "Username is required.";
        }

        if (!this.password.trim()) {
          this.passwordError = "Password is required.";
        } else {
          // Password complexity regex pattern
          const passwordPattern =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;

          if (!passwordPattern.test(this.password)) {
            this.passwordError =
              "Password must contain at least one uppercase letter, one number, and one special character.";
          }
        }
      } else {
        if (!this.firstName.trim()) {
          this.firstNameError = "First Name is required.";
        }
        if (!this.lastName.trim()) {
          this.lastNameError = "Last Name is required.";
        }
        if (!this.email.trim()) {
          this.emailError = "Email is required.";
        } else {
          // Regular expression to check for a valid email format
          const emailPattern =
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

          if (!emailPattern.test(this.email)) {
            this.emailError =
              "Invalid email format. Please enter a valid email address.";
          }
        }
      }

      // If all fields are valid, you can perform further actions, such as sending a request to the server for authentication.
      if (
        !this.usernameError &&
        !this.passwordError &&
        !this.firstNameError &&
        !this.lastNameError &&
        !this.emailError
      ) {
        // Example:
        // sendLoginRequest(this.username, this.password);
        // or
        // sendRegistrationRequest(this.username, this.password, this.firstName, this.lastName, this.email);
      }
    },
    toggleForm() {
      this.isLogin = !this.isLogin;
    },
  },
};
</script>
