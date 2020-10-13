import { AppEventNames } from 'typing/EventTypes';

export type ListenerType = (args: unknown) => void;
export type listenerItemType = {
  once: boolean;
  listener: ListenerType;
};
export type EventMapType = Map<AppEventNames, listenerItemType[]>;
const EventMap: EventMapType = new Map();

class AppEvent {
  private add(eventName: AppEventNames, listener: ListenerType, once: boolean): void {
    if (!EventMap.has(eventName)) {
      EventMap.set(eventName, []);
    }
    EventMap.get(eventName)?.push({ once, listener });
  }
  on(eventName: AppEventNames, listener: ListenerType): () => void {
    this.add(eventName, listener, false);
    return () => {
      /** off */
      EventMap.set(eventName, EventMap.get(eventName)?.filter((listenerItem) => listenerItem.listener !== listener) || []);
    };
  }
  once(eventName: AppEventNames, listener: ListenerType) {
    this.add(eventName, listener, true);
  }
  emit(eventName: AppEventNames, args: unknown): boolean {
    if (!EventMap.has(eventName)) return false;
    for (const listenerItem of EventMap.get(eventName) || []) {
      if (!listenerItem.once) {
        listenerItem.listener(args);
        continue;
      } else {
        listenerItem.listener(args);
        const filterArray = EventMap.get(eventName)?.filter((item) => item.listener !== listenerItem.listener);
        EventMap.set(eventName, filterArray || []);
      }
    }
    return true;
  }
  off(eventName: AppEventNames, listener?: ListenerType): boolean {
    if (listener && typeof listener === 'function') {
      const filterArray = EventMap.get(eventName)?.filter((item) => item.listener !== listener);
      EventMap.set(eventName, filterArray || []);
      return true;
    }
    return EventMap.delete(eventName);
  }
  offAll(): void {
    EventMap.clear();
  }
  listener() {
    const eventMap = {};
    EventMap.forEach((value, key) => {
      eventMap[key] = value;
    });
    return eventMap;
  }
}

const Event = new AppEvent();
Reflect.set($$, 'Event', Event);
