import { ISeat } from "../interfaces/interfaces";

 const handleCheck = (evt: React.ChangeEvent<HTMLInputElement>, data: ISeat[], handleCheck: (param: object) => void) => {
    const isChecked = evt.target.checked
    let meta = {}

    data.forEach(info =>
        meta = {
            ...meta,
            [info._id]: {
                seat: info,
                isSelected: isChecked,
            }
        })

        handleCheck(meta);
}

export default handleCheck;