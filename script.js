// Object to store orders for each table
let orders = {
    table1: [],
    table2: [],
    table3: [],
  };
  
  // Load orders from local storage when the page loads
  function loadOrdersFromLocalStorage() {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      orders = JSON.parse(storedOrders);
      // Display the orders for each table when the page loads
      for (const table in orders) {
        const tableElement = document.getElementById(table);
        tableElement.innerHTML = `<h2>${table.charAt(0).toUpperCase() + table.slice(1)}</h2>`;
        for (let i = 0; i < orders[table].length; i++) {
          const order = orders[table][i];
          const orderElement = createOrderElement(order.price, order.dish, i, table);
          tableElement.appendChild(orderElement);
        }
      }
    }
  }
  
  // Save orders to local storage
  function saveOrdersToLocalStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
  }
  
  function addToBill() {
    const price = document.getElementById("price").value;
    const dish = document.getElementById("dish").value;
    const table = document.getElementById("table").value;
  
    // Update orders object with the new order
    orders[table].push({ price, dish });
  
    // Save updated orders to local storage
    saveOrdersToLocalStorage();
  
    // Display the new order on the bill
    const orderIndex = orders[table].length - 1;
    const tableElement = document.getElementById(table);
    const orderElement = createOrderElement(price, dish, orderIndex, table);
    tableElement.appendChild(orderElement);
  }
  
  function createOrderElement(price, dish, orderIndex, table) {
    const orderElement = document.createElement("div");
    orderElement.classList.add("order");
    orderElement.textContent = `Price: $${price} - Dish: ${dish}`;
  
    // Delete Order button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Order";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", () => {
      orders[table].splice(orderIndex, 1);
      saveOrdersToLocalStorage();
      loadOrdersFromLocalStorage();
    });
    orderElement.appendChild(deleteButton);
  
    // Edit Order button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit Order";
    editButton.classList.add("edit-btn");
    editButton.addEventListener("click", () => {
      document.getElementById("price").value = price;
      document.getElementById("dish").value = dish;
      orders[table].splice(orderIndex, 1);
      saveOrdersToLocalStorage();
      loadOrdersFromLocalStorage();
    });
    orderElement.appendChild(editButton);
  
    return orderElement;
  }
  
  // Load orders from local storage when the page loads
  window.addEventListener('load', () => {
    loadOrdersFromLocalStorage();
  });
  