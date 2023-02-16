const express = require('express');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const mysql = require('mysql2');
const con = require('./db/dbconnect');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: false }));

let option_value;
let state_value;
let pref_value;
let department_value;
let courses_name;
let language_name;
let technology_name;
app.get('/', (req, res) => {

  //this query use for get data for drop down menu
  con.query('SELECT * FROM practice.option_master where option_id=1', (err, result1, field) => {
    if (err) {
      return console.log(err.message);
    }
    option_value = result1;

  });
  con.query('SELECT * FROM practice.option_master where option_id=2', (err, result2, field) => {
    if (err) {
      return console.log(err.message);
    }
    state_value = result2;

  });
  con.query('SELECT * FROM practice.option_master where option_id=3', (err, result3, field) => {
    if (err) {
      return console.log(err.message);
    }
    pref_value = result3;

  });
  con.query('SELECT * FROM practice.option_master where option_id=4', (err, result4, field) => {
    if (err) {
      return console.log(err.message);
    }
    department_value = result4;

  });
  con.query('SELECT * FROM practice.education_courses_master', (err, course_result, field) => {
    if (err) {
      return console.log(err.message);
    }
    courses_name = course_result;
  });
  con.query('SELECT * FROM practice.option_master where option_id=5', (err, language_result, field) => {
    if (err) {
      return console.log(err.message);
    }
    language_name = language_result;
  });
  con.query('SELECT * FROM practice.option_master where option_id=6', (err, technology_result, field) => {
    if (err) {
      return console.log(err.message);
    }
    technology_name = technology_result;
  });
  res.render("sample", { option_menu: option_value, state_menu: state_value, pref_menu: pref_value, department_menu: department_value, courses: courses_name, languages: language_name, technologies: technology_name });
})

