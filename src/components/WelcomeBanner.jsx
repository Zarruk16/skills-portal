import { ReactComponent as CenterIllustration } from "../data/vectoradmin.svg";

export const WelcomeBanner = () => {
    return (
        <div
            className="bg-gradient-to-r from-blue-600 to-blue-200 text-white p-6 rounded-2xl shadow-md flex justify-between items-center"
            style={{ color: "currentColor" }}
        >
            <div>
                <h1 className="text-2xl text-white font-bold">
                    <span className="text-3xl font-normal">👋</span> Welcome Back, Admin 

                </h1>
                <p className=" text-white ">Here are the information about your center</p>
            </div>
            <CenterIllustration className="h-28 w-auto" />
        </div>
    );
};

export default WelcomeBanner;
