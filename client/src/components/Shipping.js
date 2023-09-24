<<<<<<< Updated upstream
import NavBar from "./NavBar";
import useFormContext from "./useFormContext";

=======
import NavBar from "./NavBar"
import useFormContext from "./useFormContext"
import '.././styles/Register.css'
>>>>>>> Stashed changes
const Shipping = () => {
  const { data, handleChange } = useFormContext();

  const content = (
    <>
      {/* <NavBar/> */}
      <div className="split-container">
        <div className="flex-col">
          <label htmlFor="mothername">Mother Name</label>
          <input
            type="text"
            id="mothername"
            name="mothername"
            placeholder="Jane"
            pattern="([A-Z])[\w+.]{1,}"
            value={data.mothername}
            onChange={handleChange}
            // disabled={data.sameAsCurrent}
          />
        </div>
        <div className="flex-col">
          <label htmlFor="fathername">Father Name</label>
          <input
            type="text"
            id="fathername"
            name="fathername"
            placeholder="Jane father"
            pattern="([A-Z])[\w+.]{1,}"
            value={data.fathername}
            onChange={handleChange}
            // disabled={data.sameAsCurrent}
          />
        </div>
      </div>

      <label htmlFor="permanentAddress1">Permanent Address</label>
      <label htmlFor="sameAsCurrent">
        <input
          type="checkbox"
          id="sameAsCurrent"
          name="sameAsCurrent"
          checked={data.sameAsCurrent}
          onChange={handleChange}
        />
        Same as Current Address
      </label>
      <input
        type="text"
        id="permanentAddress1"
        name="permanentAddress1"
        // placeholder="555 Wallaby Way"
        pattern="[\w\d\s.#]{2,}"
        value={data.currentAddress1}
        onChange={handleChange}
        disabled={data.sameAsCurrent}
      />

      <label htmlFor="permanentAddress2"></label>
      <input
        type="text"
        id="permanentAddress2"
        name="permanentAddress2"
        pattern="[\w\d\s.#]{2,}"
        value={data.currentAddress2}
        onChange={handleChange}
        disabled={data.sameAsCurrent}
      />

      <label htmlFor="permanentCity">City</label>
      <input
        type="text"
        id="permanentCity"
        name="ship-city"
        placeholder="New York"
        pattern="([A-Z])[\w\s.]{1,}"
        value={data.currentCity}
        onChange={handleChange}
        disabled={data.sameAsCurrent}
      />

      <label htmlFor="permanentState">State</label>
      <select
        id="permanentState"
        name="permanentState"
        value={data.currentState}
        onChange={handleChange}
        disabled={data.sameAsCurrent}
      >
        <option value="none">Select an Option</option>
        {/* <option value="AN">Andaman and Nicobar Islands</option> */}
        {/* <option value="AP">Andhra Pradesh</option>
        <option value="AR">Arunachal Pradesh</option>
        <option value="AS">Assam</option>
        <option value="BR">Bihar</option>
        <option value="CH">Chandigarh</option>
        <option value="CT">Chhattisgarh</option>
        <option value="DN">Dadra and Nagar Haveli</option>
        <option value="DD">Daman and Diu</option>
        <option value="DL">Delhi</option>
        <option value="GA">Goa</option>
        <option value="GJ">Gujarat</option>
        <option value="HR">Haryana</option>
        <option value="HP">Himachal Pradesh</option>
        <option value="JK">Jammu and Kashmir</option>
        <option value="JH">Jharkhand</option>
        <option value="KA">Karnataka</option>
        <option value="KL">Kerala</option>
        <option value="LA">Ladakh</option>
        <option value="LD">Lakshadweep</option>
        <option value="MP">Madhya Pradesh</option>
        <option value="MH">Maharashtra</option>
        <option value="MN">Manipur</option>
        <option value="ML">Meghalaya</option>
        <option value="MZ">Mizoram</option>
        <option value="NL">Nagaland</option>
        <option value="OR">Odisha</option>
        <option value="PY">Puducherry</option>
        <option value="PB">Punjab</option>
        <option value="RJ">Rajasthan</option>
        <option value="SK">Sikkim</option>
        <option value="TN">Tamil Nadu</option>
        <option value="TG">Telangana</option>
        <option value="TR">Tripura</option>
        <option value="UP">Uttar Pradesh</option>
        <option value="UT">Uttarakhand</option>
        <option value="WB">West Bengal</option> */}
      </select>

      <label htmlFor="permanentZipCode">Zip Code</label>
      <input
        type="text"
        id="permanentZipCode"
        name="permanentZipCode"
        placeholder="12345"
        pattern="[0-9]{5}"
        maxLength="5"
        value={data.permanentZipCode}
        onChange={handleChange}
        disabled={data.sameAsCurrent}
      />
    </>
  );

  return content;
};
export default Shipping;
