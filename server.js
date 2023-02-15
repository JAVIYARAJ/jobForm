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

  
    let fname = req.body.fname;
    let lname = req.body.lname;
    let designation = req.body.designation;
    let address1 = req.body.address1;
    let address2 = req.body.address2;
    let address = address1 + " " + address2;
    let email = req.body.email;
    let phone = req.body.phone;
    let city = req.body.city;
    let relationship = req.body.relationship;
    let dob = req.body.dob;
    let zcode = req.body.zcode;
    let state = req.body.state;
    let gender = req.body.gender;
    let pref_location = req.body.pref_location;
    let department = req.body.department;
    let expacted_ctc = req.body.expacted_ctc;
    let current_ctc = req.body.current_ctc;
    let notice_peroid = req.body.notice_peroid;



    let edu_course_list = req.body.edu_course;
    let edu_board_list = req.body.edu_board;
    let edu_passing_year_list = req.body.edu_passing_year;
    let edu_per_list = req.body.edu_per;


    let exe_company_name_list = req.body.exe_company_name;
    let exe_designation_list = req.body.exe_designation;
    let exe_from_list = req.body.exe_from;
    let exe_to_list = req.body.exe_to;


    let lang_name_list = req.body.lang_name;



    let ref_name_list = req.body.ref_name;
    let ref_number_list = req.body.ref_number;
    let ref_relation_list = req.body.ref_relation;

    let basic_info = [req.body.fname, req.body.lname, req.body.phone, req.body.email, req.body.designation, req.body.dob, address, req.body.zcode, req.body.gender, req.body.pref_location, req.body.expacted_ctc, req.body.current_ctc];

    let edu_info = [];
    let exe_info = [];
    let ref_info = [];
    let lang_info = [];
    let tech_info = [];

    
    let tech_list=req.body.tech_main;

    for(let i=0;i<tech_list.length;i++){
        let t1=[];
        let id='tech_type'+tech_list[i];
        let content=req.body[id];
        t1[0]=tech_list[i];
        t1[1]=content;
        tech_info[i]=t1;
    }

    if (typeof edu_course_list == 'string' || typeof exe_company_name_list == 'string' || typeof ref_name_list == 'string' || typeof lang_name_list== 'string'){
        console.log("calll this code");
        edu_info[0] = edu_course_list;
        edu_info[1] = edu_board_list;
        edu_info[2] = edu_passing_year_list;
        edu_info[3] = edu_per_list;

        exe_info[0] = exe_company_name_list;
        exe_info[1] = exe_designation_list;
        exe_info[2] = exe_from_list;
        exe_info[3] = exe_to_list;

        ref_info[0] = ref_name_list;
        ref_info[1] = ref_number_list;
        ref_info[2] = ref_relation_list;
    }

    if (typeof edu_course_list != 'string' || typeof exe_company_name_list != 'string' || typeof ref_name_list != 'string' || typeof lang_name_list!= 'string') {
        
        for(let i=0;i<lang_name_list.length;i++){
            let id='lang_type'+i;
            let content=req.body[id];
            console.log(content);
            content.unshift(lang_name_list[i]);
            lang_info[i]=content;
        }

        for (let i = 0; i < edu_course_list.length; i++) {
            let ed1 = [];
            ed1.push(edu_course_list[i]);
            ed1.push(edu_board_list[i]);
            ed1.push(edu_passing_year_list[i]);
            ed1.push(edu_per_list[i]);
            edu_info[i] = ed1;
        }

        for (let i = 0; i < exe_company_name_list.length; i++) {
            let exe1 = [];
            exe1.push(exe_company_name_list[i]);
            exe1.push(exe_designation_list[i]);
            exe1.push(exe_from_list[i]);
            exe1.push(exe_to_list[i]);
            exe_info[i] = exe1;
        }

        for (let i = 0; i < ref_name_list.length; i++) {
            let ref1 = [];
            ref1.push(ref_name_list[i]);
            ref1.push(ref_number_list[i]);
            ref1.push(ref_relation_list[i]);
            ref_info[i] = ref1;
        }
    }
    
    
    console.log(basic_info);
    console.log(edu_info);
    console.log(exe_info);
    console.log(ref_info);
    console.log(lang_info);
    console.log(tech_info);

   
    let basic_query = `INSERT INTO design.candidate_info (fname, lname, designation, dob, zcode, gender, perf_location, expacted_ctc, email, current_ctc, department, notice_peroid, address, city, createdAt, phone,state) VALUES ('${fname}', '${lname}', '${designation}', '${dob}', '${zcode}', '${gender}', '${pref_location}', '${expacted_ctc}', '${email}', '${current_ctc}', '${department}', '${current_ctc}', '${address}', '${city}',CURRENT_TIMESTAMP, '${phone}','${state}');`;

    con.query(basic_query, (err, result1, filed) => {
        if (err) {
            return console.log(err.message);
        } else {
            let id = result1.insertId;
            for (let i = 0; i < edu_info.length; i++) {
                edu_info[i][4] = id;
            }

            for (let j = 0; j < exe_info.length; j++) {
                exe_info[j][4] = id;
            }

            for (let k = 0; k < ref_info.length; k++) {
                ref_info[k][3] = id;
            }
            for (let k = 0; k < lang_info.length; k++) {
                lang_info[k][4] = id;
            }
            for (let k = 0; k < tech_info.length; k++) {
                tech_info[k][2] = id;
            }

            var sql = "INSERT INTO design.acadamic_info (course_name, education_board, education_year, education_grade, candidate_id) values ?";

            con.query(sql, [edu_info], (err, result2, filed) => {
                if (err) {
                    return console.log(err.message);
                } else {
                    let exe_query = `INSERT INTO design.experience_info (company_name, candidate_position, candidate_joining, candidate_leaving, candidate_id) values ?`;

                    con.query(exe_query, [exe_info], (err, result3, filed) => {
                        if (err) {
                            return console.log(err.message);
                        } else {
                            
                            let ref_query=`INSERT INTO design.reference_info (person_name, person_contact, person_relation, candidate_id) VALUES ?`;

                            con.query(ref_query,[ref_info],(err,result4,filed)=>{
                                if (err) {
                                    return console.log(err.message);
                                } else {
                                    let lang_query=`INSERT INTO design.language_info (language_name, language_read, language_speak, language_write, candidate_id) VALUES ?`;

                                    con.query(lang_query,[lang_info],(err,result5,filed)=>{
                                        if (err) {
                                            return console.log(err.message);
                                        } else {
                                           let tech_query= `INSERT INTO design.technology_info (technology_name, technology_level, candidate_id) VALUES ?`;

                                           con.query(tech_query,[tech_info],(err,result6,filed)=>{
                                            if (err) {
                                                return console.log(err.message);
                                            } else {
                                                res.send(result5);
                                            }
                                           })
                                        }

                                    });
                                }
                            });
                        }
                    })
                }
            });
        }
    })
});


