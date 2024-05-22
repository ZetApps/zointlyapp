import { useState } from 'react'
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'
import './App.css'
import '@telegram-apps/telegram-ui/dist/styles.css';

import { AppRoot,Button,List,Input} from '@telegram-apps/telegram-ui';
import Header from './components/Header.jsx';
import DonatSelection from './components/DonatSelection.jsx';

const tg = window.Telegram.Webapp;
const storeData = createStorage();
function createStorage() {
    return makeAutoObservable(
        {
            amount: 0,
            isCustomValue:false,
            mainTitle: "",
            comment: "",
            setAmount(value) {
                this.amount = value;
                this.mainTitle = "Оплатить " + this.amount;
            }
        }
    )
}

function UpdateComment(event) {
    storeData.comment = event.currentTarget.value;
}


function GetResultData() {
    alert("" + storeData.amount + " - " + storeData.comment);
}

function GetPayButton() {
    if (storeData.comment != "") {
        alert("TestAlert");
    }
    return (<Button size="l" mode="filled" onClick={GetResultData}>Нажми!</Button>);
}

const App = observer(()=>(
        <AppRoot>
            <List
                style={{
                    background: 'var(--tgui--secondary_bg_color)',
                    padding: '40px',
                    width: 500
                }}
        >
            <Header username="UserName" login="@Login" storeData={storeData} />
            <DonatSelection titleText="Select donation amount" storeData={storeData} />
            <Input header="Donation Comment" onKeyUp={UpdateComment} />
            {GetPayButton()}
            </List>
        </AppRoot>    
  ))
export default App


