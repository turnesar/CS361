import React, { useEffect, useState } from 'react';
import { fetchSubscriptions, fetchTotalCost } from '../services'
import { Subscription, User, Cost } from '../models';
import moment from 'moment';
import './list.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';




export const CostList: React.FunctionComponent = () => {
    const [costs, setCosts] = useState<Cost[]>([])

    useEffect(() => {
        fetchTotalCost().then(response => {
            setCosts(response);
        });
    }, []);
     
  // return total monthly Cost here, give UserId and receive the 
  // MonthlyEquivalent
     

    const items = costs.map(value => 
        (<ListItem>
            <ListItemAvatar>
                <Avatar>
                    <MonetizationOnIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText className="name-col"
                primary={value.subscription.vendor.name}
              
            />
            <ListItemText
                primary={`$${value.totalCost}`}
                    />
            
        </ListItem>)
    );
        // this will be used for the itemized list based on user id fetch */
        // name of the vendor and the total cost 
  //  return <li>{item.subscription.vendor.name} :${item.totalCost}</li>;
   // })

    return (
        <>
            <h2> Monthly Overall Cost for {moment().format('MMMM')}:</h2>
            <h4> $103.99</h4>
            <h2>Total Cost Per Subscription For All Time: </h2>
            <List dense={false}>
                {items}
            </List>
       </>
    );
}