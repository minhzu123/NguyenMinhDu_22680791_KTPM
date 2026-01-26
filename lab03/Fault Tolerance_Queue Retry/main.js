const Queue = require("./queue");
const processJob = require("./worker");

const queue = new Queue();
const deadLetterQueue = new Queue();

const MAX_RETRY = 3;

// Thêm job vào queue
for (let i = 1; i <= 5; i++) {
  queue.enqueue({ id: i, retry: 0 });
}

async function startWorker() {
  while (!queue.isEmpty()) {
    const job = queue.dequeue();

    try {
      const result = await processJob(job);
      console.log(result);
    } catch (error) {
      job.retry++;
      console.log(`${error} → retry ${job.retry}`);

      if (job.retry <= MAX_RETRY) {
        queue.enqueue(job); // retry lại
      } else {
        console.log(`☠️ Job ${job.id} moved to DLQ`);
        deadLetterQueue.enqueue(job);
      }
    }
  }

  console.log("\n🎯 All jobs processed");
  console.log(`DLQ size: ${deadLetterQueue.items.length}`);
}

startWorker();
