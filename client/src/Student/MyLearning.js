import React from 'react'

const MyLearning = () => {
        const { User } = useContext(AuthContext);
        const host = "http://localhost:8000";
        const [myEnrollments, setMyEnrollments] = React.useState([]);
        const myEnrollmentsUpdate = (enrollments) => {
          console.log("State function called!");
          setMyEnrollments((prevenroll) => {
            return enrollments;
          });
        };
        const getMyCourses = async () => {
          try {
            let response = await fetch(`${host}/api/courses/${User._id}`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              credentials: "include",
            });
            const svrres = await response.json();
            console.log(svrres.data.enrollments);
            myEnrollmentsUpdate(svrres.data.enrollments);
          } catch (err) {
            console.log(err);
          }
        }
        useEffect (() => {
          getMyCourses()
        },[]);
  return (
    <div>MyLearning</div>
  )
}

export default MyLearning