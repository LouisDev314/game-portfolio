'use client';

import { useEffect, useState } from 'react';

export function useLocalTime(timeZone: string = 'America/Edmonton') {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const tick = () => {
      const now = new Date();
      setTime(
        new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
          timeZone,
        }).format(now),
      );

      const msToNextSecond = 1000 - now.getMilliseconds();
      timer = setTimeout(tick, msToNextSecond);
    };

    tick();

    return () => clearTimeout(timer);
  }, [timeZone]);

  return time;
}
