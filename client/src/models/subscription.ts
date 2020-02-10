import { Category } from './category';
import { Interval } from './interval';
import { Vender } from './vender';

export interface Subscription {
    id: string;
    name: string;
    price: string;
    interval: Interval;
    category?: Category;
    vender: Vender;
    order: number;
}
