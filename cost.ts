import { User } from './user';
import { Subscription } from './subscription';

export interface Cost {
    user: User; 
    subscription: Subscription;
    totalCost: string; 
}
