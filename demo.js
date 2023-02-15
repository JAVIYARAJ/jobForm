const queryExecutor = (query) => {
    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        resolve(result)
      })
    })
  }


let answer=queryExecutor('select * from table');
let id=answer.insertId;

let insert=queryExecutor('select * from table');