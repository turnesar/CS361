import { Interval, Subscription, Vendor, User } from '../models';

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

export const sampleUsers: User[] = [
    {
        id: '01',
        name: 'JimBob',
        startDate: '10/24/2019'
    },
    {
        id: '02',
        name: 'Suzy',
        startDate: '01/01/2020'
    },

]

const sampleSubscriptions: Subscription[] = [
    {
        id: "001",
        name: 'Internet',
        user: sampleUsers[0],
        startDate: '12/01/2019',
        price: '89',
        interval: Interval.Monthly,
        vendor: sampleVendors[0],
        order: 0,
    },
    {
        id: "002",
        name: 'My netflix',
        user: sampleUsers[0],
        startDate: '01/01/2020',
        price: '14.99',
        interval: Interval.Monthly,
        vendor: sampleVendors[1],
        order: 1,
    },
    {
        id: "003",
        name: 'Prime subscription',
        user: sampleUsers[0],
        startDate: '11/24/2018',
        price: '100',
        interval: Interval.Annual,
        vendor: sampleVendors[2],
        order: 2,
    }
]

export function fetchSubscriptions(): Promise<Subscription[]> {
    // hit backend api endpoint to fetch subscriptions from database.
    return new Promise((resolve) => {resolve(sampleSubscriptions)});
}


export function createSubscription(subscription: Subscription) {
    // hit backend api endpoint to post new subscription to database.

}

