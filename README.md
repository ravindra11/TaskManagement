####

### for running app

please change database connection in app.js file.

please follow steps

npm install

node app.js

for Running test cases:-

enter commond as in another shell

grunt mochaTest

get All documents:-

http://localhost:8080/v1/task/managements  


create a document:-

http://localhost:8080/v1/task/managements  

header: Content-Type  application/json


data:-   {
    "name": "helloAll12345",
    "endDate": "Mon, 30 Dec 2017 11:21:15 GMT",
    "description": "subject",
    "createdBy": "Ravindra"
    }

update a document:-

http://localhost:8080/v1/task/managements/5a40df3a4579741360ee2c0c

header: Content-Type  application/json


delete a document:-

http://localhost:8080/v1/task/managements/5a40df3a4579741360ee2c0c


filter url:-

for date = new Date.toGMTString();

http://localhost:8080/v1/task/managements?afterEndDate=Mon, 28 Dec 2017 11:21:15 GMT

http://localhost:8080/v1/task/managements?beforeEndDate=Mon, 28 Dec 2017 11:21:15 GMT 

http://localhost:8080/v1/task/managements?createdAfterDate=Mon, 26 Dec 2017 11:21:15 GMT 

http://localhost:8080/v1/task/managements?createdBy=ravindra 



search:-

http://localhost:8080/v1/task/managements/search?name=name

http://localhost:8080/v1/task/managements/search?description=text


Auto complete API:-

post with 

header : Content-Type  application/json

data as   {name:"no"}      note:  please add minimum two digits in input data.

http://localhost:8080/v1/auto/complete

###   for create document in autocomplete collection use this

http://localhost:8080/v1/auto/complete/post

header : Content-Type  application/json

{
    "name": "node2",
    "description": "subject",
    "category": "frontend"
}










