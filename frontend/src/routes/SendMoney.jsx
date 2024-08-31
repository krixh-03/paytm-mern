import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom"

export default function SendMoney() {
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount,setAmount] = useState(0);
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-center border-2 rounded-xl h-[30%] w-[20%] shadow">
                <div className="w-[85%]">
                    <div className="font-bold text-xl mb-9 text-center mt-2">Send Money</div>
                    <div className="flex items-center">
                        <div className="w-12 h-12 font-semibold bg-green-500 text-white flex items-center justify-center rounded-full">
                           {name[0].toUpperCase()} 
                        </div>
                        <div className="ml-2 font-bold text-lg">
                            {name}
                        </div>
                    </div>
                    <div className="font-semibold">
                        Amount (in Rs)
                    </div>
                    <div>
                        <input 
                            onChange={e => setAmount(e.target.value)} 
                            type="text" placeholder="Enter amount" className="border rounded w-full p-2 mt-1"/>
                        <button onClick={async () => {
                             await axios.post("http://localhost:3000/api/v1/account/transfer",{
                               to: userId,
                               amount 
                             },
                             {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("token")}`
                                }
                             }
                            )
                        }}
                        type="button" className="focus:outline-none text-white bg-green-00 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-2 w-full">Initiate Transfer</button>
 
                    </div>
                </div>
            </div> 
        </div>
    )
}