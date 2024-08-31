export default function InputBox({label, placeholder,onChange}) {
    return (
        <div className="w-[90%] flex flex-col">
            <label className="font-medium mb-2"> {label} </label>
            <input type="text" name="firstName" placeholder= {`${placeholder}`} className="border-2 rounded p-2 mb-2" onChange={onChange} />
        </div>
    )
}