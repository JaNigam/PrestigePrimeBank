import useFormContext from "./useFormContext";
import AuthenticationService from "../../services/AuthenticationService";
import NavBar from "../NavBar";
import "../.././styles/Register.css";

const Address = () => {
  const { data, handleChange } = useFormContext();

  const content = (
    <>
    
      {/* <NavBar/> */}
    <div className="container">
      
      <div className="row">
        <div className="col md-6">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Your Name"
            pattern="([A-Z])[\w+.]{1,}"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div className="col md-6">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email@example.com"
            pattern="([A-Z])[\w+.]{1,}"
            value={data.email}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* for father name and mother name */}
      <div className="row">
        <div className="col md-6">
          <label htmlFor="mothername">Mother Name</label>
          <input
            type="text"
            id="mothername"
            name="mothername"
            placeholder="Mother's Name"
            pattern="([A-Z])[\w+.]{1,}"
            value={data.mothername}
            onChange={handleChange}
            // disabled={data.sameAsCurrent}
          />
        </div>
        <div className="col md-6">
          <label htmlFor="fathername">Father Name</label>
          <input
            type="text"
            id="fathername"
            name="fathername"
            placeholder="Father's Name"
            pattern="([A-Z])[\w+.]{1,}"
            value={data.fathername}
            onChange={handleChange}
            // disabled={data.sameAsCurrent}
          />
        </div>
      </div>

      {/* for aadhar and mobile number */}
      <div className="row">
        <div className="col md-6">
          <label htmlFor="mobile">Mobile </label>
          <input
            type="number"
            id="mobile"
            name="mobile"
            placeholder="+91-XXXXXXXXXX"
            pattern="([A-Z])[\w+.]{1,}"
            value={data.mobile}
            onChange={handleChange}
            // disabled={data.sameAsCurrent}
          />
        </div>
        <div className="col md-6">
          <label htmlFor="aadhar">Aadhar Number </label>
          <input
            type="number"
            id="aadhar"
            name="aadhar"
            placeholder="XXXXXXXXXXXX"
            pattern="([A-Z])[\w+.]{1,}"
            value={data.aadhar}
            onChange={handleChange}
            // disabled={data.sameAsCurrent}
          />
        </div>
      </div>

      <div className="row">
        <div className="col md-6">
          {" "}
          <label htmlFor="dob">Date Of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            placeholder="DD-MM-YYYY"
            pattern="([A-Z])[\w+.]{1,}"
            value={data.dob}
            onChange={handleChange}
          />
        </div>
        <div className="col md-6">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder=""
            pattern="([A-Z])[\w+.]{1,}"
            value={data.password}
            onChange={handleChange}
          />
        </div>
      </div>
      </div>
    </>
  );

  return content;
};
export default Address;
