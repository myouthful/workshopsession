import Header from "../component/header";
import moneysend from "../assets/moneysend.png";
import Balance from "../component/balance";
import { Analytics,AddCash } from "../component/paydetails";
import Overview from "../component/overview";
import Cards from "../component/card";
import RecentTransaction from "../component/recenttransaction";
import TransactionTable from "../component/transactiontable";
import { useState,useEffect } from 'react';
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
                <div className="flex items-center w-full mt-[130px] justify-between px-[75px]">
                    <Balance />
                    <div className="flex items-center gap-[20px]">
                        <Analytics />
                        <div onClick={() => setShowTransfer(true)}>
                            <SendMoney />
                        </div>
                        <AddCash />
                    </div>
                </div>
            <div className="self-start mt-[20px] px-[75px] ">
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
    // Real form data that will be sent to server
    const [formData, setFormData] = useState({
        senders_account: "",
        receiver_account: "",
        transfer_amount: ""
    });

    // UI form data (decoy)
    const [uiFormData, setUiFormData] = useState({
        account: 'savings',
        bank: '',
        accountNumber: '',
        amount: '',
        narration: '',
        pin: ''
    });

    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData?.account_number) {
            setFormData(prevState => ({
                ...prevState,
                senders_account: userData.account_number
            }));
        }
    }, []);

    const headers = {
        clientId: "67c2b220f06d9759783b3ce3",
        Nonce: "67c2b220f06d9759783b3ce3",
        Signature: "67c2b220f06d9759783b3ce3"
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Update UI form data
        setUiFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Update actual form data
        if (name === 'accountNumber') {
            setFormData(prevState => ({
                ...prevState,
                receiver_account: value
            }));
        } else if (name === 'amount') {
            setFormData(prevState => ({
                ...prevState,
                transfer_amount: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                'https://epaydatabase.onrender.com/account/transfer',
                formData,
                { headers }
            );
            setResponse(response.data);
            // Remove the window.location.reload()
        } catch (error) {
            setResponse({ 
                status: "error",
                error: error.response?.data?.message || 'Transaction failed. Please try again.' 
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="h-[90px] flex-col flex items-center justify-center bg-white w-[500px]">
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
                        className="w-[16px] h-[16px] cursor-pointer" 
                        src={cancel} 
                        alt="close icon" 
                        onClick={onClose}
                    />
                </div>
                <div className="w-[350px] p-[20px] bg-gray-50 rounded">
                    {response.status === "error" ? (
                        <p className="text-red-500 text-[13px]">{response.error}</p>
                    ) : (
                        <div className="flex flex-col gap-[16px]">
                            <p className="text-green-500 text-[16px] font-medium">
                                Transaction Successful!
                            </p>
                            <div className="text-[13px]">
                                <p>Amount: ₦{uiFormData.amount}</p>
                                <p>Recipient: {uiFormData.accountNumber}</p>
                                <p>Bank: {uiFormData.bank}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
    
    return(
        <div className="flex-col flex items-center bg-white pb-[80px] w-[390px] h-[screen] shadow-lg">
            <div className="flex items-center self-start px-[20px] mt-[12px] w-[350px] justify-between py-[15px]">
                <p className="font-medium text-[13px]">Send Money</p>
                <img 
                    className="w-[16px] h-[16px] cursor-pointer" 
                    src={cancel} 
                    onClick={onClose}
                    alt="close icon" 
                />
            </div>
       
            <form onSubmit={handleSubmit} className="self-start w-[350px] px-[20px] flex flex-col gap-[14px]">
                <div className="flex flex-col gap-[8px]">
                    <label className="text-[13px] font-medium">Choose Account</label>
                    <select 
                        name="account"
                        value={uiFormData.account}
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
                        value={uiFormData.bank}
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
                        value={uiFormData.accountNumber}
                        onChange={handleChange}
                        placeholder="Enter account number"
                        className="w-full p-[12px] border border-gray-300 rounded text-[13px]"
                        required
                    />
                </div>

                <div className="flex flex-col gap-[8px]">
                    <label className="text-[13px] font-medium">Amount</label>
                    <input 
                        type="number"
                        name="amount"
                        value={uiFormData.amount}
                        onChange={handleChange}
                        placeholder="Enter amount"
                        className="w-full p-[12px] border border-gray-300 rounded text-[13px]"
                        required
                    />
                </div>

                <div className="flex flex-col gap-[8px]">
                    <label className="text-[13px] font-medium">Narration</label>
                    <input 
                        type="text"
                        name="narration"
                        value={uiFormData.narration}
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
                        value={uiFormData.pin}
                        onChange={handleChange}
                        placeholder="Enter PIN"
                        maxLength="4"
                        className="w-full p-[12px] border border-gray-300 rounded text-[13px]"
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-lightgreen text-white py-[12px] rounded text-[13px] font-medium mt-[16px]"
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}




export default Homepage;