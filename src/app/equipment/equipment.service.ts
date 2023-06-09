import { Injectable } from '@angular/core'
import { ContentfulService } from '../services/contentful.service'
import { IEquipmentBase, IEquipmentType } from '../model'
import { from, map } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class EquipmentService {
    constructor(private contentfulService: ContentfulService) {}

    public getEquipmentTypeId(equipmentId: string) {
        return from(
            this.contentfulService.getEntry<IEquipmentBase>(equipmentId),
        ).pipe(map((equipment) => equipment.fields.type.sys.id))
    }

    public getEquipmentType(equipmentTypeId: string) {
        return from(
            this.contentfulService.getEntry<IEquipmentType>(equipmentTypeId),
        ).pipe(map((equipmentType) => equipmentType.fields))
    }
}
