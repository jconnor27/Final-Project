
async function mainEvent() {
    const mainForm = document.querySelector(".main_form");
    
    const initializeButton = document.querySelector("#initialize_button");

    const headerCourseButton = document.querySelector("#h_course");
    const headerDepartmentButton = document.querySelector("#h_department");
    const headerProfessorButton = document.querySelector("#h_professor");
   
    const filterCourseSection = document.querySelector("#filter_course_box");
    const filterDepartmentSection = document.querySelector("#filter_department_box");
    const filterProfessorSection = document.querySelector("#filter_professor_box");
    const filterDepartmentProfessorSubsection = document.querySelector("#filter_department_professor_box"); 

    const courseDepartmentCheckbox = document.querySelector("#course_department_checkbox");
    const courseProfessorCheckbox = document.querySelector("#course_professor_checkbox");

    const departmentCourseCheckbox = document.querySelector("#department_course_checkbox");
    const departmentProfessorCheckbox = document.querySelector("#department_professor_checkbox");
    const departmentProfessorSemestersCheckbox = document.querySelector("#department_professor_semesters_checkbox");
    const departmentProfessorNumberCheckbox = document.querySelector("#department_professor_number_checkbox");
    
    const professorCoursesCheckbox = document.querySelector("#professor_courses_checkbox");
    const professorDepartmentCheckbox = document.querySelector("#professor_department_checkbox");

    

    /* Initialize the main_form to allow for event listeners */
    initializeButton.addEventListener("click", async (submitEvent) => {
        console.log("Fired - initialize button");

        console.log("Fired - loading professor - a list of all professors");
        const professorsListRaw = await fetch (
            "https://api.umd.io/v1/professors", {mode:"cors"}
        );
       
        const generalFormRaw = await fetch (
            "https://api.umd.io/v1/"
        );
        const generalForm = await generalFormRaw.json();
        console.log("got generalForm data: ");
        console.table(generalForm);

    })

/* Checkbox Event Listeners - Professor Tab */
    professorCoursesCheckbox.addEventListener("change", (event)=> {
        if (professorCoursesCheckbox.checked) {
            console.log("Fired - professor_courses_checkbox is now selected");

            if (professorDepartmentCheckbox.checked) {
                professorDepartmentCheckbox.checked = false;
            }
        } else {
            console.log("Fired - professor_courses_checkbox is no longer selected");
        }
    })

    professorDepartmentCheckbox.addEventListener("change", (event)=> {
        if (professorDepartmentCheckbox.checked) {
            console.log("Fired - professor_department_checkbox is now selected");

            if (professorCoursesCheckbox.checked) {
                professorCoursesCheckbox.checked = false;
            }
        } else {
            console.log("Fired - professor_department_checkbox is no longer selected");

        }
    })


/* Checkbox Event Listeners - Department Tab */
    departmentCourseCheckbox.addEventListener("change", (event)=> {
        if (departmentCourseCheckbox.checked) {
            console.log("Fired - department_course_checkbox is now selected");

            if (departmentProfessorCheckbox.checked) {
                departmentProfessorCheckbox.checked = false;
                filterDepartmentProfessorSubsection.classList.add("hidden");

                /* Clearing department_professor sub-checkboxes */
                if (departmentProfessorSemestersCheckbox.checked) {
                    departmentProfessorSemestersCheckbox.checked = false;
                }
                if (departmentProfessorNumberCheckbox.checked) {
                    departmentProfessorNumberCheckbox.checked = false;
                }
            }
        } else {
            console.log("Fired - department_course_checkbox is no longer selected");
        }

    }) 

    departmentProfessorCheckbox.addEventListener("change", (event)=> { 
        if (departmentProfessorCheckbox.checked) {
            console.log("Fired - department_professor_checkbox is now selected");
            filterDepartmentProfessorSubsection.classList.remove("hidden");

            if (departmentCourseCheckbox.checked) {
                departmentCourseCheckbox.checked = false;
            }
        } else {
            console.log("Fired - department_professor_checkbox is no longer selected");

            /* Clearing the subsection boxes */
            if (departmentProfessorSemestersCheckbox.checked) {
                departmentProfessorSemestersCheckbox.checked = false;
            }
            if (departmentProfessorNumberCheckbox.checked) {
                departmentProfessorNumberCheckbox.checked = false;
            }
            filterDepartmentProfessorSubsection.classList.add("hidden");
        }
    })

    departmentProfessorSemestersCheckbox.addEventListener("change", (event)=> {
        if (departmentProfessorSemestersCheckbox.checked) {
            console.log("Fired - department_professor_semesters_checkbox is now selected");

            if (departmentProfessorNumberCheckbox.checked) {
                departmentProfessorNumberCheckbox.checked = false;
            }
        } else {
            console.log("Fired - department_professor_semesters_checkbox is no longer selected");
        }
    })

    departmentProfessorNumberCheckbox.addEventListener("change", (event)=> {
        if (departmentProfessorNumberCheckbox.checked) {
            console.log("Fired - department_professor_number_checkbox is now selected");
            if (departmentProfessorSemestersCheckbox.checked) {
                departmentProfessorSemestersCheckbox.checked = false;
            }
        } else {
            console.log("Fired - department_professor_number_checkbox is no longer selected");
        }
    })

/* Checkbox Event Listeners - Course Tab */
    courseDepartmentCheckbox.addEventListener("change", (event)=> {
        if (courseDepartmentCheckbox.checked) {
            console.log("Fired - course_department_checkbox is now selected");

            /* Doesn't allow for two filters of the same scope to be applied at once */
            if (courseProfessorCheckbox.checked) {
                courseProfessorCheckbox.checked = false;
            }
        } else {
            console.log("Fired - course_department_checkbox is no longer selected");
        }
        /* Insert future code here */
    })

    courseProfessorCheckbox.addEventListener("change", (event)=> {
        if (courseProfessorCheckbox.checked) {
            console.log("Fired - course_professor_checkbox is now selected");
            
            /* Doesn't allow for two filters of the same scope to be applied at once */
            if (courseDepartmentCheckbox.checked) {
                courseDepartmentCheckbox.checked = false;
            }
        } else {
            console.log("Fired - course_professor_checkbox is no longer selected");
        }
        /* Insert future code here */
    })

/* Header Button Event Listeners */

    /* Set view to search by course */
    headerCourseButton.addEventListener("click", (event) => {
        console.log("Fired - Clicked h_course button");

        if (filterDepartmentSection.classList.contains("hidden") != true) {
            filterDepartmentSection.classList.add("hidden");
            headerDepartmentButton.classList.remove("currentHeaderFilterTab");
        }
        if (filterProfessorSection.classList.contains("hidden") != true) {
            filterProfessorSection.classList.add("hidden");
            headerProfessorButton.classList.remove("currentHeaderFilterTab");
        }
        if (filterCourseSection.classList.contains("hidden")) {
            filterCourseSection.classList.remove("hidden");
            headerCourseButton.classList.add("currentHeaderFilterTab");
        }
       /* if (headerCourseButton.classList.contains("currentHeaderFilterTab") != true) {
            headerCourseButton.classList.add("currentHeaderFilterTab");
        }*/
    })

    /* Set view to search by department */
    headerDepartmentButton.addEventListener("click", (event) => {
        console.log("Fired - Clicked h_department button");
        
        if (filterProfessorSection.classList.contains("hidden") != true) {
            filterProfessorSection.classList.add("hidden");
            headerProfessorButton.classList.remove("currentHeaderFilterTab");
        }
        if (filterCourseSection.classList.contains("hidden") != true) {
            filterCourseSection.classList.add("hidden");
            headerCourseButton.classList.remove("currentHeaderFilterTab");
        }
        if (filterDepartmentSection.classList.contains("hidden")) {
            filterDepartmentSection.classList.remove("hidden");
            headerDepartmentButton.classList.add("currentHeaderFilterTab");
        }
    })

    /* Set view to search by professor */
    headerProfessorButton.addEventListener("click", (event) => {
        console.log("Fired - Clicked h_professor button");

        if (filterCourseSection.classList.contains("hidden") != true) {
            filterCourseSection.classList.add("hidden");
            headerCourseButton.classList.remove("currentHeaderFilterTab");
        }
        if (filterDepartmentSection.classList.contains("hidden") != true) {
            filterDepartmentSection.classList.add("hidden");
            headerDepartmentButton.classList.remove("currentHeaderFilterTab");
        }
        if (filterProfessorSection.classList.contains("hidden")) {
            filterProfessorSection.classList.remove("hidden");
            headerProfessorButton.classList.add("currentHeaderFilterTab");
        }
    })

}
document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means we can make API requests