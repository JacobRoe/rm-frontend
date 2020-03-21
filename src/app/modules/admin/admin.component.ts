import {Component, OnInit} from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {ModalService} from '../../core/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {
  model: NgbDateStruct;
  date: { year: number, month: number };

  constructor(private calendar: NgbCalendar, private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.model = this.calendar.getToday();
  }

  showConfirm() {
    this.modalService.confirm('show confirm', 'confirm');
  }

  showAlert() {
    this.modalService.alert('show alert', 'alert');
  }
}
