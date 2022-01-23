import { IonButton, IonFab, IonFabButton, IonIcon } from '@ionic/react';

const TimerFab = (props: { icon: any; handleClick: (e: any) => void }) => (
  <IonFab vertical="bottom" horizontal="end" slot="fixed">
    <IonFabButton onClick={(e) => props.handleClick(e)}>
      <IonIcon icon={props.icon} />
    </IonFabButton>
  </IonFab>
);

export default TimerFab;
