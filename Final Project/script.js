// Inject HTML Functions

/* Updates the currentProfessorsList */
function injectHTMLCurrentProfessorsList(list) {
    console.log("Fired - injectHTMLCurrentProfessorsList");
    
    const target = document.querySelector("#current_professors_list");
    target.innerHTML = "";
    list.forEach((item) => {
      const str = `<li class="wrappedListElement">${item}</li>`;
      target.innerHTML += str;
    });
}

/* Updates the currentCoursesList */
function injectHTMLCurrentCoursesList(list) {
  console.log("Fired - injectHTMLCurrentCoursesList");

  const target = document.querySelector("#current_courses_list");
  target.innerHTML = "";
  list.forEach((item) => {
    const str = `<li class="wrappedListElement">${item}</li>`;
    target.innerHTML += str;
  })
}

/* Updates the currentDepartmentsList */
function injectHTMLCurrentDepartmentsList(list) {
  console.log("Fired - injectHTMLCurrentDepartmentsList");

  const target = document.querySelector("#current_departments_list");
  target.innerHTML = "";
  list.forEach((item) => {
    const str = `<li class="wrappedListElement">${item}</li>`;
    target.innerHTML += str;
  })
}

// Utility Functions

/* A quick filter that will return something based on a matching input */
function filterList(list, query) {
    return list.filter((item) => {
      const lowerCaseName = item.toLowerCase();
      const lowerCaseQuery = query.toLowerCase();
      return lowerCaseName.includes(lowerCaseQuery);
    });
}

function clearChart(chart) {
    chart.options.data[0].dataPoints = [];
    chart.options.data[0].indexLabel = null;
}


// Formatting Functions

/* Takes a numeric representation of semesterID (String) and returns a formatted String */
function formatSemesterID(semesteridList) {
  console.log("Entered - formatSemesterID");

  const spring = "Spring"; // 01
  const summer = "Summer"; // 05
  const fall = "Fall"; // 08

  let semesteridListFormatted = [];

  semesteridList.forEach((id) => {
    const year = id.substring(0, 4);
    const termNumeric = id.substring(4);

    if (termNumeric.localeCompare("01") == 0) {
      semesteridListFormatted[semesteridListFormatted.length] = spring.concat(
        " ",
        year
      );
    } else if (termNumeric.localeCompare("05") == 0) {
      semesteridListFormatted[semesteridListFormatted.length] = summer.concat(
        " ",
        year
      );
    } else if (termNumeric.localeCompare("08") == 0) {
      semesteridListFormatted[semesteridListFormatted.length] = fall.concat(
        " ",
        year
      );
    } else {
      console.log(
        "Error - the forEach loop in formatSemesterID - termNumeric should be 01, 05, or 08 - Seeing this means termNumeric was not one of the previous values"
      );
    }
    // console.log("example - year = " + year + " -- termNumeric = " + termNumeric);
  });
  return semesteridListFormatted;
}

function trimCourseNumber(courseidList) {
  console.log("Entered - trimCourseNumber");

  let courseidListTrimmed = [];

  courseidList.forEach((course) => {
      courseidListTrimmed[courseidListTrimmed.length] = course.substring(0, 4);
  })
  return courseidListTrimmed;
}

function parseCoursesString(coursesTaughtRaw) {
  console.log("Entered - parseCourseString");

  let courseidList = [];
  let semesteridList = [];
  let curString = coursesTaughtRaw;

  while (curString.length > 3) {
    // the last part of the string would be left as '}]' (2)
    const firstQuote = curString.indexOf('"');
    //console.log("first quote pos = " + firstQuote);

    const secondQuote = curString.indexOf('"', firstQuote + 1);
    //console.log("second quote pos = " + secondQuote);

    const thirdQuote = curString.indexOf('"', secondQuote + 1);
    //console.log("third quote pos = " + thirdQuote);

    const fourthQuote = curString.indexOf('"', thirdQuote + 1);
    //console.log("fourth quote pos = " + fourthQuote);

    const fifthQuote = curString.indexOf('"', fourthQuote + 1);
    //console.log("fifth quote pos = " + fifthQuote);

    const sixthQuote = curString.indexOf('"', fifthQuote + 1);
    //console.log("sixth quote pos = " + sixthQuote);

    const seventhQuote = curString.indexOf('"', sixthQuote + 1);
    //console.log("seventh quote pos = " + seventhQuote);

    const eighthQuote = curString.indexOf('"', seventhQuote + 1);
    //console.log("eighth quote pos = " + eighthQuote);

    courseidList[courseidList.length] = curString.substring(
      thirdQuote + 1,
      fourthQuote
    );
    semesteridList[semesteridList.length] = curString.substring(
      seventhQuote + 1,
      eighthQuote
    );

    curString = curString.substring(eighthQuote + 1);
    //console.log("curString = " + curString);
  }
  return [courseidList, semesteridList];
}


// Counting Functions

function countDepartments(courseidListTrimmed) {
  console.log("Entered - countDepartments");

  let dataPointsUnformatted = []

  courseidListTrimmed.forEach((courseid) => {
      if (dataPointsUnformatted.some((temp) => temp.department === courseid)) {
          const index = dataPointsUnformatted.findIndex((obj) => obj.department === courseid);
          const oldCount = dataPointsUnformatted[index].count;
          dataPointsUnformatted[index].count = oldCount + 1;
      } else {
          dataPointsUnformatted[dataPointsUnformatted.length] = {
              department: courseid,
              count: 1,
          };
      }
         
  });
  return dataPointsUnformatted;
}

