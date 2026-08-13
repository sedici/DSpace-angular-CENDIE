import {
  Component,
  Input,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TypeBadgeComponent as BaseComponent } from 'src/app/shared/object-collection/shared/badges/type-badge/type-badge.component';

import { getResourceTypeValueFor } from 'src/app/core/cache/object-cache.reducer';
import { DSpaceObject } from 'src/app/core/shared/dspace-object.model';
import {
  hasValue,
  isEmpty,
} from 'src/app/shared/empty.util';

@Component({
  selector: 'ds-themed-type-badge',
  // styleUrls: ['./type-badge.component.scss'],
  templateUrl: './type-badge.component.html',
  // templateUrl: '../../../../../../../../app/shared/object-collection/shared/badges/type-badge/type-badge.component.html',
  standalone: true,
  imports: [
    TranslateModule,
  ],
})
export class TypeBadgeComponent extends BaseComponent {
  private _typeBadgeObject: DSpaceObject;
  private _typeBadgeMessage: string;

  @Input() set object(object: DSpaceObject) {
    this._typeBadgeObject = object;

    const renderTypes = this._typeBadgeObject.getRenderTypes();
    if (!isEmpty(renderTypes.length)) {
      const renderType = renderTypes[0];
      if (renderType instanceof Function) {
        const resourceTypeValue = getResourceTypeValueFor(object.type);
        if (hasValue(resourceTypeValue)) {
          if (resourceTypeValue === 'item') {
            this._typeBadgeMessage = object.firstMetadataValue('dc.type');
          } else {
            this._typeBadgeMessage = `${resourceTypeValue.toLowerCase()}.listelement.badge`;
          }
        } else {
          this._typeBadgeMessage = `${renderType.name.toLowerCase()}.listelement.badge`;
        }
      } else {
        this._typeBadgeMessage = `${renderType.toLowerCase()}.listelement.badge`;
      }
    }
  }

  get typeBadgeMessage(): string {
    return this._typeBadgeMessage;
  }
}
