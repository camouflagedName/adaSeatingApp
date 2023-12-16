import { useEffect, useState } from "react";

interface ImportedProps {
    onClose: () => void;
}

interface PassedProps {
    isDisabled: boolean;
    handleClose: () => void;
    header: string;
    buttonLabel: string;
    children: React.ReactElement;
}

const withShowQRCode = (WrappedComponent: React.ComponentType<PassedProps>) => {
    const AddPatronsComponent: React.FC<ImportedProps> = ({ onClose }) => {
        const [modalComponent, setModalComponent] = useState<React.ReactElement>(<></>);
        const handleClose = () => {
            onClose();
        }



        useEffect(() => {
            const getAddPatronForm = async () => {
                try {
                    const { default: QRCode } = await import("react-qr-code")
                    setModalComponent(<QRCode value={`${window.location}`} />);
                } catch (err) {
                    console.error("Error loading QRCode: ", err);
                }
            }

            getAddPatronForm()
        }, [])

        return (
            <WrappedComponent
                handleClose={handleClose}
                header="Scan QR Code"
                buttonLabel="Close"
                isDisabled={false}
            >
                {modalComponent}
            </WrappedComponent>
        )
    }

    return AddPatronsComponent;
}

export default withShowQRCode;