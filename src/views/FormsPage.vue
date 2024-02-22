<template>
  <div>
    <!-- Your content for the Forms category page -->
    <h1>Forms Page!</h1>
    <a>Wellcome to Forms Page!</a>
    <h2>Student Registration Form</h2>
    <form>
      <label for="name">Name:</label><br>
      <input type="text" id="name" name="name"><br>
      <label for="email">Email:</label><br>
      <input type="email" id="email" name="email"><br>
      <label for="gender">Gender:</label><br>
      <select id="gender" name="gender">
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select><br>
      <label for="mobile">Mobile (10 Digits):</label><br>
      <input type="tel" id="mobile" name="mobile" pattern="[0-9]{10}"><br>
      <label for="dob">Date of Birth:</label><br>
      <input type="date" id="dob" name="dob"><br>
      <label for="subjects">Subjects:</label><br>
      <input type="text" id="subjects" name="subjects"><br>
      <label for="hobbies">Hobbies:</label><br>
      <input type="text" id="hobbies" name="hobbies"><br>
      <label for="picture">Picture:</label><br>
      <input type="file" id="picture" name="picture"><br>
      <label for="currentAddress">Current Address:</label><br>
      <input type="text" id="currentAddress" name="currentAddress"><br>
      <label for="state">State:</label><br>
      <select id="state" name="state">
      <!-- options for states go here -->
      </select><br>
      <label for="city">City:</label><br>
      <select id="city" name="city">
      <!-- options for cities go here -->
      </select><br>
    <input type="submit" value="Submit">
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        gender: '',
        // add other form fields here
      }
    };
  },
  methods: {
    submitForm() {
      // Convert form data to JSON
      const formDataJson = JSON.stringify(this.formData);

      // You can now do something with the JSON data, for example, send it to a server
      console.log(formDataJson);
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
</style>