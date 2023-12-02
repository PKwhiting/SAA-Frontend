<template>
  <div class="account">
    <div class="account-header">
      <h1>My Account</h1>
      <button class="btn btn-primary" @click="showModal = true">
        Edit Profile
      </button>
    </div>
    <div class="account-body">
      <div class="account-info">
        <h2>Personal Information</h2>
        <div class="info-row">
          <span>First Name:</span>
          <span>{{ user.first_name }}</span>
        </div>
        <div class="info-row">
          <span>Last Name:</span>
          <span>{{ user.last_name }}</span>
        </div>
        <div class="info-row">
          <span>Email:</span>
          <span>{{ user.email }}</span>
        </div>
        <div class="info-row">
          <span>Phone Number:</span>
          <span>{{ user.phone }}</span>
        </div>
        <div class="info-row">
          <span>Driver's License:</span>
          <span>{{ getFileName(user.licensePhoto) }}</span>
        </div>
      </div>
      <div class="account-orders">
        <h2>Bid History</h2>
        <table>
          <thead>
            <tr>
              <th>VIN</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="bid in bids" :key="bid.id">
              <td>{{ bid.bid_vehicle }}</td>
              <td>{{ bid.bid_date }}</td>
              <td>{{ bid.bid_amount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="modal" v-if="showModal">
      <div class="modal-overlay" @click="showModal = false"></div>
      <div class="modal-container">
        <div class="modal-header">
          <h3>Edit Profile</h3>
          <button class="modal-close" @click="showModal = false">
            &times;
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveProfile">
            <div class="form-group">
              <label for="first_name">First Name:</label>
              <input
                type="text"
                id="first_name"
                v-model="editedUser.first_name"
                required
              />
              <div v-if="!editedUser.first_name" class="error-message">
                First name is required
              </div>
            </div>
            <div class="form-group">
              <label for="last_name">Last Name:</label>
              <input
                type="text"
                id="last_name"
                v-model="editedUser.last_name"
                required
              />
              <div v-if="!editedUser.last_name" class="error-message">
                Last name is required
              </div>
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input
                type="email"
                id="email"
                v-model="editedUser.email"
                required
              />
              <div v-if="!editedUser.email" class="error-message">
                Email is required
              </div>
            </div>
            <div class="form-group">
              <label for="phone">Phone Number:</label>
              <input
                type="text"
                id="phone"
                required
                :value="formattedPhoneNumber"
                @input="updatePhoneNumber"
              />
              <div v-if="!editedUser.phone" class="error-message">
                Phone number is required
              </div>
            </div>
            <div class="form-group">
              <label for="licensePhoto">Driver's License Photo:</label>
              <input
                type="file"
                id="licensePhoto"
                @change="handleLicensePhotoChange"
              />
              <div v-if="!editedUser.licensePhoto" class="error-message">
                Photo of drivers license is required
              </div>
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="!isValidForm"
            >
              Save
            </button>
            <button type="button" class="btn btn-secondary" @click="cancelEdit">
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../axios";
import store from "../store";

export default {
  data() {
    return {
      user: {},
      bids: [],
      showModal: false,
      editedUser: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        licensePhoto: null,
      },
    };
  },
  created() {
    this.getUserInfo();
    this.getBidHistory();
  },
  methods: {
    getUserInfo() {
      api.get(`user-info/${store.state.userID}`).then((response) => {
        this.user = response.data;
        this.editedUser = { ...response.data };
      });
    },
    getBidHistory() {
      api.get(`bid-history/${store.state.userID}`).then((response) => {
        this.bids = response.data.bids;
      });
    },
    cancelEdit() {
      this.showModal = false;
      this.editedUser = {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
      };
    },
    saveProfile() {
      const formData = new FormData();
      formData.append("first_name", this.editedUser.first_name);
      formData.append("last_name", this.editedUser.last_name);
      formData.append("email", this.editedUser.email);
      formData.append("phone", this.editedUser.phone);
      formData.append("licensePhoto", this.editedUser.licensePhoto);

      api
        .post(`update-user/${store.state.userID}`, formData)
        .then((response) => {
          this.user = response.data;
          this.showModal = false;
        });
    },
    updatePhoneNumber(event) {
      const inputPhoneNumber = event.target.value;
      const phoneNumber = inputPhoneNumber.replace(/\D/g, "").slice(0, 10); // Remove non-digit characters
      let formattedPhoneNumber = "";
      if (phoneNumber.length > 0) {
        formattedPhoneNumber += phoneNumber.slice(0, 3);
        if (phoneNumber.length > 3) {
          formattedPhoneNumber += "-" + phoneNumber.slice(3, 6);
          if (phoneNumber.length > 6) {
            formattedPhoneNumber += "-" + phoneNumber.slice(6);
          }
        }
      }
      this.editedUser.phone = formattedPhoneNumber;
    },
    handleLicensePhotoChange(event) {
      const file = event.target.files[0];
      this.editedUser.licensePhoto = file;
    },
    getFileName(file) {
    if (file) {
      const fileName = file.split('/').pop();
      return fileName;
    }
    return '';
  },
  },
  computed: {
    isValidForm() {
      return (
        this.editedUser.first_name &&
        this.editedUser.last_name &&
        this.editedUser.email
      );
    },
    formattedPhoneNumber() {
      return this.editedUser.phone;
    },
  },
};
</script>

<style>
.account {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.account-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.account-header h1 {
  font-size: 36px;
  font-weight: bold;
}

.account-body {
  display: flex;
  flex-wrap: wrap;
}

.account-info {
  flex-basis: 50%;
  margin-right: 20px;
}

.account-info h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.account-orders {
  flex-basis: 50%;
}

.account-orders h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  font-weight: bold;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

td {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-container {
  position: relative;
  width: 500px;
  margin: 30px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.modal-header h3 {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.modal-close {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.modal-close:hover {
  color: #000;
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #0069d9;
}

.btn-secondary {
  background-color: #f0f0f0;
  color: #333;
  margin-left: 10px;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}
.error-message {
  color: red;
  margin-top: 5px;
}

@media (max-width: 767px) {
  .account-info {
    flex-basis: 100%;
    margin-right: 30px;
  }
  .account-orders {
    flex-basis: 100%;
  }
}
</style>