Assignment "A RESTful HTTP API"

It provides web access to a product inventory database over an HTTP API. In this assignment, your job is to create such a web service yourself, running on your own computer (e.g. on http://localhost:3000/). Your server will also store the product data in a database on your computer. The assignment consists of two parts: you need to first document your API and then implement it.

Your web service needs to provide web clients with the following functionality:

to retrieve the full data set (all rows currently stored in your local product inventory database);
In addition, it should provide the so-called minimal CRUD (Create, Retrieve, Update and Delete) interface on single rows. That is, it should be possible:

to add data for a new product item (Create),
to list the data of a specific item (Retrieve),
to change data of a specific item (Update), and
to remove data of a specific item (Delete);
To realize this functionality, your web service has to allow web developers to manipulate the data in the product inventory over a RESTful HTTP 1.1 API. To be truly RESTful, it needs to meet the following requirements:

The API uses the most appropriate HTTP 1.1 method for each function it provides.
Every HTTP GET method should be guaranteed safe;
except for POST, all other HTTP methods should be idempotent;
in all HTTP responses, the response body is served in the format that is currently most popular under web developers: JSON. Your service should also accept JSON data as input (i.e. to create or update an item), this data should be sent in the request body (and not in the URL query parameters);
all responses deploy the most appropriate HTTP header(s) (including one indicating the appropriate MIME type of the data returned - this should be taken care of by express for you, but check in the response headers this is indeed the case);
all responses deploy the most appropriate HTTP response codes, not only on successful, but also on failed requests.
Documentation part
The documentation of your API should be published in a single HTML5 file. It should only explain the use of the API for frond-end developers of a Web client application that will use your API, and thus contain no installation instructions for installing and starting up your server. It should also not contain any details about the implementation (e.g. a front-end developer does not need to know about your use of backend technologies such as node.js or SQL).

Instead, your documentation should focus on the minimal information developers of web client applications need to know to use your service. It should cover the CRUD functionality listed above, and for each function define its key REST elements:

the endpoint URI of the resource involved (along with any parameters required on the url or data to be sent in the HTTP request message),
the HTTP method(s) that can be applied to this resource (along with the relevant HTTP response codes), and
the MIME format in which the resource is served in the HTTP response message.
Make sure you add, for each service, a concrete and representative example of both input and output.

Separate installation instructions are not necessary: your web service should follow the "npm install, npm start" conventions, so instead add an appropriate package.json file to ensure this works. Make sure you understand the ZyBook section 9.11 on RESTful Web APIs  and the Preparation Lecture 9 part dealing with RESTful API documentation examples.

Implementation part

Your web service needs to be implemented using the node.js framework (see section 9.1, 9.2 and 9.3 of the zyBook and our example node.js code to get started). Your web server should use SQLite to connect to a (given) product database, and then allow this database to be manipulated by handling incoming HTTP requests appropriately. Note that SQLite is not described in the zybook, but all you need to know about this module is documented on the SQLite tutorial website (Links to an external site.). You may also use our example SQL queries.

Note: We strongly advise you to start by making a first draft of the documentation of your Web service, as this will help you during the implementation. Please ask your TA to look at your documentation before you start implementing, this avoids you implement the wrong thing!

Submission details
The service needs to run correctly on any computer with a recent version of node and npm installed, it may only depend on additional modules that are correctly listed as dependency in your package.json file so that they can be installed by using "npm install". All your code should be in a single file named server.js. Make sure that your server can be started by using the "npm start" command.
