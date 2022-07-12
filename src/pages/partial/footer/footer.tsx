import { isEmpty } from 'lodash';
import { FooterContainer } from '../../../components/footer/footer';
import { Texts } from '../../../components/layout/text';

export default function Footer({ Text }): JSX.Element {
    return <FooterContainer.Container>
        <Texts.p className='py-3'>{Text}</Texts.p>
    </FooterContainer.Container>
}