function countTimesToughtCourse(professorsListGeneral, courseID) {
console.log("Entered - countTimesToughtCourse");

const upperCourseID = courseID.toUpperCase();
let dataRaw = [];

professorsListGeneral.forEach((prof) => { // For each professor
  let count = 0;

  prof.taught.forEach((course) => { // For each of their courses
    if (course.course_id.localeCompare(upperCourseID) == 0) { // if the course = the course param
      console.log("main course ID = " + upperCourseID + " - current course ID = " + course.course_id);
      count += 1;
    }
  })
  if (count != 0) {
    dataRaw[dataRaw.length] = {
      name: prof.name,
      count: count,
    };
  }
})
return dataRaw;
}

function countCoursesPerSemester(semesteridListFormatted) {
  console.log("Entered - countCoursesPerSemester");

  let dataPointsUnformatted = [];

  semesteridListFormatted.forEach((id) => {
    if (dataPointsUnformatted.some((temp) => temp.term === id)) {
      const index = dataPointsUnformatted.findIndex((obj) => obj.term === id);
      const oldCount = dataPointsUnformatted[index].count;
      dataPointsUnformatted[index].count = oldCount + 1;
    } else {
      dataPointsUnformatted[dataPointsUnformatted.length] = {
        term: id,
        count: 1,
      };
    }
  });
  return dataPointsUnformatted;
}


// Datapoint Conversion Functions

function convertToDataPointsProfessorCourses(rawData) {
  console.log("Entered - convertToDataPoints");
  let dataPoints = [];

  rawData.forEach((pair) => {
    dataPoints[dataPoints.length] = {
      y: pair.count,
      label: pair.term,
    };
  });
  return dataPoints;
}

function convertToDataPointsProfessorDepartments(rawData) {
    console.log("Entered - convertToDataPointsProfessorDepartments");
    let dataPoints = [];
  
    rawData.forEach((pair) => {
      dataPoints[dataPoints.length] = {
        y: pair.count,
        label: pair.department,
      };
    });
    return dataPoints;
  }

function convertToDataPointsCourseProfessors(rawData) {
  console.log("Entered - convertToDataPointsCourseProfessors");
  let dataPoints = [];

  rawData.forEach((pair) => {
    dataPoints[dataPoints.length] = {
      y: pair.count,
      label: pair.name,
    };
  });
  return dataPoints;
}


// List Building Functions

function getCoursesList(coursesListGeneral) {
  console.log("Entered - getCoursesListCut");  

  let courseIDList = [];

  coursesListGeneral.forEach((course) => {
    courseIDList[courseIDList.length] = course["course_id"];
  })
  
  return courseIDList;
}

function getDepartmentsIDsList(departmentsListGeneral) {
  console.log("Entered - getDepartmentsIDsList");
  console.log(departmentsListGeneral);
  let allDepartments = [];

  departmentsListGeneral.forEach((dept) => {
    allDepartments[allDepartments.length] = dept.dept_id;
  })

  return allDepartments;
}

/* Takes in the raw /get professors data and returns a list of 
the names of all professors */
function getListProfessorNames(professorListGeneral) {
  console.log("Entered - getListProfessorNames");

  let listProfessorNames = [];

  professorListGeneral.forEach((prof) => {
    listProfessorNames[listProfessorNames.length] = prof["name"];
  });
  return listProfessorNames;
}

/* Returns an array containing the courses a specific Professor (professorName) has
   taught and correspsonding semesters ids */
   function getSpecificProfessorCourses(professorName, professorsListGeneral) {
    console.log("Entered - getSpecificProfessorCourses");
  
    const lowerProfessorName = professorName.toLowerCase();
    let coursesTaught = [];
  
    professorsListGeneral.forEach((prof) => {
      lowerProfName = prof["name"].toLowerCase();
  
      if (lowerProfName.localeCompare(lowerProfessorName) == 0) {
        console.log(
          "Fired - lowerProfName .localCompare lowerProfessorName == 0"
        );
  
        const coursesTaughtRaw = JSON.stringify(prof["taught"]);
  
        coursesTaught = parseCoursesString(coursesTaughtRaw);
        return coursesTaught;
      } else {
        console.log(
          "Fired - lowerProfName .localCompare lowerProfessorName != 0 "
        );
      }
    });
    return coursesTaught;
    /* Should not get here */
    /* Means that the name entered is not present in the dataset */
    console.log(
      "John's Error - getSpecificProfessorCourses - Should not get here"
    );
  }


// toLowerCase Functions

function getCoursesListLower(coursesListGeneral) {
  console.log("Entered - getCoursesListCut");  

  let courseIDList = [];

  coursesListGeneral.forEach((course) => {
    courseIDList[courseIDList.length] = course["course_id"].toLowerCase();
  })
  
  return courseIDList;
}

function getDepartmentsIDsListLower(departmentsListGeneral) {
  console.log("Entered - getDepartmentIDsListLower");

  let departmentIDsListLower = [];

  departmentsListGeneral.forEach((dept) => {
    departmentIDsListLower[departmentIDsListLower.length] = dept.dept_id.toLowerCase();
  })

  return departmentIDsListLower;
}

function getListProfessorNamesLower(professorListGeneral) {
  console.log("Entered - getListProfessorNames");

  let listProfessorNames = [];

  professorListGeneral.forEach((prof) => {
    listProfessorNames[listProfessorNames.length] = prof["name"].toLowerCase();
  });
  return listProfessorNames;
}


// Cut List Functions

function getDepartmentsIDsListCut(departmentIDsList) {
  console.log("Entered - getDepartmentsIDsListCut");
  console.log(departmentIDsList);

  const cutList = departmentIDsList.slice(0,20);

  return cutList;
}

