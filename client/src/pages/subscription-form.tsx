import { 
    FormControl, 
    InputLabel, 
    MenuItem, 
    Select, 
    TextField 
} from '@material-ui/core';
import React, { useState } from 'react';
import { Interval } from '../models'
import { sampleVenders } from '../services';

import './form.css';

export const SubscriptionForm: React.FunctionComponent = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [startDate, setStartDate] = useState('');
    const [interval, setInterval] = useState<string>(Interval.Monthly);
    const [vender, setVender] = useState<string>('0');

    return (
        <form>
            <div>
                <TextField id="standard-basic" label="Name" onChange={(event) => {
                    setName(event.target.value);
                }}/>
            </div>
            <div>
                <TextField id="standard-basic" label="Start Date MM/DD/YYYY" onChange={(event) => {
                    setStartDate(event.target.value);
                }}/>
            </div>
            <div>
                <TextField id="filled-basic" label="Price in Dollars" onChange={(event) => {
                    setPrice(event.target.value);
                }}/>
            </div>
            <div>
                <FormControl >
                    <InputLabel id="interval-label">Interval</InputLabel>
                    <Select
                    labelId="interval-label"
                    id="interval-select"
                    value={interval}
                    onChange={(event: React.ChangeEvent<{
                        name?: string | undefined;
                        value: unknown;
                    }>, child: React.ReactNode) => {
                        setInterval(event.target.value as string);
                    }}
                    >
                        <MenuItem value={Interval.Weekly}>Weekly</MenuItem>
                        <MenuItem value={Interval.Monthly}>Monthly</MenuItem>
                        <MenuItem value={Interval.Annual}>Annual</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div>
                <FormControl >
                    <InputLabel id="vender-label">Vender</InputLabel>
                    <Select
                    labelId="vender-label"
                    id="vender-select"
                    value={vender}
                    onChange={(event: React.ChangeEvent<{
                        name?: string | undefined;
                        value: unknown;
                    }>, child: React.ReactNode) => {
                        setVender(event.target.value as string)
                    }}
                    >
                        <MenuItem value={'0'}>{sampleVenders[0].name}</MenuItem>
                        <MenuItem value={'1'}>{sampleVenders[1].name}</MenuItem>
                        <MenuItem value={'2'}>{sampleVenders[2].name}</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <button type="button" onClick={() => {
                console.log({name, startDate,  price, interval, vender});
            }}>Submit</button>            
        </form>
    );
}