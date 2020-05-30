/**
 *  const EventMaps = {
 *    eventName: [
 *      {
 *        once: true,
 *        listener: () => {}
 *      }
 *    ]
 *  };
 */

type ListenerType = (args: unknown) => void;
type listenerItemType = {
  once: boolean;
  listener: ListenerType;
};
type EventMapType = Map<string | symbol, listenerItemType[]>;
const EventMap: EventMapType = new Map();

class EventEmitter {
  private add(eventName: string | symbol, listener: ListenerType, once: boolean): void {
    if (!EventMap.has(eventName)) {
      EventMap.set(eventName, []);
    }
    EventMap.get(eventName)?.push({ once, listener });
  }
  on(eventName: string | symbol, listener: ListenerType): () => void {
    this.add(eventName, listener, false);
    return () => {
      /** off */
      EventMap.set(eventName, EventMap.get(eventName)?.filter((listenerItem) => listenerItem.listener !== listener) || []);
    };
  }
  once(eventName: string | symbol, listener: ListenerType) {
    this.add(eventName, listener, true);
  }
  emit(eventName: string | symbol, args: unknown): boolean {
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
  off(eventName: string | symbol, listener?: ListenerType): boolean {
    if (listener && typeof listener === 'function') {
      const filterArray = EventMap.get(eventName)?.filter((item) => item.listener !== listener);
      EventMap.set(eventName, filterArray || []);
      return true;
    }
    return EventMap.delete(eventName);
  }
}

const Event = new EventEmitter();
export { Event };
export default EventEmitter;
