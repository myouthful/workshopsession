import { useState, useEffect } from 'react';
import axios from 'axios';

function Balance() {
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [firstname, setfirstname] = useState(null);

    const headers = {
        clientId: "67c2b220f06d9759783b3ce3",
        Nonce: "67c2b220f06d9759783b3ce3",
        Signature: "67c2b220f06d9759783b3ce3"
    };

    useEffect(() => {
        const fetchBalance = async () => {
            const userData = JSON.parse(localStorage.getItem('userData'));
            
            if (!userData?.account_number) {
                setError('No account information found');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('https://epaydatabase.onrender.com/account/balance', {
                    params: {
                        account_number: userData.account_number
                    },
                    headers: headers
                });
                setBalance(response.data.data.balance);
                setfirstname(userData.first_name); // Use first_name from localStorage
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch balance');
                setLoading(false);
                console.error('Error fetching balance:', error);
            }
        };

        fetchBalance();
    }, []);


    if (loading) {
        return (
            <div className="flex-col flex gap-[8px] h-[73px] w-[185px]">
                <p className="opensans font-thin text-[14px] text-white">Total Balance</p>
                <div className="animate-pulse bg-white/20 h-[26px] rounded"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-col flex gap-[8px] h-[73px] w-[185px]">
                <p className="opensans font-thin text-[14px] text-white">Total Balance</p>
                <p className="opensans font-medium text-[16px] text-red-400">{error}</p>
            </div>
        );
    }

  return(
        <div className="flex-col flex gap-[8px]  w-[185px]">
            <p className="opensans font-medium text-[17px] text-white"> Hi, {firstname}</p>
            <p className="opensans font-thin text-[14px] text-white">Total Balance</p>
            <p className="opensans font-medium text-[22px] text-white">
            ₦‎ {balance?.toLocaleString()}
            </p>
        </div>
    );
}

export default Balance;