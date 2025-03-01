import eye from "../assets/eye.png";
import add from "../assets/add.png";



function Analytics() {
    return(
        <div className=" flex row items-center pl-[12px] gap-[10px] w-[150px] bg-darkgreen  h-[35px] ">
         <img className="w-[16px] h-[16px] " src={eye} alt="analytic icon" />
         <p className="font-opensans text-[12px] text-white font-medium ">View Analytics</p>
        </div>
    )
}

function AddCash() {
    return(
        <div className=" flex row items-center pl-[14px] gap-[10px] bg-brown w-[133px] h-[35px] ">
         <img className="w-[16px] h-[16px] " src={add} alt="add cash icon" />
         <p className="font-opensans text-[12px] text-white font-medium ">Add Money</p>
        </div>
    )
}






export{
    Analytics,
    AddCash
}