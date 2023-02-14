//counter declaration for set dynamic ids in html element
var edu_counter = 0;
var exe_counter = 0;
var ref_counter = 0;

//this counter 1 because at least one time show
var lang_counter = 1;
var tech_counter = 1;

var language_list = ["Hindi"];
var technology_list = ["Java"];

//use for display this content at least one time
// addEducationCard();
// addEdxperienceCard();
// addRefrenceCard();

//form whole data variable declaration
var candidateData = [];

let id_list = [
    "fname", "lname", "designation", "address1", "address2", "email", "phone", "city", "gender", "state", "relationship", "dob"
];

function getBasicInfo() {
    var basic_info = [];

    id_list.forEach((id, index) => {
        basic_info[id] = document.getElementById(id).value;
    });
    candidateData["basic_info"] = basic_info;
}

function addEducationCard() {
    edu_counter++;
    var edu_card = document.getElementById("edu_info");
    var create_div = document.createElement("div");
    create_div.classList.add("edu_component");
    var content = `
    <div>
        <div class="dbl_input">
            <div class="col">
            <label for="edu_board${edu_counter}">Name of Course</label>
            <input type="text" name="edu_course${edu_counter}" id="edu_course${edu_counter}">
            </div>
            <div class="col">
                <label for="edu_board${edu_counter}">Name of Board</label>
                <input type="text" name="edu_board${edu_counter}" id="edu_board${edu_counter}">
            </div>
            <div class="col">
                <label for="edu_passing_year${edu_counter}">Passing year</label>
                <input type="text" name="edu_passing_year${edu_counter}" id="edu_passing_year${edu_counter}">
            </div>
            <div class="col">
                <label for="edu_per${edu_counter}">Percentage</label>
                <input type="text" name="edu_per${edu_counter}" id="edu_per${edu_counter}">
            </div>
        </div></div>`;

    create_div.innerHTML = content;
    edu_card.appendChild(create_div);
}


function getEducationInfo() {

    let edu_class_list = ["edu_course", "edu_board", "edu_passing_year", "edu_per"];
    let edu_info = {};
    for (let i = 1; i <= edu_counter; i++) {
        let data_list = [];
        edu_class_list.forEach((value, index) => {
            var data = document.getElementById(`${value}${i}`);
            data_list[index] = data.value;
        });
        edu_info[`edu_${i}`] = data_list;
    }
    candidateData["edu_info"] = edu_info;
}

function addEdxperienceCard() {
    exe_counter++;
    var edu_card = document.getElementById("exe_info");
    var create_div = document.createElement("div");
    var content = `
    <div class="dbl_input">
    <div class="col">
        <label for="exe_company_name${exe_counter}">Company Name</label>
        <input type="text" name="exe_company_name${exe_counter}" id="exe_company_name${exe_counter}">
    </div>
    <div class="col">
        <label for="exe_designation${exe_counter}">Designation</label>
        <input type="text" name="exe_designation${exe_counter}" id="exe_designation${exe_counter}">
    </div>
    <div class="col">
        <label for="exe_from${exe_counter}">From</label>
        <input type="date" name="exe_from${exe_counter}" id="exe_from${exe_counter}">
    </div>
    <div class="col">
        <label for="exe_to${exe_counter}">To</label>
        <input type="date" name="exe_to${exe_counter}" id="exe_to${exe_counter}">
    </div>
</div>
`;

    create_div.innerHTML = content;
    edu_card.appendChild(create_div);
}


function getExperienceInfo() {

    let exe_class_list = ["exe_company_name", "exe_designation", "exe_from", "exe_to"];
    let exe_info = {};
    for (let i = 1; i <= exe_counter; i++) {
        let data_list = [];
        exe_class_list.forEach((value, index) => {
            var data = document.getElementById(`${value}${i}`);
            data_list[index] = data.value;
        });
        exe_info[`exe_${i}`] = data_list;
    }
    candidateData["exe_info"] = exe_info;
}


function addLangaugeCard() {
    let lang_name = prompt("Enter Language Name");
    if (lang_name === null) return;
    lang_counter++;
    language_list.push(lang_name);
    var lang_card = document.getElementById("lang_info");
    var create_div = document.createElement("div");
    var content = `
    <div id="lang_cols${lang_counter}">
        <input type="checkbox" name="lang_${lang_name}${lang_counter}" id="lang_${lang_name}${lang_counter}" value="${lang_name}">
        <label for="lang_hindi">${lang_name}</label>
        <input type="checkbox" name="lang_read${lang_counter}" class="lang${lang_counter}" id="lang_read${lang_counter}" value="read">
        <label for="lang_read${lang_counter}">Read</label>
        <input type="checkbox" name="lang_speak${lang_counter}" class="lang${lang_counter}" id="lang_speak${lang_counter}" value="speak">
        <label for="lang_speak${lang_counter}">Speak</label>
        <input type="checkbox" name="lang_write${lang_counter}" class="lang${lang_counter}" id="lang_write${lang_counter}" value="write">
        <label for="lang_write${lang_counter}">Write</label>
    </div>
    `;

    create_div.innerHTML = content;
    lang_card.appendChild(create_div);
}