app.post('/insert', (req, res) => {
  let id;
  const { fname, lname, designation, address1, address2, email, phone, city, gender, relationship, state, dob, zcode, department, expacted_ctc, notice_period, current_ctc, pref_location } = req.body

  let basic_query = `INSERT INTO design.candidate_info (fname, lname, designation, dob, zcode, gender, perf_location, expacted_ctc, email, current_ctc, department, notice_peroid, address, city, createdAt, phone,state) VALUES ('${fname}', '${lname}', '${designation}', '${dob}', '${zcode}', '${gender}', '${pref_location}', '${expacted_ctc}', '${email}', '${current_ctc}', '${department}', '${current_ctc}', '${address1 + " " + address2}', '${city}',CURRENT_TIMESTAMP, '${phone}','${state}');`;

  con.query(basic_query, (err, result1) => {
    console.log(result1, 'basic info insert success');

    id = result1.insertId;

    //education
    const { Course, institution, Percentage, Passing_Year } = req.body

    console.log(Course, institution, Percentage, Passing_Year);


    if (typeof (Course, institution, Percentage, Passing_Year) == "string") {
      var edu_query = `INSERT INTO design.acadamic_info (course_name, education_board, education_year, education_grade, candidate_id) values ('${Course}',
            '${institution}','${Passing_Year}','${Percentage}',${id})`;

      con.query(edu_query, (err, result2) => {
        if (err) return console.log(err.message);
        else {
          console.log(result2, 'acadamic insert success');

        }

      })
    }
    else {
      for (let i = 0; i < Course.length; i++) {


        let edu_query = `INSERT INTO design.acadamic_info (course_name, education_board, education_year, education_grade, candidate_id) values ('${Course[i]}',
            '${institution[i]}','${Passing_Year[i]}','${Percentage[i]}',${id})`;

        console.log(edu_query);

        con.query(edu_query, (err, result2) => {
          if (err) return console.log(err.message);
          else {
            console.log(result2, 'acadamic insert success');
          }

        })

      }
    }

    //experience
    const { exe_company_name, exe_designation, exe_from, exe_to } = req.body

    console.log(exe_company_name, exe_designation, exe_from, exe_to);


    if (typeof (exe_company_name, exe_designation, exe_from, exe_to) == "string") {
      let exe_query = `INSERT INTO design.experience_info (company_name, candidate_position, candidate_joining, candidate_leaving, candidate_id) values ('${exe_company_name}','${exe_designation}','${exe_from}','${exe_to}',${id})`;
      con.query(exe_query, (err, result3) => {
        if (err) return console.log(err.message);
        else {
          console.log(result3, 'exepernce insert success');
        }

      })
    }
    else {
      for (let i = 0; i < exe_company_name.length; i++) {

        let exe_query = `INSERT INTO design.experience_info (company_name, candidate_position, candidate_joining, candidate_leaving, candidate_id) values ('${exe_company_name[i]}','${exe_designation[i]}','${exe_from[i]}','${exe_to[i]}',${id})`;
        con.query(exe_query, (err, result3) => {
          if (err) return console.log(err.message);
          else {
            console.log(result3, 'technology insert success');
          }

        })

      }
    }


    //refrence
    const { ref_name, ref_number, ref_relation } = req.body

    console.log(ref_name, ref_number, ref_relation);


    if (typeof (ref_name, ref_number, ref_relation) == "string") {
      var ref_query = `INSERT INTO design.reference_info (person_name, person_contact, person_relation, candidate_id) VALUES ('${ref_name}','${ref_number}','${ref_relation}',${id})`;
      con.query(ref_query, (err, result4) => {
        if (err) return console.log(err.message);
        else {
          console.log(result4, 'refernces insert success');
        }

      })
    }
    else {
      for (let i = 0; i < ref_name.length; i++) {

        var ref_query = `INSERT INTO design.reference_info (person_name, person_contact, person_relation, candidate_id) VALUES ('${ref_name[i]}','${ref_number[i]}','${ref_relation[i]}',${id})`;


        con.query(ref_query, (err, result4) => {
          if (err) return console.log(err.message);
          else {
            console.log(result4, 'refrence insert success');
          }

        })

      }
    }

    //language

    con.query(`SELECT * FROM practice.option_master where option_id=5;`, (err, result) => {
      var query_lan;
      console.log(result);
      for (let i = 0; i < result.length; i++) {

        var vj = req.body[result[i].option_value];
        var r = req.body[result[i].option_value + "r"];
        var w = req.body[result[i].option_value + "w"];
        var s = req.body[result[i].option_value + "s"];
        if (typeof (r) == "undefined") r = "No";
        if (typeof (w) == "undefined") w = "No";
        if (typeof (s) == "undefined") s = "No";

        if (typeof (vj) == "string") {
          query_lan = `INSERT INTO design.language_info (language_name, language_read, language_speak, language_write, candidate_id) VALUES ('${vj}','${r}','${s}','${w}',${id})`;

          con.query(query_lan, (err, result) => {
            if (err) console.log(err.message);
            else {
              console.log(result, "successfully insert languages");
            }
          })
        }
      }
    })


    //technology
    con.query(`SELECT * FROM practice.option_master where option_id=6;`, (err, result) => {
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        var tech = req.body[result[i].option_value]
        var a = req.body[result[i].option_value + 'a']

        console.log('tech data here')
        console.log(tech);
        console.log(a);


        if (typeof (tech) == "string") {
          var query_tech = `INSERT INTO design.technology_info (technology_name, technology_level, candidate_id) VALUES ('${tech}','${a}',${id})`;
          console.log(query_tech);

          con.query(query_tech, (err, result) => {
            if (err) console.log(err.message);
            else {
              res.send("success");
              // let ids = ['candidate_id', 'fname', 'lname', 'designation', 'dob', 'zcode', 'gender', 'perf_location', 'expacted_ctc', 'email', 'current_ctc', 'department', 'notice_peroid', 'address', 'city', 'createdAt', 'phone', 'state'];
              // con.query(`SELECT * FROM design.candidate_info`, (err, result1, filed) => {
              //   if (err) {
              //     return console.log(err.message);
              //   } else {
              //     res.render("basic_info", { data: result1, id: ids });
              //   }
              // })
            }
          })
        }
      }
    })

  })
});


