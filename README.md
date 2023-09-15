# Course Registration Website

A website based on ReactJs and Vite.

# Live Url:

https://my-course-roster-arjunkumarbose.netlify.app/

# Features:

**User Actions:**
<ol>
  <li>View Courses: Users can view a list of available courses on the website. These courses are displayed as cards with images, names, descriptions, prices, and credit hours.</li>
  <li>Select Courses: Users can select courses they are interested in by clicking the "Select" button on each course card. Selected courses are added to a list of chosen courses.</li>
  <li>Course Selection Validation: Users are provided with feedback via toast notifications when they attempt to select a course that has already been chosen or when they exceed the maximum credit hours allowed.</li>
  <li>View Selected Courses: Users can view the list of courses they have selected, along with the total credit hours and the total price of their selected courses.</li>
  <li>Confirm Registration: If users are satisfied with their selected courses, they can confirm their registration by clicking the "Confirm Registration" button. A successful registration toast notification is displayed.</li>
  <li>Reset Selection: After confirming their registration or if they wish to start over, users can reset their selected courses by refreshing the page or navigating away from the site.</li>
</ol>

**Website Functionality:**
<ol>
  <li>Course Listing: The website displays a list of courses from a JSON data source, showing course details including images, names, descriptions, prices, and credit hours.</li>
  <li>Course Selection: It allows users to select courses, and it tracks the selected courses, ensuring that the user is not allowed to select the same course more than once and that they do not exceed the maximum credit hours.</li>
  <li>User Feedback: The website provides feedback to users through toast notifications in case of errors, such as duplicate course selection or exceeding credit hour limits, and also provides a success notification upon confirming registration.</li>
  <li>Display Remaining Credit Hours: It calculates and displays the remaining credit hours that the user can select based on the maximum credit hour limit.</li>
</ol>

**Extra Features:**
<ol>
  <li>Responsiveness: The website is fully responsive for Mobile and Tablet devices.</li>
  <li>Confirmation and Reset: It enables users to confirm their registration and, upon doing so, resets the selected courses and indicates successful registration. Users can then start the selection process again.</li>
  <li>Toastify: Used toasty in order to show various alerts and confirmations.</li>
</ol>

# How I have managed the state in this project:
1. **Selected Courses ('selectedCourses'):** Using 'useState' to manage state variables, this state variable kept track of the courses the user had selected when they interacted with the website. The handling of duplicate selections and going over credit hour restrictions provided user feedback via toast alerts.
2. **Course Data ('courses'):** Course data from an external JSON source was fetched asynchronously using 'useEffect' and stored in the 'courses' state variable for display.
3. **Confirmation of credit hours and registration:** Based on the chosen courses, the 'remainingCreditHours' state was calculated, and the'registrationConfirmed' state monitored whether the user had confirmed registration.
4. **State Resetting ('resetValues'):** After user confirmation, a function to reset state variables was implemented, enabling fresh starts.
5. **Conditional Rendering:** State variables were used to conditionally render items, including the "Confirm Registration" button, dependent on selected courses and confirmation.











