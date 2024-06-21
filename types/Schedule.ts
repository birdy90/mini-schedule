interface ScheduleDayItemBase {
  title: string;
  regular: boolean;
  background: boolean;
}

export interface ScheduleDayItem extends ScheduleDayItemBase {
  startDate: Date;
  endDate: Date;
}

export interface PlainScheduleDayItem extends ScheduleDayItemBase {
  timeRange: [number, number];
  day: number;
  preview?: boolean;
}
