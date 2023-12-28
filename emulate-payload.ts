import { random, range } from 'lodash';
import { setTimeout } from 'timers/promises';

(async () => {
  const measurements = range(1000, 2000, 20).map((v) => v / 100);
  let iteration = 0;

  while (true) {
    iteration++;
    console.log({ iteration });

    const payload = {
      temperature: measurements.at(random(0, measurements.length - 1)),
      timestamp: new Date().toISOString(),
    };

    console.log(payload);

    const response = await fetch('http://localhost:3000/measurements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log(response.status, await response.json());

    await setTimeout(1000);
  }
})();
