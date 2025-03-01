import cash from "../assets/cash.png";
import reserve from "../assets/reserve.png";
import savings from "../assets/savings.png"





const data = [
    {
        image: cash,
        heading: "Domestic transfer",
        value: "$5,332.18"
    },
    {
        image: reserve,
        heading: "All charges",
        value: "$2,332.18"
    },
    {
        image: savings,
        heading: "Savings",
        value: "$1,332.18"
    }
];

function Card({ image, heading, value }) {
    return (
        <div className="w-[305px] h-[245px] border-[1px] border-black bg-white pl-[28px] py-[28px] ">
            <div className="flex-col flex gap-[16px] w-[219px] ">
            <img className="w-[52px] h-[52px]" src={image} alt="cash icon" />
            <p className="font-opensans font-medium text-[13px]">{heading}</p>
            <p className="font-opensans font-medium text-[26px]">{value}</p>
        </div>
        </div>
    );
}

// Add this new component to render all cards
function Cards() {
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