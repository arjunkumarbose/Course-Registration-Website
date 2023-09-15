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
                {index + 1}. {course.name}
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
