import { Injectable } from '@angular/core'
import { CreateClientParams, createClient } from 'contentful'
import { from, map, tap } from 'rxjs'
import { IEquipmentTypeEntry, IEquipmentTypeListEntry } from '../model'

const CONFIG: CreateClientParams = {
    space: 'v00lofp5qjmx',
    accessToken: '4Av2evmSsl_ZqurMdfVdX0RQry3fQGihm3h7JAa4nXI',
}

export enum IContentfulContent {
    EquipmentTypeList = '4Xi1mtiYcpKsR2ZKWLn9mN',
}

@Injectable({
    providedIn: 'root',
})
export class ContentfulService {
    private client = createClient(CONFIG)

    constructor() {}

    getEquipmentTypeList() {
        return from(
            this.client.getEntry<IEquipmentTypeListEntry>(
                IContentfulContent.EquipmentTypeList,
            ),
        ).pipe(
            tap((result) => console.log(result)),
            map((response) => response.fields.equipmentTypes),
        )
    }

    getEquipmentType(id: string) {
        return from(this.client.getEntry<IEquipmentTypeEntry>(id)).pipe(
            tap((result) => console.log(result)),
        )
    }

    getEquipment(id: string) {
        return from(this.client.getEntry(id)).pipe(
            tap((result) => console.log(result)),
        )
    }
}
