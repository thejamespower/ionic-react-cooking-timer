import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import TimerList from '../../components/TimerList';
import EndTimeSetter from '../../components/EndTimeSetter';
import SuperTimer from '../../components/SuperTimer';
import TimerCreator from '../../components/TimerCreator';

export interface Timer {
  durationInSeconds: number;
  duration: string;
  active: boolean;
}

export interface Props {
  timers: Timer[];
}

const Home: React.FC<Props> = ({ timers }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Timers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Timers</IonTitle>
          </IonToolbar>
        </IonHeader>
        <TimerCreator />

        <TimerList timers={timers} />

        <EndTimeSetter />

        <SuperTimer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
