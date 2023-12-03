<template>
  <div class="card border-none" style="margin-top: 24px">
    <div>
      <div class="data-table-row table-header">
        <div
          id="w-node-b5abc023-9406-e29e-4a73-d0657c71dff6-7c71dff2"
          class="text-50 bold color-neutral-700"
        >
          Sale Information
        </div>
        <div
          id="w-node-b5abc023-9406-e29e-4a73-d0657c71dff8-7c71dff2"
          class="text-50 bold color-neutral-700"
        ></div>
      </div>
      <div class="rows">
        <div class="data-table-row">
          <div
            id="w-node-_269d1d2d-2cb2-3200-d275-6492145f0d89-145f0d88"
            class="text-100 bold color-neutral-800"
          >
            Auction
          </div>
          <div
            id="w-node-_269d1d2d-2cb2-3200-d275-6492145f0d8b-145f0d88"
            class="text-100 medium"
          >
            {{ auction }}
          </div>
        </div>
        <div class="data-table-row">
          <div
            id="w-node-_269d1d2d-2cb2-3200-d275-6492145f0d89-145f0d88"
            class="text-100 bold color-neutral-800"
          >
            Sale Location
          </div>
          <div
            id="w-node-_269d1d2d-2cb2-3200-d275-6492145f0d8b-145f0d88"
            class="text-100 medium"
          >
            {{ vehicle_location }}
          </div>
        </div>
        <div class="data-table-row">
          <div
            id="w-node-_269d1d2d-2cb2-3200-d275-6492145f0d89-145f0d88"
            class="text-100 bold color-neutral-800"
          >
            Sale Date
          </div>
          <div
            id="w-node-_269d1d2d-2cb2-3200-d275-6492145f0d8b-145f0d88"
            class="text-100 medium"
          >
            {{ formatDate(sale_date) }}
          </div>
        </div>
        <div class="data-table-row">
          <div
            id="w-node-_269d1d2d-2cb2-3200-d275-6492145f0d89-145f0d88"
            class="text-100 bold color-neutral-800"
          >
            Last Updated
          </div>
          <div
            id="w-node-_269d1d2d-2cb2-3200-d275-6492145f0d8b-145f0d88"
            class="text-100 medium"
          >
            {{ formatDate(last_updated) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    auction: String,
    vehicle_location: String,
    sale_date: String,
    last_updated: String,
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZoneName: "short",
      };
      return date.toLocaleDateString("en-US", options);
    },
  },
};
</script>

<style scoped>
.data-table-row.table-header {
  grid-template-columns: 0.6fr 2fr;
}
/* .inner-container._100-tablet {
  overflow-x: hidden;
} */
div.data-table-row {
  grid-template-columns: 0.6fr 1fr;
  max-width: 100%;
  min-width: auto;
  text-align: left;
}
.data-table-row.table-header {
  grid-template-columns: 2fr auto;
}
</style>