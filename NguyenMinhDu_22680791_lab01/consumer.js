const amqp = require("amqplib");
const readline = require("readline");

async function chatApp() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const sendQueue = "to_producer";
    const receiveQueue = "to_consumer";

    // Khai báo queues
    await channel.assertQueue(sendQueue, { durable: true });
    await channel.assertQueue(receiveQueue, { durable: true });

    // Đảm bảo mỗi lần chỉ nhận 1 tin nhắn để xử lý ổn định
    channel.prefetch(1);

    console.log(
      " [*] Chat app đang chạy. Nhập tin nhắn để gửi (nhập 'exit' để thoát)."
    );

    // Tạo interface readline để nhập từ bàn phím
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    let messageId = 1;

    // Hàm gửi tin nhắn
    function sendMessage(input) {
      const msg = {
        id: messageId++,
        action: "CHAT_MESSAGE",
        data: input,
      };

      channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(msg)), {
        persistent: true,
      });

      console.log("Bạn: %s", input);
    }

    // Hàm hỏi tin nhắn tiếp theo
    function askForMessage() {
      rl.question("", (input) => {
        if (input.toLowerCase() === "exit") {
          console.log("Đã thoát chat.");
          rl.close();
          connection.close();
          return;
        }

        sendMessage(input);
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
    console.error("Lỗi rồi anh:", error);
  }
}

chatApp();
