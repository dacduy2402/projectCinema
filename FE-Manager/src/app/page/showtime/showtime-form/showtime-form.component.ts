import { Component, OnInit, Inject, } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Constant } from 'app/constants/Constant';
import { ToastrService } from 'ngx-toastr';
import { Regex } from 'app/services/regex/regex';
import { take } from 'rxjs';
import { Observable } from 'rxjs';
import { ShowtimeService } from 'app/services/showtime/showtime.service';
// import { TableShowtimesDialogComponent } from '../showtime-dialog/table-showtimes-dialog/table-showtimes-dialog.component';
import { event } from 'jquery';
@Component({
  selector: 'app-showtime-form',
  templateUrl: './showtime-form.component.html',
  styleUrls: ['./showtime-form.component.scss']
})


export class ShowtimeFormComponent implements OnInit {

  dataSource: MatTableDataSource<any>

  displayedColumns: string[] = ['movie', 'rooms', 'date', 'timeStart', 'timeEnd', 'createDate', 'func'];

  isLoading = false;

  messengerUsername: string = 'Không được để trống ô này';

  title: string = 'Showtimes'

  // selected_id: string;

  day = new Date();

  day2 = new Date();

  day3 = new Date();

  day4 = new Date();

  day5 = new Date();

  day6 = new Date();

  day7 = new Date();

  select_day: string = '';

  dayArray: string[] = [];

  movies: any[] = [];

  rooms: any[] = [];

  select_movies: any;

  select_room: number;

  selected_showTimes: number;

  dataList: PeriodicElement[] = [];

  time: number = 15 * 60;

  formGroup = this.fb.group({
    // id: [''],
    room_id: ['', [Validators.required]],
    nameMovie: ['', [Validators.required]],
    date: [this.select_day, Validators.required],
    hour: [],
  })

  constructor(@Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private toastrService: ToastrService,
    private showtimesService: ShowtimeService,
    private matDialogRef: MatDialogRef<ShowtimeFormComponent>,
  ) { }

  ngOnInit() {
    (this.day.getMonth() + 1 < 10) ? this.dayArray.push(this.day.getFullYear() + '-0' + (this.day.getMonth() + 1) + '-' + this.day.getDate())
      : this.dayArray.push(this.day.getFullYear() + '-' + (this.day.getMonth() + 1) + '-' + this.day.getDate());
    this.day2.setDate(this.day.getDate() + 1);
    (this.day.getMonth() + 1 < 10) ? this.dayArray.push(this.day2.getFullYear() + '-0' + (this.day2.getMonth() + 1) + '-' + this.day2.getDate())
      : this.dayArray.push(this.day2.getFullYear() + '-' + (this.day2.getMonth() + 1) + '-' + this.day2.getDate());
    this.day3.setDate(this.day2.getDate() + 1);
    (this.day3.getMonth() + 1 < 10) ? this.dayArray.push(this.day3.getFullYear() + '-0' + (this.day3.getMonth() + 1) + '-' + this.day3.getDate())
      : this.dayArray.push(this.day3.getFullYear() + '-' + (this.day3.getMonth() + 1) + '-' + this.day3.getDate());
    this.day4.setDate(this.day3.getDate() + 1);
    (this.day.getMonth() + 1 < 10) ? this.dayArray.push(this.day4.getFullYear() + '-0' + (this.day4.getMonth() + 1) + '-' + this.day4.getDate())
      : this.dayArray.push(this.day4.getFullYear() + '-' + (this.day4.getMonth() + 1) + '-' + this.day4.getDate());
    this.day5.setDate(this.day4.getDate() + 1);
    (this.day.getMonth() + 1 < 10) ? this.dayArray.push(this.day5.getFullYear() + '-0' + (this.day5.getMonth() + 1) + '-' + this.day5.getDate())
      : this.dayArray.push(this.day5.getFullYear() + '-' + (this.day5.getMonth() + 1) + '-' + this.day5.getDate());
    this.day6.setDate(this.day5.getDate() + 1);
    (this.day.getMonth() + 1 < 10) ? this.dayArray.push(this.day5.getFullYear() + '-0' + (this.day5.getMonth() + 1) + '-' + this.day5.getDate())
      : this.dayArray.push(this.day5.getFullYear() + '-' + (this.day5.getMonth() + 1) + '-' + this.day5.getDate());
    this.day7.setDate(this.day6.getDate() + 1);
    (this.day.getMonth() + 1 < 10) ? this.dayArray.push(this.day6.getFullYear() + '-0' + (this.day6.getMonth() + 1) + '-' + this.day6.getDate())
      : this.dayArray.push(this.day6.getFullYear() + '-' + (this.day6.getMonth() + 1) + '-' + this.day6.getDate());
    this.getRoom();
    this.selectRoom(null);
  }


  onSubmit() {
    // console.log(this.dataList);
    this.dataList.forEach((data) => {
      this.showtimesService.updateData(data).subscribe({
        next: res => {
          // console.log(res);
          this.matDialogRef.close()
          this.matDialogRef.close(Constant.RESULT_CLOSE_DIALOG.SUCCESS);
          if (res.status === true) {
            this.toastrService.success(res.message);
            this.isLoading = false;
          }
          else {
            this.isLoading = false;
            this.toastrService.warning(res.message);
          }
        }
      })
    })
  }

  getMovie(event: any) {
    // console.log(event)
    if (event !== null) {
      this.showtimesService.getMoviesByDate(event).subscribe({
        next: res => {
          this.movies = res.data
          // console.log(this.movies);
        }
      })
      // this.selectRoom()
    }
  }


