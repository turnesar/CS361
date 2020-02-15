import { Category } from './category';
import { Interval } from './interval';
import { Vendor } from './vendor';
import { User } from './user';

export interface Subscription {
    id: string;
    user: User; 
    name: string;
    startDate: string;  
    price: string;
    interval: Interval;
    category?: Category;
    vendor: Vendor;
    order: number;
}
