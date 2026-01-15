import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import img from './NLF-web-Logo-1.png'
export default function LetterAvatars(props) {
    const { receivedData } = props;
    console.log(receivedData)
    const firstLetter = receivedData ? receivedData.charAt(0).toUpperCase() : '';
    return (
        <Stack direction="row" spacing={2} sx={{ marginTop: 0 }}>
            <Avatar sx={{ bgcolor: 'black', color: 'whitesmoke', fontSize: 30 }}>{firstLetter}</Avatar>
        </Stack>
    );
}