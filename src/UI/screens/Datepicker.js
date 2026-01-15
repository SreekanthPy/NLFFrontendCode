import React,{useState} from 'react';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format,parse } from 'date-fns';
import dayjs from 'dayjs';
const ProSpan = styled('span')({
    display: 'inline-block',
    height: '1em',
    width: '1em',
    verticalAlign: 'middle',
    marginLeft: '0.3em',
    marginBottom: '0.08em',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'url(https://mui.com/static/x/pro.svg)',
});

const MaxWidthContainer = styled('div')({
    maxWidth: '180px', // Set the maximum width here
    marginBottom: '20px'
    // Center the container
});
function Label({ componentName, valueType, isProOnly }) {
    const content = (
        <span>
            <strong>{componentName}</strong>
        </span>
    );

    if (isProOnly) {
        return (
            <Stack direction="row" spacing={0.5} component="span">
                <Tooltip title="Included on Pro package">
                    <a href="https://mui.com/x/introduction/licensing/#pro-plan">
                        <ProSpan />
                    </a>
                </Tooltip>
                {content}
            </Stack>
        );
    }

    return content;
}

export default function CommonlyUsedComponents(props) {

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        console.log('Received date object:', date);
    
        // Use Day.js methods to format the date
        const formattedDate = date ? dayjs(date).format('DD-MM-YYYY') : null;
        
        console.log('Formatted date:', formattedDate);
    
        setSelectedDate(formattedDate);
        props.sendDataToParent(formattedDate);
      };
    console.log('Selected Date:', selectedDate);
    return (
        <MaxWidthContainer>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DemoContainer
                    components={[
                        'DatePicker',
                        'TimePicker',
                        'DateTimePicker',
                        'DateRangePicker',
                    ]}

                >
                    <DemoItem label={<Label componentName="DatePicker" valueType="date" />} >
                        <DatePicker value={selectedDate}
                            onChange={handleDateChange} />
                    </DemoItem>

                </DemoContainer>
            </LocalizationProvider>
        </MaxWidthContainer>
    );
}