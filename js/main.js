var selectedRow = null;

// Show Alerts

function showAlert(message, className){
  const div = document.createElement("div");
  div.className = `alert alert-${className}`; 

  div.appendChild(document.creatTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector("div, main");
  container.insertBefore(div, main);

  setTimeout(()=> document.querySelector(".alert").remove(),3000);
}

// Clear All Fields
function  clearFields(){
  document.querySelector("#firstName").value = "";
  document.querySelector("#LastName").value = "";
  document.querySelector("#rollNo").value = "";
}

// Add Data 

document.querySelector("#student-form").addEventListener("submit",(e)=>{
  e.preventDefault();

  // Get Form Values 
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const rollNo = document.querySelector("#rollName").value;


  // Validate
  
  if (firstName == "" || lastName == "" || rollNo == ""){
    showAlert("Please fill in all fields", "danger");
  }
  else{
    if(selectedRow == null){
      const list = document.querySelector("#student-list");
      const row = document.creatElement("tr");

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
      showAlert("Student Added","success");
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

document.querySelector("#Student-list").addEventListener("click",(e)=>{
  target = e.target;
  if(target.classList.contains("edit")){
    selectedRow = target.parentElement.parentElement;
    document.querySelector("#firstName").value = selectedRow.children[0].textContent;
    document.querySelector("#lastName").value = selectedRow.children[1].textContent;
    document.querySelector("#rollNo").value = selectedRow.children[2].textContent;
  }
});


// Delete Data

document.querySelector("#student-list").addEventListener("click",(e)=>{
    target = e.target;
    if(target.classList.contains("delete")){
      target.parentElement.parentElement.remove();
      showAlert("Student Data Delete","danger");
    }
});