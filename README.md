# Final-Project-Repo

Github Pages Link:
https://jconnor27.github.io/Final-Project-Repo/

# About 
(Updated: 5/11/23)

The information problem I am hoping to examine pertains to instructors, and their capabilities
of teaching different classes. Do you want to see all the classes your favorite professor is or 
has taught? Do you want to see which department is the most diverse in terms of being able to 
teach other subjects? Are any departments highly specialized in a specific area? By pulling from 
the UMD.io API, these sorts of questions may soon have an answer.

Users could either type in the professor's name or select certain departments to see a list of the
classes offered by the search parameter.
• Users could also search by course to see which departments or instructors are teaching it.
• For visualizations:
o When searching by course:
▪ Returns a graph comparing how many instructors from each department teach
the course.
• Can click on a portion to see the list of professors.
o When searching by department or professor:
▪ Returns a graph comparing the number of the types of courses taught.
• Can click on a portion to see the list of courses.

# Target Browsers
(Updated 5/11/23)

My data visualization tool is targeted towards iOS, or Chrome. These are the browsers I have 
tesetd my tool on the most, and can almost gurantee success.

# Final Report

What API did you use? 
I used the UMD.io/v1 api  
https://api.umd.io/v1 
 
What visualizations does your project drive? 
Course -> Professor 
A line chart pertaining to all of the professors who have taught the input course. 
Course -> Department 
A pie chart pertaining to the ratio of departments who have taught the class. 
Department -> Course 
A pie chart depicting the gen_eds of a certain course. 
Department -> Professor -> Semesters 
A bar chart depicting how many semesters a professor has been with the department. 
Department -> Professor -> Number 
A bar chart pertaining to how classes a professor teaches for the department. 
Professor -> Course 
A line chart depicting how many courses a professor has taught each semester. 
Professor -> Department 
A pie chart pertaining to the diversity of classes a professor teaches in terms of department. 
 
What visualization or other JS libraries does your project use? 
My project uses canvas.js and D3.js. 
Canvas.js was utilized to make the charts/visualizations. 
D3.js was utilized to implement haptics across the site. 
 
What CSS frameworks did you use? What version of them? 
I wrote my own CSS framework. 
 
What is your actual project trying to display and solve? 
The information problem I am hoping to examine pertains to instructors, and their capabilities of teaching different classes. Do you want to see all the classes your favorite professor is or has taught? Do you want to see which department is the most diverse in terms of being able to teach other subjects? Are any departments highly specialized in a specific area? By pulling from the UMD.io API, these sorts of questions may soon have an answer. 
Users could either type in the professor's name or select certain departments to see a list of the classes offered by the search parameter. 
Users could also search by course to see which departments or instructors are teaching it. 
For visualizations: 
When searching by course: 
Returns a graph comparing how many instructors from each department teach the course. ￼ 
You can click on a portion to see the list of professors. 
When searching by department or professor: 
Returns a graph comparing the number of the types of courses taught. 
You can click on a portion to see the list of courses. 

