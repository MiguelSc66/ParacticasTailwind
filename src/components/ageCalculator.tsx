import { FormEvent, useState } from "react"

type FormValuesType = {
    birthYear: string | number;
    birthMonth: string | number;
    birthDay: string | number;
};

const AgeCalculator = () => {
    
      
    const [formValues, setFormValues] = useState<FormValuesType>({
        birthYear: 0,
        birthMonth: 0,
        birthDay: 0,
    });

    const [result, setResult] = useState<FormValuesType>({
        birthYear: 0,
        birthMonth: 0,
        birthDay: 0
    })
      

    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    const day = today.getDate()

    
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
          ...formValues,
          [name]: parseInt(value, 10),
        });
    };
      

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
      
        const { birthYear, birthMonth, birthDay } = formValues;
        const yearUser = birthYear as number;
        const monthUser = (birthMonth as number) - 1;
        const dayUser = birthDay as number;
      
        let yearTotal = year - yearUser;
        let monthTotal = month - monthUser;
        let dayTotal = day - dayUser;
      
        if (monthTotal < 0) {
          yearTotal -= 1;
          monthTotal += 12;
        }
      
        if (dayTotal < 0) {
          monthTotal -= 1;
          const previousMonth = new Date(year, month - 1, 0).getDate();
          dayTotal += previousMonth;
        }

        setResult({
          birthYear: yearTotal.toString(),
          birthMonth: monthTotal.toString(),
          birthDay: dayTotal.toString(),
        });
    };      



    return (
        <div className="flex items-center justify-center bg-slate-200 w-screen h-screen">
            <div className="bg-white w-[47%] h-[70%] rounded-3xl rounded-br-[30%] p-14">
                <form onSubmit={handleSubmit}>
                    <div className="flex space-x-10 content-between mt-3">
                        <div className="flex flex-col font-bold">
                            <label className="text-gray-400 mb-2">DAY</label>
                            <input type="number" min={1} max={31} name="birthDay" value={formValues.birthDay} onChange={handleChange} placeholder="DD" className="w-[10rem] h-20 text-4xl  bg-transparent border rounded-lg no-spin" required />
                        </div>
                        <div className="flex flex-col font-bold">
                            <label className="text-gray-400 mb-2">MONTH</label>
                            <input type="number" min={1} max={12} name="birthMonth"  value={formValues.birthMonth} onChange={handleChange} placeholder="MM" className="w-[10rem] h-20 text-4xl bg-transparent border rounded-lg no-spin" required />
                        </div>
                        <div className="flex flex-col font-bold">
                            <label className="text-gray-400 mb-2">YEAR</label>
                            <input type="number" min={1} max={2024} name="birthYear" value={formValues.birthYear} onChange={handleChange} placeholder="YYYY" className="w-[10rem] h-20 text-4xl bg-transparent border rounded-lg no-spin" required />
                        </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" width="46" height="44" viewBox="0 0 46 44"><g fill="none" stroke="#FFF" stroke-width="2"><path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"/></g></svg>
                    <div className="flex h-[20%]  justify-between relative">
                        <hr className="w-[90%] mt-12"/>
                        <button type="submit" className="w-28 h-28 bg-purple-600 hover:bg-black rounded-full block" ></button>
                    </div>
                </form>
                <div className="flex flex-col text-8xl font-bold space-y-6 mb-3">
                    <span className="flex"><p className="text-purple-500 mr-4">{result.birthYear ? result.birthYear : '--' }</p>  years</span>
                    <span className="flex"><p className="text-purple-500 mr-4">{result.birthMonth ? result.birthMonth : '--' }</p>  months</span>
                    <span className="flex"><p className="text-purple-500 mr-4">{result.birthDay + " " ? result.birthDay : '--' }</p>  days</span>
                </div>
                
            </div>
        </div>
    )
}


export default AgeCalculator