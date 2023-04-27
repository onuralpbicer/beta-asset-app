import { Injectable } from '@angular/core'
import { CreateClientParams, createClient } from 'contentful'
import { from, map } from 'rxjs'
import { IEquipmentTypeListEntry } from '../model'

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
        ).pipe(map((response) => response.fields.equipmentTypes))
    }
}