function getProfessorsListCut(professorsListGeneral) {
  console.log("Entered - getProfessorsListCut");

  const allProfessorNames = getListProfessorNames(professorsListGeneral);
  const cutList = allProfessorNames.slice(0, 20);

  return cutList;
}


// Course Display Functions

function displayCourseProfessorChart(courseID, coursesListGeneral, professorsListGeneral, chart) {
  console.log("Entered - displayCourseDepartmentChart");
  console.log("Clearing chart data");
  clearChart(chart);

  console.log("hi 2.0");
  const rawData = countTimesToughtCourse(professorsListGeneral, courseID);
  const dataPoints = convertToDataPointsCourseProfessors(rawData);

  chart.options.data[0] = {
    type: "column",
    dataPoints: dataPoints,
    showInLegend: true,
    legendText: "Number of professors (within UMD.IO/V1/professors) = ".concat(dataPoints.length),
  }
  chart.title.set(
    "text",
    "Bar Chart for the number of times ".concat(courseID.toUpperCase(), " has been taught by each professor")
  );
  chart.options.axisY.title = "Number of Times / Semesters Taught"
  chart.render();
}

function displayCourseDepartmentChart(courseID, coursesListGeneral, chart) {
  console.log("Entered - displayCourseDepartmentChart");
  console.log("Clearing chart data");
  clearChart(chart);

  displayComingSoonCourses();
}

function displayComingSoonCourses() {
  console.log("Entered - displayComingSoon");

  d3.selectAll("body")
    .transition().style("background-color", "pink")
    .transition().duration(6000).style("background-color", "white");

  const comingSoonContainer = document.querySelector("#coming_soon_container");
  const displaySection = document.querySelector("#display_section_box");
  const currentCoursesList = document.querySelector("#current_courses_list");

  displaySection.classList.add("hidden");
  comingSoonContainer.classList.remove("hidden");
  setTimeout(()=> {comingSoonContainer.classList.add("hidden"); }, 5000);
  setTimeout(()=> {currentCoursesList.classList.remove("currentListWrapped"); }, 5000);
  setTimeout(()=> {currentCoursesList.classList.add("box"); }, 5000);


}


// Department Display Functions

function displayDepartmentCourseChart(departmentID, departmentsListGeneral, chart) {
  console.log("Entered - displayDepartmentCourseChart");

  displayComingSoonDepartments();
}

function displayDepartmentProfessorSemestersChart(departmentID, departmentsListGeneral, chart) {
  console.log("Entered - displayDepartmentProfessorSemestersChar");

  displayComingSoonDepartments();
}

function displayDepartmentProfessorNumberChart(departmentID, departmentsListGeneral, chart) {
  console.log("Entered - displayDepartmentProfessorNumberChart");

  displayComingSoonDepartments();
}

function displayComingSoonDepartments() {
  console.log("Entered - displayComingSoon");

  d3.selectAll("body")
    .transition().style("background-color", "pink")
    .transition().duration(6000).style("background-color", "white");

  const comingSoonContainer = document.querySelector("#coming_soon_container");
  const displaySection = document.querySelector("#display_section_box");
  const currentDepartmentsList = document.querySelector("#current_departments_list");

  displaySection.classList.add("hidden");
  comingSoonContainer.classList.remove("hidden");
  setTimeout(()=> {comingSoonContainer.classList.add("hidden"); }, 5000);
  setTimeout(()=> {currentDepartmentsList.classList.remove("currentListWrapped"); }, 5000);
  setTimeout(()=> {currentDepartmentsList.classList.add("box"); }, 5000);
}


// Professor Display Functions

function displayProfessorDepartmentChart(professorName, professorListGeneral, chart) {
  console.log("Entered - displayProfessorDepartmentChart");
  console.log("Clearing chart data");
  clearChart(chart);

  const taughtSeparated = getSpecificProfessorCourses(professorName, professorListGeneral);
  const courseidListRaw = taughtSeparated[0];
  const courseidListTrimmed = trimCourseNumber(courseidListRaw);
  const departmentsRaw = countDepartments(courseidListTrimmed);
  const departmentsDataPoints = convertToDataPointsProfessorDepartments(departmentsRaw);
  
  chart.options.data[0].type = "pie";
  chart.options.data[0].indexLabel = "{label}: #percent%";
  chart.options.data[0].dataPoints = departmentsDataPoints;
  chart.title.set(
    "text",
    "Pie Chart For The Departments of Courses Taught By: ".concat(professorName)
  );
  chart.render();

  console.log("lll");
  console.log(departmentsDataPoints);

}

function displayProfessorCoursesChart(professorName, professorsListGeneral, chart) {
console.log("Entered - displayProfessorCoursesChart");
console.log("Clearing chart data");
clearChart(chart);

const taughtSeparated = getSpecificProfessorCourses(professorName, professorsListGeneral);
console.table(taughtSeparated);

const courseidList = taughtSeparated[0];
const semesteridList = taughtSeparated[1];

const semesteridListFormatted = formatSemesterID(semesteridList);

const coursesPerSemester = countCoursesPerSemester(semesteridListFormatted);
const coursesPerSemesterDataPoints = convertToDataPointsProfessorCourses(coursesPerSemester);

  console.table(coursesPerSemesterDataPoints);
  console.table(chart.options.data[0].dataPoints);

chart.options.data[0].type = "line";
chart.options.data[0].dataPoints = coursesPerSemesterDataPoints;
chart.title.set(
  "text",
  "Line Chart For Courses Taught By: ".concat(professorName)
);
chart.options.axisY.title = "Number Of Courses Taught";
chart.render();
}



