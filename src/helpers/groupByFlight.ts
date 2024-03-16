import {Animal} from '../models/animals';

export const groupByFlight = (entries: Animal[]) => {
  const grouped: Array<{title: string; animals: Animal[]}> = [];

  const canFlyAnimals = entries.filter(o => o.canFly);

  canFlyAnimals.map(o => {
    const index = grouped.findIndex(
      g => g.title.toLowerCase() === o.animal.toLowerCase(),
    );
    if (index === -1) {
      grouped.push({
        title: o.animal.charAt(0).toUpperCase() + o.animal.substring(1),
        animals: [o],
      });
    } else {
      grouped[index].animals.push(o);
    }
  });
  grouped.sort((a, b) => a.title.localeCompare(b.title));
  return grouped;
};
