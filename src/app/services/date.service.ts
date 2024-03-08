import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  formatDate(dateString: string, hour: boolean = false) {
    const matchResult = dateString?.match(/\d+/) ?? '';
    if (matchResult) {
      const timestamp = parseInt(matchResult[0], 10);
      const date = new Date(timestamp);
      let formattedDate: string = `${date
        .getDate()
        .toString()
        .padStart(2, '0')}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${date.getFullYear()}`;
      if (hour)
        formattedDate =
          formattedDate +
          ` ${date.getHours().toString().padStart(2, '0')}:${date
            .getMinutes()
            .toString()
            .padStart(2, '0')}:${date
            .getSeconds()
            .toString()
            .padStart(2, '0')}`;
      return formattedDate;
    }
    return '';
  }
}