function getLanguageData() {
    let lang_info = [];

    let checkbox_values = [];
    for (let i = 0; i < language_list.length; i++) {
        var doc = document.getElementsByClassName(`lang${i + 1}`);
        checkbox_values[i] = doc;
    }

    for (let i = 0; i < checkbox_values.length; i++) {
        let data = [];
        for (let j = 0; j < checkbox_values[i].length; j++) {
            data[j] = checkbox_values[i][j].checked;
        }
        lang_info[`${language_list[i]}`] = data;
    }
    candidateData["language_info"] = lang_info;
}


function addTechnologyCard() {
    let tech_name = prompt("Enter Technology Name");
    if (tech_name === null) return;
    technology_list.push(tech_name);
    tech_counter++;
    var tech_card = document.getElementById("tech_info");
    var create_div = document.createElement("div");
    var content = `
    <div id="lang_cols">
        <input type="checkbox" id="tech_main_${tech_name}${tech_counter}" name="tech_main_${tech_name}${tech_counter}" value="${tech_name}">
        <label for="tech_main_${tech_name}${tech_counter}">${tech_name}</label>

        <input type="radio" name="tech_${tech_name}${tech_counter}"  value="beginner" id="tech_${tech_name}_beginner${tech_counter}">
        <label for="tech_${tech_name}${tech_counter}">Beginner</label>

        <input type="radio" name="tech_${tech_name}${tech_counter}"  value="mideator" id="tech_${tech_name}_mideator${tech_counter}">
        <label for="tech_${tech_name}${tech_counter}">Mideator</label>

        <input type="radio" name="tech_${tech_name}${tech_counter}"  value="expert" id="tech_${tech_name}_expert${tech_counter}">
        <label for="tech_${tech_name}${tech_counter}">Expert</label>
    </div>
    `;
    create_div.innerHTML = content;
    tech_card.appendChild(create_div);
}

function getTechnologyData() {
    let tech_type_list = ["beginner", "mideator", "expert"];
    var tech_data = [];
    for (let i = 0; i < technology_list.length; i++) {
        for (let j = 0; j < tech_type_list.length; j++) {
            var doc = document.getElementById(`tech_${technology_list[i]}_${tech_type_list[j]}${i + 1}`);
            if (doc.checked) {
                tech_data[technology_list[i]] = doc.value;
            }
        }
    }
    candidateData["technology_info"] = tech_data;

}

function addRefrenceCard() {
    ref_counter++;
    var ref_card = document.getElementById("pref_info");
    var create_div = document.createElement("div");
    var content = `
    
    <div class="dbl_input">
        <div class="col">
            <label for="ref_name${ref_counter}">Person Name</label>
            <input type="text" name="ref_name${ref_counter}" id="ref_name${ref_counter}">
        </div>
        <div class="col">
            <label for="ref_number${ref_counter}">Contact Number</label>
            <input type="text" name="ref_number${ref_counter}" id="ref_number${ref_counter}">
        </div>
        <div class="col">
            <label for="ref_relation${ref_counter}">Relation</label>
            <input type="text" name="ref_relation${ref_counter}" id="ref_relation${ref_counter}">
        </div>

    </div>
    `;
    create_div.innerHTML = content;
    ref_card.appendChild(create_div);
}

function getRefrenceInfo() {

    let ref_id_list = [
        "ref_name", "ref_relation", "ref_number"
    ];
    let ref_info = {};
    for (let i = 1; i <= ref_counter; i++) {
        let data_list = [];
        ref_id_list.forEach((value, index) => {
            var data = document.getElementById(`${value}${i}`);
            data_list[index] = data.value;
        });
        ref_info[`ref_${i}`] = data_list;
    }
    candidateData['ref_info'] = ref_info;
}


function getPrefrenceData() {
    let prefre_id_list = [
        "pref_location", "notice_period", "expacted_ctc", "current_ctc", "department"
    ];
    let pref_info=[];
    prefre_id_list.forEach((id, index) => {
        var data = document.getElementById(id);
        pref_info[id]=data.value;
    });
    candidateData['pref_info']=pref_info;
    console.log(candidateData);
}


function displayData() {
    getBasicInfo();
    getEducationInfo();
    getExperienceInfo();
    getLanguageData();
    getTechnologyData();
    getPrefrenceData();
    getRefrenceInfo();
    console.log(candidateData);
}