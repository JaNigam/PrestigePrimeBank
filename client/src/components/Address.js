import useFormContext from "./useFormContext"
import AuthenticationService from "../services/AuthenticationService"

const Billing = () => {

    const { data, handleChange } = useFormContext()

    const content = (        <div className="flex-col">
            <div className="split-container">
                <div className="flex-col">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Jane"
                        pattern="([A-Z])[\w+.]{1,}"
                        value={data.name}
                        onChange={handleChange}
                    />
                    
                </div>
                
                <div className="flex-col">
                    <label htmlFor="email"> email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="John@example.com"
                        pattern="([A-Z])[\w+.]{1,}"
                        value={data. email}
                        onChange={handleChange}
                    />
                    
                </div>
                
                
                {/* <div className="flex-col">
                    <label htmlFor="LastName">Last Name</label>
                    <input
                        type="text"
                        id="LastName"
                        name="LastName"
                        placeholder="Doe"
                        pattern="([A-Z])[\w+.]{1,}"
                        value={data.billLastName}
                        onChange={handleChange}
                    />
                </div> */}
            </div>
            <div className="flex-col">
                    <label htmlFor="password">password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Jane"
                        pattern="([A-Z])[\w+.]{1,}"
                        value={data.password}
                        onChange={handleChange}
                    />
                    
                </div>

            <div className="split-container">

            <div className="flex-col">
                    <label htmlFor="mobile">mobile  </label>
                    <input
                        type="number"
                        id="mobile"
                        name="mobile"
                        placeholder=""
                        pattern="([A-Z])[\w+.]{1,}"
                        value={data.mobile}
                        onChange={handleChange}
                        // disabled={data.sameAsCurrent}
                    />
            </div>

            <div className="flex-col">
                    <label htmlFor="aadhar">Aadhar Number  </label>
                    <input
                        type="number"
                        id="aadhar"
                        name="aadhar"
                        placeholder=""
                        pattern="([A-Z])[\w+.]{1,}"
                        value={data.aadhar}
                        onChange={handleChange}
                        // disabled={data.sameAsCurrent}
                    />
                </div>
                </div>
                
                

            <div className="flex-col">
                    <label htmlFor="dob">Date Of Birth</label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        placeholder=""
                        pattern="([A-Z])[\w+.]{1,}"
                        value={data.dob}
                        onChange={handleChange}
                    />
                </div>

            <label htmlFor="currentAddress1">Address</label>
            <input
                type="text"
                id="currentAddress1"
                name="currentAddress1"
                placeholder="555 kadubeesanahalli"
                pattern="[\w\d\s.#]{2,}"
                value={data.currentAddress1}
                onChange={handleChange}
            />

            <label htmlFor="currentAddress2" className="offscreen">2nd Address line</label>
            <input
                type="text"
                id="currentAddress2"
                name="currentAddress2"
                placeholder="Apt. 2"
                pattern="[\w\d\s.#]{2,}"
                value={data.currentAddress2}
                onChange={handleChange}
            />

            <label htmlFor="currentCity">City</label>
            <input
                type="text"
                id="currentCity"
                name="currentCity"
                placeholder="New York"
                pattern="([A-Z])[\w\s.]{1,}"
                value={data.currentCity}
                onChange={handleChange}
            />

            <label htmlFor="currentState">State</label>
            <select
                id="currentState"
                name="currentState"
                value={data.currentState}
                onChange={handleChange}
            >
                <option value="AN">Andaman and Nicobar Islands</option>
                <option value="AP">Andhra Pradesh</option>
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
                <option value="WB">West Bengal</option>
            </select>

            <label htmlFor="currentZipCode">Zip Code</label>
            <input
                type="text"
                id="currentZipCode"
                name="currentZipCode"
                placeholder="12345"
                pattern="[0-9]{5}"
                maxLength="5"
                value={data.currentZipCode}
                onChange={handleChange}
            />
        </div>
    )

    return content
}
export default Billing