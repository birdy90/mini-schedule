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

export interface WeekProps {
  items: ScheduleDayItem[];
}

export interface ScheduleItemProps {
  item: PlainScheduleDayItem;
  timeInterval: [number, number];
  preview?: boolean;
}

export interface DayDividerProps {
  index: number;
  timeInterval: [number, number];
}

export interface DayProps {
  index?: number;
  items?: PlainScheduleDayItem[];
}