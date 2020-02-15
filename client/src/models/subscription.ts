import { Category } from './category';
import { Interval } from './interval';
import { Vender } from './vender';

export interface Subscription {
    id: string;
    name: string;
    startDate: string; //we need a start date here 
    price: string;
    interval: Interval;
    category?: Category;
    vender: Vender;
    order: number;
}
