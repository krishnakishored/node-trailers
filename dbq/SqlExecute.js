const sqlite3 = require('sqlite3').verbose();
async function executeQuery (query, queryArgs) {
  let database = '/Users/kishored/coding/js_coding/node-cli-trailers/dbq/db/inquisitive.db'
  let db = new sqlite3.Database(database, sqlite3.OPEN_READONLY,
    (err)=>{
        if(err){
            console.error(err.message)
        }
        // console.log('Connected to inquisitive.db')
  });
  // const result = await db.execute(query, queryArgs)
  // await client.shutdown()

  db.each(query, queryArgs, (err, row) => {
    if (err) {
      throw err;
    }
    console.log(`${row.german_word} = ${row.english_word}`);
  });

  db.close((err)=>{
    if(err){console.err(err.message)}
    // console.log('close the db connection')
  });

  // return result
}



module.exports = {
  // executeBatch,
  // eachRow,
  executeQuery
}
