import { useEffect, useState } from 'react';
import './App.css';
import CourseCard from './CourseCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [registrationConfirmed, setRegistrationConfirmed] = useState(false);
  const maxCreditHours = 20;

  useEffect(() => {
    fetch('data.json')
      .then((response) => response.json())
      .then((data) => setCourses(data));
  }, []);

  const handleCourseSelect = (course) => {
    if (selectedCourses.some((selected) => selected.id === course.id)) {
      toast.error("You've already selected this course");
    } else {
      const totalCreditHours = selectedCourses.reduce(
        (total, selected) => total + parseFloat(selected.creditHour),
        0
      );
      if (totalCreditHours + parseFloat(course.creditHour) > maxCreditHours) {
        toast.error('You can take 20 credit hours max');
      } else {
        setSelectedCourses([...selectedCourses, course]);
      }
    }
  };

  const remainingCreditHours = maxCreditHours - selectedCourses.reduce(
    (total, course) => total + parseFloat(course.creditHour),
    0
  );

  const showConfirmButton = selectedCourses.length > 0 && !registrationConfirmed;
  const handleConfirmRegistration = () => {
    toast.success('Registration Successful', {
      onClose: resetValues, 
    });
    setRegistrationConfirmed(true); 
  };

  // reset values
  const resetValues = () => {
    setSelectedCourses([]); 
    setRegistrationConfirmed(false); 
  };

  const handleCourseRemove = (courseToRemove) => {
    const updatedSelectedCourses = selectedCourses.filter(
      (course) => course.id !== courseToRemove.id
    );
    setSelectedCourses(updatedSelectedCourses);
  };
  

  return (
    <div className="web-site-container">
      <h1 className="website-title">Course Registration</h1>
      <div className="container">
        <div className="course-container">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onCourseSelect={handleCourseSelect}
            />
          ))}
        </div>
        <div className="selected-courses">
          <h2 className="credit-hour-remaining">Credit Hour Remaining: {remainingCreditHours} hrs</h2>
          <h4>Selected Courses:</h4>
          <ol className="selected-course-names">
            {selectedCourses.map((course, index) => (
              <li key={course.id}>
                {course.name}{' '}
                <span
                  onClick={() => handleCourseRemove(course)}
                  className="remove-button"
                  style={{
                    float: 'right',
                    cursor: 'pointer',
                    paddingLeft: '8px',
                  }}
                >
                  <svg height="16px" width="16px" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 40 40">
                  <path fill="#f78f8f" d="M21 24.15L8.857 36.293 4.707 32.143 16.85 20 4.707 7.857 8.857 3.707 21 15.85 33.143 3.707 37.293 7.857 25.15 20 37.293 32.143 33.143 36.293z"></path><path fill="#c74343" d="M33.143,4.414l3.443,3.443L25.15,19.293L24.443,20l0.707,0.707l11.436,11.436l-3.443,3.443 L21.707,24.15L21,23.443l-0.707,0.707L8.857,35.586l-3.443-3.443L16.85,20.707L17.557,20l-0.707-0.707L5.414,7.857l3.443-3.443 L20.293,15.85L21,16.557l0.707-0.707L33.143,4.414 M33.143,3L21,15.143L8.857,3L4,7.857L16.143,20L4,32.143L8.857,37L21,24.857 L33.143,37L38,32.143L25.857,20L38,7.857L33.143,3L33.143,3z"></path>
                  </svg>
                </span>
              </li>
            ))}
          </ol>
          <p className="total-credit">
            Total Credit Hours:{' '}
            {selectedCourses.reduce(
              (total, course) => total + parseFloat(course.creditHour),
              0
            )}
          </p>
          <p className="total-price">
            Total Price: $
            {selectedCourses.reduce(
              (total, course) => total + parseFloat(course.price),
              0
            )}
          </p>
          {showConfirmButton && (
            <button onClick={handleConfirmRegistration} className="select-button">
              Confirm Registration
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
