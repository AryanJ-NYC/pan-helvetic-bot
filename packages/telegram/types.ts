import { type Scenes } from 'telegraf';
import { type PhotoSize } from 'telegraf/typings/core/types/typegram';

interface MyWizardSession extends Scenes.WizardSessionData {
  eventName: string;
  date: string;
  location: string;
  photo: string | undefined;

  time: string;
}
export type MyContext = Scenes.WizardContext<MyWizardSession>;