async function mainEvent() {
  const mainForm = document.querySelector(".main_form");

  /* Load and Clear data buttons */
  const initializeDataButton = document.querySelector("#initialize_data_button");
  const clearLocalStorageButton = document.querySelector("#clear_local_storage_button");

  /* Create Image Buttons */
  const courseCreateImageButton = document.querySelector("#course_create_image_button");
  const departmentCreateImageButton = document.querySelector("#department_create_image_button");
  const professorCreateImageButton = document.querySelector("#professor_create_image_button");

  /* (Not Current) Header Buttons */
  const headerCourseButton = document.querySelector("#h_course");
  const headerDepartmentButton = document.querySelector("#h_department");
  const headerProfessorButton = document.querySelector("#h_professor");

  /* Current Header Buttons */
  const headerCourseButtonCurrent = document.querySelector("#h_course_current");
  const headerDepartmentButtonCurrent = document.querySelector("#h_department_current");
  const headerProfessorButtonCurrent = document.querySelector("#h_professor_current");

  /* Filter Section Elements */
  const filterCourseSection = document.querySelector("#filter_course_box");
  const filterDepartmentSection = document.querySelector("#filter_department_box");
  const filterProfessorSection = document.querySelector("#filter_professor_box");
  const filterDepartmentProfessorSubsection = document.querySelector("#filter_department_professor_box");

  /* Course Checkboxes */
  const courseDepartmentCheckbox = document.querySelector("#course_department_checkbox");
  const courseProfessorCheckbox = document.querySelector("#course_professor_checkbox");

  /* Department Checkboxes */
  const departmentCourseCheckbox = document.querySelector("#department_course_checkbox");
  const departmentProfessorCheckbox = document.querySelector("#department_professor_checkbox");
  const departmentProfessorSemestersCheckbox = document.querySelector("#department_professor_semesters_checkbox");
  const departmentProfessorNumberCheckbox = document.querySelector("#department_professor_number_checkbox");

  /* Professor Checkboxes */
  const professorCoursesCheckbox = document.querySelector("#professor_courses_checkbox");
  const professorDepartmentCheckbox = document.querySelector("#professor_department_checkbox");

  /* Text Fields */
  const courseNameTextfield = document.querySelector("#course_name_textfield");
  const departmentNameTextfield = document.querySelector("#department_name_textfield");
  const professorNameTextfield = document.querySelector("#professor_name_textfield");

  /* Display and Prompt Elements */
  const displaySectionBox = document.querySelector("#display_section_box");
  const initialBoxDataUnloaded = document.querySelector("#initial_box_data_unloaded");
  const initialBoxDataLoaded = document.querySelector("#initial_box_data_loaded");

  /* Current List Labels */
  const coursesListLabel = document.querySelector("#courses_list_label");
  const professorsListLabel = document.querySelector("#professors_list_label");
  const departmentsListLabel = document.querySelector("#departments_list_label");
  
  /* Current Lists */
  const currentCoursesList = document.querySelector("#current_courses_list");
  const currentProfessorsList = document.querySelector("#current_professors_list");
  const currentDepartmentsList = document.querySelector("#current_departments_list");

  /* Professor Filter Elements */
  const professorFilterHelpContainer = document.querySelector("#professor_filter_help_container");
  const professorFilterHelpText = document.querySelector("#professor_filter_help_text");
  const professorFilterHelpCheckboxes = document.querySelector("#professor_filter_help_checkboxes"); 

  /* Course Filter Elements */
  const courseFilterHelpContainer = document.querySelector("#course_filter_help_container");
  const courseFilterHelpText = document.querySelector("#course_filter_help_text");
  const courseFilterHelpCheckboxes = document.querySelector("#course_filter_help_checkboxes");

  /* Department Filter Elements */
  const departmentFilterHelpContainer = document.querySelector("#department_filter_help_container");
  const departmentFilterHelpText = document.querySelector("#department_filter_help_text");
  const departmentFilterHelpCheckboxes = document.querySelector("#department_filter_help_checkboxes"); 

  /* This is temporary */
  const comingSoonContainer = document.querySelector("#coming_soon_container");

  var chart; // The visualization for this project
  let coursesListGeneral = []; // The overall Json list for all course info
  let departmentsListGeneral = []; // The overall Json list for all department info
  let professorsListGeneral = []; // The overall Json list for all professor info

  let storedProfessorsList = []; // The local list which is pulled from, cut and displayed 
  let storedCoursesList = []; // The local list which is pulled from, cut and displayed
  let storedDepartmentIDsList = []; // The local list which is pulled from, cut and displayed


  /* The temporary variables for accessing and checking localStorage */
  const tempProfessorsListGeneral = localStorage.getItem('professorsListGeneral');
  const tempCoursesListGeneral = localStorage.getItem('coursesListGeneral');
  const tempDepartmentsListGeneral = localStorage.getItem('departmentsListGeneral');
  let parsedTempProfessorsListGeneral = JSON.parse(tempProfessorsListGeneral);
  let parsedTempCoursesListGeneral = JSON.parse(tempCoursesListGeneral);
  let parsedTempDepartmentsListGeneral = JSON.parse(tempDepartmentsListGeneral);

  /* Attempts to innitialize data from localStorage */
  if (parsedTempProfessorsListGeneral?.length > 0 && parsedTempCoursesListGeneral?.length > 0 && parsedTempDepartmentsListGeneral?.length >0) {
    console.log("Loaded - professorsListGeneral was loaded from localStorage");
    professorsListGeneral = parsedTempProfessorsListGeneral;

    console.log("Loaded - coursesListGeneral was loaded from localStorage");
    coursesListGeneral = parsedTempCoursesListGeneral;

    console.log("Loaded - departmentsListGeneral was loaded from localStorage");
    departmentsListGeneral = parsedTempDepartmentsListGeneral;
    
    initialBoxDataUnloaded.classList.add("hidden");
    initialBoxDataLoaded.classList.remove("hidden");
  } else { // data was not loaded from browser
    clearLocalStorageButton.classList.add("hidden");
    initialBoxDataLoaded.classList.add("hidden");
    d3.selectAll("body").transition().style("background-color", "pink");

  }

  /* Makes the chart in the background on page load */
  window.onload = function () {
    chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Simple Line Chart",
      },
      axisY: {
        title: "Y-Axis Title",
        interlacedColor: "#F8F1E4",
        ticklength: 10,
      },
      data: [
        {
          type: "line",
          dataPoints: [],
        },
      ],
    });
    chart.render();
  };

  /* Hides the professorTab and associated information */
  function clearProfessorTab() {
    console.log("Entered - clearProfessorTab");

    filterProfessorSection.classList.add("hidden");
    headerProfessorButtonCurrent.classList.add("hidden");
    currentProfessorsList.classList.add("hidden");
    professorsListLabel.classList.add("hidden");
    headerProfessorButton.classList.remove("hidden");
    professorCoursesCheckbox.checked = false;
    professorDepartmentCheckbox.checked = false;
    professorNameTextfield.value = "";
    displaySectionBox.classList.add("hidden");
    currentProfessorsList.classList.remove("currentListWrapped");
    currentProfessorsList.classList.add("box");
  }

  /* Hides the departmentTab and associated information */
  function clearDepartmentTab() {
    console.log("Entered - clearDepartmentTab");

    filterDepartmentSection.classList.add("hidden");
    headerDepartmentButtonCurrent.classList.add("hidden");
    headerDepartmentButton.classList.remove("hidden");
    departmentCourseCheckbox.checked = false;
    departmentProfessorCheckbox.checked = false;
    filterDepartmentProfessorSubsection.classList.add("hidden");
    departmentProfessorSemestersCheckbox.checked = false;
    departmentProfessorNumberCheckbox.checked = false;
    departmentNameTextfield.value = "";
    displaySectionBox.classList.add("hidden");
    departmentsListLabel.classList.add("hidden");
    currentDepartmentsList.classList.add("hidden");
    currentDepartmentsList.classList.remove("currentListWrapped");
    currentDepartmentsList.classList.add("box");
  }

  /* Hides the courseTab and associated information */
  function clearCourseTab() {
    console.log("Entered - clearCourseTab");

    filterCourseSection.classList.add("hidden");
    headerCourseButtonCurrent.classList.add("hidden");
    headerCourseButton.classList.remove("hidden");
    courseDepartmentCheckbox.checked = false;
    courseProfessorCheckbox.checked = false;
    courseNameTextfield.value = "";
    displaySectionBox.classList.add("hidden");
    coursesListLabel.classList.add("hidden");
    currentCoursesList.classList.add("hidden");
    currentCoursesList.classList.remove("currentListWrapped");
    currentCoursesList.classList.add("box");
  }

  /* Checks the user has entered valid input and displays a visualization using their input */
  courseCreateImageButton.addEventListener("click", (event) => {
    console.log("Fired - Clicked course_create_image_button");

    const courseID = courseNameTextfield.value.toLowerCase();
    const allCourseIDs = getCoursesListLower(coursesListGeneral);

    if (allCourseIDs?.includes(courseID)) {

      if (courseDepartmentCheckbox.checked) {
        console.log("Stepped into - course_department_checkbox is checked");

        displaySectionBox.classList.remove("hidden");
        currentCoursesList.classList.remove("box");
        currentCoursesList.classList.add("currentListWrapped");
        displayCourseDepartmentChart(courseID, coursesListGeneral, chart);
      } else if (courseProfessorCheckbox.checked) {
        console.log("Stepped into - course_professor_checkbox is checked");
        
        displaySectionBox.classList.remove("hidden");
        currentCoursesList.classList.remove("box");
        currentCoursesList.classList.add("currentListWrapped");
        displayCourseProfessorChart(courseID, coursesListGeneral, professorsListGeneral, chart);
      } else {
        console.log("No Step - no filter boxes are checked");

        courseFilterHelpContainer.classList.remove("hidden");
        courseFilterHelpCheckboxes.classList.add("hugeTopMargin");
        courseFilterHelpCheckboxes.classList.remove("hidden");

        setTimeout(() => {courseFilterHelpCheckboxes.classList.remove("hugeTopMargin"); }, 3000);
        setTimeout(() => {courseFilterHelpCheckboxes.classList.add("hidden"); }, 3000);
        setTimeout(() => {courseFilterHelpContainer.classList.add("hidden"); }, 3000);
      }
    } else {
      courseFilterHelpContainer.classList.remove("hidden");
      courseFilterHelpText.classList.remove("hidden");

      setTimeout(() => {courseFilterHelpText.classList.add("hidden"); }, 3000);
      setTimeout(() => {courseFilterHelpContainer.classList.add("hidden"); }, 3000);

      if (courseDepartmentCheckbox.checked != true && courseProfessorCheckbox.checked != true) {
        courseFilterHelpCheckboxes.classList.add("bigTopMargin");
        courseFilterHelpCheckboxes.classList.remove("hidden");

        setTimeout(() => {courseFilterHelpCheckboxes.classList.remove("bigTopMargin"); }, 3000);
        setTimeout(() => {courseFilterHelpCheckboxes.classList.add("hidden"); }, 3000);
      }
    }
  });

  /* Checks the user has entered valid input and displays a visualization using their input */
  departmentCreateImageButton.addEventListener("click", (event) => {
    console.log("Fired - Clicked department_refresh button");

    const departmentID = departmentNameTextfield.value.toLowerCase();
    const allDepartmentIDs = getDepartmentsIDsListLower(departmentsListGeneral);

    if (allDepartmentIDs?.includes(departmentID)) {

      if (departmentCourseCheckbox.checked) {
        console.log("Stepped into - department_course_checkbox is checked");

        displaySectionBox.classList.remove("hidden");
        currentDepartmentsList.classList.remove("box");
        currentDepartmentsList.classList.add("currentListWrapped");
        displayDepartmentCourseChart(departmentID, departmentsListGeneral, chart);
      } else if (departmentProfessorSemestersCheckbox.checked) {
        console.log("Stepped into - department_professor_semesters_checkbox is checked");

        displaySectionBox.classList.remove("hidden");
        currentDepartmentsList.classList.remove("box");
        currentDepartmentsList.classList.add("currentListWrapped");
        displayDepartmentProfessorSemestersChart(departmentID, departmentsListGeneral, chart);
      } else if (departmentProfessorNumberCheckbox.checked) {
        console.log("Stepped into - department_professor_number_checkbox is checked");

        displaySectionBox.classList.remove("hidden");
        currentDepartmentsList.classList.remove("box");
        currentDepartmentsList.classList.add("currentListWrapped");
        displayDepartmentProfessorNumberChart(departmentID, departmentsListGeneral, chart);
      } else {
        console.log("No Step - no filter boxes are checked");

        departmentFilterHelpContainer.classList.remove("hidden");
        departmentFilterHelpCheckboxes.classList.add("hugeTopMargin");
        departmentFilterHelpCheckboxes.classList.remove("hidden");
        
        setTimeout(() => {departmentFilterHelpCheckboxes.classList.remove("hugeTopMargin"); }, 3000);
        setTimeout(() => {departmentFilterHelpCheckboxes.classList.add("hidden"); }, 3000);
        setTimeout(() => {departmentFilterHelpContainer.classList.add("hidden"); }, 3000);
      }
    } else {
      departmentFilterHelpContainer.classList.remove("hidden");
      departmentFilterHelpText.classList.remove("hidden");

      setTimeout(() => {departmentFilterHelpText.classList.add("hidden"); }, 3000);
      setTimeout(() => {departmentFilterHelpContainer.classList.add("hidden"); }, 3000);

      if (departmentCourseCheckbox.checked != true && 
        departmentProfessorSemestersCheckbox.checked != true && 
        departmentProfessorNumberCheckbox.checked != true) {
        departmentFilterHelpCheckboxes.classList.add("bigTopMargin");
        departmentFilterHelpCheckboxes.classList.remove("hidden");

        setTimeout(() => {departmentFilterHelpCheckboxes.classList.remove("bigTopMargin"); }, 3000);
        setTimeout(() => {departmentFilterHelpCheckboxes.classList.add("hidden"); }, 3000);
      }

    }
  });

  /* Checks the user has entered valid input and displays a visualization using their input */
  professorCreateImageButton.addEventListener("click", (event) => {
    console.log("Fired - Clicked professor_create_image_button");
    
    const professorName = professorNameTextfield.value.toLowerCase();
    const allProfessorNames = getListProfessorNamesLower(professorsListGeneral);


    if (allProfessorNames?.includes(professorName)) {

      if (professorCoursesCheckbox.checked) {
        console.log("Stepped into - professor_courses_checkbox is checked");

        displaySectionBox.classList.remove("hidden");
        currentProfessorsList.classList.remove("box");
        currentProfessorsList.classList.add("currentListWrapped");
        displayProfessorCoursesChart(professorName, professorsListGeneral, chart);
      } else if (professorDepartmentCheckbox.checked) {
        console.log("Stepped into - professor_department_checkbox is checked");

        displaySectionBox.classList.remove("hidden");
        currentProfessorsList.classList.remove("box");
        currentProfessorsList.classList.add("currentListWrapped");
        displayProfessorDepartmentChart(professorName,professorsListGeneral,chart);
      } else {
        console.log("No Step - no filter boxes are checked");

        professorFilterHelpContainer.classList.remove("hidden");
        professorFilterHelpCheckboxes.classList.add("hugeTopMargin");
        professorFilterHelpCheckboxes.classList.remove("hidden");

        setTimeout(()=> { professorFilterHelpCheckboxes.classList.remove("hugeTopMargin"); }, 3000);
        setTimeout(()=> { professorFilterHelpCheckboxes.classList.add("hidden"); }, 3000);
        setTimeout(()=> { professorFilterHelpContainer.classList.add("hidden"); }, 3000);
      }
    } else {
        professorFilterHelpContainer.classList.remove("hidden");
        professorFilterHelpText.classList.remove("hidden");

        setTimeout(()=> { professorFilterHelpText.classList.add("hidden"); }, 3000);
        setTimeout(()=> { professorFilterHelpContainer.classList.add("hidden"); }, 3000);

        if (professorCoursesCheckbox.checked != true && professorDepartmentCheckbox.checked != true) {
            professorFilterHelpCheckboxes.classList.add("bigTopMargin");
            professorFilterHelpCheckboxes.classList.remove("hidden");

            setTimeout(()=> { professorFilterHelpCheckboxes.classList.remove("bigTopMargin"); }, 3000);
            setTimeout(()=> { professorFilterHelpCheckboxes.classList.add("hidden"); }, 3000);
        }
    }
  });

