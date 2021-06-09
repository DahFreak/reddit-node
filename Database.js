const sqlite3 = require('sqlite3').verbose();

function InsertToDatabase(query)
{

}



module.exports = {

    GetPosts: function (sub = null)
    {
        let query = "SELECT * FROM Post";

        if (sub){
            query += " WHERE Sub = " + sub;
        }

        SelectFromDB(query)
    },

    InsertPost: function (post)
    {
        let query = "INSERT INTO Post (Sub, Title, SelfText, Username, Created)"
                    +"VALUES('" + post.sub + "','" + post.title + "','" + post.selfText 
                    + "','" + post.username + "','" + post.created + "')";
        InsertToDB(query)
    }
}

function SelectFromDB (query)
{
    let db = new sqlite3.Database('./Database/Reddit.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the Reddit database.');
    });

    db.serialize(() => {
        db.each(query, (err, row) =>{
            if (err){
                console.error(err.message);
            }
            
            console.log(row);
        })
    })

    db.close((err) => {
        if (err){
            console.error(err.message)
        }

        console.log("Closing the DB connection");
    })
}

function InsertToDB (query)
{
    let db = new sqlite3.Database('./Database/Reddit.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the Reddit database.');
    });

    db.serialize(() => {
        db.each(query, (err, row) =>{
            if (err){
                console.error(err.message);
            }
            
            console.log(row);
        })
    })

    db.close((err) => {
        if (err){
            console.error(err.message)
        }

        console.log("Closing the DB connection");
    })
}