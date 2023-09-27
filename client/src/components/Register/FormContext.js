import { createContext, useState, useEffect } from "react";
import AuthenticationService from "../../services/AuthenticationService";
const FormContext = createContext({});

export const FormProvider = ({ children }) => {
  console.log("form context");

  const title = {
    0: "Billing Info",
    1: "Shipping Info",
    2: "Opt-In",
  };

  const [page, setPage] = useState(0);

  const [data, setData] = useState({
    name: "",
    // LastName: "",
    user_id: "",
    // currentAddress: {
    //   currentAddress1: "",
    //   currentAddress2: "",
    //   currentCity: "",
    //   currentState: "",
    //   currentZipCode: "",
    // },
    currentAddress1: "",
    currentAddress2: "",
    currentCity: "",
    currentState: "",
    currentZipCode: "",
    sameAsCurrent: false,
    // permanentAddress: {
    //   permanentAddress1: "",
    //   permanentAddress2: "",
    //   permamentCity: "",
    //   permanentState: "",
    //   permanentZipCode: "",
    // },
    permanentAddress1: "",
    permanentAddress2: "",
    permanentCity: "",
    permanentState: "",
    permanentZipCode: "",
    mothername: "",
    fathername: "",
    optForNetBanking: false,
    occType: "",
    incomeSource: "",
    grossAnnualIncome: "",
    agreeToTerms: false,
    dob: "",
    password: "",
    aadhar: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    if (data.sameAsCurrent) {
      setData((prevData) => ({
        ...prevData,
        permanentAddress1: prevData.currentAddress1,
        permanentAddress2: prevData.currentAddress2,
        permanentCity: prevData.currentCity,
        permanentState: prevData.currentState,
        permanentZipCode: prevData.currentZipCode,
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        permanentAddress1: "",
        permanentAddress2: "",
        permanentCity: "",
        permanentState: "",
        permanentZipCode: "",
      }));
    }
  }, [data.sameAsCurrent]);

  const handleChange = (e) => {
    const type = e.target.type;

    const name = e.target.name;

    const value = type === "checkbox" ? e.target.checked : e.target.value;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const {
    currentAddress2,
    sameAsCurrent,
    permanentAddress2,
    optInNews,
    ...requiredInputs
  } = data;

  // const canSubmit = [...Object.values(requiredInputs)].every(Boolean) && page === Object.keys(title).length - 1

  const canSubmit = true;

  const canNextPage1 = Object.keys(data)
    .filter((key) => key.startsWith("password"))
    .map((key) => data[key])
    .every((value) => typeof value !== "undefined" && value !== null && value !== "");

  const canNextPage2 = Object.keys(data)
    .filter((key) => key.startsWith("Zip"))
    .map((key) => data[key])
    .every((value) => typeof value !== "undefined" && value !== null && value !== "");

  const disablePrev = page === 0;

  const disableNext =
    page === Object.keys(title).length - 1 ||
    (page === 0 && !canNextPage1) ||
    (page === 1 && !canNextPage2);

  const prevHide = page === 0 && "remove-button";

  const nextHide = page === Object.keys(title).length - 1 && "remove-button";

  const submitHide = page !== Object.keys(title).length - 1 && "remove-button";

  return (
    <FormContext.Provider
      value={{
        title,
        page,
        setPage,
        data,
        setData,
        canSubmit,
        handleChange,
        disablePrev,
        disableNext,
        prevHide,
        nextHide,
        submitHide,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
