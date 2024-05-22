import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Section, Input, InlineButtons } from '@telegram-apps/telegram-ui';

function DonatSelectionElement(titleText,storeData){
    const [selectedValue, setSelected] = useState("");
    function SaveValue(event) {
        var vl = event.currentTarget.id.replace("ib-", "");
        setSelected(vl);
        if (vl !== "Custom") {
            storeData.isCustomValue = false;
            storeData.setAmount(vl);
        }
        else {
            storeData.isCustomValue = true;
            storeData.mainTitle = "";
            document.getElementById("donate-selection-custom-value").value = "0";
        }
    }

    function SaveCustomValue(event) {
        storeData.setAmount(event.currentTarget.value);
    }

    function GetCells(count) {
        var res = [];
        for (var i = 0; i < count; i++) {
            var vl = i * 100 + 100;
            var item = (<InlineButtons.Item id={"ib-" + (i * 100 + 100)} mode={selectedValue === (i * 100 + 100).toString() ? "bezeled" : "plain"} onClick={SaveValue} >{vl}₽</InlineButtons.Item>);
            res.push(item);
        }
        res.push(<InlineButtons.Item id="ib-Custom" mode={selectedValue === "Custom" ? "bezeled" : "plain"} onClick={SaveValue}> Custom</InlineButtons.Item >)

        return res;
    }

    function GetInput() {
        if (storeData.isCustomValue) {
            return (
                < Input id="donate-selection-custom-value" header="Input" placeholder="I am usual input, just leave me alone" onKeyUp={SaveCustomValue} />
            )
        }
        else {
            return;
        }
    }

    return (
        <Section header={titleText}>
            <InlineButtons>
                {GetCells(5, storeData)}
            </InlineButtons>
            { GetInput() }
        </Section>
    )
}

const DonatSelection = observer(({ titleText, storeData }) => DonatSelectionElement(titleText,storeData));

export default DonatSelection;