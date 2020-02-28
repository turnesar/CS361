import { Interval, MonthCost, Vendor, User, Cost } from '../models';

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

export const sampleS = [
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

const sampleCost = [
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

export async function fetchTotalCost(): Promise<Cost[]> {
        const response = await fetch('http://localhost:3005/costs/allTime');
        return response.json();
}

export async function fetchMonthlyCost(): Promise<MonthCost[]>{
    const res = await fetch('http://localhost:3005/costs/month');
    return res.json();
  }

//export function fetchMonthlyCost(): Pri(cost: Cost) {
    // hit backend api endpoint to post new subscription to database.

//}