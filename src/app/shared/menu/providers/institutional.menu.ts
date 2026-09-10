import {
  Injectable,
} from '@angular/core';
import {
  Observable,
  of,
} from 'rxjs';

import { TextMenuItemModel } from '../menu-item/models/text.model';
import { MenuItemType } from '../menu-item-type.model';
import { PartialMenuSection } from '../menu-provider.model';
import { AbstractExpandableMenuProvider } from './helper-providers/expandable-menu-provider';

/**
 * Menu provider to create the "All of DSpace" browse menu sections in the public navbar
 */
@Injectable()
export class InstitutionalMenuProvider extends AbstractExpandableMenuProvider {
  constructor(
  ) {
    super();
  }

  getTopSection(): Observable<PartialMenuSection> {
    return of(
      {
        model: {
          type: MenuItemType.TEXT,
          text: 'menu.section.institutional',
        } as TextMenuItemModel,
        visible: true,
      },
    );
  }

  /**
   * Retrieves subsections by fetching the browse definitions from the backend and mapping them to partial menu sections.
   */
  getSubSections(): Observable<PartialMenuSection[]> {
    const itemsInstitutional = [
      { id: 'About', text: 'about', route: 'about' },
      { id: 'Policy', text: 'policy', route: 'policy' },
    ];

    return of(
      itemsInstitutional.map((item) => {
        return {
          model: {
            type: MenuItemType.LINK,
            text: `menu.section.institutional_${item.text}`,
            link: `/institutional/${item.route}`,
          },
          visible: true,
        };
      }),
    );
  }
}