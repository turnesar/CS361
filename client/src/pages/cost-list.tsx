import React, { useEffect, useState } from 'react';
import { fetchSubscriptions } from '../services'
import { Subscription } from '../models';


export const CostList: React.FunctionComponent = () => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([])

    useEffect(() => {
        fetchSubscriptions().then(response => {
            setSubscriptions(response);
        });
    }, []);
     
  
       /*need to caluclate total this month using moment math*/

    const items = subscriptions.map(item => {
        /*determine math with accumulator JSON here with moment math*/
    return <li>{item.vendor.name} {item.price}</li>;
    })

    return (
        <ul>
            <h3> Monthly Overall Cost for: </h3>
            <h3>Total Cost Per Subscription: </h3>
            {items}
        </ul>
    );
}