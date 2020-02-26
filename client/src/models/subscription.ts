import { Category } from './category';
import { Interval } from './interval';
import { Vendor } from './vendor';

export interface Subscription {
    SubscriptionID: number;
    UserID: number;
    Price: number;
    ChargeInterval: Interval;
    CategoryID: number;
    VendorID: number;
    ItemOrder: number;
    SubName: string;
    EntryDateTStamp: string;
}