function calculate() {
    var totalBill = parseFloat(document.getElementById("total").value);
    var numPeople = parseInt(document.getElementById("people").value);

    if (isNaN(totalBill) || isNaN(numPeople) || totalBill <= 0 || numPeople <= 0) {
        document.getElementById("result").innerText = "Please enter valid numbers for total bill and number of people.";
    } else {
        var eachPersonShare = totalBill / numPeople;
        document.getElementById("result").innerText = "Each person should pay: $" + eachPersonShare.toFixed(2);
    }
}

function calculateEvenSplit() {
    var totalBill = parseFloat(document.getElementById("total").value);
    var taxRate = parseFloat(document.getElementById("tax").value);
    var numPeople = parseInt(document.getElementById("people").value);

    if (isNaN(totalBill) || isNaN(taxRate) || isNaN(numPeople) || totalBill <= 0 || taxRate < 0 || numPeople <= 0) {
        document.getElementById("evenSplitResult").innerText = "Please enter valid numbers for total bill, tax rate, and number of people.";
    } else {
        var taxAmount = (totalBill * taxRate) / 100;
        var totalWithTax = totalBill + taxAmount;

        var sharePerPerson = totalWithTax / numPeople;

        document.getElementById("evenSplitResult").innerHTML = "Each person should pay: $" + sharePerPerson.toFixed(2);

        generatePieChart(totalBill, taxAmount, numPeople);
    }
}

function generatePieChart(totalBill, taxAmount, numPeople) {
    var netTotal = totalBill + taxAmount;
    var sharePerPerson = netTotal / numPeople;
    var taxPercentage = (taxAmount / netTotal) * 100;
    var netPercentage = 100 - taxPercentage;

    var ctx = document.getElementById('pieChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Tax', 'Net Total'],
            datasets: [{
                data: [taxPercentage, netPercentage],
                backgroundColor: ['#FF6384', '#36A2EB']
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Split of the Check (Including Tax)'
            }
        }
    });
}

function calculateEvenSplit() {
    var totalBill = parseFloat(document.getElementById("total").value);
    var taxRate = parseFloat(document.getElementById("tax").value);
    var tipAmount = parseFloat(document.getElementById("tip").value);
    var numPeople = parseInt(document.getElementById("people").value);

    if (isNaN(totalBill) || isNaN(taxRate) || isNaN(tipAmount) || isNaN(numPeople) || totalBill <= 0 || taxRate < 0 || numPeople <= 0) {
        document.getElementById("evenSplitResult").innerText = "Please enter valid numbers for total bill, tax rate, tip amount, and number of people.";
    } else {
        var taxAmount = (totalBill * taxRate) / 100;

        var totalWithTaxAndTip = totalBill + taxAmount + tipAmount;

        var sharePerPerson = totalWithTaxAndTip / numPeople;

        document.getElementById("evenSplitResult").innerHTML = "Each person should pay: $" + sharePerPerson.toFixed(2);

        generatePieChart(totalBill, taxAmount, tipAmount, numPeople);
    }
}

function generatePieChart(totalBill, taxAmount, tipAmount, numPeople) {
    var netTotal = totalBill + taxAmount + tipAmount;
    var sharePerPerson = netTotal / numPeople;

    var taxPercentage = (taxAmount / netTotal) * 100;
    var tipPercentage = (tipAmount / netTotal) * 100;
    var netPercentage = 100 - taxPercentage - tipPercentage;

    var ctx = document.getElementById('pieChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Tax', 'Tip', 'Net Total'],
            datasets: [{
                data: [taxPercentage, tipPercentage, netPercentage],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Split of the Check (Including Tax and Tip)'
            }
        }
    });
}