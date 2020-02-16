import { 
    Button,
    FormControl, 
    InputLabel,
    MenuItem, 
    Select, 
    TextField 
} from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { Interval } from '../models'
import { sampleVendors } from '../services';

import './form.css';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

export const SubscriptionForm: React.FunctionComponent = () => {
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [startDate, setStartDate] = useState<MaterialUiPickersDate>(new Date());
    const [interval, setInterval] = useState<string>(Interval.Monthly);
    const [vendor, setVendor] = useState<string>('0');

    const handleDateChange = useCallback(event => setStartDate(event.target.value), []);
    const handlePriceChange = useCallback(event => setPrice(event.target.value), []);

    return (
        <>
            <h2>New Subscription</h2>

            <form>
                <div>
                    <FormControl className="sub-vendor">
                        <InputLabel id="vendor-label">Vendor</InputLabel>
                        <Select
                        labelId="vendor-label"
                        id="vendor-select"
                        value={vendor}
                        onChange={(event: React.ChangeEvent<{
                            name?: string | undefined;
                            value: unknown;
                        }>, child: React.ReactNode) => {
                            setVendor(event.target.value as string)
                        }}
                        >
                            <MenuItem value={'0'}>{sampleVendors[0].name}</MenuItem>
                            <MenuItem value={'1'}>{sampleVendors[1].name}</MenuItem>
                            <MenuItem value={'2'}>{sampleVendors[2].name}</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className="sub-interval">
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
                <TextField 
                    className="sub-name" 
                    id="standard-basic" 
                    label="Name" 
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />
                <div>
                    <TextField className="sub-price" id="filled-basic" label="Price in Dollars" onChange={handlePriceChange}/>
                
                    <TextField className="sub-start"
                        id="datetime-local"
                        label="Start date"
                        type="datetime-local"
                        defaultValue={startDate}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleDateChange}
                    />
                </div>
            <Button variant="contained" color="primary" className="submit-button" type="button" onClick={() => {
                console.log({name, startDate,  price, interval, vendor});
            }}>Submit</Button>   
        </form>
    </>
    );
}