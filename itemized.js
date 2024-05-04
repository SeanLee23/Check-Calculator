function addItem() {
    var itemsDiv = document.getElementById("items");
    var newItemDiv = document.createElement("div");
    newItemDiv.classList.add("item");
    newItemDiv.innerHTML = `
        <input type="text" placeholder="Item Name">
        <input type="number" placeholder="Price ($)">
        <select class="person-select">
            <option value="">Select Person</option>
            <!-- Options will be added dynamically -->
        </select>`;

    var selectElement = newItemDiv.querySelector(".person-select");
    var peopleOptions = document.querySelectorAll("#people input[type='text']");

    peopleOptions.forEach(function(person) {
        var option = new Option(person.value, person.value);
        selectElement.appendChild(option);
    });

    itemsDiv.appendChild(newItemDiv);
}

function addPerson() {
    var peopleDiv = document.getElementById("people");
    var newPersonDiv = document.createElement("div");
    newPersonDiv.classList.add("person");
    newPersonDiv.innerHTML = `
        <input type="checkbox">
        <input type="text" placeholder="Person Name">`;

    peopleDiv.appendChild(newPersonDiv);
}

function calculateItemizedSplit() {
    var totalBill = parseFloat(document.getElementById("total").value);

    if (isNaN(totalBill) || totalBill <= 0) {
        document.getElementById("itemizedSplitResult").innerText = "Please enter a valid number for the total bill amount.";
    } else {
        var items = document.querySelectorAll("#items .item");
        var people = document.querySelectorAll("#people .person");
        var peopleChecked = [];

        people.forEach(function(person) {
            if (person.querySelector("input[type='checkbox']").checked) {
                peopleChecked.push(person.querySelector("input[type='text']").value);
            }
        });

        var personTotals = {};
        peopleChecked.forEach(function(person) {
            personTotals[person] = 0;
        });

        items.forEach(function(item) {
            var itemName = item.querySelector("input[type='text']").value;
            var itemPrice = parseFloat(item.querySelector("input[type='number']").value);
            var assignedPerson = item.querySelector(".person-select").value;

            if (itemName.trim() !== "" && !isNaN(itemPrice) && itemPrice > 0 && assignedPerson !== "") {
                personTotals[assignedPerson] += itemPrice;
            }
        });

        var resultHTML = "<h3>Each person should pay:</h3>";
        resultHTML += "<ul>";
        Object.keys(personTotals).forEach(function(person) {
            var personShare = totalBill / Object.keys(personTotals).length + personTotals[person];
            resultHTML += "<li>" + person + ": $" + personShare.toFixed(2) + "</li>";
        });
        resultHTML += "</ul>";

        document.getElementById("itemizedSplitResult").innerHTML = resultHTML;
    }
}