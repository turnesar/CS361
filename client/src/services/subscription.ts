import { Interval, Subscription, Vendor, Category } from '../models';

export const sampleVendors: Vendor[] = [
    {
        id: '01',
        name: 'Xfinity',
    },
    {
        id: '02',
        name: 'Netflix'
    },
    {
        id: '03',
        name: 'Prime'
    }
]

export async function fetchSubscriptions(): Promise<Subscription[]> {
    const response = await fetch('http://localhost:3005/main');
    return response.json();
}


export function createSubscription(subscription: Subscription) {
    // hit backend api endpoint to post new subscription to database.

}

