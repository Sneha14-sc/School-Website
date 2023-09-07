let stud = [];

async function fetchDetails() {
    await fetch("./data/student.json")
    .then((response) => response.json())
    .then((data)=>{
        stud = JSON.parse(JSON.stringify(data)).student;
    })
}

//Validate student credentails on login page before displaying home page
async function login() {
    await fetchDetails();
    callLogin();
}

function callLogin() {
    let uname = document.getElementById("username").value;
    let pswd = document.getElementById("password").value;
    let validUser =false;
    for(let i=0; i<stud.length; i++){
        console.log(stud[i])
        if(stud[i].username == uname && stud[i].password == pswd){
            validUser = true;
            sessionStorage.setItem('studId',stud[i].id);
            sessionStorage.setItem('username', stud[i].username);
            window.location.href = "home.html";
            break;
        }
    }
    if(!validUser){
        document.getElementById("loginError").style.display = "block"   
    }
}

// Login error remains hidden unless student add wrong credential
function hideLoginError(){
    document.getElementById("loginError").style.display = "none"
}

//Logging out
function logout() {
    sessionStorage.clear();
    window.location.href = "index.html";
}

//This displays marks and grade on exam result page
function displayMarks() {
    fetchDetails();
    callDisplayMarks();
}

function callDisplayMarks(){
    let subject = document.getElementById("subject").value;
    let marks = document.getElementById("marks");
    let grade = document.getElementById("grade");

    //make text fields blank if subject marks are not in json
    marks.value= "";
    grade.value= "";

    //loop through student array of objects
    for(let i=0; i< stud.length; i++){

        //check if student id matches
        if(stud[i].id === sessionStorage.getItem("studId")){
            for(const key in stud[i].result){
                if(stud[i].result.hasOwnProperty(key) && subject === key){
                    marks.value =(stud[i]['result'][key].Marks);
                    grade.value =(stud[i]['result'][key].Grade);
                }
            }
        }

    }
}

async function profileData() {
    await fetchDetails();    
    callProfileData();
    
}

function callProfileData() {
    for(let j=0; j<stud.length; j++) {
        if(stud[j].id === sessionStorage.getItem("studId")){

            for(const key in stud[j]) {
                if(stud[j].hasOwnProperty(key)){
                    if(key == "username")
                        document.getElementById("student").innerHTML = stud[j][key];
                    else if(key == "id")
                        document.getElementById("stud-id").innerHTML = stud[j][key];
                    else if(key == "class")
                        document.getElementById("stud-class").innerHTML = stud[j][key];
                    else if(key == "section")
                        document.getElementById("stud-section").innerHTML = stud[j][key];
                    else if(key == "academic_year")
                        document.getElementById("year").innerHTML = stud[j][key];
                    else if(key == "gender")
                        document.getElementById("gender").innerHTML = stud[j][key];
                    else if(key == "blood")
                        document.getElementById("blood").innerHTML = stud[j][key];
                    else if(key == "dob")
                        document.getElementById("dob").innerHTML = stud[j][key];
                    else if(key == "address")
                        document.getElementById("address").innerHTML = stud[j][key];
                    else if(key == "email")
                        document.getElementById("email").innerHTML = stud[j][key];
                    else if(key == "mother_name")
                        document.getElementById("mother").innerHTML = stud[j][key];
                    else if(key == "m_contact_no")
                        document.getElementById("m-contact").innerHTML = stud[j][key];
                    else if(key == "m_occupation")
                        document.getElementById("m-occup").innerHTML = stud[j][key];
                    else if(key == "father_name")
                        document.getElementById("father").innerHTML = stud[j][key];
                    else if(key == "f_contact_no")
                        document.getElementById("f-contact").innerHTML = stud[j][key];
                    else if(key == "f_occupation")
                        document.getElementById("f-occup").innerHTML = stud[j][key];
                    else 
                       ""
                    
                }
            }
        } 
    }
}

// Fetching inputs from Extra activity page 
function addActivity() {
    let activityName = document.getElementById("activityName").value;
    let activityDetails = document.getElementById("activityDetails").value;
    sessionStorage.setItem(activityName, activityDetails);
    alert("Activity Added");
}

// to list the activities on home page
function listActivity() {
    let activityList = document.getElementById("activityList");
    if(sessionStorage.length < 4){
        document.getElementById("list").style.display = "none";
    }
    else{
        document.getElementById("list").style.display = "block"

        for(let i=1; i<sessionStorage.length; i++){
            let key = sessionStorage.key(i);

            if(key!="username" && key !="IsThisFirstTime_Log_From_LiveServer" && key !="studId"){
                let activityName = document.createElement("dt");
                activityName.innerHTML = key;
                activityList.appendChild(activityName);

                let activityDetails = document.createElement("dd");
                activityDetails.innerHTML = "- "+sessionStorage.getItem(key);
                activityList.appendChild(activityDetails)

            }
        }
    }
}

