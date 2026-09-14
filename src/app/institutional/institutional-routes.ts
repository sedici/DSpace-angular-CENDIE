import { Routes } from '@angular/router';

import { i18nBreadcrumbResolver } from '../core/breadcrumbs/i18n-breadcrumb.resolver';

import { InstitutionalAboutComponent } from './about/institutional-about.component';
import { InstitutionalPolicyComponent } from './policy/institutional-policy.component';

export const ROUTES: Routes = [
  {
    path: 'about',
    component: InstitutionalAboutComponent,
    resolve: { breadcrumb: i18nBreadcrumbResolver },
    data: {
      title: 'institutional.about.title',
      breadcrumbKey: 'institutional.about',
    },
  },
  {
    path: 'policy',
    component: InstitutionalPolicyComponent,
    resolve: { breadcrumb: i18nBreadcrumbResolver },
    data: {
      title: 'institutional.policy.title',
      breadcrumbKey: 'institutional.policy',
    },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'about',
  },
];