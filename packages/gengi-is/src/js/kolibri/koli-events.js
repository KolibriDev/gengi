'use strict';

// AMD/CommonJS support
((root, factory) => {
  var define = root.define;

  if (define && define.amd) {
    define([], factory);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  }
}(window, () => {
  var noop = function() {};
  var RunnableLink = class {
    constructor(prev, next, fn) {
      this.prev = prev;
      this.next = next;
      this.fn = fn || noop;
    }

    run(data) {
      this.fn(data);
      if (this.next) {
        this.next.run(data);
      }
    }
  };

  var LinkedList = class {
    constructor(linkConstructor) {
      this.head = new RunnableLink();
      this.tail = new RunnableLink(this.head);
      this.head.next = this.tail;
      this.linkConstructor = linkConstructor;
    }

    insert(data) {
      var link = new RunnableLink(this.tail.prev, this.tail, data);
      link.next.prev = link.prev.next = link;
      return link;
    }

    remove(link) {
      link.prev.next = link.next;
      link.next.prev = link.prev;
    }
  };

  var Events = class {
    constructor() {
      this.events = {};
    }

    on(name, fn) {
      if (!this.isRegistered(name, fn)) {
        this.register(name, fn);
      }
    }

    off(name, fn) {
      if (this.isRegistered(name, fn)) {
        this.unregister(name, fn);
      }
    }

    emit(name, data) {
      if (this.events[name]) {
        this.events[name].head.run(data);
      }
    }

    isRegistered(name, fn) {
      return fn._ev && fn._ev[name];
    }

    register(name, fn) {
      var link = this.insertLinkInList(name, fn);

      this.insertLinkInFn(name, link, fn);
    }

    insertLinkInList(name, fn) {
      var list = this.events[name] || (this.events[name] = new LinkedList());
      return list.insert(fn);
    }

    insertLinkInFn(name, link, fn) {
      var ev = fn._ev || (fn._ev = {});
      ev[name] = link;
    }

    unregister(name, fn) {
      var link = this.removeLinkFromFn(name, fn);

      this.removeLinkFromList(name, link);
    }

    removeLinkFromFn(name, fn) {
      var link = fn._ev[name];

      fn._ev[name] = undefined;
      return link;
    }

    removeLinkFromList(name, link) {
      if (this.events[name]) {
        this.events[name].remove(link);
      }
    }
  };

  return new Events();
}));
