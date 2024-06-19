interface ScheduleDayItemBase {
  title: string;
  regular: boolean;
  day?: number;
}

export interface ScheduleDayItem extends ScheduleDayItemBase {
  startDate: Date;
  endDate: Date;
}

export interface PlainScheduleDayItem extends ScheduleDayItemBase {
  timeRange: [number, number];
  day: number;
}
