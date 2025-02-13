import {
  compareDesc,
  compareAsc,
  isToday,
  startOfDay,
  endOfDay,
  addDays,
  isWithinInterval,
  isThisMonth,
  isAfter,
  isThisYear,
  endOfYear,
  parse,
  isBefore,
} from 'date-fns';

export class TaskSorter {
  constructor(storage) {
    this.storage = storage;

    this._currentSort = 'creationMoment';
    this._currentSortCondition = 'newest';
    this._currentFilter = 'none';
    this._currentFilterCondition = 'none';
  }

  set currentSort(newSortMethod) {
    this._currentSort = newSortMethod;
  }
  set currentSortCondition(newCondition) {
    this._currentSortCondition = newCondition;
  }
  set currentFilter(newFilterMethod) {
    this._currentFilter = newFilterMethod;
  }
  set currentFilterCondition(newCondition) {
    this._currentFilterCondition = newCondition;
  }

  // SECTION sorting
  sort(sortMethod, condition, filteredStorage) {
    return this.sortMethods[sortMethod](condition, filteredStorage);
  }

  sortMethods = {
    creationMoment: (condition, filteredStorage) => {
      const creationMethods = {
        newest: () => {
          return filteredStorage.toSorted((a, b) => {
            return compareAsc(a.creationMoment, b.creationMoment);
          });
        },
        oldest: () => {
          return filteredStorage.toSorted((a, b) => {
            return compareDesc(a.creationMoment, b.creationMoment);
          });
        },
      };

      return creationMethods[condition]();
    },
    alphabetically: (condition, filteredStorage) => {
      const alphabetMethods = {
        AtoZ: () => {
          return filteredStorage
            .toSorted(task => {
              task.title;
            })
            .toReversed();
        },
        ZtoA: () => {
          return filteredStorage.toSorted(task => {
            task.title;
          });
        },
      };

      return alphabetMethods[condition]();
    },
    priority: (condition, filteredStorage) => {
      const priorityMethods = {
        lowest: () => {
          return filteredStorage.toSorted((a, b) => a.priority - b.priority);
        },
        highest: () => {
          return filteredStorage.toSorted((a, b) => b.priority - a.priority);
        },
      };

      return priorityMethods[condition]();
    },
    dueDate: (condition, filteredStorage) => {
      const dueDateMethods = {
        soonest: () => {
          return filteredStorage.toSorted((a, b) => {
            return compareAsc(a.dueDate, b.dueDate);
          });
        },
        furthest: () => {
          return filteredStorage.toSorted((a, b) => {
            return compareDesc(a.dueDate, b.dueDate);
          });
        },
      };

      return dueDateMethods[condition]();
    },
  };

  // SECTION filter
  filter(filterMethod, condition) {
    return this.filterMethods[filterMethod](condition);
  }

  filterMethods = {
    none: () => {
      return this.storage;
    },
    priority: condition => {
      return this.storage.filter(task => task.priority === condition);
    },
    dueDate: condition => {
      return this.filterByDueDate[condition]();
    },
    completion: condition => {
      const booleanMap = {
        true: true,
        false: false,
      };
      return this.storage.filter(task => task.isCompleted === booleanMap[condition]);
    },
  };

  filterByDueDate = {
    today: () => {
      return this.storage.filter(task => {
        if (task.dueDate) {
          const parsedDate = parse(task.dueDate, 'dd/MM/yyyy HH:mm', new Date());
          return isToday(parsedDate) && isBefore(new Date(), parsedDate);
        }
      });
    },
    tomorrow: () => {
      const tomorrowStart = startOfDay(addDays(new Date(), 1));
      const tomorrowEnd = endOfDay(addDays(new Date(), 1));

      return this.storage.filter(task => {
        if (task.dueDate) {
          const parsedDate = parse(task.dueDate, 'dd/MM/yyyy HH:mm', new Date());

          return (
            isWithinInterval(parsedDate, {
              start: tomorrowStart,
              end: tomorrowEnd,
            }) && isBefore(new Date(), parsedDate)
          );
        }
      });
    },
    nextSeven: () => {
      const startOfToday = startOfDay(new Date());
      const inSevenDays = addDays(new Date(), 7);
      const nextSevenDays = startOfDay(inSevenDays);

      return this.storage.filter(task => {
        if (task.dueDate) {
          const parsedDate = parse(task.dueDate, 'dd/MM/yyyy HH:mm', new Date());
          return (
            isWithinInterval(parsedDate, {
              start: startOfToday,
              end: nextSevenDays,
            }) && isBefore(new Date(), parsedDate)
          );
        }
      });
    },
    thisMonth: () => {
      return this.storage.filter(task => {
        if (task.dueDate) {
          const parsedDate = parse(task.dueDate, 'dd/MM/yyyy HH:mm', new Date());
          return isThisMonth(parsedDate) && isBefore(new Date(), parsedDate);
        }
      });
    },
    nextThirty: () => {
      const startOfToday = startOfDay(new Date());
      const inThirtyDays = addDays(new Date(), 30);
      const nextThirtyDays = startOfDay(inThirtyDays);

      return this.storage.filter(task => {
        if (task.dueDate) {
          const parsedDate = parse(task.dueDate, 'dd/MM/yyyy HH:mm', new Date());
          return (
            isWithinInterval(parsedDate, {
              start: startOfToday,
              end: nextThirtyDays,
            }) && isBefore(new Date(), parsedDate)
          );
        }
      });
    },
    thisYear: () => {
      return this.storage.filter(task => {
        const parsedDate = parse(task.dueDate, 'dd/MM/yyyy HH:mm', new Date());
        return isThisYear(parsedDate) && isBefore(new Date(), parsedDate);
      });
    },
    someday: () => {
      const endOfTheYear = endOfYear(new Date());

      return this.storage.filter(task => {
        if (task.dueDate) {
          const parsedDate = parse(task.dueDate, 'dd/MM/yyyy HH:mm', new Date());
          return isAfter(parsedDate, endOfTheYear) && isBefore(new Date(), parsedDate);
        }
      });
    },
    noDueDate: () => {
      return this.storage.filter(task => !task.dueDate);
    },
    expired: () => {
      return this.storage.filter(task => {
        if (task.dueDate) {
          const parsedDate = parse(task.dueDate, 'dd/MM/yyyy HH:mm', new Date());
          return isAfter(new Date(), parsedDate);
        }
      });
    },
  };

  // SECTION search
  search(string) {
    const filtered = this.filter(this._currentFilter, this._currentFilterCondition);
    const includedChars = filtered.filter(task =>
      task.title.toLowerCase().includes(string.toLowerCase())
    );
    return this.sort(this._currentSort, this._currentSortCondition, includedChars);
  }
}
