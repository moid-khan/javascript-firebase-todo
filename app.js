var table = document.getElementById("table");
//Firebase Database Reference
var database = firebase.database().ref("todos");

var count = 1;

function delete_row(e) {
  database.child(e.id).remove();

  e.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode);

  resetCount();
}

function edit_row(e) {
  var editName = prompt(
    "Enter updated Name",
    e.parentNode.parentNode.childNodes[1].innerText
  );

  var updatedToDo = {
    value: editName,
    key: e.id,
  };

  database.child(e.id).set(updatedToDo);
  e.parentNode.parentNode.childNodes[1].innerText = editName;
}

//Get data from database
database.on("child_added", function (data) {

  var tr = document.createElement("tr");
  var tdIndex = document.createElement("td");
  var tdName = document.createElement("td");
  var tdBtn = document.createElement("td");
  var btnDelete = document.createElement("img");
  var btnEdit = document.createElement("img");

  var countText = document.createTextNode(count++);
  var nameText = document.createTextNode(data.val().value);
  var btnDeleteText = document.createTextNode("Delete");
  var btnEditText = document.createTextNode("Edit");

  btnDelete.setAttribute("id", data.val().key);
  btnDelete.setAttribute("onclick", "delete_row(this)");
  btnEdit.setAttribute("id", data.val().key);
  btnEdit.setAttribute("onclick", "edit_row(this)");

  tdIndex.appendChild(countText);
  tdName.appendChild(nameText);

  tr.appendChild(tdIndex);
  tr.appendChild(tdName);
  tr.appendChild(tdBtn);

  tdBtn.appendChild(btnEdit);
  tdBtn.appendChild(btnDelete);

  table.appendChild(tr);

  btnEdit.src = "icons/edit.png";
  btnDelete.src = "icons/delete.png";

  tr.className += "shadow";
  btnDelete.classList.add("ml-1");
});

function insertData() {
  var name = document.getElementById("txtName");

  var key = database.push().key;
  var todo = {
    value: name.value,
    key: key,
  };

  if (name.value !== "") {
    database.child(key).set(todo);
  } else {
    alert("Please enter todo");
  }

  name.value = "";
}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

var time = document.getElementById("time");
time.innerHTML = "<strong>" + formatAMPM(new Date()) + "</strong>";

function resetCount() {
  if (table.innerHTML == "") {
    count = 1;
  }
}
