import { Category } from './category';
import { Interval } from './interval';
import { Vendor } from './vendor';

export interface Subscription {
    id: string;
    name: string;
    startDate: string; //we need a start date here 
    price: string;
    interval: Interval;
    category?: Category;
    vendor: Vendor;
    order: number;
}
