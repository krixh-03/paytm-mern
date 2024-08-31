import { useState } from "react"
import Heading from './../components/Heading' 
import InputBox from './../components/InputBox' 
import axios from 'axios'
import Cbutton from "../components/Cbutton"
import BottomWarning from "../components/BottomWarning"
import { useNavigate } from "react-router-dom"

export default function signUp() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setusername] = useState("");
	const [password, setpassword] = useState("");
	const navigate = useNavigate()
	return (
		<div className="flex flex-col h-screen justify-center items-center bg-blue-200">
			<div className="flex flex-col items-center  rounded-3xl h-[58%] w-[20%] bg-white">
				<Heading label={"Sign Up"} info={"Enter your information to create an account"} />
				<InputBox label={"First Name"} placeholder={'Jhon'} onChange={e => setFirstName(e.target.value)}/>
				<InputBox label={"Last Name"} placeholder={'Doe'} onChange={e => setLastName(e.target.value)}/>
				<InputBox label={"Email"} placeholder={'jhondoe@gmail.com'} onChange={e => setusername(e.target.value)}/>
				<InputBox label={"Password"} placeholder={''} onChange={e => setpassword(e.target.value)}/>
				<Cbutton 
					label={"Sign Up"} 
					onClick={async() => {
						const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
							username,
							lastName,
							firstName,
							password
						})
						localStorage.setItem("token", response.data.token);
						localStorage.setItem("userId", response.data.userId);
						navigate("/dashboard")
						
					}}
				/>
				<BottomWarning info={"Already have an account?"} to={"/signin"} buttonText={"Sign in"} />
			</div>
		</div>	
	)
}


