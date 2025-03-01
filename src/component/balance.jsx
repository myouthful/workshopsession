import { useState, useEffect } from 'react';
import axios from 'axios';

function Balance() {
    // const [balance, setBalance] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchBalance = async () => {
    //         try {
    //             const response = await axios.get('YOUR_API_ENDPOINT/balance');
    //             setBalance(response.data.balance);
    //             setLoading(false);
    //         } catch (error) {
    //             setError('Failed to fetch balance');
    //             setLoading(false);
    //         }
    //     };

    //     fetchBalance();
    // }, []);

    // if (loading) {
    //     return (
    //         <div className="flex-col flex gap-[8px] h-[73px] w-[185px]">
    //             <p className="opensans font-thin text-[14px] text-white">Total Balance</p>
    //             <div className="animate-pulse bg-white/20 h-[26px] rounded"></div>
    //         </div>
    //     );
    // }

    // if (error) {
    //     return (
    //         <div className="flex-col flex gap-[8px] h-[73px] w-[185px]">
    //             <p className="opensans font-thin text-[14px] text-white">Total Balance</p>
    //             <p className="opensans font-medium text-[16px] text-red-400">{error}</p>
    //         </div>
    //     );
    // }

    return(
        <div className="flex-col flex gap-[8px] h-[73px] w-[185px]">
            <p className="opensans font-thin text-[14px] text-white">Total Balance</p>
            <p className="opensans font-medium text-[22px] text-white">
                N 400000
            </p>
        </div>
    );
}

export default Balance;