import { Category } from './category';
import { Interval } from './interval';
import { Vendor } from './vendor';
import { User } from './user';
import { Subscription } from './subscription';

export interface Cost {
    subscription: Subscription;
    totalCost: string; 
}
