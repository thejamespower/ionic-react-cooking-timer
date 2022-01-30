import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { SyntheticEvent } from 'react';

const TimerFab = (props: {
  icon: any;
  handleClick: (e: SyntheticEvent) => void;
}) => (
  <IonFab vertical="bottom" horizontal="end" slot="fixed">
    <IonFabButton onClick={(e) => props.handleClick(e)}>
      <IonIcon icon={props.icon} />
    </IonFabButton>
  </IonFab>
);

export default TimerFab;
