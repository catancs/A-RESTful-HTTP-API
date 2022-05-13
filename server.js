// ###############################################################################
//
// Database setup:
// First: Our code will open a sqlite database file for you, and create one if it not exists already.
// We are going to use the variable "db' to communicate to the database:
// If you want to start with a clean sheet, delete the file 'phones.db'.
// It will be automatically re-created and filled with one example item.

const sqlite = require('sqlite3').verbose();
let db = my_database('./phones.db');

// ###############################################################################
// The database should be OK by now. Let's setup the Web server so we can start
// defining routes.
//
// First, create an express application `app`:

var express = require("express");
var app = express();

// We need some middleware to parse JSON data in the body of our HTTP requests:
var bodyParser = require("body-parser");
const { set } = require('express/lib/application');
app.use(bodyParser.json());

function getItem(id, res){
	db.get(`SELECT * FROM phones WHERE id=?`,[id] , function(err, row){
		if (!row) 
		{
			console.log("Item with id-" + id + " not found");
			return res.status(404).send('Item not found');
		} else if (err) 

		{
			console.log("Error when trying to get an item with id-" + id + " [" + err + "]");
			return res.status(400).send(err);
		}

		console.log("Succesfully found item with id-" + id);
		return res.status(200).json(row);
	});
}

app.get('/items/:id', function(req, res) {
	getItem(req.params.id, res);
});

app.get('/items', function(req, res) {
	if (req.query.id) 
	{
		getItem(req.query.id, res);
	}
	else {
		db.all(`SELECT * FROM phones`, function(err, rows)
		{
			if (err) 
			{
				console.log("Error when trying to get all items [" + err + "]");
				return res.status(400).send(err);
			}
			console.log("Successfully got all items");
			return res.status(200).json(rows);
		});
	}
});

app.post('/addItem', function(req, res){
	db.run(`INSERT INTO phones (brand, model, os, image, screensize) VALUES (?, ?, ?, ?, ?)`, 
			[req.body.brand, req.body.model, req.body.os, req.body.image, req.body.screensize], 
			function(err, dbRes) {
				if(err) 
				{
					console.log("Error when trying to add a new item [" + err + "]");
					return dbRes.status(400).send(err);
				}
				console.log("Successfully added new item ");
				return res.sendStatus(201);
	});
});

function deleteItem(id, res){
	db.run(`DELETE FROM phones WHERE id=?`,[id] , function(err)
	{
		if (err) 
		{
			console.log("Error when trying to delete item with id-" + id + " [" + err + "]");
			return res.status(400).send(err);
		}
		console.log("Successfully executed delete operation");
		return res.sendStatus(204);
	});
}

app.delete('/deleteItem/:id', function(req,res){
	deleteItem(req.params.id, res);
});

app.delete('/deleteItem', function(req, res){
	deleteItem(req.body.id, res);
});

function updateItem(id, brand, model, os, image, screensize, res){
	db.run(`UPDATE phones SET brand=?, model=?, os=?, image=?, screensize=? WHERE id=?`, 
		[brand, model, os, image, screensize, id], 
		function(err){
			if(err)
			{
				console.log("Error when trying to update item with id-" + id + " [" + err + "]");
				return res.status(400).send(err);
			}
			console.log("Successfully executed update operation");
			return res.sendStatus(204);
		});
}

app.put('/updateItem/:id', function(req, res){
	updateItem(req.params.id, req.body.brand, req.body.model, req.body.os, req.body.image, req.body.screensize, res);
});

app.put('/updateItem', function(req, res){
	updateItem(req.body.id, req.body.brand, req.body.model, req.body.os, req.body.image, req.body.screensize, res);
});

// ###############################################################################
// This should start the server, after the routes have been defined, at port 3000:

app.listen(3000);
console.log("Your Web server should be up and running, waiting for requests to come in. Try http://localhost:3000/hello");


function my_database(filename) {
	// Connect to db by opening filename, create filename if it does not exist:
	var db = new sqlite.Database(filename, (err) => {
  		if (err) 
		  {
			console.error(err.message);
  		  }
  		console.log('Connected to the phones database.');
	});
	// Create our phones table if it does not exist already:
	db.serialize(() => {
		db.run(`
        	CREATE TABLE IF NOT EXISTS phones
        	(id 	INTEGER PRIMARY KEY,
        	brand	CHAR(100) NOT NULL,
        	model 	CHAR(100) NOT NULL,
        	os 	CHAR(10) NOT NULL,
        	image 	CHAR(254) NOT NULL,
        	screensize INTEGER NOT NULL
        	)`);
		db.all(`select count(*) as count from phones`, function(err, result) {
			if (result[0].count == 0) 
			{
				db.run(`INSERT INTO phones (brand, model, os, image, screensize) VALUES (?, ?, ?, ?, ?)`,
				["Fairphone", "FP3", "Android", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Fairphone_3_modules_on_display.jpg/320px-Fairphone_3_modules_on_display.jpg", "5.65"]);
				console.log('Inserted dummy phone entry into empty database');
			} else 
			{
				console.log("Database already contains", result[0].count, " item(s) at startup.");
			}
		});
	});
	return db;
}
