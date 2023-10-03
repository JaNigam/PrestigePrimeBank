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


  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent page refresh

    try {
      console.log("submit");
      console.log(JSON.stringify(data));
      await AuthenticationService.registerDealer(data);
      setTimeout(() => {
        history("/login"); // navigates to Login Component
      }, 3000);
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  const content = (
    <>
      <NavBar />
      <form className="form flex-col" onSubmit={handleSubmit}>
        <header className="form-header">

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
