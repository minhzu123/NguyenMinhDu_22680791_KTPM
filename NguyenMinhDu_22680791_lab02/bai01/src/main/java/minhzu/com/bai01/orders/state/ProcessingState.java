package minhzu.com.bai01.orders.state;

import minhzu.com.bai01.orders.OrderContext;

public class ProcessingState implements OrderState {
    @Override
    public void handle(OrderContext order) {
        System.out.println("📦 Đang xử lý: đóng gói & vận chuyển...");
        order.setState(new DeliveredState());
    }
}