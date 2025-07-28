import { formatDate, isValid } from "date-fns";
import { useCallback } from "react";

export function useFormatDate() {
  return useCallback((stringDate: string) => {
    const date = new Date(stringDate)
    if (!isValid(date)) {
      return '--'
    }

    return formatDate(date, 'dd/MM/yyyy')
  }, [])
}

export function formatSize(bytes: number) {
  const KB = 1024;
  const MB = KB * 1024;
  const GB = MB * 1024;
  const TB = GB * 1024;

  if (bytes >= TB) return (bytes / TB).toFixed(2) + ' TB';
  if (bytes >= GB) return (bytes / GB).toFixed(2) + ' GB';
  if (bytes >= MB) return (bytes / MB).toFixed(2) + ' MB';
  if (bytes >= KB) return (bytes / KB).toFixed(2) + ' KB';
  return bytes + ' B';
}