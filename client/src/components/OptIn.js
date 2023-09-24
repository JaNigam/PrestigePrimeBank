import NavBar from "./NavBar"
import useFormContext from "./useFormContext"
import '.././styles/Register.css'
const OptIn = () => {
  const { data, handleChange } = useFormContext();

  const content = (
    <>
      {/* <NavBar/> */}
      <div className="row">
        <div className="col md-6">
          <div className="row">
            <div className="col md-12">
              {" "}
              <label htmlFor="occType">Occupation</label>
              <input
                type="text"
                id="occType"
                name="occType"
                placeholder=""
                pattern="([A-Z])[\w+.]{1,}"
                value={data.occType}
                // value="doctor"
                onChange={handleChange}
                // disabled={data.sameAsCurrent}
              />
            </div>
          </div>
          <div className="row">
            <div className="col md-12">
              <label htmlFor="optInNews">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={data.agreeToTerms}
                  onChange={handleChange}
                />
                I AGGREE TO ALL THE TERMS AND CONDITIONS
              </label>

              <label htmlFor="optInNews">
                <input
                  type="checkbox"
                  id="optForNetbanking"
                  name="optForNetbanking"
                  checked={data.optForNetbanking}
                  onChange={handleChange}
                />
                Opt for netbanking
              </label>
            </div>
          </div>
        </div>
        <div className="col md-6">
          <div className="row">
            <div className="col md-12">
              <label htmlFor="grossAnnualIncome">Gross Annual Income</label>
              <input
                type="number"
                id="grossAnnualIncome"
                name="grossAnnualIncome"
                placeholder=""
                pattern="([A-Z])[\w+.]{1,}"
                value={data.grossAnnualIncome}
                onChange={handleChange}
                // disabled={data.sameAsCurrent}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col md-12">
            <label htmlFor="incomeSource">Income Source</label>
            <input
              type="text"
              id="incomeSource"
              name="incomeSource"
              placeholder=""
              pattern="([A-Z])[\w+.]{1,}"
              value={data.incomeSource}
              onChange={handleChange}
              // disabled={data.sameAsCurrent}
            />
          </div>
        </div>
      </div>
    </>
  );

  return content;
};
export default OptIn;
