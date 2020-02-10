/*Delete row queries. "@" symbolizes a variable to be filled in by backend prior to running*/
DELETE FROM appuser WHERE appuser.UserId = @UserId;
DELETE FROM category WHERE category.CategoryId = @CategoryId;
DELETE FROM vendor WHERE vendor.VendorId = @VendorId;
DELETE FROM subscription WHERE subscription.SubscriptionId = @SubscriptionId;

/*Update queries, updates a single row at a time. "@" symbolizes a variable to be filled in by backend prior to running*/
UPDATE appuser SET UserName = @UserName WHERE appuser.UserId = @UserId;
UPDATE category SET CategoryName = @CategoryName WHERE category.Id = @CategoryId;
UPDATE vendor SET VendorName = @VendorName WHERE vendor.VendorId = @VendorId;
UPDATE vendor SET VendorSite = @VendorSite WHERE vendor.VendorId = @VendorId;
UPDATE subscription SET UserId = @UserId, WHERE subscription.SubscriptionId = @SubId;
UPDATE subscription SET Price = @Price WHERE subscription.SubscriptionId = @SubId;
UPDATE subscription SET ChargeInterval = @ChargeInterval WHERE subscription.SubscriptionId = @SubId;
UPDATE subscription SET CategoryId = @CategoryId WHERE subscription.SubscriptionId = @SubId;
UPDATE subscription SET VendorId = @VendorId WHERE subscription.SubscriptionId = @SubId;
UPDATE subscription SET ItemOrder = @ItemOrder WHERE subscription.SubscriptionId = @SubId;
UPDATE subscription SET SubName = @SubName WHERE subscription.SubscriptionId = @SubId;

/*Insert queries. Inserts a single row at a time. "@" symbolizes a variable to be filled in by backend prior to running*/
INSERT INTO appuser (UserName, UserCreateDateTStamp) VALUES (@UserName, @TimeStamp);
INSERT INTO category (CategoryName) VALUES (@CategoryName);
INSERT INTO vendor (VendorName, VendorSite) VALUES (@VendorName, @VendorSite);
INSERT INTO subscription (UserId, Price, ChargeInterval, CategoryId, VendorId, ItemOrder, SubName, EntryDateTStamp) VALUES (@UserId, @Price, @ChargeInterval, @CategoryId, @VendorId, @ItemOrder, @SubName, @EntryDateTStamp);
I