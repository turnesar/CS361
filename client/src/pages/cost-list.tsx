import React, { useEffect, useState } from 'react';
import { fetchSubscriptions, fetchTotalCost } from '../services'
import { Subscription, User, Cost } from '../models';
import moment from 'moment';



export const CostList: React.FunctionComponent = () => {
    const [costs, setCosts] = useState<Cost[]>([])

    useEffect(() => {
        fetchTotalCost().then(response => {
            setCosts(response);
        });
    }, []);
     
  // return total monthly Cost here, give UserId and receive the 
  // MonthlyEquivalent
     

    const items = costs.map(item => {
        // this will be used for the itemized list based on user id fetch */
        // name of the vendor and the total cost 
    return <li>{item.subscription.vendor.name} :${item.totalCost}</li>;
    })

    return (
        <ul>
            <h3> Monthly Overall Cost for {moment().format('MMMM')}:</h3>
            <h3>Total Cost Per Subscription: </h3>
            {items}
        </ul>
    );
}