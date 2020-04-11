$(document).ready(function(){

    console.log('hi man!');
    loaddata();

});

function Row ( projectname, amount, employername, employerlogin ) {
    this.projectname = projectname;
    this.amount = amount;
    this.employername = employername;
    this.employerlogin = employerlogin;
};

function loaddata() {
    fetch('/proxy.php').then((response) => response.json())
        .then((responseData) => {
            loadtable(responseData);
            loadpie(responseData);
        });
}

function loadtable(responseData) {
    var data = [];
    responseData.data.forEach(function(item, i, arr) {

        let nameproject = item.attributes.name;

        let employerlogin = '';
        let employername = '';
        if (item.attributes.employer !== null){

            employerlogin = item.attributes.employer.login;
            employername = item.attributes.employer.first_name;
        }else{
            employerlogin = 'Не задано!';
            employername = 'Не задано!';
        }


        let amount = '';
        if (item.attributes.budget !== null){
            console.log(item.attributes.budget);
            amount = item.attributes.budget.amount + " " + item.attributes.budget.currency;
        }else{
            amount = 'Не задано!';
        }

        data.push(new Row(nameproject, amount, employername, employerlogin));
    });

    $('#ibcTable').DataTable( {
        data: data,
        columns: [
            { data: 'projectname' },
            { data: 'amount' },
            { data: 'employername' },
            { data: 'employerlogin' }
        ]
    } );
}

function loadpie(responseData) {


    var nullbudget = 0;
    var less500 = 0;
    var less1000 = 0;
    var less5000 = 0;
    var more5000 = 0;
    responseData.data.forEach(function(item, i, arr) {

        if (item.attributes.budget === null){
            nullbudget++;
        }else{
            if(item.attributes.budget.amount < 500) {
                less500++;
            } else if (item.attributes.budget.amount > 500 && item.attributes.budget.amount < 1000) {
                less1000++;
            } else if (item.attributes.budget.amount > 1000 && item.attributes.budget.amount < 5000) {
                less5000++;
            }else if (item.attributes.budget.amount > 5000) {
                more5000++;
            }
        }

    });

    var data = [nullbudget, less500, less1000, less5000, more5000];

    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Не задан', 'до 500 грн', '500-1000 грн', '1000-5000 грн', 'более 5000 грн'],
            datasets: [{
                label: '# of Votes',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}