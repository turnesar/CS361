import { Cost, MonthCost } from '../models';

export async function fetchTotalCost(): Promise<Cost[]> {
    const response = await fetch('http://localhost:3005/costs/allTime');
    return response.json();
}

export async function fetchMonthlyCost(): Promise<MonthCost[]>{
    const res = await fetch('http://localhost:3005/costs/month');
    return res.json();
}