import React from 'react';

import Home from '../../views/Home';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import {
  IonRouterOutlet,
  IonTabBar,
  IonTabs,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { ellipse, triangle } from 'ionicons/icons';

const Router = () => (
  <IonReactRouter>
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/" exact component={Home} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="timers" href="/">
          <IonIcon icon={triangle} />
          <IonLabel>Timers</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tab2">
          <IonIcon icon={ellipse} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonReactRouter>
);

Router.propTypes = {};

export default Router;
