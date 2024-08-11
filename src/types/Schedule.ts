interface ScheduleDayItemBase {
  id?: string;
  title: string;
  regular: boolean;
  background: boolean;
}

export interface ScheduleDayItemPayload extends ScheduleDayItemBase {
  startDate: string;
  endDate: string;
}

export interface ScheduleDayItem extends ScheduleDayItemBase {
  startDate: Date;
  endDate: Date;
}

export interface ScheduleDayItemPayload extends ScheduleDayItemBase {
  startDate: string;
  endDate: string;
  owner: string;
}

export type ItemTimeRange = [number, number];

export interface SimplifiedScheduleDayItem extends ScheduleDayItemBase {
  timeRange: ItemTimeRange;
  day: number;
  preview?: boolean;
}

export interface WeekProps {
  items: ScheduleDayItem[];
}

export interface ScheduleItemProps {
  item: SimplifiedScheduleDayItem;
  timeInterval: ItemTimeRange;
  preview?: boolean;
}

export interface DayDividerProps {
  index: number;
  timeInterval: ItemTimeRange;
}

export interface DayProps {
  index?: number;
  items?: SimplifiedScheduleDayItem[];
}
