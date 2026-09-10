import {
  AsyncPipe,
  DatePipe,
} from '@angular/common';
import { 
  Component,
  Inject,
  Optional,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import {
  APP_CONFIG,
  AppConfig,
} from 'src/config/app-config.interface';
import { AuthService } from 'src/app/core/auth/auth.service';
import { NotifyInfoService } from 'src/app/core/coar-notify/notify-info/notify-info.service';
import { AuthorizationDataService } from 'src/app/core/data/feature-authorization/authorization-data.service';
import { OrejimeService } from 'src/app/shared/cookies/orejime.service';

import { FooterComponent as BaseComponent } from '../../../../app/footer/footer.component';

@Component({
  selector: 'ds-themed-footer',
  styleUrls: ['./footer.component.scss'],
  // styleUrls: ['../../../../app/footer/footer.component.scss'],
  templateUrl: './footer.component.html',
  //templateUrl: '../../../../app/footer/footer.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    RouterLink,
    TranslateModule,
  ],
})
export class FooterComponent extends BaseComponent {
  constructor(
    private authService: AuthService,
    @Optional() cookies: OrejimeService,
    protected authorizationService: AuthorizationDataService,
    protected notifyInfoService: NotifyInfoService,
    @Inject(APP_CONFIG) protected appConfig: AppConfig,
  ) {
  super(cookies, authorizationService, notifyInfoService, appConfig);
  }

  isAuthenticatedUser(): Observable<boolean> {
    return this.authService.isAuthenticated();
  }
}
