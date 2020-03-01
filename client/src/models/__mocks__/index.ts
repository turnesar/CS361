import { User } from '../user';
import { Vendor } from '../vendor';

export const sampleUsers: User[] = [
    {
        UserId: 1,
        UserName: 'JimBob',
        UserCreateDateTStamp: new Date('10/24/2019'),
    },
    {
        UserId: 2,
        UserName: 'Suzy',
        UserCreateDateTStamp: new Date('01/01/2020'),
    },

]

export const sampleVendors: Vendor[] = [
    {
        VendorId: 0,
        VendorName: 'Xfinity',
        VendorSite: '',
    },
    {
        VendorId: 1,
        VendorName: 'Netflix',
        VendorSite: '',

    }
]