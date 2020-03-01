import { 
    Button,
    FormControl, 
    InputLabel,
    MenuItem, 
    Select, 
    TextField 
} from '@material-ui/core';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import React, { useCallback, useState, useEffect } from 'react';

import { Interval, Vendor } from '../models'
import { createSubscription, fetchVendors, NewSubscription } from '../services';

import './form.css';

export const SubscriptionForm: React.FunctionComponent = () => {
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number | undefined>();
    const [startDate, setStartDate] = useState<MaterialUiPickersDate | undefined>();
    const [interval, setInterval] = useState<Interval>(Interval.Monthly);
    const [vendor, setVendor] = useState<number | undefined>();

    const handleDateChange = useCallback(event => setStartDate(event.target.value), []);
    const handlePriceChange = useCallback(event => setPrice(event.target.value), []);

    useEffect(() => {
        fetchVendors().then(response => {
            setVendors(response);
        });
    }, []);

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
                            value={vendor ?? ""}
                            onChange={(
                                event: React.ChangeEvent<{ name?: string | undefined; value: unknown;}>, 
                                _child: React.ReactNode) => {
                                    setVendor(event.target.value as number)
                                }}>
                            { vendors.map(vendor => {
                                return (
                                    <MenuItem key={vendor.VendorId} value={vendor.VendorId}>{vendor.VendorName}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>

                    <FormControl className="sub-interval">
                        <InputLabel id="interval-label">Interval</InputLabel>
                        <Select
                            labelId="interval-label"
                            id="interval-select"
                            value={interval}
                            onChange={(
                                event: React.ChangeEvent<{ name?: string | undefined; value: unknown;}>, 
                                _child: React.ReactNode) => {
                                    setInterval(event.target.value as Interval);
                                }}>
                            <MenuItem key={Interval.Weekly} value={Interval.Weekly}>Weekly</MenuItem>
                            <MenuItem key={Interval.Monthly} value={Interval.Monthly}>Monthly</MenuItem>
                            <MenuItem key={Interval.Annual} value={Interval.Annual}>Annual</MenuItem>
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
                    <TextField className="sub-price" 
                        id="filled-basic" 
                        type="number"
                        label="Price in Dollars" 
                        onChange={handlePriceChange}/>
                
                    <TextField className="sub-start"
                        id="datetime-local"
                        label="Start date"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleDateChange}
                    />
                </div>
            <Button variant="contained" color="primary" className="submit-button" type="button" onClick={() => {
                if (name && price && interval && startDate) {
                    submitForm({
                        SubName: name, 
                        Price: price,
                        ChargeInterval: interval,
                        VendorId: vendor,
                        EntryDateTStamp: startDate,
                    });
                }
            }}>Submit</Button>   
        </form>
    </>
    );
}

function submitForm(newSub: NewSubscription): void {
    createSubscription(newSub).then((result) => {
        if (result.status === 200) {
            window.location.href = '/home';
        }
    });
}