// Toggle fields for Login
function toggleLoginFields() {
  const userType = document.getElementById('login-user-type').value;
  const customerFields = document.getElementById('customer-fields');
  const ownerFields = document.getElementById('owner-fields');
  const adminFields = document.getElementById('admin-fields');

  if (userType === 'customer') {
      customerFields.style.display = 'block';
      ownerFields.style.display = 'none';
      adminFields.style.display = 'none';
  } else if (userType === 'owner') {
      customerFields.style.display = 'none';
      ownerFields.style.display = 'block';
      adminFields.style.display = 'none';
  } else if (userType === 'admin') {
      customerFields.style.display = 'none';
      ownerFields.style.display = 'none';
      adminFields.style.display = 'block';
  }
}
/*

// Show Registration Form with Customer as default
function showRegistration() {
  document.querySelector('.login-container').style.display = 'none';
  document.querySelector('.register-container').style.display = 'flex';

  // Reset the registration form to default (Customer)
  document.getElementById('register-user-type').value = 'customer';
  toggleRegistrationFields(); // Ensure customer fields are displayed by default
}
*/




function showRegistration() {
  document.querySelector('.login-container').style.display = 'none';
  document.querySelector('.register-container').style.display = 'flex';

  // Reset the registration form to default (Customer)
  document.getElementById('register-form').innerHTML = `
      <label for="register-user-type">Register As:</label>
      <select id="register-user-type" name="user-type" onchange="toggleRegistrationFields()">
          <option value="customer">Customer</option>
          <option value="owner">Owner</option>
      </select>

      <label for="name">Name:</label>
      <input type="text" id="name" name="name" placeholder="Enter your full name" required>

      <label for="password">Password:</label>
      <input type="password" id="password" name="password" placeholder="Enter your password" required>

      <label for="contact">Contact Number:</label>
      <input type="contact" id="contact" name="contact" placeholder="Enter your contact number" required>

      <div id="register-owner-fields" style="display: none;">
          <label for="restaurant-name">Restaurant Name:</label>
          <input type="text" id="restaurant-name" name="restaurant-name" placeholder="Enter your restaurant's name">
          
          <label for="fssai-license">FSSAI License Number:</label>
          <input type="text" id="fssai-license" name="fssai-license" placeholder="Enter your FSSAI license number">

          <label for="pan-card">PAN Card:</label>
          <input type="file" id="pan-card" name="pan-card" accept="image/*">

          <label for="gst-license">GST Number:</label>
          <input type="text" id="gst" name="gst" placeholder="Enter your gst number">

          <label for="business-license">Business License Number:</label>
          <input type="text" id="business-license" name="business-license" placeholder="Enter your business license number">

          <label for="menu">Upload Menu:</label>
          <input type="file" id="menu" name="menu" accept=".xlsx, .xls">
      </div>

      <button type="submit">Register</button>
      <p>Already have an account? <a href="#" onclick="showLogin()">Login here</a></p>
  `;

  // Set default user type to 'customer'
  document.getElementById('register-user-type').value = 'customer';
  toggleRegistrationFields(); // Ensure customer fields are displayed by default
}




// Toggle fields for Registration based on the user type
function toggleRegistrationFields() {
  const userType = document.getElementById('register-user-type').value;
  const ownerFields = document.getElementById('register-owner-fields');
  const adminFields = document.getElementById('register-admin-fields'); // Assuming you have admin fields too

  if (userType === 'owner') {
      ownerFields.style.display = 'block'; // Show owner fields
      adminFields.style.display = 'none'; // Hide admin fields
  } else if (userType === 'admin') {
      ownerFields.style.display = 'none'; // Hide owner fields
      adminFields.style.display = 'block'; // Show admin fields
  } else {
      ownerFields.style.display = 'none'; // Hide owner fields for customer
      adminFields.style.display = 'none'; // Hide admin fields for customer
  }
}

// Show Login Form
function showLogin() {
  document.querySelector('.register-container').style.display = 'none';
  document.querySelector('.login-container').style.display = 'flex';
}



// Validate Login Fields (ID and Password must both be entered)
document.getElementById('login-form').addEventListener('submit', function (event) {
  const userType = document.getElementById('user-type').value;
  let isValid = true;

  if (userType === 'owner') {
      const restaurantName = document.getElementById('restaurant-name-login').value;
      if (!restaurantName) {
          isValid = false;
          alert('Please enter your restaurant name.');
      }
  } else if (userType === 'admin') {
      const adminId = document.getElementById('admin-id').value;
      if (!adminId) {
          isValid = false;
          alert('Please enter your Admin ID.');
      }
  }

  const password = document.getElementById('password').value;
  if (!password) {
      isValid = false;
      alert('Please enter your password.');
  }

  if (!isValid) {
      event.preventDefault(); // Prevent form submission if fields are invalid
  }
});

function showCommonRegistration() {
  showRegistration(); // Calls the existing showRegistration function
}

// Show Admin Registration Form
function showAdminRegistration() {
  document.querySelector('.register-container').style.display = 'flex';
  document.querySelector('.login-container').style.display = 'none';

  document.getElementById('register-form').innerHTML = `
      <h2>Admin Registration</h2>
      <label for="admin-name">Admin Name:</label>
      <input type="text" id="admin-name" name="admin-name" placeholder="Enter your name" required>

      <label for="admin-id">Admin ID:</label>
      <input type="text" id="admin-id" name="admin-id" placeholder="Enter your Admin ID" required>

      <label for="password">Password:</label>
      <input type="password" id="password" name="password" placeholder="Enter your password" required>

      <button type="submit">Register</button>
      <p>Already have an account? <a href="#" onclick="showLogin()">Login here</a></p>
  `;
}

