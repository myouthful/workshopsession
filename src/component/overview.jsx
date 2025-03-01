import details from "../assets/details.png"

function Overview() {
    return(
        <div className=" flex row items-center gap-[16px] bg-darkgreen w-[196px] bg-darkgreen  h-[42px] ">
        <img className="w-[16px] h-[16px] " src={details} alt="breakdown icon" />
        <p className="font-opensans font-thin text-white text-[12px] " >Overview</p>
        <p className="font-opensans font-thin text-white text-[12px] " >Last 30 days </p>
        </div>
    )
}


export default Overview;