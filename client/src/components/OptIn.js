import useFormContext from "./useFormContext"

const OptIn = () => {
    const { data, handleChange } = useFormContext()

    const content = (
        <>
        
                <div className="flex-col">
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
                <div className="flex-col">
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
                <div className="flex-col">
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
            <label htmlFor="optInNews">
                <input type="checkbox" id="agreeToTerms" name="agreeToTerms" checked={data.agreeToTerms} onChange={handleChange} />
                I AGGREE TO ALL THE TERMS AND CONDITIONS
            </label>

            <label htmlFor="optInNews">
                <input type="checkbox" id="optForNetbanking" name="optForNetbanking" checked={data.optForNetbanking} onChange={handleChange} />
                Opt for netbanking
            </label>
            
        </>
    )

    return content
}
export default OptIn