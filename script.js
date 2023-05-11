

async function mainEvent() {
    const homePageLoadBox = document.querySelector("#home_page_load_box");
    const loadDataButton = document.querySelector("#load_data_button");
    const homePageDoneLoadingBox = document.querySelector("#home_page_done_loading_box");
    const statusBoxNotLoaded = document.querySelector("#status_box_not_loaded");
    const statusBoxLoaded = document.querySelector("#status_box_loaded");
    const finalPageLink = document.querySelector("#final_page_link");

    loadDataButton.addEventListener("click", async (submitEvent) => {        
        console.log("Fired - loadDataButton");

        d3.selectAll("body").transition().style("background-color", "yellow");

        console.log("Fetching - loading professor - a list of all professors");
        
        const professorsListRaw = await fetch("https://api.umd.io/v1/professors");
        const professorsListGeneral = await professorsListRaw.json();
        localStorage.setItem('professorsListGeneral', JSON.stringify(professorsListGeneral));
       
        console.log("Stored - put professorsListGeneral in localStorage");

        console.log("Fetching - loading courses - a list of courseIDs and names");  
        
        const coursesListRaw = await fetch ("https://api.umd.io/v1/courses/list")
        const coursesListGeneral = await coursesListRaw.json();
        localStorage.setItem('coursesListGeneral', JSON.stringify(coursesListGeneral));
       
        console.log("Stored - put coursesListGeneral in localStorage");

        console.log("Fetching - loading departments - a list of department_ids and names");
        
        const departmentsListRaw = await fetch ("https://api.umd.io/v1/courses/departments");
        const departmentsListGeneral = await departmentsListRaw.json();
        localStorage.setItem('departmentsListGeneral', JSON.stringify(departmentsListGeneral));
        
        console.log("Stored - put departmentsListGeneral in localStorage");
       
        d3.selectAll("body").transition().style("background-color", "green");

        homePageLoadBox.classList.add("hidden");
        homePageDoneLoadingBox.classList.remove("hidden"); 
        statusBoxNotLoaded.classList.add("hidden");
        statusBoxLoaded.classList.remove("hidden");
        finalPageLink.classList.remove("hidden");
    })

}

document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means we can make API requests