app.get('/job-info', (req, res) => {
  let ids = ['candidate_id', 'fname', 'lname', 'designation', 'dob', 'zcode', 'gender', 'perf_location', 'expacted_ctc', 'email', 'current_ctc', 'department', 'notice_peroid', 'address', 'city', 'createdAt', 'phone', 'state'];
  con.query(`SELECT * FROM design.candidate_info`, (err, result1, filed) => {
    if (err) {
      return console.log(err.message);
    } else {
      res.render("basic_info", { data: result1, id: ids });
    }
  })
});

app.get('/more', (req, res) => {
  let id = req.query.id;
  let key1 = ['candidate_id', 'course_name', 'education_board', 'education_year', 'education_grade'];
  let key2 = ['candidate_id', 'company_name', 'candidate_position', 'candidate_joining', 'candidate_leaving'];
  let key3 = ['candidate_id', 'language_name', 'language_read', 'language_speak', 'language_write'];
  let key4 = ['candidate_id', 'technology_name', 'technology_level'];
  let key5 = ['candidate_id', 'person_name', 'person_contact', 'person_relation'];
  let acadamic_query = `select * from design.acadamic_info where candidate_id=${Number.parseInt(id)}`;
  let experience_query = `select * from design.experience_info where candidate_id=${Number.parseInt(id)}`;
  let language_query = `select * from design.language_info where candidate_id=${Number.parseInt(id)}`;
  let technology_query = `select * from design.technology_info where candidate_id=${Number.parseInt(id)}`;
  let refrence_query = `select * from design.reference_info where candidate_id=${Number.parseInt(id)}`;
  con.query(acadamic_query, (err, result1, filed) => {
    con.query(experience_query, (err, result2, filed) => {
      con.query(language_query, (err, result3, filed) => {
        con.query(technology_query, (err, result4, filed) => {
          console.log(result4);
          con.query(refrence_query, (err, result5, filed) => {
            console.log(result5);
            res.render("more", { acadamic_data: result1, id: key1, experience_data: result2, id1: key2, language_data: result3, id2: key3, technology_data: result4, id3: key4, refrence_data: result5, id4: key5 });
          })
        })
      })
    })
  })
});


app.post('/search', (req, res) => {
  let search_query = req.body.search_query;
  let wc = ['^', '&', '_', '~', '%'];
  let search = "";
  let operation_count = 0;
  let query = "select * from design.candidate_info where ";
  for (let i = 0; i < search_query.length; i++) {

    if (wc.includes(search_query[i])) {
      search += " " + search_query[i];
      operation_count++;
    } else {
      search += search_query[i];
    }
  }

  let values = search.split(" ").slice(1)
  for (let i = 0; i < values.length; i++) {
    if (values[i][0] == '^') {
      operation_count--;
      if (operation_count) {
        query += `fname like '${values[i].slice(1)}%' and `;
      } else {
        query += `fname like '${values[i].slice(1)}%'`;
      }
    }
    if (values[i][0] == '&') {
      operation_count--;
      if (operation_count) {
        query += `lname like '${values[i].slice(1)}%' and `;
      } else {
        query += `lname like '${values[i].slice(1)}%'`;
      }
    }
    if (values[i][0] == '_') {
      operation_count--;
      if (operation_count) {
        query += `email like '${values[i].slice(1)}%' and `;
      } else {
        query += `email like '${values[i].slice(1)}%'`;
      }
    }
    if (values[i][0] == '~') {
      operation_count--;
      if (operation_count) {
        query += `phone like '${values[i].slice(1)}%' and `;
      } else {
        query += `phone like '${values[i].slice(1)}%'`;
      }
    }

    if(values[i][0]=='%'){
      operation_count--;
      if(operation_count){
        query+=`designation like '%${values[i].slice(1)}%' and `;
      }else{
        query+=`designation like '%${values[i].slice(1)}%'`;
      }
    }
  }
  
  con.query(query, (err, result) => {
    let ids = ['candidate_id', 'fname', 'lname', 'designation', 'dob', 'zcode', 'gender', 'perf_location', 'expacted_ctc', 'email', 'current_ctc', 'department', 'notice_peroid', 'address', 'city', 'createdAt', 'phone', 'state'];
    res.render("basic_info", { data: result, id: ids });
  })
})

app.listen(3000, () => {
  console.log('server is running');
})