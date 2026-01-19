package minhzu.com.bai01.orders;

import minhzu.com.bai01.orders.state.NewOrderState;
import minhzu.com.bai01.orders.state.OrderState;

public class OrderContext {

    private OrderState state;

    public OrderContext() {
        this.state = new NewOrderState();
    }

    public void setState(OrderState state) {
        this.state = state;
    }

    public void process() {
        state.handle(this);
    }
}