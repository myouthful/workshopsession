import Header from "../component/header";
import TransactionTable from "../component/transactiontable";
import RecentTransaction from "../component/recenttransaction";

function TransferPage() {
    return(
        <div>
        <Header />
       <div className="px-[56px] mt-[85px] mb-[25px] ">
            <RecentTransaction />
       </div>
        <TransactionTable />
        </div>
    )
}


export default TransferPage;