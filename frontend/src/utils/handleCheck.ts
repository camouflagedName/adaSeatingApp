import { ISeat } from "../interfaces/interfaces";

const handleCheck = (evt: React.ChangeEvent<HTMLInputElement>, data: ISeat[], handleSelectedRowCheck: (param: object) => void) => {
    const isChecked = evt.target.checked
    let meta = {}

    data.forEach(info =>
        meta = {
            ...meta,
            [info._id]: isChecked,
        }
    )

    handleSelectedRowCheck(meta);
}

export default handleCheck;