import { type Scenes } from 'telegraf';

interface MyWizardSession extends Scenes.WizardSessionData {
  bitcoinOnly: boolean | undefined;
  eventName: string;
  date: string;
  location: string;
  photo: string | undefined;
  time: string;
  url: string | undefined;
}
export type MyContext = Scenes.WizardContext<MyWizardSession>;
