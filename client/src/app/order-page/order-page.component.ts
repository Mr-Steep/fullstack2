import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {Router} from '@angular/router'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {MaterialInstance, MaterialService} from '../shared/classes/material.service'
import {OrderService} from './order.service'
import {Order, OrderPosition} from '../shared/interfaces'
import {OrdersService} from '../shared/services/orders.service'
import {Subscription} from 'rxjs'


@Component({
  selector: 'order-page.component',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  providers: [OrderService],


})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {


  // @ts-ignore
  @ViewChild('modal') modalRef: ElementRef;
  modal: MaterialInstance;
  oSub: Subscription;
  isRoot: boolean;
  pending = false;
  form: FormGroup;
  nameClient: string;
  addressClient: string
  phoneClient: string
  commitClient: string

  constructor(private router: Router,
              private order: OrderService,
              private ordersService: OrdersService,
  ) {  }
  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }

  ngOnDestroy() {
    this.modal.destroy()
    if (this.oSub) {
      this.oSub.unsubscribe()
    }
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  removePosition(orderPosition: OrderPosition) {
    this.order.remove(orderPosition)
  }

  open() {
    this.modal.open()
  }

  cancel() {
    this.modal.close()
  }

  submit() {
    this.pending = true


    const order: Order = {

      NameClient:this.nameClient =  <string>this.nameClient,
      AddressClient:this.addressClient =  <string>this.addressClient,
      PhoneClient:this.phoneClient =  <string>this.phoneClient,
      CommitClient:this.commitClient = <string>this.commitClient,
      list: this.order.list.map(item => {
        delete item._id
        return item
      }) }

    this.form.disable()
    this.oSub = this.ordersService.create(order).subscribe(
      newOrder => {
        MaterialService.toast(`Заказ №${newOrder.order} был добавлен.`)
        this.order.clear()
      },
      error => MaterialService.toast(error.error.message),
      () => {
        this.modal.close()
        this.pending = false
      }
    )
  }
}
