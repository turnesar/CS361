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

import { fetchSubscriptions } from '../services'
import { Subscription } from '../models';

import './list.css';

export const SubscriptionList: React.FunctionComponent = () => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([])

    useEffect(() => {
        fetchSubscriptions().then(response => {
            setSubscriptions(response);
        });
    }, []);

    const items = subscriptions.map(value => 
        (<ListItem>
            <ListItemAvatar>
                <Avatar>
                    <FolderIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText className="name-col"
                primary={value.name}
                secondary={false ? 'Secondary text' : null}
            />
            <ListItemText
                primary={value.vendor.name}
                secondary={true ? value.category?.id ? value.category.name : '' : null}
            />
             <ListItemText
                primary={`$${value.price}`}
                secondary={true ? ` ${value.interval}` : null}
            />
            <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="edit">
                    <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete">
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
}
