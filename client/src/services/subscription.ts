import { Subscription, Vendor } from '../models';
import { sampleVendors } from '../models/__mocks__';

export type NewSubscription = Pick<Subscription,   
    "SubName" |    
    "Price" |
    "ChargeInterval" |
    "VendorId" |
    "EntryDateTStamp"
>;

export const fetchVendors = async (): Promise<Vendor[]> => {
    // const response = await fetch('http://localhost:3005/vendors');
    // return response.json();
    return Promise.resolve(sampleVendors);
} 

export async function fetchSubscriptions(): Promise<Subscription[]> {
    const response = await fetch('http://localhost:3005/subscriptions');
    return response.json();
}

export async function createSubscription(newSub: NewSubscription): Promise<any> {

    const payload: Subscription = {
        ...newSub, ...{ UserId: 1, CategoryId: 1 }
    };

    const response = await fetch('http://localhost:3005/subscriptions', {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(payload),
    });
    
    console.log(response);
}
  