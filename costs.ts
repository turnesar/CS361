import { Interval, Subscription, Vendor, User, Cost } from '../models';

export const sampleVs: Vendor[] = [
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

export const sampleUs: User[] = [
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

export const sampleS: Subscription[] = [
    {
        id: "001",
        name: 'Internet',
        startDate: '12/01/2019',
        price: '89',
        interval: Interval.Monthly,
        vendor: sampleVs[0],
        order: 0,
    },
    {
        id: "002",
        name: 'My netflix',
        startDate: '01/01/2020',
        price: '14.99',
        interval: Interval.Monthly,
        vendor: sampleVs[1],
        order: 1,
    },
    {
        id: "003",
        name: 'Prime subscription',
        startDate: '11/24/2018',
        price: '100',
        interval: Interval.Annual,
        vendor: sampleVs[2],
        order: 2,
    }
]

const sampleCost: Cost[] = [
    {
        user: sampleUs[0],
        subscription: sampleS[0],
        totalCost: '300'
    },
    {
        user: sampleUs[0],
        subscription: sampleS[1],
        totalCost: '150'
    }


]

export function fetchTotalCost(): Promise<Cost[]> {
    // hit backend api endpoint to fetch cost query from database.
    return new Promise((resolve) => {resolve(sampleCost)});
}


//export function fetchMonthlyCost(): Pri(cost: Cost) {
    // hit backend api endpoint to post new subscription to database.

//}