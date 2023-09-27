import FormInputs from "./FormInputs";
import useFormContext from "./useFormContext";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../../services/AuthenticationService";
import NavBar from "../NavBar";
import Footer from "../Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronCircleLeft,faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';


const Form = () => {
  const history = useNavigate();
  const {
    page,
    setPage,
    data,
    title,
    canSubmit,
    disablePrev,
    disableNext,
    prevHide,
    nextHide,
    submitHide,
  } = useFormContext();
  console.log(page);

  const handlePrev = () => setPage((prev) => prev - 1);

  const handleNext = () => setPage((prev) => prev + 1);

  // const handleSubmit = e => {

  //     e.preventDefault()
  //     console.log(JSON.stringify(data))
  // }

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent page refresh
    // const validationErrors = validateForm();
    // if (Object.keys(validationErrors).length === 0) {
    try {
      console.log("submit");
      console.log(JSON.stringify(data));
      await AuthenticationService.registerDealer(data);
      // setSuccessMessage('Registration successful!');
      // alert("Registration Successfull");
      setTimeout(() => {
        history("/login"); // navigates to Login Component
      }, 3000);
    } catch (error) {
      console.error("Registration error", error);
      // setSuccessMessage('An error occurred during registration.');
    }
  };
  // else {
  //   setErrors(validationErrors);
  // }
  //   };

  const content = (
    <>
      <NavBar />
      <form className="form flex-col" onSubmit={handleSubmit}>
        <header className="form-header">
          {/* <h2>{title[page]}</h2> */}

          <div className="button-container">
            <button
              type="button"
              className={`button ${prevHide}`}
              onClick={handlePrev}
              disabled={disablePrev}
            >
              <span>
              <FontAwesomeIcon icon={faChevronCircleLeft} className="fa-icon">Prev</FontAwesomeIcon>
              </span>
            </button>

            <button
              type="button"
              className={`button ${nextHide}`}
              onClick={handleNext}
              disabled={disableNext}
            >
              <span>
              <FontAwesomeIcon icon={faChevronCircleRight} className="fa-icon">Next</FontAwesomeIcon>
              </span>
            </button>

            <button
              type="submit"
              className={`button ${submitHide}`}
              disabled={!canSubmit}
            >
              Submit
            </button>
          </div>
        </header>

        <FormInputs />
      </form>
      <Footer />
    </>
  );

  return content;
};
export default Form;
