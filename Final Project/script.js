
async function mainEvent() {
    const mainForm = document.querySelector(".main_form");
    const initializeButton = document.querySelector("#initialize_button");

    const headerCourseButton = document.querySelector("#h_course");
    const headerDepartmentButton = document.querySelector("#h_department");
    const headerProfessorButton = document.querySelector("#h_professor");
   
    const filterCourseSection = document.querySelector("#filter_course_box");
    const filterDepartmentSection = document.querySelector("#filter_department_box");
    const filterProfessorSection = document.querySelector("#filter_professor_box");

    const departmentProfessorCheckbox = document.querySelector("#department_professor_checkbox");
    

    departmentProfessorCheckbox.addEventListener("change", (event)=> { 
        if (this.checked) {
            console.log("Fired - department_professor_checkbox is now selected")
        } else {
            console.log("Fired - department_professor_checkbox is no longer selected")
        }

    })

    /* Initialize the main_form to allow for event listeners */
    initializeButton.addEventListener("click", async (submitEvent) => {
        console.log("Fired - initialize button");

        const data = await fetch(
            "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json"
        );
        const storedData = await data.json();
    })

/* Header Button Event Listeners */

    /* Set view to search by course */
    headerCourseButton.addEventListener("click", (event) => {
        console.log("Fired - Clicked h_course button");

        if (filterDepartmentSection.classList.contains("hidden") != true) {
            filterDepartmentSection.classList.add("hidden");
        }
        if (filterProfessorSection.classList.contains("hidden") != true) {
            filterProfessorSection.classList.add("hidden");
        }
        if (filterCourseSection.classList.contains("hidden")) {
            filterCourseSection.classList.remove("hidden");
        }
    })

    /* Set view to search by department */
    headerDepartmentButton.addEventListener("click", (event) => {
        console.log("Fired - Clicked h_department button");
        
        if (filterProfessorSection.classList.contains("hidden") != true) {
            filterProfessorSection.classList.add("hidden");
        }
        if (filterCourseSection.classList.contains("hidden") != true) {
            filterCourseSection.classList.add("hidden");
        }
        if (filterDepartmentSection.classList.contains("hidden")) {
            filterDepartmentSection.classList.remove("hidden");
        }
    })

    /* Set view to search by professor */
    headerProfessorButton.addEventListener("click", (event) => {
        console.log("Fired - Clicked h_professor button");

        if (filterCourseSection.classList.contains("hidden") != true) {
            filterCourseSection.classList.add("hidden");
        }
        if (filterDepartmentSection.classList.contains("hidden") != true) {
            filterDepartmentSection.classList.add("hidden");
        }
        if (filterProfessorSection.classList.contains("hidden")) {
            filterProfessorSection.classList.remove("hidden");
        }
    })
}
document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means we can make API requests