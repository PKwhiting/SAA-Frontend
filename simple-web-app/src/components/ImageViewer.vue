<template>
  <div class="card overflow-hidden">
    <div id="photo-view-container">
      <div id="photo-display">
        <img
          :src="selectedPhoto.url"
          id="selected-photo"
          :alt="selectedPhoto.alt"
          style="max-width: 100%"
        />
      </div>
      <div id="photo-container-holder">
        <div
          id="photo-container"
          :style="{
            marginLeft: containerMargin + 'px',
            height: '100px',
            overflow: 'hidden',
          }"
        >
          <div
            class="photo-holder"
            v-for="(photo, index) in photos"
            :key="index"
          >
            <img
              :src="photo.url"
              class="photo-item"
              :alt="photo.alt"
              @click="viewPhoto(photo)"
            />
          </div>
        </div>
      </div>
      <img
        id="left"
        :class="{ 'arrow-hidden': photos.length <= 3 }"
        src="https://webdesign-assistant.com/images/dummy/left.png"
        @click="scrollPhotos('left')"
        alt=""
      />
      <img
        id="right"
        :class="{ 'arrow-hidden': photos.length <= 3 }"
        src="https://webdesign-assistant.com/images/dummy/right.png"
        @click="scrollPhotos('right')"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedPhoto: { url: "", alt: "" },
      photos: [],
      containerMargin: 0,
    };
  },
  mounted() {
    if (this.images) {
      for (const image of this.images) {
        this.photos.push({ url: image });
      }
      this.photos.push({ url: this.images[0] })
      this.selectedPhoto = this.photos[0];
    }
  },
  methods: {
    viewPhoto(photo) {
      this.selectedPhoto = { url: photo.url, alt: photo.alt };
    },
    scrollPhotos(direction) {
      const step = 300;
      const totalLength = this.photos.length;
      const containerWidth = totalLength * 115;

      if (direction === "left") {
        this.containerMargin = Math.min(0, this.containerMargin + step);
      } else if (direction === "right") {
        this.containerMargin = Math.max(
          -containerWidth + 500,
          this.containerMargin - step
        );
      }
    },
  },
};
</script>

<style scoped>
body {
  background-color: #fff;
  text-align: center;
  padding: 100px 0;
}
#image {
  -webkit-animation-name: flow; /* Safari 4.0 - 8.0 */
  -webkit-animation-duration: 1.3s; /* Safari 4.0 - 8.0 */
  animation-name: flow;
  animation-duration: 1.5s;
}
/* Safari 4.0 - 8.0 */
@-webkit-keyframes flow {
  from {
    opacity: 0.3;
  }
  to {
    opacity: 1;
  }
}

/* Standard syntax */
@keyframes flow {
  from {
    opacity: 0.3;
  }
  to {
    opacity: 1;
  }
}
#photo-view-container {
  display: inline-block;
  background-color: #fff;
  max-width: 100%;
  text-align: center;
  padding: 10px 10px 10px 10px;
}
#photo-display {
  display: inline-block;
  height: 300px;
  width: 100%;
  overflow: hidden;
}
#selected-photo {
  max-height: 290px;
  max-width: 500px;
}
#commentary {
  color: #aaa;
}
#left {
  float: left;
}
#right {
  float: right;
}
#right,
#left {
  position: relative;
  bottom: 70px;
  cursor: pointer;
}

#photo-container-holder {
  display: inline-block;
  width: 100%;
  overflow: hidden;
}
#photo-container {
  display: inline-block;
  height: 100px;
  padding: 10px 0;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}
.photo-holder {
  display: inline-block;
  width: 100px;
  height: 100px;
  margin: 0 5px;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
}
.photo-item {
  cursor: pointer;
}
footer {
  color: #888;
  margin-top: 20px;
}
footer a {
  color: #ccc;
}

.arrow-hidden {
  display: none;
}
</style>