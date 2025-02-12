import { parse, format, isAfter } from 'date-fns';

export function isExpired(task) {
  if (!task.dueDate) return;
  const parsed = parse(task.dueDate, 'dd/MM/yyyy HH:mm', new Date());
  const formatted = format(parsed, 'yyyy-MM-dd HH:mm:ss');

  return isAfter(new Date(), formatted);
}
