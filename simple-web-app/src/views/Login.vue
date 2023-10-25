<template>
  <div id="text-input" class="mg-bottom-16px">
    <h2 class="text-500 bold mg-bottom-12px">Login</h2>
    <div class="card component-card grid-2-columns">
      <div class="mg-bottom-0 w-form">
        <form
          id="email-form"
          name="email-form"
          data-name="Email Form"
          method="get"
          aria-label="Email Form"
        >
          <div class="_2-items-wrap-container justify-center gap-row-40px">
            <div class="inner-container _244px _100-mbl">
              <div>
                <label for="email">Email</label>
                <div>
                  <input
                    type="email"
                    class="input w-input"
                    maxlength="256"
                    name="email"
                    data-name="email"
                    placeholder="Enter your email"
                    id="email-3"
                  />
                </div>
              </div>
              <div class="error-message small">
                <div class="flex align-center gap-column-4px">
                  <img
                    src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646e463b97f63d68810f02f6_error-message-icon-dashflow-webflow-template.svg"
                    loading="eager"
                    alt=""
                    class="max-w-12px"
                  />
                  <div class="text-50 medium">There's been an error</div>
                </div>
              </div>
            </div>
            <div class="inner-container _244px _100-mbl">
              <div>
                <label for="password">Password</label>
                <div>
                  <input
                    type="password"
                    class="input w-input"
                    maxlength="256"
                    name="password"
                    data-name="password"
                    placeholder="Enter your password"
                    id="password-3"
                  />
                </div>
              </div>
              <div class="help-message">
                <div class="flex align-center gap-column-4px">
                  <img
                    src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646e463bc32b6db64b6bb702_help-message-icon-dashflow-webflow-template.svg"
                    loading="eager"
                    alt=""
                    class="max-w-12px"
                  />
                  <div class="text-50 medium">
                    Must be at least 8 characters
                  </div>
                </div>
              </div>
            </div>
            <div class="button-container">
              <a
                data-w-id="dc3b625c-4a68-4ebe-9b74-d3193fa9f32f"
                href="#"
                class="btn-primary w-inline-block"
                @click="login()"
                ><div class="flex-horizontal gap-column-4px">
                  <div>Login</div>
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
                  /></div
              ></a>
            </div>
          </div>
          <!-- <div class="button-container">
            <a
              data-w-id="dc3b625c-4a68-4ebe-9b74-d3193fa9f32f"
              href="#"
              class="btn-primary w-inline-block"
              ><div class="flex-horizontal gap-column-4px">
                <div>Accept</div>
                <img
                  src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646cdd3a1fe350c45874c7ce_primary-button-icon-right-dashflow-webflow-template.svg"
                  loading="eager"
                  alt=""
                  class="link-icon arrow-right"
                  style="
                    transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                      rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
                    transform-style: preserve-3d;
                  "
                /></div
            ></a>
          </div> -->
        </form>
        <div
          class="success-message w-form-done"
          tabindex="-1"
          role="region"
          aria-label="Email Form success"
        >
          <div>Thank you! Your submission has been received!</div>
        </div>
        <div
          class="error-message w-form-fail"
          tabindex="-1"
          role="region"
          aria-label="Email Form failure"
        >
          <div>Oops! Something went wrong while submitting the form.</div>
        </div>
      </div>
    </div>
  </div>
</template>