  selectRoom(event: any) {
    console.log('===================');
    
    console.log(event);
    
    // let id: number = 1;
    if (this.select_day !== null && event !== null) {
      this.showtimesService.getShowTimeByDate(this.select_day, event).subscribe({
        next: res => {
          // console.log(res.data);
          res.data.forEach((data) => {
            data.date = new Date(data.date).toLocaleDateString()
            data.createDate = new Date(data.createDate).toLocaleDateString()
            data.updateDate = new Date(data.updateDate).toLocaleDateString()
            data.timeStart = new Date(data.timeStart).toLocaleDateString() + ' ' + new Date(data.timeStart).toLocaleTimeString('en-US', {hour12: false})
            data.timeEnd = new Date(data.timeEnd).toLocaleDateString() + ' ' + new Date(data.timeEnd).toLocaleTimeString('en-US', {hour12: false})
          })
          this.dataList = res.data
          this.dataSource = new MatTableDataSource<any>(res);
          this.dataSource.data = res.data;
          // this.dataSource.sort = this.sort;
        },
        error: e =>{
          console.log(e);
        }
      })
      // this.dataSource = new MatTableDataSource<any>(this.dataList);
    }
  }

  getRoom() {
    this.showtimesService.getAllRooms().subscribe({
      next: res => {
        this.rooms = res.data;
      }
    })
  }

  compareTimes(time1: Date, time2: Date): number {
    const hours1 = time1.getTime();
    const hours2 = time2.getTime()


    if (hours1 < hours2) {
      return -1;
    } else if (hours1 > hours2) {
      return 1;
    } else {
      return 0;
    }
  }

  data1: any[];
  addShowtimes() {
    this.data1 = this.movies.filter(data => '' + data.id === this.select_movies);
    let startTime = new Date('' + this.select_day + ' ' + '00:00:00');
    const [hoursString, minutesString, secondsString] = this.formGroup.value.hour.split(":");
    startTime.setTime(startTime.getTime() + hoursString * 60 * 60 * 1000 + minutesString * 60 * 1000 + secondsString * 1000);
    let endTime = new Date();
    endTime.setTime(startTime.getTime() + this.data1[0].time * 60 * 1000);
    let createTime = new Date();
    // console.log(this.dataList.length);
    let flag: number = 1;
    if (this.dataList.length == 0) {
      flag = 1;
      // this.dataList.push({ movie: { id: this.select_movies, name: this.data1[0].name }, rooms: { id: this.select_room }, date: date, timeStart: start + ' ' + startTime.toLocaleTimeString().slice(0, -3), timeEnd: end + ' ' + endTime.toLocaleTimeString().slice(0, -3), createDate: create })
    }
    else {
      this.dataList.forEach((data) => {
        let timeStart = new Date(data.timeStart);
        let timeEnd = new Date(data.timeEnd);
        // console.log('thời gian bắt đầu phim mới: ' + startTime.getHours());
        // console.log('thời gian kết thúc phim mới: ' + endTime.getHours());
        // console.log('thời gian bắt đầu phim cũ: ' + timeStart.getHours());
        // console.log('thời gian kết thúc phim cũ: ' + timeEnd.getHours());
        if (this.compareTimes(endTime, timeStart) >= 0 && this.compareTimes(endTime, timeEnd) <= 0) {
          this.toastrService.warning('Thời gian không hợp lệ 1')
          flag = 0;
        }
        else if (this.compareTimes(startTime, timeStart) >= 0 && this.compareTimes(startTime, timeEnd) <= 0) {
          this.toastrService.warning('Thời gian không hợp lệ 2')
          flag = 0;
        }
        else if (this.compareTimes(startTime, timeStart) >= 0 && this.compareTimes(endTime, timeEnd) <= 0) {
          this.toastrService.warning('Thời gian không hợp lệ 3')
          flag = 0;
        }
        else if (this.compareTimes(startTime, timeStart) <= 0 && this.compareTimes(endTime, timeEnd) >= 0) {
          this.toastrService.warning('Thời gian không hợp lệ 4')
          flag = 0;
        }
      })
    }
    if (flag == 1) {
      this.dataList.push({ movie: { id: this.select_movies, name: this.data1[0].name }, rooms: { id: this.select_room }, date: startTime.toLocaleDateString(), timeStart: startTime.toLocaleDateString() + ' ' + startTime.toLocaleTimeString('en-US', {hour12: false}), timeEnd: endTime.toLocaleDateString() + ' ' + endTime.toLocaleTimeString('en-US', {hour12: false}), createDate: createTime.toLocaleDateString(), delete: false, updateDate: createTime.toLocaleDateString() })
    }
    this.dataSource = new MatTableDataSource<any>(this.dataList.filter((data) => data.delete === false));
    // this.dataSource.renderRow()
    // console.log(this.dataList);
    // console.log(this.dataSource);
  }

  getDelete(element: any) {
    this.dataSource.data = this.dataSource.data.filter((data) => {
      return data.timeStart !== element.timeStart
    })
    // this.dataSource = new MatTableDataSource<any>(this.dataList);
    // console.log(this.dataList);
    // this.formGroup.value.dataArraylist = this.dataList;
    let updateDate = new Date();
    this.dataList.forEach((data) => {
      if (data.timeStart === element.timeStart) {
        data.delete = true;
        data.updateDate = updateDate.toLocaleDateString();
      }
    })
  }
}

export interface PeriodicElement {
  // id: number;
  movie: { id: number, name: string };
  rooms: { id: number };
  // nameMovie?: string;
  date?: string;
  timeStart?: string;
  timeEnd?: string;
  createDate?: string;
  delete?: boolean;
  updateDate?: string;
}
