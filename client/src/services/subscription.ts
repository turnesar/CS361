import { Interval, Subscription, Vender } from '../models';

export const sampleVenders: Vender[] = [
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

const sampleSubscriptions: Subscription[] = [
    {
        id: "001",
        name: 'Internet',
        startDate: '12/01/2019',
        price: '89',
        interval: Interval.Monthly,
        vender: sampleVenders[0],
        order: 0,
    },
    {
        id: "002",
        name: 'My netflix',
        startDate: '01/01/2020',
        price: '14.99',
        interval: Interval.Monthly,
        vender: sampleVenders[1],
        order: 1,
    },
    {
        id: "003",
        name: 'Prime subscription',
        startDate: '11/24/2018',
        price: '100',
        interval: Interval.Annual,
        vender: sampleVenders[2],
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

