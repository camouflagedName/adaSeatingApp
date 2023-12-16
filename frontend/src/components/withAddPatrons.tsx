import { useEffect, useState } from "react";
import { IEventData, IPatronData } from "../interfaces/interfaces";
import { addPatron } from "../api/patronAPI";

interface ImportedProps {
    event: IEventData;
    onClose: () => void;
}

interface PassedProps {
    handleClose: () => void;
    header: string;
    buttonLabel: string;
    isDisabled: boolean;
    children: React.ReactElement;
}

const withAddPatrons = (WrappedComponent: React.ComponentType<PassedProps>) => {
    const AddPatronsComponent: React.FC<ImportedProps> = ({ event, onClose }) => {
        const [modalComponent, setModalComponent] = useState<React.ReactElement>(<></>);
        const [patronData, setPatronData] = useState<IPatronData>({
            eventID: event._id,
            fullName: "",
            numberRequested: 0,
            notes: [],
            callAhead: true,
            arrived: false,
            seatID: []
        })
        const [disabled, setDisabled] = useState(true);

        const handleClose = async () => {

            const getAlert = async (patronName: string) => {
                try {
                    const { default: PatronFormAlert } = await import("./PatronFormAlert");
                    setModalComponent(<PatronFormAlert patronName={patronName} />);
                } catch (err) {
                    console.log("Error while importing PatronFormAlert component", err)
                }
            }

            try {
                const result = await addPatron(patronData);
                if (result && result.status === 200) {
                    //insert a notification
                    getAlert(patronData.fullName);
                    setTimeout(onClose, 5000);
                }
            } catch (err) {
                console.log("Error at AddPatronForm ", err)
            }



        }

        useEffect(() => {
            const getAddPatronForm = async () => {
                try {
                    const { default: AddPatronForm } = await import("./AddPatronForm");
                    setModalComponent(<AddPatronForm event={event} patronData={patronData} setPatronData={setPatronData} />);
                } catch (err) {
                    console.error("Error while importing AddPatronForm", err)
                }
            }

            getAddPatronForm();
        }, [event, patronData])

        useEffect(() => {
            if (patronData.fullName.length > 0) setDisabled(false);
            else setDisabled(true);
        }, [patronData])

        return (
            <WrappedComponent
                handleClose={handleClose}
                header="Add Patron Information"
                buttonLabel="Submit"
                isDisabled={disabled}
            >
                {modalComponent}
            </WrappedComponent>
        )
    }

    return AddPatronsComponent;
}

export default withAddPatrons;