import { Center, Checkbox } from "@chakra-ui/react"
//import handleCheck from "../../utils/handleCheck"
import { useContext } from "react";
import { ISeat } from "../../interfaces/interfaces";
import { EventCreator } from "../../context/context";
import { IAppEventCreatorData } from "../../interfaces/creatorInterfaces";


const NavModalCheckbox = ({ seatInfo, seatMeta, id }: {
    seatInfo: ISeat, seatMeta: {
        [key: string]: boolean;
    }, id: string
}) => {
    const { updateMeta } = useContext(EventCreator) as IAppEventCreatorData;

    const handleCheck = (evt: React.ChangeEvent<HTMLInputElement>, seatDataArr: ISeat[]) => {
        const isChecked = evt.target.checked

        let meta = {}
    
        // seatDataArr is not getting updated; info is stale
        seatDataArr.forEach(seat =>
            meta = {
                ...meta,
                [seat._id]: isChecked,
            }
        )
    
        updateMeta(prev => {
            return {...prev, ...meta}
        } );
    }

    return (
        <Center>
            <Checkbox onChange={(evt) => handleCheck(evt, [seatInfo])} isChecked={seatMeta[id]} >
                {seatInfo.seatNumber}
            </Checkbox>
        </Center>
    )
}

export default NavModalCheckbox;