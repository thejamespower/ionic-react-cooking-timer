import React, { useState } from 'react';
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
import { add } from 'ionicons/icons';
import TimerFab from '../../components/TimerFab';

export interface Timer {
  durationInSeconds: number;
  duration: string;
  active: boolean;
}

export interface Props {
  timers: Timer[];
}

const TIMER_CREATOR_OPEN_INITIAL_STATE = false;

const Home: React.FC<Props> = ({ timers }) => {
  const [timerCreatorOpen, setTimerCreatorOpen] = useState(
    TIMER_CREATOR_OPEN_INITIAL_STATE,
  );

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

        {/*{timerCreatorOpen && (*/}
        <TimerCreator
          close={() => setTimerCreatorOpen(false)}
          isOpen={timerCreatorOpen}
        />
        {/*)}*/}

        <TimerList timers={timers} />

        <TimerFab
          icon={add}
          handleClick={(e) => {
            setTimerCreatorOpen(true);
          }}
        />

        {/*<EndTimeSetter />*/}

        <SuperTimer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
