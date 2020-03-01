import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { deleteSubscription, fetchSubscriptions } from '../services'
import { Subscription } from '../models';

import './list.css';

export const SubscriptionList: React.FunctionComponent = () => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([])

    useEffect(() => {
        fetchSubscriptions().then(response => {
            setSubscriptions(response);
        });
    }, []);

    const items = subscriptions.map((value, index) => 
        (<ListItem key={value.SubscriptionID}>
            <ListItemAvatar>
                <Avatar>
                    <FolderIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText className="name-col"
                primary={value.SubName}
                secondary={false ? 'Secondary text' : null}
            />
            <ListItemText
                primary={value.VendorId}
                secondary={true ? value.CategoryId ? value.CategoryId : '' : null}
            />
             <ListItemText
                primary={`$${value.Price}`}
                secondary={true ? ` ${value.ChargeInterval}` : null}
            />
            <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="edit">
                    <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => {
                    handleDelete(value.SubscriptionID!);
                    setSubscriptions(subscriptions.filter(item => item.SubscriptionID !== value.SubscriptionID));
                }}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>)
    );

  return (
    <>
        <h2>My subscriptions</h2>

        <List dense={false}>
            {items}
        </List>
    </>
  );
};

function handleDelete(id: number) {
    deleteSubscription(id).then(result => {
        console.log(result);
    });
}
