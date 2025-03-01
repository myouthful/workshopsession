import TransactionTable from "./transactiontable";

function RecentTransaction() {
    return(
        <div className="flex items-start justify-between h-[45px] ">
           <p className="font-opensans text-[14px] text-black font-medium ">Recent Transaction </p>
            <p className="font-opensans text-[12px] text-black font-medium " >See All </p>
        </div>
    )
}


export default RecentTransaction;