// Função para adicionar um produto
function addProduct(event) {
    event.preventDefault();
  
    const nameInput = document.getElementById("name");
    const priceInput = document.getElementById("price");
    const quantityInput = document.getElementById("quantity");
  
    const name = nameInput.value;
    const price = parseFloat(priceInput.value);
    const quantity = parseInt(quantityInput.value);
  
    if (!name || !price || !quantity) {
      return;
    }
  
    const total = price * quantity;
  
    const productRow = `
      <tr>
          <td>${name}</td>
          <td>${price}</td>
          <td>${quantity}</td>
          <td>${total}</td>
          <td><button class="remove-button">Remover</button></td>
      </tr>
    `;
  
    const productTableBody = document.getElementById("product-table-body");
    productTableBody.innerHTML += productRow;
  
    const totalElement = document.getElementById("total");
    const currentTotal = parseFloat(totalElement.innerText) || 0;
    totalElement.innerText = currentTotal + total;
  
    nameInput.value = "";
    priceInput.value = "";
    quantityInput.value = "";
  }
  
  // Função para remover um produto
  function removeProduct(event) {
    if (event.target.classList.contains("remove-button")) {
      const row = event.target.parentNode.parentNode;
      const total = parseFloat(row.childNodes[3].innerText);
  
      row.remove();
  
      const totalElement = document.getElementById("total");
      const currentTotal = parseFloat(totalElement.innerText);
      totalElement.innerText = currentTotal - total;
    }
  }
  
  // Função para salvar a lista de compras
  function saveList() {
    const rows = document.querySelectorAll("#product-table-body tr");
    if (rows.length === 0) {
      return;
    }
  
    let csvContent = "data:text/csv;charset=utf-8,";
  
    rows.forEach((row) => {
      const name = row.childNodes[0].innerText;
      const price = parseFloat(row.childNodes[1].innerText);
      const quantity = parseInt(row.childNodes[2].innerText);
  
      csvContent += `${name},${price},${quantity}\n`;
    });
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "shopping_list.csv");
    document.body.appendChild(link);
  
    link.click();
  }
  
  // Função para carregar a lista de compras
  function loadList(event) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv";
  
    input.onchange = function () {
      const file = input.files[0];
      const reader = new FileReader();
  
      reader.onload = function (e) {
        const contents = e.target.result;
        const rows = contents.split("\n");
  
        const productTableBody = document.getElementById("product-table-body");
        productTableBody.innerHTML = "";
  
        let total = 0;
  
        rows.forEach((row) => {
          const [name, price, quantity] = row.split(",");
  
          if (name && price && quantity) {
            const total = parseFloat(price) * parseInt(quantity);
  
            const productRow = `
              <tr>
                  <td>${name}</td>
                  <td>${price}</td>
                  <td>${quantity}</td>
                  <td>${total}</td>
                  <td><button class="remove-button">Remover</button></td>
              </tr>
            `;
  
            productTableBody.innerHTML += productRow;
            total += total;
          }
        });
  
        const totalElement = document.getElementById("total");

        totalElement.innerText = total.toFixed(2);
    };

    reader.readAsText(file);
  };

  input.click();
}

// Adicionar evento de submit para o formulário
const productForm = document.getElementById("product-form");
productForm.addEventListener("submit", addProduct);

// Adicionar evento de click para remover produtos
const productTableBody = document.getElementById("product-table-body");
productTableBody.addEventListener("click", removeProduct);

// Adicionar evento de click para salvar lista
const saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", saveList);

// Adicionar evento de click para carregar lista
const loadButton = document.getElementById("load-button");
loadButton.addEventListener("click", loadList);

  