class Queue {
    constructor() {
      this.items = [];
    }
  
    enqueue(job) {
      this.items.push(job);
    }
  
    dequeue() {
      return this.items.shift();
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
  }
  
  module.exports = Queue;
  