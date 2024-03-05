import { Tab } from "@chakra-ui/react"

const CustomizedTab = ({ text }: { text: string }) => {
/*     const [isActive, setIsActive] = useState(false);
    const [fontWeight, setFontWeight] = useState("normal");

    const handleClick = () => {
        setIsActive(!isActive);
    }

    useEffect(() => {
        if (isActive) setFontWeight("bold");
        else setFontWeight("normal");
    }, [isActive])
 */
    return (
        <Tab  _selected={{ color: 'white', bg: 'blue.500' }} style={{ margin: '5px', paddingTop: "10px", paddingBottom: "10px", fontWeight: "bold" }}>{text}</Tab>
    )
}

export default CustomizedTab;