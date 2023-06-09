import { CommonModule } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { LoadingIconComponent } from '../loading-icon/loading-icon.component'
import { Storage, ref, uploadString } from '@angular/fire/storage'
import { ActivatedRoute } from '@angular/router'
import { Subscription, from, map, switchMap, take } from 'rxjs'
import { ContentfulService } from '../services/contentful.service'
import { IEquipmentBase, IMaintenanceTask } from '../model'
import { EquipmentService } from '../equipment/equipment.service'
import { SyncService } from '../services/sync.service'
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidatorFn,
    Validators,
} from '@angular/forms'
import { MaintenanceService } from './maintenance.service'

@Component({
    selector: 'beta-asset-app-maintenance',
    templateUrl: './maintenance.component.html',
    styleUrls: ['./maintenance.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        IonicModule,
        LoadingIconComponent,
        ReactiveFormsModule,
    ],
})
export class MaintenanceComponent implements OnInit, OnDestroy {
    public loading = false

    public form!: FormGroup
    public formSubscriptions: Array<Subscription> = []

    public submitted = false

    constructor(
        private activatedRoute: ActivatedRoute,
        private afStorage: Storage,
        private contentfulService: ContentfulService,
        private equipmentService: EquipmentService,
        private syncService: SyncService,
        private fb: FormBuilder,
        private maintenanceService: MaintenanceService,
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            type: [null, Validators.required],
            maintenanceTasks: this.fb.array<IMaintenanceTask>([]),
        })
        this.initializeMaintenance()
    }

    ngOnDestroy(): void {
        this.formSubscriptions.forEach((subscription) =>
            subscription.unsubscribe(),
        )
    }

    public initializeMaintenance() {
        this.syncService
            .takeAfterSync(
                this.activatedRoute.params.pipe(
                    map((params) => params['equipmentId']),
                    switchMap((equipmentId) =>
                        this.equipmentService.getEquipmentTypeId(equipmentId),
                    ),
                    switchMap((equipmentTypeId) =>
                        this.equipmentService.getEquipmentType(equipmentTypeId),
                    ),
                ),
            )
            .subscribe((equipment) => {
                const maintenanceTasksControl = this.form.controls[
                    'maintenanceTasks'
                ] as FormArray

                maintenanceTasksControl.clear()

                equipment.maintenanceTasks.forEach((task) => {
                    const fg = this.fb.group({
                        name: [task],
                        description: [undefined],
                        uygun: [null, Validators.required],
                        yapilanIs: [null],
                    })

                    this.formSubscriptions.push(
                        fg.controls['uygun'].valueChanges.subscribe((value) => {
                            const control = fg.controls['yapilanIs']

                            if (value === true || value === 'true') {
                                control.clearValidators()
                            } else {
                                control.addValidators(Validators.required)
                            }
                            control.updateValueAndValidity()
                        }),
                    )
                    maintenanceTasksControl.push(fg)
                })
            })
    }

    public submit() {
        if (this.form.invalid || this.submitted) {
            return
        }

        this.activatedRoute.params
            .pipe(
                take(1),
                map((params) => params['equipmentId']),
            )
            .subscribe((equipmentId) => {
                this.maintenanceService.sendMaintenance(this.form, equipmentId)
            })
    }

    get maintenanceTasks() {
        return this.form.get('maintenanceTasks') as FormArray<FormGroup>
    }
}
