// Load Node Packages
express = require('express');
body_parser = require('body-parser');
request = require('request');
csv = require('csv-writer');
fs = require('fs');
app = express();
port = process.env.PORT || 5000

app.use(body_parser.urlencoded({
    extended: false
}));

// Process application/json
app.use(body_parser.json());


app.post('/webhook/', function (req, res) {
    content = req.body
    createCsvWriter = require('csv-writer').createObjectCsvWriter;
    csv_writer = createCsvWriter({
      path: 'users-info.csv',
      header: [
        {id: 'user_name', title: 'User Name'},
        {id: 'user_email', title: 'User Email'},
        {id: 'user_query', title: 'User Query'},
      ],
      append : true
    });

    data = [
      {
        user_name: content.queryResult.parameters.userName,
        user_email: content.queryResult.parameters.userEmail,
        user_query: content.queryResult.parameters.userQuery

      }
    ];

    csv_writer
      .writeRecords(data)
      .then(()=> console.log('The CSV file was written successfully'));

    response =  {
      "fulfillmentText": "Thank You! We have received your query."
    }
  
    res.send(response);
});


// Listen Requests
app.listen(port, function () {
    console.log('webhook is running on port', port)
})