// Toggle sections visibility based on the menu click
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    const activeSection = document.getElementById(sectionId);
    activeSection.classList.add('active');
}

// Example function for managing shop menu update
function updateMenu() {
    const shop = document.getElementById('shops').value;
    alert(`Menu for ${shop} updated!`);
}

// Sample data for charts
const ctx1 = document.getElementById('customerChart').getContext('2d');
const customerChart = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
            label: '# of Customers',
            data: [12, 19, 3, 5, 2],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const ctx2 = document.getElementById('salesChart').getContext('2d');
const salesChart = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
            label: 'Sales in USD',
            data: [500, 800, 400, 600, 700],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function searchUsers() {
    const input = document.getElementById('userSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#userTable tbody tr');
    
    rows.forEach(row => {
        const columns = row.querySelectorAll('td');
        let matchFound = false;
        columns.forEach(column => {
            if (column.textContent.toLowerCase().includes(input)) {
                matchFound = true;
            }
        });
        row.style.display = matchFound ? '' : 'none';
    });
}

document.getElementById('discountForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const code = document.getElementById('code').value;
    const percentage = document.getElementById('percentage').value;
    const expiryDate = document.getElementById('expiry-date').value;
    
    // Validation checks
    if (!code) {
        alert('Discount code cannot be empty.');
        return;
    }
    
    if (percentage < 0 || percentage > 100) {
        alert('Please enter a valid discount percentage between 0 and 100.');
        return;
    }

    if (!expiryDate) {
        alert('Please enter an expiry date.');
        return;
    }

    // Display success message
    alert(`Discount Code ${code} with ${percentage}% discount has been created/updated. Expiry Date: ${expiryDate}`);
    
    // Log values (or send them to server)
    console.log('Discount Code:', code);
    console.log('Discount Percentage:', percentage);
    console.log('Expiry Date:', expiryDate);

    // Add logic here to process the form data or send it to a server
    
});



// Sample data for order history
// Sample order history data
const orderHistory = {
    1: [
        { orderId: 101, orderDate: '2024-09-15', paymentMode: 'Online', received: true, paymentDone: true },
        { orderId: 102, orderDate: '2024-09-16', paymentMode: 'Offline', received: false, paymentDone: true },
    ],
    2: [
        { orderId: 201, orderDate: '14-09-2024', paymentMode: 'Online', received: true, paymentDone: true },
        { orderId: 202, orderDate: '18-08-2024', paymentMode: 'Offline', received: true, paymentDone: true },
        { orderId: 202, orderDate: '17-08-2024', paymentMode: 'Offline', received: false, paymentDone: false },
    ],
    3: [
        { orderId: 301, orderDate: '2024-09-12', paymentMode: 'Online', received: true, paymentDone: true },
        { orderId: 302, orderDate: '2024-09-19', paymentMode: 'Offline', received: false, paymentDone: true },
    ],
};

// Function to show order history and hide the customer table
// Function to show order history and hide the customer table
function showOrderHistory(userId) {
    // Hide the customer table
    const customerTable = document.querySelector('.user-table-box');
    customerTable.style.display = 'none'; // Hide the customer table

    // Hide the "Manage Users" heading and search input
    document.querySelector('#manage-users h1').style.display = 'none'; // Hide heading
    document.getElementById('userSearch').style.display = 'none';      // Hide search input

    // Set the customer name in the order history section
    const user = document.querySelector(`[data-user="${userId}"] td:nth-child(2)`).innerText;
    document.getElementById('customer-name').innerText = user;

    // Clear any previous order history
    const orderTableBody = document.querySelector('#orderHistoryTable tbody');
    orderTableBody.innerHTML = '';

    // Fetch and populate order history data
    const orders = orderHistory[userId];
    if (orders) {
        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.orderId}</td>
                <td>${order.orderDate}</td>
                <td>${order.paymentMode}</td>
            `;

            const paymentCell = document.createElement('td');
            if (!order.paymentDone && !order.received) {
                // Add a red button if payment is not done AND order is not received
                paymentCell.innerHTML = `<button class="take-action-red" onclick="takeAction(${order.orderId})">Take Action</button>`;
            } else if (!order.paymentDone) {
                // If only payment is not done, show regular orange "Not Done" text
                paymentCell.innerText = 'Not Done';
                paymentCell.style.backgroundColor = 'orange';
            } else {
                // Regular payment mode cell if everything is fine
                paymentCell.innerText = order.paymentMode;
            }

            row.appendChild(paymentCell);
            orderTableBody.appendChild(row);
        });
    }

    // Show the order history table
    const orderHistorySection = document.getElementById('order-history');
    orderHistorySection.style.display = 'block'; // Ensure it's visible

    // Show the back button
    document.getElementById('backButton').style.display = 'inline';
}

// Function to go back to the customer list
function goBackToCustomerList() {
    // Show the customer table again
    const customerTable = document.querySelector('.user-table-box');
    customerTable.style.display = 'block';

    // Show the "Manage Users" heading and search input again
    document.querySelector('#manage-users h1').style.display = 'block'; // Show heading
    document.getElementById('userSearch').style.display = 'block';      // Show search input

    // Hide the order history section
    const orderHistorySection = document.getElementById('order-history');
    orderHistorySection.style.display = 'none';

    // Hide the back button
    document.getElementById('backButton').style.display = 'none';
}

// Function to handle the Take Action button
function takeAction(orderId) {
    alert(`Take action for Order ID: ${orderId}`);
    // Add your action logic here (e.g., redirect to a specific page or open a modal)
}