/* Textfield "Input" Event Listeners - To update the currentList on "Input" */
  courseNameTextfield.addEventListener("input", (event) => {
    console.log("Input - courseNameTextfield - " + event.target.value);

    const allNames = getCoursesList(coursesListGeneral);
    const newList = filterList(allNames, event.target.value);
    const trimmedList = newList.slice(0,20);

    injectHTMLCurrentCoursesList(trimmedList);

  })

  professorNameTextfield.addEventListener("input", (event) => {
    console.log("Input - professorNameTextfield - " + event.target.value);

    const allNames = getListProfessorNames(professorsListGeneral);
    const newList = filterList(allNames, event.target.value);

    let trimmedList = [];
    trimmedList = newList.slice(0,20);

    injectHTMLCurrentProfessorsList(trimmedList);
  });

  departmentNameTextfield.addEventListener("input", (event) => {
    console.log("Input - departmentNameTextfield - " + event.target.value);

    const allDepartments = getDepartmentsIDsList(departmentsListGeneral);
    const newList = filterList(allDepartments, event.target.value);

    let trimmedList = [];
    trimmedList = newList.slice(0,20);

    injectHTMLCurrentDepartmentsList(trimmedList);
  })

/* Textfield "Click" Event Listeners - To clear field on "Click" */
  courseNameTextfield.addEventListener("click", (event) => {
    console.log("Fired - professorNameTextfield - clicked");

    if (event.target.value != null) {
      event.target.select();
    }
  })  

  professorNameTextfield.addEventListener("click", (event) => {
  console.log("Fired - professorNameTextfield - clicked");

  if (event.target.value != null) {
    event.target.select();
  }
  })

  departmentNameTextfield.addEventListener("click", (event) => {
    console.log("Fired - departmentNameTextfield - clicked");
   
    if (event.target.value != null) {
      event.target.select();
    }
  })


  /* Checkbox Event Listeners - Professor Tab */
  professorCoursesCheckbox.addEventListener("change", (event) => {
    if (professorCoursesCheckbox.checked) {
      console.log("Fired - professor_courses_checkbox is now selected");

      if (professorDepartmentCheckbox.checked) {
        professorDepartmentCheckbox.checked = false;
      }
    } else {
      console.log("Fired - professor_courses_checkbox is no longer selected");
    }
  });

  professorDepartmentCheckbox.addEventListener("change", (event) => {
    if (professorDepartmentCheckbox.checked) {
      console.log("Fired - professor_department_checkbox is now selected");

      if (professorCoursesCheckbox.checked) {
        professorCoursesCheckbox.checked = false;
      }
    } else {
      console.log(
        "Fired - professor_department_checkbox is no longer selected"
      );
    }
  });

  /* Checkbox Event Listeners - Department Tab */
  departmentCourseCheckbox.addEventListener("change", (event) => {
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
  });

  departmentProfessorCheckbox.addEventListener("change", (event) => {
    if (departmentProfessorCheckbox.checked) {
      console.log("Fired - department_professor_checkbox is now selected");
      filterDepartmentProfessorSubsection.classList.remove("hidden");

      if (departmentCourseCheckbox.checked) {
        departmentCourseCheckbox.checked = false;
      }
    } else {
      console.log(
        "Fired - department_professor_checkbox is no longer selected"
      );

      /* Clearing the subsection boxes */
      if (departmentProfessorSemestersCheckbox.checked) {
        departmentProfessorSemestersCheckbox.checked = false;
      }
      if (departmentProfessorNumberCheckbox.checked) {
        departmentProfessorNumberCheckbox.checked = false;
      }
      filterDepartmentProfessorSubsection.classList.add("hidden");
    }
  });

  departmentProfessorSemestersCheckbox.addEventListener("change", (event) => {
    if (departmentProfessorSemestersCheckbox.checked) {
      console.log(
        "Fired - department_professor_semesters_checkbox is now selected"
      );

      if (departmentProfessorNumberCheckbox.checked) {
        departmentProfessorNumberCheckbox.checked = false;
      }
    } else {
      console.log(
        "Fired - department_professor_semesters_checkbox is no longer selected"
      );
    }
  });

  departmentProfessorNumberCheckbox.addEventListener("change", (event) => {
    if (departmentProfessorNumberCheckbox.checked) {
      console.log(
        "Fired - department_professor_number_checkbox is now selected"
      );
      if (departmentProfessorSemestersCheckbox.checked) {
        departmentProfessorSemestersCheckbox.checked = false;
      }
    } else {
      console.log(
        "Fired - department_professor_number_checkbox is no longer selected"
      );
    }
  });

  /* Checkbox Event Listeners - Course Tab */
  courseDepartmentCheckbox.addEventListener("change", (event) => {
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
  });

  courseProfessorCheckbox.addEventListener("change", (event) => {
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
  });

  /* Header Button Event Listeners */

  /* Set view to search by course */
  headerCourseButton.addEventListener("click", (event) => {
    console.log("Fired - Clicked h_course button");

    /* this makes the user load the data before allowing any input */
    if (professorsListGeneral.length > 0) {
        headerCourseButton.classList.add("hidden");
        headerCourseButtonCurrent.classList.remove("hidden");

        initialBoxDataLoaded.classList.add("hidden");
        coursesListLabel.classList.remove("hidden");
        currentCoursesList.classList.remove("hidden");
        storedCoursesList = getCoursesList(coursesListGeneral);
        injectHTMLCurrentCoursesList(storedCoursesList.slice(0,20));
      if (filterDepartmentSection.classList.contains("hidden") != true) {
        clearDepartmentTab();
      }
      if (filterProfessorSection.classList.contains("hidden") != true) {
        clearProfessorTab();
      }
      if (filterCourseSection.classList.contains("hidden")) {
        filterCourseSection.classList.remove("hidden");
      }
    }
  });

  /* De-select the headerCourse tab */
  headerCourseButtonCurrent.addEventListener("click", (event) => {
    console.log("Fired - headerCourseButtonCurrent");

    clearCourseTab();
    initialBoxDataLoaded.classList.remove("hidden");
  })

  /* Set view to search by department */
  headerDepartmentButton.addEventListener("click", (event) => {
    console.log("Fired - Clicked h_department button");


    /* this makes the user load the data before allowing any input */
    if (professorsListGeneral.length > 0) {
        headerDepartmentButton.classList.add("hidden");
        headerDepartmentButtonCurrent.classList.remove("hidden");

        initialBoxDataLoaded.classList.add("hidden");
        departmentsListLabel.classList.remove("hidden");
        currentDepartmentsList.classList.remove("hidden");
        storedDepartmentIDsList = getDepartmentsIDsList(departmentsListGeneral);
        console.log("hiya");
        console.log(storedDepartmentIDsList);
        const storedDepartmentIDsListCut = getDepartmentsIDsListCut(storedDepartmentIDsList);
        injectHTMLCurrentDepartmentsList(storedDepartmentIDsListCut);
        if (filterProfessorSection.classList.contains("hidden") != true) {
            clearProfessorTab();    
        }
        if (filterCourseSection.classList.contains("hidden") != true) {
            clearCourseTab();
        }
        if (filterDepartmentSection.classList.contains("hidden")) {
            filterDepartmentSection.classList.remove("hidden");
        } 
    }
  });

  /* De-select the headerDepartment tab */
  headerDepartmentButtonCurrent.addEventListener("click", (event) => {
    console.log("Fired - headerDepartmentButtonCurrent");

    clearDepartmentTab();
    initialBoxDataLoaded.classList.remove("hidden");
  })

  /* Set view to search by professor */
  headerProfessorButton.addEventListener("click", (event) => {
    console.log("Fired - Clicked headerProfessorButton button");

    /* This runs if professorsListGeneral is populated and the section has not been selected yet */    
        if (professorsListGeneral.length > 0) {
            headerProfessorButton.classList.add("hidden");
            headerProfessorButtonCurrent.classList.remove("hidden");

            initialBoxDataLoaded.classList.add("hidden");
            professorsListLabel.classList.remove("hidden");
            currentProfessorsList.classList.remove("hidden");
            storedProfessorsList = getProfessorsListCut(professorsListGeneral);
            injectHTMLCurrentProfessorsList(storedProfessorsList);
        if (filterCourseSection.classList.contains("hidden") != true) {
            clearCourseTab();
        }
        if (filterDepartmentSection.classList.contains("hidden") != true) {
          clearDepartmentTab();
        }
        if (filterProfessorSection.classList.contains("hidden")) {
          filterProfessorSection.classList.remove("hidden");
        } 
    }  
  });

  /* De-select the headerProfessor tab */
  headerProfessorButtonCurrent.addEventListener("click", (event) => {
    console.log("Fired - headerProfessorButtonCurrent");

    clearProfessorTab();
    initialBoxDataLoaded.classList.remove("hidden");
  })

 /* Initialize the main_form to allow for event listeners */
  initializeDataButton.addEventListener("click", async (submitEvent) => {
  console.log("Fired - initialize button");

  d3.selectAll("body").transition().duration(2000).style("background-color", "green");

  /* Loading list of professors */
  console.log("Fetching - loading professor - a list of all professors");
  const professorsListRaw = await fetch("https://api.umd.io/v1/professors");
  professorsListGeneral = await professorsListRaw.json();
  localStorage.setItem('professorsListGeneral', JSON.stringify(professorsListGeneral));
  console.log("Stored - put professorsListGeneral in localStorage");

  /* Loading list of courses */
  console.log("Fetching - loading courses - a list of courseIDs and names");  
  const coursesListRaw = await fetch ("https://api.umd.io/v1/courses/list");
  coursesListGeneral = await coursesListRaw.json();
  localStorage.setItem('coursesListGeneral', JSON.stringify(coursesListGeneral));
  console.log("Stored - put coursesListGeneral in localStorage");
  
  console.log("Fetching - loading departments - a list of department_ids and names");
  const departmentsListRaw = await fetch ("https://api.umd.io/v1/courses/departments");
  departmentsListGeneral = await departmentsListRaw.json();
  localStorage.setItem('departmentsListGeneral', JSON.stringify(departmentsListGeneral));
  console.log("Stored - put departmentsListGeneral in localStorage");
  console.log(departmentsListGeneral);
  


  /* Hiding this box and button */
      initializeDataButton.classList.add("hidden");
      initialBoxDataUnloaded.classList.add("hidden");
      initialBoxDataLoaded.classList.remove("hidden");
      clearLocalStorageButton.classList.remove("hidden");

  d3.selectAll("body").transition().duration(1000).style("background-color", "white");


  });

  clearLocalStorageButton.addEventListener("click", (event) => {
    console.log("Fired - clearLocalStorageButton");

    localStorage.clear();
    console.log('localStorage Check', localStorage.getItem("professorsListGeneral"));

    d3.selectAll("body").transition().style("background-color", "pink");

    initialBoxDataLoaded.classList.add("hidden");
    initialBoxDataUnloaded.classList.remove("hidden");
    clearLocalStorageButton.classList.add("hidden");
    initializeDataButton.classList.remove("hidden");
  })
}
document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means we can make API requests
