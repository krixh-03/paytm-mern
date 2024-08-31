import { Link } from "react-router-dom"


export default function BottomWarning({info, buttonText, to}) {
    return (
        <div className="flex mt-3 font-medium">
            <p>{info}</p>  <Link to={to} className="underline pl-1">{buttonText}</Link>
        </div>
    )
}