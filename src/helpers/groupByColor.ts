import {Animal} from '../models/animals';

export const groupByColor = (entries: Animal[]) => {
  const grouped: Array<{title: string; animals: Animal[]}> = [];

  entries.map(o => {
    const index = grouped.findIndex(
      group => group.title.toLowerCase() === o.color.toLowerCase(),
    );
    if (index === -1) {
      grouped.push({
        title: o.color.charAt(0).toUpperCase() + o.color.substring(1),
        animals: [o],
      });
    } else {
      grouped[index].animals.push(o);
    }
  });

  grouped.sort((a, b) => a.title.localeCompare(b.title));

  return grouped;
};
