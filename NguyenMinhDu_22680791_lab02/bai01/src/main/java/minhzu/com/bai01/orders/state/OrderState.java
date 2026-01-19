package minhzu.com.bai01.orders.state;


import minhzu.com.bai01.orders.OrderContext;

public interface OrderState {
    void handle(OrderContext order);
}
