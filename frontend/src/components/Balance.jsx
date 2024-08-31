export const Balance = ({ value }) => {
    return <div className="flex mt-2">
        <div className="font-bold text-lg pl-3">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {value}
        </div>
    </div>
}