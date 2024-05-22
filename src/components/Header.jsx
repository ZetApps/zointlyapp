import { observer } from 'mobx-react-lite'
import { Section, Avatar, Cell } from '@telegram-apps/telegram-ui';


const Header = observer(({ username, login, storeData }) => (
    <Section header={storeData.mainTitle}>
        <Cell
            before={<Avatar size={48}></Avatar>}
            subtitle={login}
        >
            {username}
        </Cell>
    </Section>
));

export default Header