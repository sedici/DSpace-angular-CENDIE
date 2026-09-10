import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HomeNewsComponent as BaseComponent } from '../../../../../app/home-page/home-news/home-news.component';
import { ThemedSearchFormComponent } from '../../../../../app/shared/search-form/themed-search-form.component';
import { DSpaceObjectDataService } from '../../../../../app/core/data/dspace-object-data.service';
import { getFirstCompletedRemoteData } from '../../../../../app/core/shared/operators';

export interface CardItem {
  title: string;
  href: string;
  uuid: string;
  description$?: Observable<string>;
}
@Component({
  selector: 'ds-themed-home-news',
  styleUrls: ['./home-news.component.scss'],
  templateUrl: './home-news.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    NgbTooltipModule,
    ThemedSearchFormComponent,
    TranslateModule,
  ],
})

/**
 * Component to render the news section on the home page
 */
export class HomeNewsComponent extends BaseComponent implements OnInit {
  cardItems:Array<CardItem> = [
    {
      title: "NORMATIVA",
      href: "/handle/123456789/1",
      uuid: "173b8b26-e649-4456-a8b0-6e74d988d8b3",
    } as CardItem,
    {
      title: "DOCUMENTOS CURRICULARES",
      href: "/handle/123456789/12",
      uuid: "9ffeba8f-8a4e-4eee-b5a2-b9c1b5bffa3a",
    } as CardItem,
    {
      title: "PUBLICACIONES",
      href: "/handle/123456789/32",
      uuid: "b8710d0b-b91c-4518-accd-b214806d0fca",
    } as CardItem,
    {
      title: "DATOS E INFORMES",
      href: "/handle/123456789/56",
      uuid: "94d1f613-8f94-4c8d-8163-8afd00a543a3",
    } as CardItem,
    {
      title: "IMAGOTECA",
      href: "/handle/123456789/979",
      uuid: "42495fde-e915-4d14-9b44-74aea2c5d044",
    } as CardItem,
    {
      title: "DESTACADOS",
      href: "/handle/123456789/850",
      uuid: "ecf6e068-6a6f-4dad-988f-9bcb10ea232a",
    } as CardItem,
  ];

  constructor(private dsoService: DSpaceObjectDataService) {
    super(); 
  }

  ngOnInit(): void {
    this.cardItems.forEach(card => {
      card.description$ = this.dsoService.findById(card.uuid).pipe(
        getFirstCompletedRemoteData(),
        map(rd => {
          if (rd.hasSucceeded && rd.payload) {
            return rd.payload.firstMetadataValue('dc.description') || rd.payload.firstMetadataValue('dc.description.abstract') || 'Sin descripción disponible.';
          }
          return 'Error al cargar la descripción.';
        })
      );
    });
  }
}

