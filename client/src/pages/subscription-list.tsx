import React, { useEffect, useState } from 'react';
import { fetchSubscriptions } from '../services'
import { Subscription } from '../models';

export const SubscriptionList: React.FunctionComponent = () => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([])

    useEffect(() => {
        fetchSubscriptions().then(response => {
            setSubscriptions(response);
        });
    }, []);

    const items = subscriptions.map(item => {
    return <li key={item.id}>{item.id}, {item.name} {item.vender.name} {item.price}</li>;
    })

    return (
        <ul>
            {items}
        </ul>
    );
}


