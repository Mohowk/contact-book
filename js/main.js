let selectedRow = null;

// Show Alerts

function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;

  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector("div, main");
  container.after(div, main);

  setTimeout(() => document.querySelector(".alert").remove(), 1000);
}

// Clear All Fields
function clearFields() {
  document.querySelector("#firstName").value = "";
  document.querySelector("#LastName").value = "";
  document.querySelector("#rollNo").value = "";
}

function readData() {
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", "[]");
  }
  let data = JSON.parse(localStorage.getItem("users"));
  data.forEach((item, index) => {
    const list = document.querySelector("#student-list");
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${item.firstName}</td>
            <td>${item.lastName}</td>
            <td>${item.rollNo}</td>
            <td>
            <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
            <a href="#" class="btn btn-danger btn-sm delete" id="${index}">Delete</a>
        `;
    list.appendChild(row);
  });
}

// Add Data

document.querySelector("#student-form").addEventListener("submit", e => {
  e.preventDefault();

  // Get Form Values
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#LastName").value;
  const rollNo = document.querySelector("#rollNo").value;

  // Validate

  if (firstName == "" || lastName == "" || rollNo == "") {
    showAlert("Please fill in all fields", "danger");
  } else {
    if (selectedRow == null) {
      const list = document.querySelector("#student-list");
      const row = document.createElement("tr");
      if (!localStorage.getItem("users")) {
        localStorage.setItem("users", "[]");
      }
      let data = JSON.parse(localStorage.getItem("users"));
      let newObj = {
        firstName: firstName,
        lastName: lastName,
        rollNo: rollNo,
      };
      data.push(newObj);
      localStorage.setItem("users", JSON.stringify(data));
      row.innerHTML = `
          <td>${firstName}</td>
          <td>${lastName}</td>
          <td>${rollNo}</td>
          <td>
          <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
          <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
      `;
      list.appendChild(row);
      selectedRow = null;
      showAlert("Student Added", "success");
    }
    // else{
    //   selectedRow.children[0].textContent = firstName;
    //   selectedRow.children[1].textContent = lastName;
    //   selectedRow.children[2].textContent = rollNO;
    //   selectedRow = null;
    //   showAlert("Student info Edited","info");
    // }

    clearFields();
  }
});

// Edit Data

document.querySelector("#student-list").addEventListener("click", e => {
  target = e.target;
  if (target.classList.contains("edit")) {
    selectedRow = target.parentElement.parentElement;
    document.querySelector("#firstName").value =
      selectedRow.children[0].textContent;
    document.querySelector("#lastName").value =
      selectedRow.children[1].textContent;
    document.querySelector("#rollNo").value =
      selectedRow.children[2].textContent;
  }
});

// Delete Data

document.querySelector("#student-list").addEventListener("click", e => {
  target = e.target;
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
    showAlert("Student Data Delete", "danger");
  }
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", "[]");
  }
  let data = JSON.parse(localStorage.getItem("users"));
  data.splice(e.target.id, 1);
  localStorage.setItem("users", JSON.stringify(data));
});

readData();
