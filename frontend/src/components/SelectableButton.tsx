import { Button, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

const SelectableButton = ({ id, label, updateSelection }: { id: string, label: string, updateSelection: (value: string, selected: boolean) => void }) => {
    const [variant, setVariant] = useState('outline');
    const [isSelected, setSelected] = useState(false);
    const [textWidth, setTextWidth] = useState('sm');

    const btnRef = useRef<HTMLButtonElement | null>(null);
    const textRef = useRef<HTMLParagraphElement | null>(null);

    const handleClick = () => {
        updateSelection(label, !isSelected)
        setSelected(!isSelected);
    }

    useEffect(() => {
        if (isSelected) setVariant('solid');
        else setVariant('outline');
    }, [isSelected, updateSelection])

    useEffect(() => {
        const buttonEl = btnRef.current;
        const textEl = textRef.current;
        if (buttonEl && textEl) {
            const buttonWidth = buttonEl.offsetWidth;
            const textWidth = textEl.offsetWidth
            if (textWidth > buttonWidth * 5 / 6) setTextWidth('xs');
        }

    }, [])

    return (
        <Button ref={btnRef} id={id} colorScheme='blue' variant={variant} onClick={handleClick}>
            <Text ref={textRef} fontSize={textWidth}>{label}</Text>
        </Button>
    );

}

export default SelectableButton;