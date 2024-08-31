export default function Heading({label,info}) {
    return (
        <div>
            <div className="text-2xl font-bold text-center mt-2 mb-1">
                {label}
            </div>
            <div className="text-slate-500 text-md text-center mb-2">
                {info}
            </div>
        </div>
    )
}