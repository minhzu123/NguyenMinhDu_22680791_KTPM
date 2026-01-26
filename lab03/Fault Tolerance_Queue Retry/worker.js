function processJob(job) {
    return new Promise((resolve, reject) => {
      // Giả lập xử lý có thể fail
      const success = Math.random() > 0.5;
  
      setTimeout(() => {
        if (success) {
          resolve(`✅ Job ${job.id} processed`);
        } else {
          reject(`❌ Job ${job.id} failed`);
        }
      }, 500);
    });
  }
  
  module.exports = processJob;
  