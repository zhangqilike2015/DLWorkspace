import * as React from 'react';
import {
  Fragment,
  FunctionComponent,
  useContext,
<<<<<<< HEAD
  useMemo,
} from 'react';

import { get } from 'lodash';

=======
  useMemo
} from 'react'
import useFetch from 'use-http-1'
>>>>>>> 09d82aa5... Add cluster notification (#1291)
import {
  Box,
  BoxProps,
  Divider,
  Paper,
  Typography,
  createStyles,
<<<<<<< HEAD
  makeStyles,
} from '@material-ui/core';

import { Info } from '@material-ui/icons';

import ConfigContext from '../contexts/Config';
import TeamContext from '../contexts/Team';
=======
  makeStyles
} from '@material-ui/core'
import { Info } from '@material-ui/icons'
import ClustersContext from '../contexts/Clusters'
>>>>>>> 09d82aa5... Add cluster notification (#1291)

const usePaperStyle = makeStyles(theme => createStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
  },
}));

<<<<<<< HEAD
const NotificationBox: FunctionComponent<BoxProps> = (props) => {
  const { notifications } = useContext(ConfigContext);
  const { currentTeamId } = useContext(TeamContext);

  const notification = useMemo(() => {
    const notification = get(notifications, [currentTeamId]);
    if (notification === undefined) {
      return get(notifications, ['.default']);
    }
    return notification
  }, [notifications, currentTeamId]);

  const paperStyle = usePaperStyle();

  if (Boolean(notification) === false) return null;

=======
const ClusterNotifications: FunctionComponent<{ cluster: any }> = ({ cluster }) => {
  const { data } = useFetch(`/api/clusters/${cluster.id}`, [cluster.id])
  const notifications = useMemo(() => {
    if (data === undefined) return []
    if (!Array.isArray(data.notifications)) return []
    return data.notifications as string[]
  }, [data])
  const paperStyle = usePaperStyle()
  return (
    <>
      {
        notifications.map((notification, index) => (
          <Fragment key={index}>
            <Paper elevation={0} classes={paperStyle}>
              <Info fontSize="small" color="primary"/>
              <Typography
                variant="body2"
                component={Box}
                flex={1}
                paddingLeft={1}
                dangerouslySetInnerHTML={{ __html: notification }}
              />
            </Paper>
            <Divider/>
          </Fragment>
        ))
      }
    </>
  )
}

const NotificationBox: FunctionComponent<BoxProps> = (props) => {
  const { clusters } = useContext(ClustersContext)
>>>>>>> 09d82aa5... Add cluster notification (#1291)
  return (
    <Box {...props}>
      {clusters.map(cluster => (
        <ClusterNotifications key={cluster.id} cluster={cluster}/>
      ))}
    </Box>
  );
};

export default NotificationBox;
