const amqp = require("amqplib");
const readline = require("readline");

async function sendEvent() {
  try {
    // 1. Kết nối đến RabbitMQ Server
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const sendQueue = "to_consumer";
    const receiveQueue = "to_producer";

    // Khai báo queues
    await channel.assertQueue(sendQueue, { durable: true });
    await channel.assertQueue(receiveQueue, { durable: true });

    // Đảm bảo mỗi lần chỉ nhận 1 tin nhắn để xử lý ổn định
    channel.prefetch(1);

    // Tạo interface readline để nhập từ bàn phím
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log("Nhập tin nhắn để gửi (nhập 'exit' để thoát):");

    let messageId = 1;

    function askForMessage() {
      rl.question("Bạn: ", (input) => {
        if (input.toLowerCase() === "exit") {
          console.log("Đã thoát chat.");
          rl.close();
          connection.close();
          return;
        }

        const msg = {
          id: messageId++,
          action: "CHAT_MESSAGE",
          data: input,
        };

        // 3. Gửi tin nhắn lên Queue
        channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(msg)), {
          persistent: true, // Tin nhắn sẽ không mất nếu RabbitMQ restart
        });

        console.log(" [x] Đã gửi: %s", input);

        // Tiếp tục hỏi tin nhắn tiếp theo
        askForMessage();
      });
    }

    // Lắng nghe và xử lý tin nhắn
    channel.consume(
      receiveQueue,
      (msg) => {
        const content = JSON.parse(msg.content.toString());

        console.log("Người dùng: %s", content.data);

        // Xác nhận đã xử lý xong
        channel.ack(msg);
      },
      { noAck: false }
    );

    // Bắt đầu hỏi tin nhắn đầu tiên
    askForMessage();
  } catch (error) {
    console.error("Lỗi rồi anh ơi:", error);
  }
}

sendEvent();
