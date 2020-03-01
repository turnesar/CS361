import { Interval } from './interval';

export interface Subscription {
    SubscriptionID?: number;
    UserId: number;
    Price?: number;
    ChargeInterval: Interval;
    CategoryId?: number;
    VendorId?: number;
    ItemOrder?: number;
    SubName: string;
    EntryDateTStamp: string;
}