import BottomWarning from "../components/BottomWarning";
import Cbutton from "../components/Cbutton";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";

export default function SignIn() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-blue-200">
            <div className="flex flex-col items-center bg-white rounded-xl w-[20%] h-[42%]">
                <Heading info={"Enter your credentials to access your account"} label={"Sign In"}/>
                <InputBox label={"Email"} placeholder={"jhondoe@example.com"} />
                <InputBox label={"password"} placeholder={""} />
                <Cbutton label={"Sign In"} />
                <BottomWarning buttonText={"Sign Up"} info={"Don't have an account?"} to={"/signup"} />
            </div>
        </div>
    )
}