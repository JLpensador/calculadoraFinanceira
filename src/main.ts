import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { CardComponent } from './app/components/card/card.component';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: CardComponent },
      { path: 'home', component: CardComponent },
    ]),
  ],
}).catch((err) => console.error(err));
