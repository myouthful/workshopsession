import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cash from "../assets/cash.png";
import reserve from "../assets/reserve.png";
import savings from "../assets/savings.png";

function Cards() {
    const [balanceData, setBalanceData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem('userData'));
                if (!userData?.account_number) {
                    setError('No account information found');
                    return;
                }

                const response = await axios.get('https://epaydatabase.onrender.com/account/balance', {
                    params: {
                        account_number: userData.account_number
                    },
                    headers: {
                        clientId: "67c2b220f06d9759783b3ce3",
                        nonce: "67c2b220f06d9759783b3ce3",
                        signature: "67c2b220f06d9759783b3ce3"
                    }
                });

                if (response.data.status === 'success') {
                    setBalanceData(response.data.data);
                }
            } catch (error) {
                setError('Failed to fetch balance');
                console.error('Error:', error);
            }
        };

        fetchBalance();
    }, []);

    const data = [
        {
            image: cash,
            heading: "Domestic transfer",
            value: balanceData ? `₦${balanceData.balance.toLocaleString()}.00` : ".."
        },
        {
            image: reserve,
            heading: "All charges",
            value: "₦0.00"
        },
        {
            image: savings,
            heading: "Savings",
            value: balanceData ? `₦${(balanceData.balance * 0.25).toLocaleString()}.00` : ".."
        }
    ];

    function Card({ image, heading, value }) {
        return (
            <div className="w-[305px] h-[245px] border-[1px] border-black bg-white pl-[28px] py-[28px]">
                <div className="flex-col flex gap-[16px] w-[219px]">
                    <img className="w-[52px] h-[52px]" src={image} alt="cash icon" />
                    <p className="font-opensans font-medium text-[13px]">{heading}</p>
                    <p className="font-opensans font-medium text-[26px]">{value}</p>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="flex gap-[62px]">
            {data.map((item, index) => (
                <Card
                    key={index}
                    image={item.image}
                    heading={item.heading}
                    value={item.value}
                />
            ))}
        </div>
    );
}

export default Cards;