app.get('/job-info',(req,res)=>{
    let ids=['candidate_id','fname','lname','designation','dob','zcode','gender','perf_location','expacted_ctc','email','current_ctc','department','notice_peroid','address','city','createdAt','phone','state'];
    con.query(`SELECT * FROM design.candidate_info`,(err,result1,filed)=>{
        if(err){
            return console.log(err.message);
        }else{
            console.log(result1);
            res.render("basic_info",{data:result1,id:ids});
        }
    })
});

app.get('/more',(req,res)=>{
    let id=req.query.id;
    let key1=['candidate_id','course_name','education_board','education_year','education_grade'];
    let key2=['candidate_id','company_name','candidate_position','candidate_joining','candidate_leaving'];
    let key3=['candidate_id','language_name','language_read','language_speak','language_write'];
    let key4=['candidate_id','technology_name','technology_level'];
    let key5=['candidate_id','person_name','person_contact','person_relation'];
    let acadamic_query=`select * from design.acadamic_info where candidate_id=${Number.parseInt(id)}`;
    let experience_query=`select * from design.experience_info where candidate_id=${Number.parseInt(id)}`;
    let language_query=`select * from design.language_info where candidate_id=${Number.parseInt(id)}`;
    let technology_query=`select * from design.technology_info where candidate_id=${Number.parseInt(id)}`;
    let refrence_query=`select * from design.reference_info where candidate_id=${Number.parseInt(id)}`;
    con.query(acadamic_query,(err,result1,filed)=>{
       con.query(experience_query,(err,result2,filed)=>{
        con.query(language_query,(err,result3,filed)=>{
            con.query(technology_query,(err,result4,filed)=>{
                console.log(result4);
                con.query(refrence_query,(err,result5,filed)=>{
                    console.log(result5);
                    res.render("more",{acadamic_data:result1,id:key1,experience_data:result2,id1:key2,language_data:result3,id2:key3,technology_data:result4,id3:key4,refrence_data:result5,id4:key5});
                })
            })
        })
       })
    })
});

app.listen(3000, () => {
    console.log('server is running');
})