import React from "react";
import forYouPagePicture from "../../images/ForYouPageTEMPORARY.png";
import CustomButton from "../../utils/CustomButton";
import { useNavigate } from "react-router-dom";

function ForYouPage() {
    const navigate = useNavigate();

    const moveToFrontPage = () => {
        navigate("/");
    };

    return (
    <div>
        <img
            src = {forYouPagePicture}
            alt="for You page"
        />
       <div className="flex flex-row space-x-5">
            <CustomButton text="Frontpage" action={moveToFrontPage} />
      </div> 
    </div>
    

    );
}

export default ForYouPage;
