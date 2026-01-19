package minhzu.com.bai01.orders.state;

import minhzu.com.bai01.orders.OrderContext;

public class DeliveredState implements OrderState {
    @Override
    public void handle(OrderContext order) {
        System.out.println("✅ Đơn hàng đã được giao.");
    }
}