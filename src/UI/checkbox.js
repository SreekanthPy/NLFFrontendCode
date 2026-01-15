import  React,{useEffect} from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
export default function CheckboxesGroup(props) {
    const { sendDataToParents } = props;

    const [state, setState] = React.useState({
        gilad: true,
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });

        sendDataToParents(event.target.checked);

    };
    useEffect(() => {
        // Send the initial state value when the component mounts
        sendDataToParents(state.gilad);
    }, [sendDataToParents, state.gilad]);
    console.log(state)
    const { gilad } = state;
    const error = [gilad].filter((v) => v).length !== 2;

    return (
        <Box sx={{ display: 'flex' }}>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                <FormLabel component="legend">Status</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox checked={gilad} onChange={handleChange} name="gilad" sx={{color:"#660066",'&.Mui-checked': {
                                color:'#660066',
                              },}} />
                        }

                        label="Completed"
                    />

                </FormGroup>

            </FormControl>
        </Box>
    );
}