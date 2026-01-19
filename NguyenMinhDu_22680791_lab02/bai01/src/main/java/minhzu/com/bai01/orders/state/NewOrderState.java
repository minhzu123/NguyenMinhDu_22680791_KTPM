package minhzu.com.bai01.orders.state;

import minhzu.com.bai01.orders.OrderContext;

public class NewOrderState implements OrderState {
    @Override
    public void handle(OrderContext order) {
        System.out.println("🆕 Đơn hàng mới: kiểm tra thông tin...");
        order.setState(new ProcessingState());
    }
}