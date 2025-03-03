import { useState } from 'react';
import axios from 'axios';
import cancel from "../assets/cancel.png";

function Transfer() {
    const [formData, setFormData] = useState({
        senders_account: "0009871097", // Hardcoded for now
        receiver_account: "",
        transfer_amount: ""
    });
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    const headers = {
        clientId: "67c2b220f06d9759783b3ce3",
        Nonce: "67c2b220f06d9759783b3ce3",
        Signature: "67c2b220f06d9759783b3ce3"
    };

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
            const response = await axios.post(
                'https://epaydatabase.onrender.com/account/transfer',
                formData,
                { headers }
            );
            setResponse(response.data);
            if (response.data.status === "success") {
                // Reload the page after successful transfer
                window.location.reload();
            }
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
            <div className="flex-col flex z-100 items-center justify-center bg-white w-[500px] h-[screen]">
                <p className="text-[13px] font-medium">Processing transaction...</p>
            </div>
        );
    }

    if (response) {
        return (
            <div className="flex-col flex items-center z-100 bg-white w-[400px] h-[screen] p-[20px]">
                <div className="flex items-center w-[350px] justify-between py-[15px]">
                    <p className="font-medium text-[13px]">Transaction Status</p>
                    <img className="w-[16px] h-[16px]" src={cancel} alt="close icon" />
                </div>
                <div className="w-[350px] p-[20px] bg-gray-50 rounded">
                    {response.status === "error" ? (
                        <p className="text-red-500 text-[13px]">{response.error}</p>
                    ) : (
                        <div className="flex flex-col gap-[16px]">
                            <p className="text-green-500 text-[16px] font-medium">Transaction Successful!</p>
                            <div className="text-[13px]">
                                <p>Amount: ₦{response.data.amount}</p>
                                <p>Transaction ID: {response.data.transaction_id}</p>
                                <p>Recipient: {response.data.receiver}</p>
                                <p>Date: {new Date(response.data.date).toLocaleString()}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return(
        <div className="flex-col flex items-center z-[1000] bg-white w-[400px] h-[screen]">
            <div className="flex items-center  px-[20px] w-[350px] justify-between py-[15px]">
                <p className="font-medium text-[13px]">Send Money</p>
                <img className="w-[16px] h-[16px]" src={cancel} alt="close icon" />
            </div>
       
            <form onSubmit={handleSubmit} className="self-start w-[350px] px-[20px] flex flex-col gap-[24px]">
                {/* ...existing form fields with added name and onChange... */}
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
                        required
                    >
                        <option value="">Select a bank</option>
                        <option value="access">Access Bank</option>
                        <option value="gtb">GTBank</option>
                        <option value="zenith">Zenith Bank</option>
                        {/* Add more banks as needed */}
                    </select>
                </div>

                <div className="flex flex-col gap-[8px]">
                    <label className="text-[13px] font-medium">Recipient Account Number</label>
                    <input
                        type="text"
                        name="receiver_account"
                        value={formData.receiver_account}
                        onChange={handleChange}
                        className="w-full p-[12px] border border-gray-300 rounded text-[13px]"
                        required
                    />
                </div>

                <div className="flex flex-col gap-[8px]">
                    <label className="text-[13px] font-medium">Amount</label>
                    <input
                        type="number"
                        name="transfer_amount"
                        value={formData.transfer_amount}
                        onChange={handleChange}
                        className="w-full p-[12px] border border-gray-300 rounded text-[13px]"
                        required
                    />
                </div>

                <div className="flex flex-col gap-[8px]">
                    <label className="text-[13px] font-medium">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-[12px] border border-gray-300 rounded text-[13px]"
                        placeholder="What's this transfer for?"
                        required
                    />
                </div>

                <div className="flex flex-col gap-[8px]">
                    <label className="text-[13px] font-medium">Transaction PIN</label>
                    <input
                        type="password"
                        name="pin"
                        value={formData.pin}
                        onChange={handleChange}
                        maxLength="4"
                        className="w-full p-[12px] border border-gray-300 rounded text-[13px]"
                        required
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

export default Transfer;