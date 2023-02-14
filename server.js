const express=require('express');
const bodyparser=require('body-parser');
const ejs=require('ejs');
const mysql=require('mysql2');
const con=require('./db/dbconnect');
const app=express();
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:false}));

let option_value;
let state_value;
let pref_value;
let department_value;
let courses_name;
let language_name;
let technology_name;
app.get('/',(req,res)=>{

    //this query use for get data for drop down menu
    con.query('SELECT * FROM practice.option_master where option_id=1',(err,result1,field)=>{
        if(err){
            return console.log(err.message);
        }
        option_value=result1;
    
    });
    con.query('SELECT * FROM practice.option_master where option_id=2',(err,result2,field)=>{
        if(err){
            return console.log(err.message);
        }
        state_value=result2;
    
    });
    con.query('SELECT * FROM practice.option_master where option_id=3',(err,result3,field)=>{
        if(err){
            return console.log(err.message);
        }
        pref_value=result3;
    
    });
    con.query('SELECT * FROM practice.option_master where option_id=4',(err,result4,field)=>{
        if(err){
            return console.log(err.message);
        }
        department_value=result4;

    });
    con.query('SELECT * FROM practice.education_courses_master',(err,course_result,field)=>{
        if(err){
            return console.log(err.message);
        }
        courses_name=course_result;
    });
    con.query('SELECT * FROM practice.option_master where option_id=5',(err,language_result,field)=>{
        if(err){
            return console.log(err.message);
        }
        language_name=language_result;
    });
    con.query('SELECT * FROM practice.option_master where option_id=6',(err,technology_result,field)=>{
        if(err){
            return console.log(err.message);
        }
        technology_name=technology_result;
    });
    res.render("sample",{option_menu:option_value,state_menu:state_value,pref_menu:pref_value,department_menu:department_value,courses:courses_name,languages:language_name,technologies:technology_name});
})

app.post('/insert',(req,res)=>{

    console.log(req.body);
    let fname=req.body.fname;
    let lname=req.body.lname;
    let designation=req.body.designation;
    let address1=req.body.address1;
    let address2=req.body.address2;
    let email=req.body.email;
    let phone=req.body.phone;
    let city=req.body.city;
    let relationship=req.body.relationship;
    let dob=req.body.dob;
    let zcode=req.body.zcode;
    let state=req.body.state;
    let gender=req.body.gender;
    console.log("first");
    console.log(fname,lname,designation,address1,address2,email,phone,city,relationship,dob,zcode,state,gender);

    let edu_course_list=req.body.edu_course;
    let edu_board_list=req.body.edu_board;
    let edu_passing_year_list=req.body.edu_passing_year;
    let edu_per_list=req.body.edu_per;

    console.log("second");
    console.log(edu_course_list,edu_board_list,edu_passing_year_list,edu_per_list);

    let exe_company_name_list=req.body.exe_company_name;
    let exe_designation_list=req.body.exe_designation;
    let exe_from_list=req.body.exe_from;
    let exe_to_list=req.body.exe_to;

    console.log("third");
    console.log(exe_company_name_list,exe_designation_list,exe_from_list,exe_to_list);

    let lang_name_list=req.body.lang_name;
    let lang_read_list=req.body.lang_read;
    let lang_speak_list=req.body.lang_speak;
    let lang_write_list=req.body.lang_write;

    console.log("fourth");
    console.log(lang_name_list,lang_read_list,lang_speak_list,lang_write_list);

    let tech_main_list=req.body.tech_main;
    for(let i=0;i<tech_main_list.length;i++){
        let temp=req.body.tech_type+ tech_main_list[i];
        console.log(temp);
    }

    console.log("fifth");
    console.log(tech_main_list);

    let ref_name_list=req.body.ref_name;
    let ref_number_list=req.body.ref_number;
    let ref_relation_list=req.body.ref_relation;

    console.log("six");
    console.log(ref_name_list,ref_number_list,ref_relation_list);

    let pref_location=req.body.pref_location;
    let notice_period=req.body.notice_period;
    let expacted_ctc=req.body.expacted_ctc;
    let current_ctc=req.body.current_ctc;
    let department=req.body.department;

    console.log("seven");
    console.log(pref_location,notice_period,expacted_ctc,current_ctc,department);
    
});

app.listen(3000,()=>{
    console.log('server is running');
})