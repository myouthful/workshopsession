import Header from "../component/header";
import moneysend from "../assets/moneysend.png";
import Balance from "../component/balance";
import { Analytics,AddCash } from "../component/paydetails";
import Overview from "../component/overview";
import Cards from "../component/card";
import RecentTransaction from "../component/recenttransaction";
import TransactionTable from "../component/transactiontable";
import { useState } from 'react';
import axios from 'axios';
import cancel from "../assets/cancel.png";

function Homepage() {
    const [showTransfer, setShowTransfer] = useState(false);

    return(
        <div className="bg-darkgreen relative">
             {/* Add blur overlay when transfer is shown */}
             {showTransfer && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]" />
            )}
            <Header />
            <div className="bg-heropattern w-full h-[435px] flex-col flex items-center">
                <div className="flex items-center w-full mt-[140px] justify-between px-[50px]">
                    <Balance />
                    <div className="flex items-center gap-[20px]">
                        <Analytics />
                        <div onClick={() => setShowTransfer(true)}>
                            <SendMoney />
                        </div>
                        <AddCash />
                    </div>
                </div>
            <div className="self-start mt-[20px] px-[50px] ">
            <Overview />
            </div>

            <div className=" mt-[50px]  ">
             < Cards />
            </div>
            <div className="w-full px-[135px] mt-[35px] ">
            <RecentTransaction />
            </div>
            <div className="w-full px-[50px] ">
            < TransactionTable />
            </div>
             {/* Transfer Overlay */}
             {showTransfer && (
                <div className="fixed z-[1000]  shadow-lg top-0 right-0 h-full">
                    <Transfer onClose={() => setShowTransfer(false)} />
                </div>
            )}
        </div>
        
       
        </div>
    )
}



function SendMoney() {
    return(
        <div className=" flex row cursor-pointer items-center gap-[10px] pl-[14px] bg-mustardyellow w-[139px] h-[35px] ">
         <img className="w-[16px] h-[16px] " src={moneysend} alt="add cash icon" />
         <p className="font-opensans text-[12px] text-white font-medium ">Send Money</p>
        </div>
    )
}


function Transfer({ onClose }) {

    const [formData, setFormData] = useState({
        account: 'savings',
        bank: '',
        accountNumber: '',
        amount: '',
        narration: '',
        pin: ''
    });
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('YOUR_API_ENDPOINT', formData);
            setResponse(response.data);
        } catch (error) {
            setResponse({ error: 'Transaction failed. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex-col flex items-center justify-center bg-white w-[500px] h-[screen]">
                <p className="text-[13px] font-medium">Processing transaction...</p>
            </div>
        );
    }

    if (response) {
        return (
            <div className="flex-col flex items-center bg-white w-[500px] h-[full] p-[20px]">
                <div className="flex items-center self-start w-[350px] justify-between py-[15px]">
                    <p className="font-medium text-[13px]">Transaction Status</p>
                    <img 
                        className="w-[16px]  h-[16px] cursor-pointer" 
                        src={cancel} 
                        alt="close icon" 
                        onClick={onClose}
                    />
                      </div>
                <div className="w-[350px] p-[20px] bg-gray-50 rounded">
                    {response.error ? (
                        <p className="text-red-500 text-[13px]">{response.error}</p>
                    ) : (
                        <div className="flex flex-col gap-[16px]">
                            <p className="text-green-500 text-[16px] font-medium">Transaction Successful!</p>
                            <div className="text-[13px]">
                                <p>Amount: ${formData.amount}</p>
                                <p>Recipient: {formData.accountNumber}</p>
                                <p>Bank: {formData.bank}</p>
                                {/* Add more response details as needed */}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return(
        <div className="flex-col flex items-center bg-white pb-[80px]  w-[390px] h-[screen] shadow-lg">
            <div className="flex items-center self-start px-[20px] mt-[12px] w-[350px] justify-between py-[15px]">
                <p className="font-medium text-[13px]">Send Money</p>
                <img className="w-[16px] h-[16px] cursor-pointer " src={cancel} 
                onClick={onClose}
                alt="close icon" />
            </div>
       
            <form onSubmit={handleSubmit} className="self-start w-[350px] px-[20px] flex flex-col gap-[14px]">
                <div className="flex flex-col gap-[8px]">
                    <label className="text-[13px] font-medium">Choose Account</label>
                    <select 
                        name="account"
                        value={formData.account}
                        onChange={handleChange}
                        className="w-full p-[12px] border pr-[15px] border-gray-300 rounded text-[13px]"
                    >
                        <option value="savings">Savings</option>
                    </select>
                </div>

                <div className="flex flex-col gap-[8px]">
                    <label className="text-[13px] font-medium">Select Bank</label>
                    <select 
                        name="bank"
                        value={formData.bank}
                        onChange={handleChange}
                        className="w-full p-[12px] border pr-[15px] border-gray-300 rounded text-[13px]"
                    >
                        <option value="">Select a bank</option>
                        <option value="firstbank">First Bank</option>
                        <option value="gtbank">GT Bank</option>
                        <option value="zenithbank">Zenith Bank</option>
                        <option value="opay">Opay</option>
                        <option value="access">Access Bank</option>
                    </select>
                </div>

                <div className="flex flex-col gap-[8px]">
                    <label className="text-[13px] font-medium">Beneficiary Account Number</label>
                    <input 
                        type="text"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleChange}
                        placeholder="Enter account number"
                        className="w-full p-[12px] border border-gray-300 rounded text-[13px]"
                    />
                </div>

                <div className="flex flex-col gap-[8px]">
                    <label className="text-[13px] font-medium">Amount</label>
                    <input 
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="Enter amount"
                        className="w-full p-[12px] border border-gray-300 rounded text-[13px]"
                    />
                </div>

                <div className="flex flex-col gap-[8px]">
                    <label className="text-[13px] font-medium">Narration</label>
                    <input 
                        type="text"
                        name="narration"
                        value={formData.narration}
                        onChange={handleChange}
                        placeholder="Enter narration"
                        className="w-full p-[12px] border border-gray-300 rounded text-[13px]"
                    />
                </div>

                <div className="flex flex-col gap-[8px]">
                    <label className="text-[13px] font-medium">Transaction PIN</label>
                    <input 
                        type="password"
                        name="pin"
                        value={formData.pin}
                        onChange={handleChange}
                        placeholder="Enter PIN"
                        maxLength="4"
                        className="w-full p-[12px] border border-gray-300 rounded text-[13px]"
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-lightgreen text-white py-[12px] rounded text-[13px] font-medium mt-[16px]"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}




export default Homepage;