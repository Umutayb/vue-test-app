<template>
  <div>
    <!-- Your content for the Forms category page -->
    <h1>Forms Page!</h1>
    <a>Wellcome to Forms Page!</a>
    <h2>Student Registration Form</h2>
    <form @submit.prevent="submitForm">
      <label for="name">Name:</label><br>
      <input type="text" id="name" name="name" placeholder="John Smith" v-model="formData.name"><br>
      <p v-if="shouldShowError('formData.name')" class="error-message">Fill out this field!</p>
      <label for="email">Email:</label><br>
      <input type="email" id="email" name="email" placeholder="example@email.com" v-model="formData.email"><br>
      <label for="gender">Gender:</label><br>
      <select id="gender" name="gender" v-model="formData.gender">
        <option disabled value="default">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select><br>
      <label for="mobile">Mobile (10 Digits):</label><br>
      <input type="tel" id="mobile" name="mobile" placeholder="0000 00 00 00" pattern="[0-9]{10}" v-model="formData.mobile"><br>
      <label for="dob">Date of Birth:</label><br>
      <input type="date" id="dob" name="dob" v-model="formData.dob"><br>
      <label for="hobbies">Hobbies:</label><br>
      <input type="text" id="hobbies" name="hobbies" placeholder="Cooking, Reading..." v-model="formData.hobbies"><br>
      <!--
        <label for="picture">Picture:</label><br>
        <input type="file" id="picture" name="picture" v-model="formData.picture"><br>
      -->
      <label for="currentAddress">Current Address:</label><br>
      <input type="text" id="currentAddress" name="currentAddress" placeholder="111B 12" v-model="formData.currentAddress"><br>
      <label for="city">City:</label><br>
      <input id="city" name="city" placeholder="New York" v-model="formData.city"><br>      
      <input type="submit" value="Submit">
    </form>

    <!-- Modal -->
    <div class="modal" v-show="showModal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Submitted Information</h2>
        <table class="submitted-info-table">
          <tr v-for="(value, key) in filteredFormDataWithCapitalizedKeys" :key="key">
            <td class="table-key">{{ capitalizeFirstLetter(key) }}</td>
            <td class="table-value">{{ value }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        gender: 'default'
      },
      formSubmitted: false, // Added flag to track form submission
      showModal: false
    };
  },
  methods: {
    capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    shouldDisplayField(key) {
    // If the field is 'gender' and its value is 'default', don't display it
    return key !== 'gender' || this.formData[key] !== 'default';
    },
    isRequired(fieldName) {
      // Define a function to check if a field is required
      const requiredFields = ['formData.name'];
      return requiredFields.includes(fieldName);
    },
    submitForm() {
      // Check if required fields are filled out before submission
      if (!this.formData.name) {
        // Show the error message
        this.formSubmitted = true;
        return;
      }

      // Convert form data to JSON
      const formDataJson = JSON.stringify(this.formData);
      console.log('LOG:' + formDataJson);

      // Set the formSubmitted flag to true
      this.showModal = true;
    },
    closeModal() {
      // Close the modal
      this.showModal = false;
      this.formSubmitted = false;
    },
    shouldShowError(fieldName) {
      return this.formSubmitted && !this.formData[fieldName];
    }
  },
  computed: {
    filteredFormData() {
      // Create a copy of formData and filter out 'gender' if its value is 'default'
      const filteredData = { ...this.formData };
      if (filteredData.gender === 'default') delete filteredData.gender;
      return filteredData;
    },
    filteredFormDataWithCapitalizedKeys() {
      return Object.fromEntries(
        Object.entries(this.filteredFormData).map(([key, value]) => [this.capitalizeFirstLetter(key), value])
      );
    }
  }
};
</script>

<style>

form {
  width: 300px;
  margin: 0 auto;
}

label {
  display: block;
  margin-top: 10px;
}

input, select {
  width: 100%;
  padding: 5px;
  margin-top: 5px;
}

input[type="file"] {
  margin-top: 15px;
}

input[type="submit"] {
  margin-top: 20px;
} 

/* Modal styles */
.modal {
  position: fixed;
  z-index: 10000; /* Set a high z-index value */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

/* Table styles */
.submitted-info-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

.submitted-info-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.submitted-info-table .table-key {
  font-weight: bold;
  background-color: #f2f2f2;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>