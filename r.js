// Function to show the relevant content section based on the selected sidebar option
function showContent(sectionId) {
    // Hide all content sections
    var contentSections = document.getElementsByClassName('content-section');
    for (var i = 0; i < contentSections.length; i++) {
        contentSections[i].style.display = 'none';
    }

    // Remove 'active' class from all sidebar links
    var sidebarLinks = document.querySelectorAll('.sidebar a');
    sidebarLinks.forEach(link => link.classList.remove('active'));

    // Show the selected section and highlight the active link
    document.getElementById(sectionId).style.display = 'block';
    document.querySelector(`.sidebar a[href="#${sectionId}"]`).classList.add('active');
}


// Total Monthly Sales Chart
var ctx = document.getElementById('salesChart').getContext('2d');
var salesChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'],
        datasets: [{
            label: 'Total Sales ($)',
            data: [2000, 3500, 3000, 4500, 5000, 6200, 5800, 6700, 7000],
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Customer Statistical Graph
var ctx2 = document.getElementById('customerStatsChart').getContext('2d');
var customerStatsChart = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['New Customers', 'Returning Customers', 'VIP Customers'],
        datasets: [{
            label: 'Customers',
            data: [200, 800, 100],
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Optional: Update the Most Selling Dish dynamically
document.getElementById('mostSellingDish').innerHTML = `
    <h3>Burger Special</h3>
    <p><strong>Sold:</strong> 500 units</p>
    <p><strong>Revenue:</strong> $6,000</p>
`;


// Function to show the appropriate orders table
function showOrders(phase) {
    var allTables = document.getElementsByClassName('orders-table');
    for (var i = 0; i < allTables.length; i++) {
        allTables[i].style.display = 'none';
    }
    document.getElementById(phase).style.display = 'block';
}

// Function to move order to 'In Process'
function moveToInProcess(orderId) {
    alert('Order ' + orderId + ' moved to In Process.');
    // Add logic here to move the order to the 'In Process' section
}

// Function to move order to 'Completed'
function moveToCompleted(orderId) {
    alert('Order ' + orderId + ' marked as Completed.');
    // Add logic here to move the order to the 'Completed' section
}

// Function to filter orders based on search input
function filterOrders(event) {
    const searchText = event.target.value.toLowerCase();
    const orders = document.querySelectorAll('.order');

    orders.forEach(order => {
        const text = order.textContent.toLowerCase();
        order.style.display = text.includes(searchText) ? 'block' : 'none';
    });
}

// Function to show the relevant order phase section
function showOrders(phase) {
    // Hide all order phase sections
    var phases = document.querySelectorAll('.order-phase');
    phases.forEach(phase => phase.classList.remove('active'));

    // Remove 'active' class from all tab buttons
    var buttons = document.querySelectorAll('.tab-menu button');
    buttons.forEach(button => button.classList.remove('active'));

    // Show the selected order phase section and activate the button
    document.getElementById(phase + '-orders').classList.add('active');
    document.querySelector(`.tab-menu button[onclick="showOrders('${phase}')"]`).classList.add('active');
}

// Function to edit item details
function editItemDetails(button, itemName) {
    const itemDiv = button.closest('.item');
    const priceSpan = itemDiv.querySelector('.item-price');
    const descriptionSpan = itemDiv.querySelector('.item-description');

    const newPrice = prompt(`Edit Price for ${itemName}:`, priceSpan.textContent);
    if (newPrice !== null) {
        priceSpan.textContent = newPrice;
    }

    const newDescription = prompt(`Edit Description for ${itemName}:`, descriptionSpan.textContent);
    if (newDescription !== null) {
        descriptionSpan.textContent = newDescription;
    }
}

// Function to add a new item
function addItem() {
    const name = document.getElementById('new-item-name').value;
    const price = document.getElementById('new-item-price').value;
    const description = document.getElementById('new-item-description').value;

    if (name && price && description) {
        const newItem = document.createElement('div');
        newItem.classList.add('item');
        newItem.innerHTML = `
            <h3>Item: ${name}</h3>
            <p>Price: <span class="item-price">$${price}</span></p>
            <p>Description: <span class="item-description">${description}</span></p>
            <button onclick="editItemDetails(this, '${name}')">Edit</button>
        `;
        document.getElementById('item-details').appendChild(newItem);

        // Clear the input fields after adding the item
        document.getElementById('new-item-name').value = '';
        document.getElementById('new-item-price').value = '';
        document.getElementById('new-item-description').value = '';
    } else {
        alert("Please fill in all the fields.");
    }
}

// Function to delete an item
function deleteItem() {
    const itemName = document.getElementById('delete-item-name').value.toLowerCase();

    if (itemName) {
        const items = document.querySelectorAll('.item');
        let found = false;
        items.forEach(item => {
            if (item.querySelector('h3').textContent.toLowerCase().includes(itemName)) {
                item.remove();
                found = true;
            }
        });

        if (!found) {
            alert("Item not found.");
        }

        // Clear the input field after deleting the item
        document.getElementById('delete-item-name').value = '';
    } else {
        alert("Please enter the name of the dish to delete.");
    }
}

// Function to filter items based on search input
function filterItems(event) {
    const searchText = event.target.value.toLowerCase();
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(searchText) ? 'block' : 'none';
    });
}

// Function to create a discount code
function createDiscountCode() {
    const codeName = document.getElementById('discount-code-name').value;
    const discountPercentage = document.getElementById('discount-percentage').value;
    const expirationDate = document.getElementById('discount-expiration').value;

    if (codeName && discountPercentage && expirationDate) {
        const discountTableBody = document.getElementById('discountTableBody');

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td style="padding: 10px; border: 1px solid #ddd;">${codeName}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${discountPercentage}%</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${expirationDate}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">
                <button onclick="deleteDiscountCode(this)">Delete</button>
            </td>
        `;
        discountTableBody.appendChild(newRow);

        // Clear the input fields after adding the discount code
        document.getElementById('discount-code-name').value = '';
        document.getElementById('discount-percentage').value = '';
        document.getElementById('discount-expiration').value = '';
    } else {
        alert("Please fill in all the fields.");
    }
}

// Function to delete a discount code
function deleteDiscountCode(button) {
    const row = button.closest('tr');
    row.remove();
}

        function showSection(sectionId) {
        // Hide all sections
        const sections = document.querySelectorAll('.orders-section');
        sections.forEach(section => {
            section.style.display = 'none';
        });
    
        // Show the selected section
        document.getElementById(sectionId).style.display = 'block';
    
        // Update tab button styles
        const buttons = document.querySelectorAll('.tab-menu button');
        buttons.forEach(button => {
            button.classList.remove('active');
        });
        document.querySelector(`.tab-menu button[onclick="showSection('${sectionId}')"]`).classList.add('active');
    }
    
    // Function to update order status
   /* function updateStatus(selectElement) {
        const orderRow = selectElement.closest('tr.order');
        const newStatus = selectElement.value;
        const orderId = orderRow.dataset.orderId;
        
        // Remove order from its current section
        orderRow.parentElement.removeChild(orderRow);
    
        // Add order to the new section based on status
        const newSection = document.getElementById(`${newStatus.toLowerCase().replace(' ', '-')}-orders`).querySelector('tbody');
        newSection.appendChild(orderRow);
    }*/
    function updateStatus(selectElement) {
        const orderRow = selectElement.closest('tr.order');
        const newStatus = selectElement.value;
        
        // Remove order from its current section
        orderRow.parentElement.removeChild(orderRow);
    
        // Add order to the new section based on status
        const newSection = document.getElementById(`${newStatus.toLowerCase().replace(' ', '-')}-orders`).querySelector('tbody');
        newSection.appendChild(orderRow);
    }
    
    
    // Function to filter orders based on search input
 
    function filterOrders(event) {
        const searchText = event.target.value.toLowerCase();
        const orders = document.querySelectorAll('.orders-section tbody .order');
    
        orders.forEach(order => {
            const text = order.textContent.toLowerCase();
            order.style.display = text.includes(searchText) ? 'table-row' : 'none';
        });
    }
    
    
