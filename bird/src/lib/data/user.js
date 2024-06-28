import { Email, Github, Whatsapp } from '../icons';

export const userData = [
    {
        stringText: `${Github}&nbsp;GITHUB`,
        stringTarget: '_blank',
        stringHref: 'https://github.com/joaquimnetocel/svelte-bird',
    },
    {
        stringText: `${Whatsapp}&nbsp;WHATSAPP`,
        stringTarget: '_blank',
        stringHref: `https://api.whatsapp.com/send?phone=5532991313703&text=${'Hello'}!`,
    },
    {
        stringText: `${Email}&nbsp;E-MAIL`,
        stringTarget: '_blank',
        stringHref: `https://api.whatsapp.com/send?phone=5532991313703&text=${'Hello'}!`,
    },
];