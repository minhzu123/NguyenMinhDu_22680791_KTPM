package minhzu.com.bai01.orders.state;

import minhzu.com.bai01.orders.OrderContext;

public class CancelledState implements OrderState {
    @Override
    public void handle(OrderContext order) {
        System.out.println("❌ Đơn hàng bị hủy – hoàn tiền.");
    }
}