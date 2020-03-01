import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { MonthCost, Cost } from '../models';
import { fetchMonthlyCost, fetchTotalCost } from '../services'

import './list.css';

export const CostList: React.FunctionComponent = () => {
    const [costs, setCosts] = useState<Cost[]>([])
    useEffect(() => {
        fetchTotalCost().then(response => {
            setCosts(response);
        });
    }, []);
  
    const [monthcost, setMonthCost] = useState<MonthCost[]>([])
    useEffect(() => {
        fetchMonthlyCost().then(response => {
            setMonthCost(response);
        });
    }, []);

     const items = costs.map(value => 
        (<ListItem>
            <ListItemAvatar>
                <Avatar>
                    <MonetizationOnIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText className="name-col"
                primary={value.SubName}
            />
            <ListItemText
                primary={`Since ${value.SubscriberSince}`}
                                    />
            <ListItemText
                primary={`$${value.TotalSubscriptionCost}`}
                    />
            
        </ListItem>)
    );

    const dataThings = monthcost.map(value => 
        (<ListItem>
            <ListItemAvatar>
                <Avatar>
                    <MonetizationOnIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText className="name-col"
                primary={value.TotalMonthlyCost}
              
            />  
        </ListItem>)
    );

    return (
        <>
            <h2> Monthly Overall Cost for {moment().format('MMMM')}:</h2>
            <List dense = {false}>
                {dataThings}
            </List>
            <h2>Total Cost Per Subscription For All Time: </h2>
            <List dense={false}>
                {items}
            </List>
       </>
    );
}