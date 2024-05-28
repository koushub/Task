import { Button } from "./Button";
import { useSignOut } from "../hooks/useSignOut";
import { useRecoilValue } from "recoil";
import { logoAtom } from "../store/atoms/Logo";

export const Appbar = () => {

    const signOut = useSignOut();
    const logo = useRecoilValue(logoAtom);

    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            Login App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-blue-800 flex justify-center mt-1 mr-4">                
                    <div className="flex flex-col justify-center h-full text-xl text-yellow-200">
                        {logo}
                    </div>                
            </div>
            <div className="mt-2 mr-4">
                <Button label={"Sign Out"} onClick={signOut} />
            </div>
        </div>
    </div>
}